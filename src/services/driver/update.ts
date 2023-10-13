import { prisma } from "@/server/db";
import { IDriverEdit } from "@/types/driver";

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

export async function updateRute(id: string, ruteId: string) {
  const driver = await prisma.driver.update({
    where: { id },
    data: {
      ruteId: ruteId,
    },
    select : {rute : true,namaLengkap : true}
  });

  return driver;
}

