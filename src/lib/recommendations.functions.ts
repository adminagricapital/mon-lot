import { createOpenAI } from "@ai-sdk/openai";
import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";

const inputSchema = z.object({
  project: z.string().trim().min(20).max(1500),
  budget: z.number().int().positive().nullable(),
  preferredCity: z.string().trim().max(100).nullable(),
});

export const recommendLots = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env['LOVABLE_API_KEY'];
    if (!key) throw new Error("Le conseil personnalisé est momentanément indisponible.");

    const { createPublicSupabase } = await import("./supabase-public.server");
    const { createGatewayFetch } = await import("./ai-gateway.server");
    const { data: lots, error } = await createPublicSupabase()
      .from("lots")
      .select("reference, title, city, area_name, area_sqm, cash_price, description")
      .eq("status", "disponible")
      .order("cash_price", { ascending: true })
      .limit(20);

    if (error) throw new Error("Les offres disponibles n’ont pas pu être consultées.");

    const gatewayFetch = createGatewayFetch();
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: gatewayFetch.fetch,
    });

    const catalog = (lots ?? []).map((lot) => ({
      reference: lot.reference,
      title: lot.title,
      city: lot.city,
      area: lot.area_name,
      areaSqm: lot.area_sqm,
      cashPriceFcfa: lot.cash_price,
      description: lot.description,
    }));

    const result = streamText({
      model: lovable.responses("openai/gpt-6-astra"),
      system: "Tu es le conseiller immobilier de Mon Lot en Côte d’Ivoire. Réponds en français, avec empathie et concision. Recommande uniquement des terrains présents dans le catalogue fourni. N’invente aucune offre, aucun prix et aucune disponibilité. Si le catalogue est vide ou sans correspondance, explique-le clairement et propose au visiteur de transmettre sa recherche à l’équipe Mon Lot.",
      prompt: `Projet du visiteur : ${data.project}\nBudget : ${data.budget ? `${data.budget} FCFA` : "non précisé"}\nVille souhaitée : ${data.preferredCity || "non précisée"}\nCatalogue actuellement disponible : ${JSON.stringify(catalog)}\nRédige une recommandation personnalisée avec les références pertinentes et une prochaine étape claire.`,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    const text = await result.text;
    return { text: text.trim() || "Aucune recommandation n’est disponible pour le moment." };
  });