import { prisma } from "@/server/db";
import { IRute } from "@/types/rute";

export async function deleteRute(id: string) {
  const rute = await prisma.rute.delete({
    where: { id },
    include: {
      locations: true,
    },
  });

  return rute;
}
