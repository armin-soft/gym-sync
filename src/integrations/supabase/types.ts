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
      app_metadata: {
        Row: {
          appName: string | null
          created: string | null
          created_at: string | null
          id: number
          updated_at: string | null
          version: string | null
        }
        Insert: {
          appName?: string | null
          created?: string | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          appName?: string | null
          created?: string | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
          version?: string | null
        }
        Relationships: []
      }
      exercise_categories: {
        Row: {
          created_at: string | null
          id: number
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: number
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      exercise_types: {
        Row: {
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      exercises: {
        Row: {
          categoryId: number | null
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          categoryId?: number | null
          created_at?: string | null
          id: number
          name: string
          updated_at?: string | null
        }
        Update: {
          categoryId?: number | null
          created_at?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercises_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "exercise_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      meals: {
        Row: {
          created_at: string | null
          day: string | null
          description: string | null
          id: number
          name: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day?: string | null
          description?: string | null
          id: number
          name: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day?: string | null
          description?: string | null
          id?: number
          name?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      student_exercises: {
        Row: {
          created_at: string | null
          exercise_id: number
          id: number
          student_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          exercise_id: number
          id?: number
          student_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          exercise_id?: number
          id?: number
          student_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_exercises_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_exercises_day1: {
        Row: {
          created_at: string | null
          exercise_id: number
          id: number
          student_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          exercise_id: number
          id?: number
          student_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          exercise_id?: number
          id?: number
          student_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_exercises_day1_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_exercises_day2: {
        Row: {
          created_at: string | null
          exercise_id: number
          id: number
          student_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          exercise_id: number
          id?: number
          student_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          exercise_id?: number
          id?: number
          student_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_exercises_day2_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_exercises_day3: {
        Row: {
          created_at: string | null
          exercise_id: number
          id: number
          student_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          exercise_id: number
          id?: number
          student_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          exercise_id?: number
          id?: number
          student_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_exercises_day3_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_exercises_day4: {
        Row: {
          created_at: string | null
          exercise_id: number
          id: number
          student_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          exercise_id: number
          id?: number
          student_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          exercise_id?: number
          id?: number
          student_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_exercises_day4_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_meals: {
        Row: {
          created_at: string | null
          id: number
          meal_id: number
          student_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          meal_id: number
          student_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          meal_id?: number
          student_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_meals_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_supplements: {
        Row: {
          created_at: string | null
          id: number
          student_id: number | null
          supplement_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          student_id?: number | null
          supplement_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          student_id?: number | null
          supplement_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_supplements_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_vitamins: {
        Row: {
          created_at: string | null
          id: number
          student_id: number | null
          updated_at: string | null
          vitamin_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          student_id?: number | null
          updated_at?: string | null
          vitamin_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          student_id?: number | null
          updated_at?: string | null
          vitamin_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "student_vitamins_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          age: string | null
          created_at: string | null
          gender: string | null
          grade: string | null
          group: string | null
          height: string | null
          id: number
          image: string | null
          lastUpdate: string | null
          name: string
          payment: string | null
          phone: string | null
          updated_at: string | null
          weight: string | null
        }
        Insert: {
          age?: string | null
          created_at?: string | null
          gender?: string | null
          grade?: string | null
          group?: string | null
          height?: string | null
          id: number
          image?: string | null
          lastUpdate?: string | null
          name: string
          payment?: string | null
          phone?: string | null
          updated_at?: string | null
          weight?: string | null
        }
        Update: {
          age?: string | null
          created_at?: string | null
          gender?: string | null
          grade?: string | null
          group?: string | null
          height?: string | null
          id?: number
          image?: string | null
          lastUpdate?: string | null
          name?: string
          payment?: string | null
          phone?: string | null
          updated_at?: string | null
          weight?: string | null
        }
        Relationships: []
      }
      supplements: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          dosage: string | null
          id: number
          name: string
          timing: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          dosage?: string | null
          id: number
          name: string
          timing?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          dosage?: string | null
          id?: number
          name?: string
          timing?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      trainer_profile: {
        Row: {
          bio: string | null
          created_at: string | null
          email: string | null
          gymAddress: string | null
          gymDescription: string | null
          gymName: string | null
          id: number
          image: string | null
          instagram: string | null
          name: string | null
          password: string | null
          phone: string | null
          price: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email?: string | null
          gymAddress?: string | null
          gymDescription?: string | null
          gymName?: string | null
          id?: number
          image?: string | null
          instagram?: string | null
          name?: string | null
          password?: string | null
          phone?: string | null
          price?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string | null
          gymAddress?: string | null
          gymDescription?: string | null
          gymName?: string | null
          id?: number
          image?: string | null
          instagram?: string | null
          name?: string | null
          password?: string | null
          phone?: string | null
          price?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      vitamins: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          updated_at?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
