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
      activity_log: {
        Row: {
          action: string
          actor_id: string | null
          after: Json | null
          before: Json | null
          created_at: string
          entity_id: string | null
          entity_type: string
          id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          after?: Json | null
          before?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type: string
          id?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          after?: Json | null
          before?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
        }
        Relationships: []
      }
      admin_configs: {
        Row: {
          created_at: string | null
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          created_at?: string | null
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          created_at?: string | null
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      admin_profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      cms_revisions: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_autosave: boolean | null
          label: string | null
          page_id: string
          snapshot: Json
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_autosave?: boolean | null
          label?: string | null
          page_id: string
          snapshot: Json
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_autosave?: boolean | null
          label?: string | null
          page_id?: string
          snapshot?: Json
        }
        Relationships: [
          {
            foreignKeyName: "cms_revisions_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "pages"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_events: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          event_type: string
          id: string
          lead_id: string
          metadata: Json
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_type: string
          id?: string
          lead_id: string
          metadata?: Json
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_type?: string
          id?: string
          lead_id?: string
          metadata?: Json
        }
        Relationships: [
          {
            foreignKeyName: "lead_events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_files: {
        Row: {
          created_at: string
          file_name: string | null
          file_url: string | null
          id: string
          lead_id: string
          media_asset_id: string | null
        }
        Insert: {
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          lead_id: string
          media_asset_id?: string | null
        }
        Update: {
          created_at?: string
          file_name?: string | null
          file_url?: string | null
          id?: string
          lead_id?: string
          media_asset_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_files_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_files_media_asset_id_fkey"
            columns: ["media_asset_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_rep_id: string | null
          assigned_to: string | null
          closed_at: string | null
          company: string
          created_at: string
          email: string
          id: string
          item_code: string | null
          last_contacted_at: string | null
          loss_reason: string | null
          message: string | null
          name: string
          notes: string | null
          notified_at: string | null
          phone: string
          priority: string
          process_id: string | null
          process_interest: string | null
          revenue_value: number | null
          source_page: string | null
          source_type: string
          status: Database["public"]["Enums"]["lead_status_type"]
          supplier_interest: string | null
          updated_at: string
          whatsapp: string | null
          whatsapp_url: string | null
        }
        Insert: {
          assigned_rep_id?: string | null
          assigned_to?: string | null
          closed_at?: string | null
          company: string
          created_at?: string
          email: string
          id?: string
          item_code?: string | null
          last_contacted_at?: string | null
          loss_reason?: string | null
          message?: string | null
          name: string
          notes?: string | null
          notified_at?: string | null
          phone: string
          priority?: string
          process_id?: string | null
          process_interest?: string | null
          revenue_value?: number | null
          source_page?: string | null
          source_type?: string
          status?: Database["public"]["Enums"]["lead_status_type"]
          supplier_interest?: string | null
          updated_at?: string
          whatsapp?: string | null
          whatsapp_url?: string | null
        }
        Update: {
          assigned_rep_id?: string | null
          assigned_to?: string | null
          closed_at?: string | null
          company?: string
          created_at?: string
          email?: string
          id?: string
          item_code?: string | null
          last_contacted_at?: string | null
          loss_reason?: string | null
          message?: string | null
          name?: string
          notes?: string | null
          notified_at?: string | null
          phone?: string
          priority?: string
          process_id?: string | null
          process_interest?: string | null
          revenue_value?: number | null
          source_page?: string | null
          source_type?: string
          status?: Database["public"]["Enums"]["lead_status_type"]
          supplier_interest?: string | null
          updated_at?: string
          whatsapp?: string | null
          whatsapp_url?: string | null
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
      media_assets: {
        Row: {
          alt_text: string | null
          bucket: string
          created_at: string
          file_name: string
          file_path: string
          height: number | null
          id: string
          mime_type: string
          public_url: string
          size_bytes: number
          uploaded_by: string | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          bucket?: string
          created_at?: string
          file_name: string
          file_path: string
          height?: number | null
          id?: string
          mime_type: string
          public_url: string
          size_bytes?: number
          uploaded_by?: string | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          bucket?: string
          created_at?: string
          file_name?: string
          file_path?: string
          height?: number | null
          id?: string
          mime_type?: string
          public_url?: string
          size_bytes?: number
          uploaded_by?: string | null
          width?: number | null
        }
        Relationships: []
      }
      page_sections: {
        Row: {
          anchor_id: string | null
          component_type: string
          created_at: string
          created_by: string | null
          id: string
          last_reviewed_at: string | null
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
          last_reviewed_at?: string | null
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
          last_reviewed_at?: string | null
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
          last_reviewed_at: string | null
          og_image_url: string | null
          page_type: string
          published_at: string | null
          route_pattern: string | null
          scheduled_at: string | null
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
          last_reviewed_at?: string | null
          og_image_url?: string | null
          page_type?: string
          published_at?: string | null
          route_pattern?: string | null
          scheduled_at?: string | null
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
          last_reviewed_at?: string | null
          og_image_url?: string | null
          page_type?: string
          published_at?: string | null
          route_pattern?: string | null
          scheduled_at?: string | null
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
          body: string | null
          created_at: string
          created_by: string | null
          id: string
          image_url: string | null
          last_reviewed_at: string | null
          long_description: string
          name: string
          published_at: string | null
          scheduled_at: string | null
          seo_description: string | null
          seo_title: string | null
          short_description: string
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["status_type"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          body?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          last_reviewed_at?: string | null
          long_description: string
          name: string
          published_at?: string | null
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description: string
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          body?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          last_reviewed_at?: string | null
          long_description?: string
          name?: string
          published_at?: string | null
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          created_at: string
          created_by: string | null
          cta_label: string | null
          cta_url: string | null
          description: string
          ends_at: string
          id: string
          image_url: string | null
          last_reviewed_at: string | null
          published_at: string | null
          scheduled_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          starts_at: string
          status: Database["public"]["Enums"]["status_type"]
          supplier_id: string | null
          terms: string | null
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          cta_label?: string | null
          cta_url?: string | null
          description: string
          ends_at: string
          id?: string
          image_url?: string | null
          last_reviewed_at?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          starts_at: string
          status?: Database["public"]["Enums"]["status_type"]
          supplier_id?: string | null
          terms?: string | null
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          cta_label?: string | null
          cta_url?: string | null
          description?: string
          ends_at?: string
          id?: string
          image_url?: string | null
          last_reviewed_at?: string | null
          published_at?: string | null
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          starts_at?: string
          status?: Database["public"]["Enums"]["status_type"]
          supplier_id?: string | null
          terms?: string | null
          title?: string
          updated_at?: string
          updated_by?: string | null
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
      sales_reps: {
        Row: {
          active: boolean | null
          created_at: string | null
          email: string
          id: string
          last_assigned_at: string | null
          name: string
          phone: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          email: string
          id?: string
          last_assigned_at?: string | null
          name: string
          phone?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          email?: string
          id?: string
          last_assigned_at?: string | null
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          address: string | null
          business_hours: string | null
          company_name: string
          default_seo_description: string | null
          default_seo_title: string | null
          email: string | null
          google_maps_url: string | null
          id: string
          phone: string | null
          social_links: Json
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          business_hours?: string | null
          company_name?: string
          default_seo_description?: string | null
          default_seo_title?: string | null
          email?: string | null
          google_maps_url?: string | null
          id?: string
          phone?: string | null
          social_links?: Json
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          business_hours?: string | null
          company_name?: string
          default_seo_description?: string | null
          default_seo_title?: string | null
          email?: string | null
          google_maps_url?: string | null
          id?: string
          phone?: string | null
          social_links?: Json
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      supplier_processes: {
        Row: {
          process_id: string
          sort_order: number
          supplier_id: string
        }
        Insert: {
          process_id: string
          sort_order?: number
          supplier_id: string
        }
        Update: {
          process_id?: string
          sort_order?: number
          supplier_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplier_processes_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "processes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_processes_supplier_id_fkey"
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
          created_by: string | null
          e_catalog_url: string | null
          id: string
          last_reviewed_at: string | null
          logo_url: string | null
          long_description: string
          name: string
          published_at: string | null
          related_processes: string[] | null
          scheduled_at: string | null
          seo_description: string | null
          seo_title: string | null
          settings: Json | null
          short_description: string
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["status_type"]
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          catalog_url?: string | null
          catalogs?: Json | null
          created_at?: string
          created_by?: string | null
          e_catalog_url?: string | null
          id?: string
          last_reviewed_at?: string | null
          logo_url?: string | null
          long_description: string
          name: string
          published_at?: string | null
          related_processes?: string[] | null
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          settings?: Json | null
          short_description: string
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          catalog_url?: string | null
          catalogs?: Json | null
          created_at?: string
          created_by?: string | null
          e_catalog_url?: string | null
          id?: string
          last_reviewed_at?: string | null
          logo_url?: string | null
          long_description?: string
          name?: string
          published_at?: string | null
          related_processes?: string[] | null
          scheduled_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          settings?: Json | null
          short_description?: string
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["status_type"]
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_admin_role: { Args: never; Returns: string }
      has_admin_role: { Args: { allowed_roles: string[] }; Returns: boolean }
      increment_rep_stats: {
        Args: { assignment_time: string; rep_id: string }
        Returns: undefined
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      lead_status_type: "new" | "contacted" | "qualified" | "lost"
      status_type:
        | "draft"
        | "active"
        | "archived"
        | "published"
        | "scheduled"
        | "expired"
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
      status_type: [
        "draft",
        "active",
        "archived",
        "published",
        "scheduled",
        "expired",
      ],
    },
  },
} as const

