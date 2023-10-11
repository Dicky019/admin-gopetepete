import CardRuteForm from "~/components/cards/rute-card-form";

import { getRute } from "~/server/rute/get";

export default async function Edit({ params }: { params: { slug: string } }) {
  const rute = await getRute(params.slug);
  return (
    <div className="w-full flex justify-center">
      <CardRuteForm data={rute} />
    </div>
  );
}
