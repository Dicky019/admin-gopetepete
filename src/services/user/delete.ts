import { prisma } from "@/server/db";

export async function deleteUser(id: string) {
  const rutes = await prisma.user.delete({
    where: { id },
  });

  return rutes;
}
