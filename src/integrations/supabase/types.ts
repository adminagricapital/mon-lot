export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contact_requests: {
        Row: {
          created_at: string
          email: string | null
          full_name: string
          id: string
          message: string
          phone: string
          status: Database["public"]["Enums"]["request_status"]
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          message: string
          phone: string
          status?: Database["public"]["Enums"]["request_status"]
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          message?: string
          phone?: string
          status?: Database["public"]["Enums"]["request_status"]
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      lots: {
        Row: {
          access_details: string | null
          area_name: string
          area_sqm: number
          cash_price: number
          city: string
          cover_image_url: string
          created_at: string
          description: string
          documents: string[]
          featured_priority: number | null
          gallery_urls: string[]
          id: string
          is_featured: boolean
          is_published: boolean
          latitude: number | null
          longitude: number | null
          published_at: string | null
          reference: string
          region: string | null
          status: Database["public"]["Enums"]["lot_status"]
          title: string
          updated_at: string
        }
        Insert: {
          access_details?: string | null
          area_name: string
          area_sqm: number
          cash_price: number
          city: string
          cover_image_url: string
          created_at?: string
          description: string
          documents?: string[]
          featured_priority?: number | null
          gallery_urls?: string[]
          id?: string
          is_featured?: boolean
          is_published?: boolean
          latitude?: number | null
          longitude?: number | null
          published_at?: string | null
          reference: string
          region?: string | null
          status?: Database["public"]["Enums"]["lot_status"]
          title: string
          updated_at?: string
        }
        Update: {
          access_details?: string | null
          area_name?: string
          area_sqm?: number
          cash_price?: number
          city?: string
          cover_image_url?: string
          created_at?: string
          description?: string
          documents?: string[]
          featured_priority?: number | null
          gallery_urls?: string[]
          id?: string
          is_featured?: boolean
          is_published?: boolean
          latitude?: number | null
          longitude?: number | null
          published_at?: string | null
          reference?: string
          region?: string | null
          status?: Database["public"]["Enums"]["lot_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name: string
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      reservation_requests: {
        Row: {
          created_at: string
          duration_months: number
          email: string | null
          full_name: string
          id: string
          lot_id: string
          lot_reference: string
          lot_title: string
          message: string | null
          monthly_amount: number
          phone: string
          reservation_amount: number
          status: Database["public"]["Enums"]["request_status"]
          total_price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          duration_months: number
          email?: string | null
          full_name: string
          id?: string
          lot_id: string
          lot_reference: string
          lot_title: string
          message?: string | null
          monthly_amount: number
          phone: string
          reservation_amount: number
          status?: Database["public"]["Enums"]["request_status"]
          total_price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          duration_months?: number
          email?: string | null
          full_name?: string
          id?: string
          lot_id?: string
          lot_reference?: string
          lot_title?: string
          message?: string | null
          monthly_amount?: number
          phone?: string
          reservation_amount?: number
          status?: Database["public"]["Enums"]["request_status"]
          total_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservation_requests_lot_id_fkey"
            columns: ["lot_id"]
            isOneToOne: false
            referencedRelation: "lots"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      lot_status: "disponible" | "reserve" | "vendu"
      request_status: "nouvelle" | "contactee" | "traitee" | "archivee"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      lot_status: ["disponible", "reserve", "vendu"],
      request_status: ["nouvelle", "contactee", "traitee", "archivee"],
    },
  },
} as const
