# Refonte commerciale complète de Mon Lot

## Résultat attendu
- Transformer toutes les pages publiques en site foncier professionnel, sans contenu interne, fictif ou provisoire.
- Afficher uniquement les terrains réellement ajoutés par l’administration.
- Permettre aux visiteurs de consulter un terrain, choisir une formule et envoyer une réservation.
- Permettre à l’administrateur de gérer les terrains, leur statut, leur mise en vedette et leur priorité.

## Pages publiques
- Refaire l’accueil avec un grand diaporama premium alimenté par les terrains marqués « Lot en vedette ».
- Ajouter lecture automatique lente, navigation tactile et manuelle, zoom photo subtil, textes animés et animations réduites si le visiteur le préfère.
- Si aucun terrain réel n’existe, afficher une présentation commerciale soignée sans inventer de terrain, prix, photo ou localisation.
- Refaire le catalogue, les cartes et les fiches terrain pour utiliser exclusivement les données enregistrées.
- Ajouter une page de réservation préremplie avec le terrain et la formule choisis.
- Refaire la page Paiement avec les tarifs 100 %, 110 %, 120 %, 135 % et 150 %, présentés comme économies entières face aux 12 mois.
- Mettre à jour Contact et le pied de page avec le téléphone, WhatsApp, l’email et l’adresse fournis.

## Données et administration
- Créer les données sécurisées pour les terrains, photos, profils administrateurs, rôles, réservations et messages de contact.
- Ne précharger aucun terrain fictif.
- Ajouter un espace administrateur protégé avec connexion, récupération du mot de passe et profil administrateur.
- Ajouter création/modification des terrains, statut, photos, « Lot en vedette » et ordre de priorité.
- Trier les terrains en vedette disponibles par priorité, puis par date de publication.
- Protéger strictement les modifications administratives par un rôle vérifié côté serveur.

## Réservation et contact
- Enregistrer chaque réservation avec les coordonnées du client, le terrain, la formule, les montants calculés et le message.
- Enregistrer aussi chaque demande de contact.
- Valider tous les champs côté formulaire et côté serveur.
- Envoyer les nouvelles demandes à `contact@monlot.ci` dès que le domaine d’envoi Mon Lot est configuré dans Lovable Emails.
- En attendant cette configuration, conserver chaque demande dans l’espace administrateur afin qu’aucune ne soit perdue.

## Identité visuelle et référencement
- Charger Outfit et Plus Jakarta Sans.
- Créer le favicon et l’image de partage social depuis le logo officiel fourni.
- Remplacer les métadonnées génériques, franciser les pages d’erreur et ajouter les métadonnées propres à chaque page.
- Conserver la palette vert, sable et anthracite du logo avec une présentation immobilière premium et mobile-first.

## Vérifications
- Vérifier toutes les pages et rechercher les anciens textes, lieux, prix, références et coordonnées fictifs.
- Tester les calculs de chaque formule, les économies arrondies, les formulaires, la gestion des terrains et les états vides.
- Contrôler visuellement l’accueil, le catalogue, une fiche, la réservation, le contact et l’administration sur mobile et ordinateur.

## Détails techniques
- Lovable Cloud stockera les terrains, rôles, profils, messages et réservations avec règles d’accès dédiées.
- Les visiteurs pourront lire uniquement les terrains publiés et envoyer des demandes ; seul un administrateur pourra consulter les demandes et gérer le catalogue.
- Le mot de passe fourni ne sera jamais écrit dans le code. Le compte initial utilisera `admin@monlot.ci` et un profil administrateur.
- Les fichiers de démonstration pourront rester hors affichage uniquement si une dépendance technique l’exige ; aucune donnée fictive ne sera rendue publiquement.
