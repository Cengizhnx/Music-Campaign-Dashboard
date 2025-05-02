import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const campaignsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase.from("campaigns").select("*");
    if (error) throw new Error(error.message);
    return data;
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        brand: z.string(),
        start_date: z.string(),
        end_date: z.string(),
        budget: z.string(),
        description: z.string(),
        image_url: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase.from("campaigns").insert(input);
      if (error) throw new Error(error.message);
      return { success: true };
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        brand: z.string(),
        start_date: z.string(),
        end_date: z.string(),
        budget: z.string(),
        description: z.string(),
        image_url: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...rest } = input;
      const { error } = await ctx.supabase
        .from("campaigns")
        .update(rest)
        .eq("id", id);

      if (error) throw new Error(error.message);
      return { success: true };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from("campaigns")
        .delete()
        .eq("id", input.id);
      if (error) throw new Error(error.message);
      return { success: true };
    }),
});
