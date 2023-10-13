import CardRuteForm from "@/components/rute-card-form";
import { serverClient } from "@/app/_trpc/server";
import { Metadata } from "next";
import { IRuteEdit } from "@/types/rute";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.slug;
  const trpc = await serverClient();
  const rute = await trpc.rute.get({ id });

  return {
    title: rute?.name ?? "edit",
  };
}

export default async function Edit({ params }: Props) {
  const trpc = await serverClient();
  const rute = await trpc.rute.get({ id: params.slug });
  return (
    <div className="w-full flex justify-center">
      <CardRuteForm data={rute as IRuteEdit} />
    </div>
  );
}
