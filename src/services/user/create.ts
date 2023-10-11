import { prisma } from "@/server/db";
import { IUserCreate } from "@/types/user";
import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";

interface CreateRuteProps {
  data?: IUserCreate;
  isRevalidatePath?: boolean;
}

export async function createUser({ data }: CreateRuteProps) {
  if (!data) {
    const user = await fakerUser();
    return user;
  }

  const user = await prisma.user.create({
    data,
  });

  return user;
}

export const fakerUser = async () => {
  const dataFaker: IUserCreate = {
    email: faker.internet.email(),
    name: faker.internet.displayName(),
    role: "passenger",
    status: faker.datatype.boolean(),
    image: faker.datatype.boolean() ? faker.internet.avatar() : undefined,
  };

  const rute = await prisma.user.create({
    data: dataFaker,
  });

  return rute;
};
