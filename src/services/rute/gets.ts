import { prisma } from "@/server/db";
import { Prisma } from "@prisma/client";

export async function getsRute(
  where: Prisma.RuteWhereInput | undefined = undefined
) {
  const rutes = await prisma.rute.findMany({
    include: {
      locations: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    where,
  });

  return rutes;
}
