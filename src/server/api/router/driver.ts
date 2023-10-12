import {
  MappingDriversProps,
  getDrivers,
  mappingDrivers,
} from "@/services/driver/gets";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Prisma } from "@prisma/client";

export const driverRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    const lastDay = Date.now() - 24 * 60 * 60 * 1000;

    const whereGetToday: Prisma.DriverWhereInput = {
      user: {
        createdAt: {
          gte: new Date(lastDay).toISOString(),
        },
      },
    };
    const getAllPromise = getDrivers();
    const getTodayPromise = getDrivers(whereGetToday);

    const [getAll, getToday] = await Promise.all([
      getAllPromise,
      getTodayPromise,
    ]);

    return {
      all: mappingDrivers(getAll as MappingDriversProps),
      todays: mappingDrivers(getToday as MappingDriversProps),
    };
  }),
});
