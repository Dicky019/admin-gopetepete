
import { prisma } from "@/server/db";
import { IRute } from "@/types/rute";

export async function getRute(id: string) {
  const rute = await prisma.rute.findUnique({
    where: {
      id,
    },
    include: {
      locations: true,
    },
  });

  return rute as IRute;
}
