import { Metadata } from "next/types";
import { serverClient } from "@/app/_trpc/server";
import Drivers from "@/components/page/driver";

export const metadata: Metadata = {
  title: "Drivers",
  description: "Authentication forms built using the components.",
};

export default async function Page() {
  const trpc = await serverClient();
  const drivers = await trpc.driver.getAll();
  return <Drivers {...drivers} />;
}
