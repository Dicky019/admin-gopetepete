import { prisma } from "@/server/db";
import { Prisma } from "@prisma/client";

interface GetRuteByUniqueInput {
  where: Prisma.RuteWhereUniqueInput;
}
interface GetRuteById {
  id: string;
}

type GetRuteProps = GetRuteByUniqueInput | GetRuteById;

export async function getRute(props: GetRuteProps) {
  const id = (props as GetRuteById).id;
  const where = (props as GetRuteByUniqueInput).where;

  const rute = await prisma.rute.findUnique({
    where: {
      id,
      ...where,
    },
    include: {
      locations: true,
    },
  });

  return rute;
}
