import { prisma } from "@/server/db";

export async function deleteDriver(id: string) {
  const drivers = await prisma.driver.delete({
    where: { id },
  });


  return drivers;
}
