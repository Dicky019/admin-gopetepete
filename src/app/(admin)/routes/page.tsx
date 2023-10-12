import { Metadata } from "next/types";
import { serverClient } from "@/utils/server";
import Rutes from "@/components/page/routes";

export const metadata: Metadata = {
  title: "Routes",
  description: "Authentication forms built using the components.",
};

export default async function Page() {
  const trpc = await serverClient();
  const rutes = await trpc.rute.getAll();
  return <Rutes {...rutes} />;
}
