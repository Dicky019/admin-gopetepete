import { Prisma, UserRole } from "@prisma/client";
import { prisma } from "@/server/db";

export async function getsUser(
  where: Prisma.UserWhereInput | undefined = undefined
) {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      role: UserRole.passenger,
      ...where,
    },
  });

  return users;
}
