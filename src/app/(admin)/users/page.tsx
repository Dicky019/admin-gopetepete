import { Metadata } from "next/types";
import { serverClient } from "@/utils/server";
import Users from "@/components/page/user";

export const metadata: Metadata = {
  title: "Users",
  description: "Authentication forms built using the components.",
};

export default async function Page() {
  const trpc = await serverClient();
  const users = await trpc.user.getAll();
  return <Users {...users} />;
}
