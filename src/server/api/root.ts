import { router } from "./trpc";
import { campaignsRouter } from "./routers/campaign";

export const appRouter = router({
  campaigns: campaignsRouter,
});

export type AppRouter = typeof appRouter;
