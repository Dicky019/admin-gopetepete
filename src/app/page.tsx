import { Button } from "@/components/ui/button";
import { serverClient } from "@/utils/server";

export default async function Home() {
  const trpc = await serverClient();
  const data = await trpc.auth.getSecretToken();
  return (
    <main className="container mx-auto my-10">
      <Button variant="secondary">Tes {data}</Button>
    </main>
  );
}
