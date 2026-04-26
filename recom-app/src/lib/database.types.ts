/* eslint-disable @typescript-eslint/no-explicit-any */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          company: string
          created_at: string
          email: string
          id: string
          item_code: string | null
          message: string | null
          name: string
          phone: string
          process_interest: string | null
          source_page: string | null
          status: Database["public"]["Enums"]["lead_status_type"]
          supplier_interest: string | null
          updated_at: string
        }
        Insert: {
          company: string
          created_at?: string
          email: string
          id?: string
          item_code?: string | null
          message?: string | null
          name: string
          phone: string
          process_interest?: string | null
          source_page?: string | null
          status?: Database["public"]["Enums"]["lead_status_type"]
          supplier_interest?: string | null
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          email?: string
          id?: string
          item_code?: string | null
          message?: string | null
          name?: string
          phone?: string
          process_interest?: string | null
          source_page?: string | null
          status?: Database["public"]["Enums"]["lead_status_type"]
          supplier_interest?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_process_interest_fkey"
            columns: ["process_interest"]
            isOneToOne: false
            referencedRelation: "processes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_supplier_interest_fkey"
            columns: ["supplier_interest"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      processes: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          long_description: string
          name: string
          seo_description: string | null
          seo_title: string | null
          short_description: string
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["status_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          long_description: string
          name: string
          seo_description?: string | null
          seo_title?: string | null
          short_description: string
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          long_description?: string
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          created_at: string
          cta_label: string | null
          cta_url: string | null
          description: string
          ends_at: string
          id: string
          image_url: string | null
          slug: string
          starts_at: string
          status: Database["public"]["Enums"]["status_type"]
          supplier_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          description: string
          ends_at: string
          id?: string
          image_url?: string | null
          slug: string
          starts_at: string
          status?: Database["public"]["Enums"]["status_type"]
          supplier_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          description?: string
          ends_at?: string
          id?: string
          image_url?: string | null
          slug?: string
          starts_at?: string
          status?: Database["public"]["Enums"]["status_type"]
          supplier_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "promotions_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      suppliers: {
        Row: {
          catalog_url: string | null
          catalogs: any[] | null
          created_at: string
          e_catalog_url: string | null
          id: string
          logo_url: string | null
          long_description: string
          name: string
          related_processes: string[] | null
          seo_description: string | null
          seo_title: string | null
          settings: any | null
          short_description: string
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["status_type"]
          updated_at: string
        }
        Insert: {
          catalog_url?: string | null
          catalogs?: any[] | null
          created_at?: string
          e_catalog_url?: string | null
          id?: string
          logo_url?: string | null
          long_description: string
          name: string
          related_processes?: string[] | null
          seo_description?: string | null
          seo_title?: string | null
          settings?: any | null
          short_description: string
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string
        }
        Update: {
          catalog_url?: string | null
          catalogs?: any[] | null
          created_at?: string
          e_catalog_url?: string | null
          id?: string
          logo_url?: string | null
          long_description?: string
          name?: string
          related_processes?: string[] | null
          seo_description?: string | null
          seo_title?: string | null
          settings?: any | null
          short_description?: string
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      lead_status_type: "new" | "contacted" | "qualified" | "lost"
      status_type: "draft" | "active" | "archived"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      lead_status_type: ["new", "contacted", "qualified", "lost"],
      status_type: ["draft", "active", "archived"],
    },
  },
} as const

