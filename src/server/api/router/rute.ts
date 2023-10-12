import { getsRute } from "@/services/rute/gets";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { getRute } from "@/services/rute/get";
import { ruteCreateSchema, ruteUpdateSchema } from "@/schemas/rute";
import { createRute } from "@/services/rute/create";
import { updateRute } from "@/services/rute/update";

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

    const [all, todays] = await Promise.all([getAllPromise, getTodayPromise]);

    return {
      all,
      todays,
    };
  }),
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id } }) => {
      return await getRute(id);
    }),
  create: protectedProcedure
    .input(ruteCreateSchema)
    .mutation(async ({ input }) => {
      return await createRute(input);
    }),
  update: protectedProcedure
    .input(ruteUpdateSchema)
    .mutation(async ({ input }) => {
      return await updateRute(input);
    }),
});