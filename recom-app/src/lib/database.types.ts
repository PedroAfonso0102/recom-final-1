export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      leads: {
        Row: {
          company: string
          created_at: string
          email: string
          id: string
          item_code: string | null
          notified_at: string | null
          message: string | null
          name: string
          phone: string
          process_id: string | null
          process_interest: string | null
          revenue_value: number | null
          loss_reason: string | null
          closed_at: string | null
          assigned_rep_id: string | null
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
          notified_at?: string | null
          message?: string | null
          name: string
          phone: string
          process_id?: string | null
          process_interest?: string | null
          revenue_value?: number | null
          loss_reason?: string | null
          closed_at?: string | null
          assigned_rep_id?: string | null
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
          notified_at?: string | null
          message?: string | null
          name?: string
          phone?: string
          process_id?: string | null
          process_interest?: string | null
          revenue_value?: number | null
          loss_reason?: string | null
          closed_at?: string | null
          assigned_rep_id?: string | null
          source_page?: string | null
          status?: Database["public"]["Enums"]["lead_status_type"]
          supplier_interest?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_assigned_rep_id_fkey"
            columns: ["assigned_rep_id"]
            isOneToOne: false
            referencedRelation: "sales_reps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "processes"
            referencedColumns: ["id"]
          },
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
      page_sections: {
        Row: {
          anchor_id: string | null
          component_type: string
          created_at: string
          created_by: string | null
          id: string
          page_id: string
          props: Json
          sort_order: number
          status: string
          updated_at: string
          updated_by: string | null
          visibility: string
        }
        Insert: {
          anchor_id?: string | null
          component_type: string
          created_at?: string
          created_by?: string | null
          id?: string
          page_id: string
          props?: Json
          sort_order?: number
          status?: string
          updated_at?: string
          updated_by?: string | null
          visibility?: string
        }
        Update: {
          anchor_id?: string | null
          component_type?: string
          created_at?: string
          created_by?: string | null
          id?: string
          page_id?: string
          props?: Json
          sort_order?: number
          status?: string
          updated_at?: string
          updated_by?: string | null
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_sections_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      page_versions: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          page_id: string
          snapshot: Json
          version_number: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          page_id: string
          snapshot: Json
          version_number: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          page_id?: string
          snapshot?: Json
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "page_versions_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_dynamic_template: boolean
          is_system: boolean
          og_image_url: string | null
          page_type: string
          published_at: string | null
          route_pattern: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          template_key: string | null
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_dynamic_template?: boolean
          is_system?: boolean
          og_image_url?: string | null
          page_type?: string
          published_at?: string | null
          route_pattern?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          template_key?: string | null
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_dynamic_template?: boolean
          is_system?: boolean
          og_image_url?: string | null
          page_type?: string
          published_at?: string | null
          route_pattern?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          template_key?: string | null
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
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
          catalogs: Json | null
          created_at: string
          e_catalog_url: string | null
          id: string
          logo_url: string | null
          long_description: string
          name: string
          related_processes: string[] | null
          seo_description: string | null
          seo_title: string | null
          settings: Json | null
          short_description: string
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["status_type"]
          updated_at: string
        }
        Insert: {
          catalog_url?: string | null
          catalogs?: Json | null
          created_at?: string
          e_catalog_url?: string | null
          id?: string
          logo_url?: string | null
          long_description: string
          name: string
          related_processes?: string[] | null
          seo_description?: string | null
          seo_title?: string | null
          settings?: Json | null
          short_description: string
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string
        }
        Update: {
          catalog_url?: string | null
          catalogs?: Json | null
          created_at?: string
          e_catalog_url?: string | null
          id?: string
          logo_url?: string | null
          long_description?: string
          name?: string
          related_processes?: string[] | null
          seo_description?: string | null
          seo_title?: string | null
          settings?: Json | null
          short_description?: string
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          id: string
          action: string
          entity_type: string
          entity_id: string
          details: Json | null
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          action: string
          entity_type: string
          entity_id: string
          details?: Json | null
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          action?: string
          entity_type?: string
          entity_id?: string
          details?: Json | null
          user_id?: string
          created_at?: string
        }
        Relationships: []
      }
      admin_configs: {
        Row: {
          id: string
          key: string
          value: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          key: string
          value?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json | null
          created_at?: string
        }
        Relationships: []
      }
      sales_reps: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          status: string
          last_assigned_at: string | null
          assignment_count: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          status?: string
          last_assigned_at?: string | null
          assignment_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          status?: string
          last_assigned_at?: string | null
          assignment_count?: number
          created_at?: string
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          id: string
          file_name: string
          file_path: string
          public_url: string
          alt_text: string | null
          mime_type: string
          size_bytes: number
          width: number | null
          height: number | null
          bucket: string
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          file_name: string
          file_path: string
          public_url: string
          alt_text?: string | null
          mime_type: string
          size_bytes?: number
          width?: number | null
          height?: number | null
          bucket?: string
          uploaded_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          file_name?: string
          file_path?: string
          public_url?: string
          alt_text?: string | null
          mime_type?: string
          size_bytes?: number
          width?: number | null
          height?: number | null
          bucket?: string
          uploaded_by?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_rep_stats: {
        Args: {
          rep_id: string
          assignment_time: string
        }
        Returns: void
      }
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      lead_status_type: ["new", "contacted", "qualified", "lost"],
      status_type: ["draft", "active", "archived"],
    },
  },
} as const
