import { prisma } from "@/server/db";

export async function getRute(id: string) {
  const rute = await prisma.rute.findUnique({
    where: {
      id,
    },
    include: {
      locations: true,
    },
  });

  return rute;
}
