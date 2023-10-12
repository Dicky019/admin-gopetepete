
import { getsRute } from "@/services/rute/gets";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Prisma } from "@prisma/client";

export const ruteRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    const lastDay = Date.now() - 24 * 60 * 60 * 1000;

    const whereGetToday: Prisma.RuteWhereInput = {
      createdAt: {
        gte: new Date(lastDay).toISOString(),
      },
    };
    
    const getAllPromise = getsRute();
    const getTodayPromise = getsRute(whereGetToday);

    const [all, todays] = await Promise.all([
      getAllPromise,
      getTodayPromise,
    ]);

    return {
      all,
      todays,
    };
  }),
});
