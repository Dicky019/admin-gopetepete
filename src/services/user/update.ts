import { prisma } from "@/server/db";

export async function updateStatusUser(id: string, status: boolean) {
  const driver = await prisma.user.update({
    where: { id },
    data: {
      status: status,
    },
  });

  return driver;
}
