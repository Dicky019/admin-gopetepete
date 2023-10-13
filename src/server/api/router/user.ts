import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { getsUser } from "@/services/user/gets";
import { updateStatusUser } from "@/services/user/update";
import { z } from "zod";
import { userChangeStatusSchema } from "@/schemas/user";
import { deleteUser } from "@/services/user/delete";
import { createUser } from "@/services/user/create";

export const userRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    const lastDay = Date.now() - 24 * 60 * 60 * 1000;

    const whereGetToday: Prisma.UserWhereInput = {
      createdAt: {
        gte: new Date(lastDay).toISOString(),
      },
    };

    const getAllPromise = getsUser();
    const getTodayPromise = getsUser(whereGetToday);

    const [getAll, getToday] = await Promise.all([
      getAllPromise,
      getTodayPromise,
    ]);

    return {
      all: getAll,
      todays: getToday,
    };
  }),

  create: protectedProcedure.mutation(() => {
    return createUser({ data: undefined });
  }),

  changeStatus: protectedProcedure
    .input(userChangeStatusSchema)
    .mutation(({ input: { id, status } }) => {
      return updateStatusUser(id, status);
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ input }) => {
    return deleteUser(input);
  }),
});
