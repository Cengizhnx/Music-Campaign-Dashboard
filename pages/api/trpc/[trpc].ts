import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@/src/server/api/root";
import { createContext } from "@/src/server/api/trpc";

export default createNextApiHandler({
  router: appRouter,
  createContext,
});
