import { UserRole } from "@prisma/client";
import { prisma } from "@/server/db";

export async function getsUser() {
  const users = await prisma.user.findMany({
    where: {
      role: UserRole.passenger,
    },
  });

  return users;
}
