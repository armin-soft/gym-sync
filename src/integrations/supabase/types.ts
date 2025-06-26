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
      exercise_categories: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          trainer_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          trainer_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          trainer_id?: string | null
        }
        Relationships: []
      }
      exercise_types: {
        Row: {
          category_id: number | null
          created_at: string
          description: string | null
          id: number
          name: string
          trainer_id: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name: string
          trainer_id?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          trainer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercise_types_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "exercise_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          category_id: number | null
          created_at: string
          description: string | null
          difficulty_level: string | null
          equipment: string | null
          id: number
          muscle_groups: string | null
          name: string
          trainer_id: string | null
          type_id: number | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          equipment?: string | null
          id?: number
          muscle_groups?: string | null
          name: string
          trainer_id?: string | null
          type_id?: number | null
        }
        Update: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          equipment?: string | null
          id?: number
          muscle_groups?: string | null
          name?: string
          trainer_id?: string | null
          type_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "exercises_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "exercise_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "exercise_types"
            referencedColumns: ["id"]
          },
        ]
      }
      meals: {
        Row: {
          calories: number | null
          carbs: number | null
          created_at: string
          description: string | null
          fat: number | null
          id: number
          ingredients: string | null
          name: string
          preparation_time: number | null
          protein: number | null
          trainer_id: string | null
          type: string
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          created_at?: string
          description?: string | null
          fat?: number | null
          id?: number
          ingredients?: string | null
          name: string
          preparation_time?: number | null
          protein?: number | null
          trainer_id?: string | null
          type: string
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          created_at?: string
          description?: string | null
          fat?: number | null
          id?: number
          ingredients?: string | null
          name?: string
          preparation_time?: number | null
          protein?: number | null
          trainer_id?: string | null
          type?: string
        }
        Relationships: []
      }
      student_exercises: {
        Row: {
          created_at: string
          day_number: number
          exercise_id: number | null
          id: string
          notes: string | null
          reps: string | null
          rest_time: string | null
          sets: number | null
          student_id: number | null
          weight: string | null
        }
        Insert: {
          created_at?: string
          day_number: number
          exercise_id?: number | null
          id?: string
          notes?: string | null
          reps?: string | null
          rest_time?: string | null
          sets?: number | null
          student_id?: number | null
          weight?: string | null
        }
        Update: {
          created_at?: string
          day_number?: number
          exercise_id?: number | null
          id?: string
          notes?: string | null
          reps?: string | null
          rest_time?: string | null
          sets?: number | null
          student_id?: number | null
          weight?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_exercises_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_meals: {
        Row: {
          created_at: string
          day_number: number
          id: string
          meal_id: number | null
          meal_time: string | null
          notes: string | null
          portion_size: string | null
          student_id: number | null
        }
        Insert: {
          created_at?: string
          day_number: number
          id?: string
          meal_id?: number | null
          meal_time?: string | null
          notes?: string | null
          portion_size?: string | null
          student_id?: number | null
        }
        Update: {
          created_at?: string
          day_number?: number
          id?: string
          meal_id?: number | null
          meal_time?: string | null
          notes?: string | null
          portion_size?: string | null
          student_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_meals_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
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
          created_at: string
          day_number: number
          dosage: string | null
          id: string
          notes: string | null
          student_id: number | null
          supplement_id: number | null
          timing: string | null
        }
        Insert: {
          created_at?: string
          day_number: number
          dosage?: string | null
          id?: string
          notes?: string | null
          student_id?: number | null
          supplement_id?: number | null
          timing?: string | null
        }
        Update: {
          created_at?: string
          day_number?: number
          dosage?: string | null
          id?: string
          notes?: string | null
          student_id?: number | null
          supplement_id?: number | null
          timing?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_supplements_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_supplements_supplement_id_fkey"
            columns: ["supplement_id"]
            isOneToOne: false
            referencedRelation: "supplements"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          age: string | null
          created_at: string
          gender: string | null
          grade: string | null
          group_name: string | null
          height: string | null
          id: number
          image: string | null
          name: string
          payment: string | null
          phone: string
          progress: number | null
          trainer_id: string | null
          updated_at: string
          weight: string | null
        }
        Insert: {
          age?: string | null
          created_at?: string
          gender?: string | null
          grade?: string | null
          group_name?: string | null
          height?: string | null
          id?: number
          image?: string | null
          name: string
          payment?: string | null
          phone: string
          progress?: number | null
          trainer_id?: string | null
          updated_at?: string
          weight?: string | null
        }
        Update: {
          age?: string | null
          created_at?: string
          gender?: string | null
          grade?: string | null
          group_name?: string | null
          height?: string | null
          id?: number
          image?: string | null
          name?: string
          payment?: string | null
          phone?: string
          progress?: number | null
          trainer_id?: string | null
          updated_at?: string
          weight?: string | null
        }
        Relationships: []
      }
      supplement_categories: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          trainer_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          trainer_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          trainer_id?: string | null
        }
        Relationships: []
      }
      supplements: {
        Row: {
          benefits: string | null
          brand: string | null
          category_id: number | null
          created_at: string
          description: string | null
          dosage: string | null
          id: number
          name: string
          timing: string | null
          trainer_id: string | null
        }
        Insert: {
          benefits?: string | null
          brand?: string | null
          category_id?: number | null
          created_at?: string
          description?: string | null
          dosage?: string | null
          id?: number
          name: string
          timing?: string | null
          trainer_id?: string | null
        }
        Update: {
          benefits?: string | null
          brand?: string | null
          category_id?: number | null
          created_at?: string
          description?: string | null
          dosage?: string | null
          id?: number
          name?: string
          timing?: string | null
          trainer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplements_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "supplement_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      trainer_profiles: {
        Row: {
          bio: string | null
          certifications: string | null
          created_at: string
          email: string | null
          experience: string | null
          gym_address: string
          gym_name: string
          id: string
          name: string
          phone: string
          specialties: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          bio?: string | null
          certifications?: string | null
          created_at?: string
          email?: string | null
          experience?: string | null
          gym_address: string
          gym_name: string
          id?: string
          name: string
          phone: string
          specialties?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          bio?: string | null
          certifications?: string | null
          created_at?: string
          email?: string | null
          experience?: string | null
          gym_address?: string
          gym_name?: string
          id?: string
          name?: string
          phone?: string
          specialties?: string | null
          updated_at?: string
          user_id?: string | null
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
