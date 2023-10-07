"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";

export default function Home() {
  const { data, isLoading, isError, refetch } =
    api.auth.getSecretToken.useQuery();

  if (isLoading) {
    return "loading";
  }
  if (isError) {
    return "error";
  }

  return (
    <main className="container mx-auto my-10">
      <Button variant="secondary" onClick={void refetch}>
        Tes {data}
      </Button>
    </main>
  );
}
