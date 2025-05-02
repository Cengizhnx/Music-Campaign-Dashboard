import { initTRPC } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { supabase } from "@/lib/supabase";

export const createContext = async (_opts: CreateNextContextOptions) => ({
  supabase,
});
const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
