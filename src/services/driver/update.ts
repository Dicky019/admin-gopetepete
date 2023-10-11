import { prisma } from "@/server/db";
import { IDriverEdit } from "@/types/driver";

export async function updateStatusDriver(id: string, status: boolean) {
  const driver = await prisma.user.update({
    where: { id },
    data: {
      status: status,
    },
  });

  return driver;
}

export async function updateDriver(data: IDriverEdit) {
  const { user, id, ...driver } = data;

  await prisma.user.update({
    where: {
      driverId: id,
    },
    data: user,
  });

  const result = await prisma.driver.update({
    where: { id },
    data: driver,
    include: {
      user: true,
    },
  });

  return result;
}
