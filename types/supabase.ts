export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      campaigns: {
        Row: {
          id: string;
          title: string;
          brand: string;
          start_date: string;
          end_date: string;
          budget: string;
          description: string;
          image_url: string;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["campaigns"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["campaigns"]["Row"]>;
      };
    };
    Views: {};
    Functions: {};
  };
}
