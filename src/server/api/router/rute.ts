import { getsRute } from "@/services/rute/gets";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { getRute } from "@/services/rute/get";
import { ruteCreateSchema, ruteUpdateSchema } from "@/schemas/rute";
import { createRute } from "@/services/rute/create";
import { updateRute } from "@/services/rute/update";
import { deleteRute } from "@/services/rute/delete";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";

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
    .query(({ input }) => {
      return getRute(input);
    }),

  create: protectedProcedure
    .input(ruteCreateSchema)
    .mutation(async ({ input }) => {
      await cekRute(input.kode, input.name);
      return createRute(input);
    }),

  update: protectedProcedure
    .input(ruteUpdateSchema)
    .mutation(async ({ input }) => {
      await cekRute(input.kode, input.name);
      return updateRute(input);
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(({ input }) => deleteRute(input)),
});

const cekRute = async (kode: string, name: string) => {
  const cekKodeWhere: Prisma.RuteWhereUniqueInput = {
    kode: kode,
  };

  const cekNameWhere: Prisma.RuteWhereUniqueInput = {
    name: name,
  };

  const cekKode = await getRute({ where: cekKodeWhere });
  const cekName = await getRute({ where: cekNameWhere });

  if (cekKode || cekName) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Kode ${kode} & Name ${name} ini sudah ada`,
    });
  }

  if (cekKode) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Kode ${kode} ini sudah ada`,
    });
  }

  if (cekName) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Name ${name} ini sudah ada`,
    });
  }
};
