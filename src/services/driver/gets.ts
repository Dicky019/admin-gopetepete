import { prisma } from "@/server/db";
import { Driver, Rute, User, UserRole } from "@prisma/client";
import { Prisma } from "@prisma/client";

export async function getDrivers(
  where: Prisma.DriverWhereInput | undefined = undefined
) {
  const drivers = await prisma.driver.findMany({
    include: {
      user: true,
      rute: true,
    },
    where,
  });

  return drivers;
}

export type MappingDriversProps = ({
  user: User;
  rute?: Rute;
} & Driver)[];

export const mappingDrivers = (values: MappingDriversProps) => {
  return values.map(({ user, ...v }) => ({
    ...v,
    status: user?.status ? "done" : "canceled",
    user: {
      id: user?.id ?? "",
      email: user?.email ?? "",
      name: user?.name ?? "",
      // password: user?.password ?? "",
      role: user?.role ?? UserRole.driver,
      createdAt: user?.createdAt ?? new Date(),
      updatedAt: user?.updatedAt ?? new Date(),
    },
  }));
};
