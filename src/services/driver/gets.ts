import { prisma } from "@/server/db";

export async function getDrivers() {
  const drivers = await prisma.driver.findMany({
    include: {
      user: true,
    },
  });

  return drivers;
}
