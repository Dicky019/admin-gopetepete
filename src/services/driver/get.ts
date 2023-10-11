import { prisma } from "@/server/db";

export async function getDriver(id: string) {
  const drivers = await prisma.driver.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  return drivers;
}
