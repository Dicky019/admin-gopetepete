"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RuteForm } from "./rute-form";
import { IRuteUpdate } from "@/types/rute";
import { trpc } from "@/app/_trpc/client";

interface CardRuteFormProps {
  data?: IRuteUpdate;
}

export default function CardRuteForm({ data }: CardRuteFormProps) {
  const { mutateAsync: createMutate, isLoading: isLoadingCreate } =
    trpc.rute.create.useMutation();
  const { mutateAsync: updateMutate, isLoading: isLoadingUpdate } =
    trpc.rute.update.useMutation();

  const onMutate = async (value: IRuteUpdate) => {
    data ? await updateMutate(value) : await createMutate(value);
  };

  return (
    <Card className="max-w-max">
      <CardHeader>
        <CardTitle>{data ? "Edit Rute" : "Add Rute"}</CardTitle>
        <CardDescription>
          Make changes to here form. Click save when you&apos;re done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RuteForm
          data={data}
          onMutate={onMutate}
          isLoading={data ? isLoadingUpdate : isLoadingCreate}
        />
      </CardContent>
    </Card>
  );
}
