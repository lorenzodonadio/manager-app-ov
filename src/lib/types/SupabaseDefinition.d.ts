export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      app_version: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      contact: {
        Row: {
          country: string | null
          created_at: string | null
          cv: string | null
          email: string
          id: number
          message: string
          name: string
          organization: string | null
          phone_number: string | null
          type: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string | null
          cv?: string | null
          email: string
          id?: number
          message: string
          name: string
          organization?: string | null
          phone_number?: string | null
          type?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string | null
          cv?: string | null
          email?: string
          id?: number
          message?: string
          name?: string
          organization?: string | null
          phone_number?: string | null
          type?: string | null
        }
        Relationships: []
      }
      customer: {
        Row: {
          added_by: string | null
          address: string | null
          created_at: string | null
          email: string | null
          gender: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string | null
          notes: string | null
          phone: string | null
        }
        Insert: {
          added_by?: string | null
          address?: string | null
          created_at?: string | null
          email?: string | null
          gender?: string | null
          id: string
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          notes?: string | null
          phone?: string | null
        }
        Update: {
          added_by?: string | null
          address?: string | null
          created_at?: string | null
          email?: string | null
          gender?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          notes?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      elearn_answers: {
        Row: {
          answers: Json | null
          created_at: string | null
          email: string
          score: Json | null
        }
        Insert: {
          answers?: Json | null
          created_at?: string | null
          email: string
          score?: Json | null
        }
        Update: {
          answers?: Json | null
          created_at?: string | null
          email?: string
          score?: Json | null
        }
        Relationships: []
      }
      entrep_questions: {
        Row: {
          added_by: string | null
          created_at: string | null
          id: string
          q1: string | null
          q2: string | null
          q3: string | null
          q4: string | null
          q5: string | null
          q6: string | null
          q7: string | null
        }
        Insert: {
          added_by?: string | null
          created_at?: string | null
          id: string
          q1?: string | null
          q2?: string | null
          q3?: string | null
          q4?: string | null
          q5?: string | null
          q6?: string | null
          q7?: string | null
        }
        Update: {
          added_by?: string | null
          created_at?: string | null
          id?: string
          q1?: string | null
          q2?: string | null
          q3?: string | null
          q4?: string | null
          q5?: string | null
          q6?: string | null
          q7?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entrep_questions_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entrep_questions_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "filter_sales"
            referencedColumns: ["id"]
          }
        ]
      }
      external_invite: {
        Row: {
          created_at: string
          id: string
          invited_by: string
          magiclink: string
        }
        Insert: {
          created_at?: string
          id: string
          invited_by: string
          magiclink: string
        }
        Update: {
          created_at?: string
          id?: string
          invited_by?: string
          magiclink?: string
        }
        Relationships: []
      }
      filter_ids: {
        Row: {
          id: string
        }
        Insert: {
          id: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
      filter_sales: {
        Row: {
          created_at: string | null
          currency: string
          customer_id: string | null
          id: string
          latitude: number | null
          longitude: number | null
          number_sold: number
          price: number
          reason_no_scan: string | null
          sold_by: string | null
        }
        Insert: {
          created_at?: string | null
          currency: string
          customer_id?: string | null
          id: string
          latitude?: number | null
          longitude?: number | null
          number_sold: number
          price: number
          reason_no_scan?: string | null
          sold_by?: string | null
        }
        Update: {
          created_at?: string | null
          currency?: string
          customer_id?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          number_sold?: number
          price?: number
          reason_no_scan?: string | null
          sold_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "filter_sales_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "filter_sales_sold_by_fkey"
            columns: ["sold_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      future_entrepreneurs: {
        Row: {
          country_code: string
          created_at: string | null
          email: string
          first_name: string
          invited_by: string | null
          last_name: string | null
          location_id: string
        }
        Insert: {
          country_code: string
          created_at?: string | null
          email: string
          first_name: string
          invited_by?: string | null
          last_name?: string | null
          location_id: string
        }
        Update: {
          country_code?: string
          created_at?: string | null
          email?: string
          first_name?: string
          invited_by?: string | null
          last_name?: string | null
          location_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "future_entrepreneurs_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "future_entrepreneurs_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          }
        ]
      }
      future_manager: {
        Row: {
          country_code: string | null
          created_at: string | null
          email: string
        }
        Insert: {
          country_code?: string | null
          created_at?: string | null
          email: string
        }
        Update: {
          country_code?: string | null
          created_at?: string | null
          email?: string
        }
        Relationships: []
      }
      installment_sale: {
        Row: {
          comment: string | null
          created_at: string
          customer_id: string
          entrep_id: string
          extra_payment: number | null
          first_payment: number
          is_complete: boolean
          sale_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          customer_id: string
          entrep_id: string
          extra_payment?: number | null
          first_payment: number
          is_complete?: boolean
          sale_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          customer_id?: string
          entrep_id?: string
          extra_payment?: number | null
          first_payment?: number
          is_complete?: boolean
          sale_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "installment_sale_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "installment_sale_entrep_id_fkey"
            columns: ["entrep_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "installment_sale_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "filter_sales"
            referencedColumns: ["id"]
          }
        ]
      }
      inventory_checks: {
        Row: {
          actual_check_date: string | null
          bonus_currency: string | null
          entrep_id: string
          extension_granted: boolean | null
          granted_bonus: number | null
          id: string
          is_completed: boolean | null
          manager_id: string
          notes: string | null
          rating: number | null
          second_check_date: string | null
        }
        Insert: {
          actual_check_date?: string | null
          bonus_currency?: string | null
          entrep_id: string
          extension_granted?: boolean | null
          granted_bonus?: number | null
          id: string
          is_completed?: boolean | null
          manager_id: string
          notes?: string | null
          rating?: number | null
          second_check_date?: string | null
        }
        Update: {
          actual_check_date?: string | null
          bonus_currency?: string | null
          entrep_id?: string
          extension_granted?: boolean | null
          granted_bonus?: number | null
          id?: string
          is_completed?: boolean | null
          manager_id?: string
          notes?: string | null
          rating?: number | null
          second_check_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_checks_entrep_id_fkey"
            columns: ["entrep_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_checks_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "supplies_transaction"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_checks_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          }
        ]
      }
      inventory_request: {
        Row: {
          created_at: string
          id: string
          is_completed: boolean | null
          item: string
          notes: string
          quantity: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id: string
          is_completed?: boolean | null
          item?: string
          notes: string
          quantity: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_completed?: boolean | null
          item?: string
          notes?: string
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_request_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      locations: {
        Row: {
          access_means: string | null
          city: string | null
          communications: string | null
          country: string
          country_code: string
          created_at: string | null
          created_by: string | null
          display_name: string
          distance_ov_km: number | null
          id: string
          lat1: number
          lat2: number
          lon1: number
          lon2: number
          main_activity: string | null
          payment_options: string | null
          population: number | null
          state: string
          town: string | null
          water_problems: string | null
          water_source: string | null
        }
        Insert: {
          access_means?: string | null
          city?: string | null
          communications?: string | null
          country: string
          country_code: string
          created_at?: string | null
          created_by?: string | null
          display_name: string
          distance_ov_km?: number | null
          id: string
          lat1: number
          lat2: number
          lon1: number
          lon2: number
          main_activity?: string | null
          payment_options?: string | null
          population?: number | null
          state: string
          town?: string | null
          water_problems?: string | null
          water_source?: string | null
        }
        Update: {
          access_means?: string | null
          city?: string | null
          communications?: string | null
          country?: string
          country_code?: string
          created_at?: string | null
          created_by?: string | null
          display_name?: string
          distance_ov_km?: number | null
          id?: string
          lat1?: number
          lat2?: number
          lon1?: number
          lon2?: number
          main_activity?: string | null
          payment_options?: string | null
          population?: number | null
          state?: string
          town?: string | null
          water_problems?: string | null
          water_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      managed_by: {
        Row: {
          created_at: string | null
          entrep_id: string
          location_id: string | null
          manager_id: string
        }
        Insert: {
          created_at?: string | null
          entrep_id: string
          location_id?: string | null
          manager_id: string
        }
        Update: {
          created_at?: string | null
          entrep_id?: string
          location_id?: string | null
          manager_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "managed_by_entrep_id_fkey"
            columns: ["entrep_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "managed_by_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "managed_by_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          }
        ]
      }
      manager: {
        Row: {
          country_code: string
          created_at: string | null
          email: string
          id: string
        }
        Insert: {
          country_code?: string
          created_at?: string | null
          email: string
          id: string
        }
        Update: {
          country_code?: string
          created_at?: string | null
          email?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "manager_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      news: {
        Row: {
          created_at: string | null
          id: number
          image: string | null
          text: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          image?: string | null
          text?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          id?: number
          image?: string | null
          text?: string | null
          title?: string
        }
        Relationships: []
      }
      nonbuyer_interaction: {
        Row: {
          added_by: string | null
          comments: string | null
          created_at: string | null
          customer_id: string | null
          has_alternative: boolean | null
          id: string
          is_interested: boolean | null
          latitude: number | null
          longitude: number | null
          reason_not_to_buy: string | null
          which_alternative: string | null
          why_no_interest: string | null
        }
        Insert: {
          added_by?: string | null
          comments?: string | null
          created_at?: string | null
          customer_id?: string | null
          has_alternative?: boolean | null
          id: string
          is_interested?: boolean | null
          latitude?: number | null
          longitude?: number | null
          reason_not_to_buy?: string | null
          which_alternative?: string | null
          why_no_interest?: string | null
        }
        Update: {
          added_by?: string | null
          comments?: string | null
          created_at?: string | null
          customer_id?: string | null
          has_alternative?: boolean | null
          id?: string
          is_interested?: boolean | null
          latitude?: number | null
          longitude?: number | null
          reason_not_to_buy?: string | null
          which_alternative?: string | null
          why_no_interest?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nonbuyer_interaction_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nonbuyer_interaction_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer"
            referencedColumns: ["id"]
          }
        ]
      }
      notification: {
        Row: {
          created_at: string
          id: number
          sent_by: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          sent_by?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          sent_by?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_sent_by_fkey"
            columns: ["sent_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          age_year: number | null
          country: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          gender: string | null
          id: string
          is_complete: boolean
          last_name: string | null
          phone: string | null
          profile_picture: string | null
        }
        Insert: {
          age_year?: number | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id: string
          is_complete?: boolean
          last_name?: string | null
          phone?: string | null
          profile_picture?: string | null
        }
        Update: {
          age_year?: number | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          is_complete?: boolean
          last_name?: string | null
          phone?: string | null
          profile_picture?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sale_filter_ids: {
        Row: {
          filter_id: string
          sale_id: string
        }
        Insert: {
          filter_id: string
          sale_id: string
        }
        Update: {
          filter_id?: string
          sale_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sale_filter_ids_filter_id_fkey"
            columns: ["filter_id"]
            isOneToOne: false
            referencedRelation: "filter_ids"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_filter_ids_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "filter_sales"
            referencedColumns: ["id"]
          }
        ]
      }
      supplies_transaction: {
        Row: {
          entrep_id: string
          id: string
          item: string
          manager_id: string
          notes: string | null
          quantity: number
          schedule_check_date: string
          transaction_date: string | null
          type: string
        }
        Insert: {
          entrep_id: string
          id: string
          item: string
          manager_id: string
          notes?: string | null
          quantity: number
          schedule_check_date: string
          transaction_date?: string | null
          type?: string
        }
        Update: {
          entrep_id?: string
          id?: string
          item?: string
          manager_id?: string
          notes?: string | null
          quantity?: number
          schedule_check_date?: string
          transaction_date?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplies_transaction_entrep_id_fkey"
            columns: ["entrep_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplies_transaction_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "manager"
            referencedColumns: ["id"]
          }
        ]
      }
      transaction_confirmations: {
        Row: {
          confirmation_date: string | null
          entrep_id: string
          id: number
          notes: string | null
          transaction_id: string
        }
        Insert: {
          confirmation_date?: string | null
          entrep_id: string
          id?: number
          notes?: string | null
          transaction_id: string
        }
        Update: {
          confirmation_date?: string | null
          entrep_id?: string
          id?: number
          notes?: string | null
          transaction_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_confirmations_entrep_id_fkey"
            columns: ["entrep_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_confirmations_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "supplies_transaction"
            referencedColumns: ["id"]
          }
        ]
      }
      water_q: {
        Row: {
          added_by: string | null
          cost_comment: string | null
          cost_of_water_month: number | null
          created_at: string | null
          general_water_problems: string | null
          id: string
          latitude: number | null
          longitude: number | null
          people_below_5yo: number | null
          people_in_household: number | null
          sick_comments: string | null
          sick_past30d: string | null
          treatment: string | null
          treatment_boiling: string | null
          treatment_how: string | null
          water_source: string[] | null
        }
        Insert: {
          added_by?: string | null
          cost_comment?: string | null
          cost_of_water_month?: number | null
          created_at?: string | null
          general_water_problems?: string | null
          id: string
          latitude?: number | null
          longitude?: number | null
          people_below_5yo?: number | null
          people_in_household?: number | null
          sick_comments?: string | null
          sick_past30d?: string | null
          treatment?: string | null
          treatment_boiling?: string | null
          treatment_how?: string | null
          water_source?: string[] | null
        }
        Update: {
          added_by?: string | null
          cost_comment?: string | null
          cost_of_water_month?: number | null
          created_at?: string | null
          general_water_problems?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          people_below_5yo?: number | null
          people_in_household?: number | null
          sick_comments?: string | null
          sick_past30d?: string | null
          treatment?: string | null
          treatment_boiling?: string | null
          treatment_how?: string | null
          water_source?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "water_q_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "water_q_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "filter_sales"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_entrepreneur_managed_by: {
        Args: {
          uid: string
          manager_uuid: string
        }
        Returns: boolean
      }
      is_manager_uid: {
        Args: {
          uid: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
