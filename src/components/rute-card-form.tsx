"use client";
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
import { toast } from "sonner";

interface CardRuteFormProps {
  data?: IRuteUpdate;
}

export default function CardRuteForm({ data }: CardRuteFormProps) {
  const trpcContext = trpc.useContext();

  const { mutateAsync: createMutate, isLoading: isLoadingCreate } =
    trpc.rute.create.useMutation({
      onSettled() {
        trpcContext.rute.getAll.invalidate();
      },
    });

  const { mutateAsync: updateMutate, isLoading: isLoadingUpdate } =
    trpc.rute.update.useMutation({
      onSettled() {
        trpcContext.rute.getAll.invalidate();
      },
    });

  async function updateRute(value: IRuteUpdate) {
      const changeStatus = updateMutate(value);
      toast.promise(changeStatus, {
        loading: "Loading...",
        success: (data) => {
          return `Berhasil update routes ${data.name}`;
        },
        error: "Error",
      });
    }  

  async function createRute(value: IRuteUpdate) {
      const changeStatus = createMutate(value);
      toast.promise(changeStatus, {
        loading: "Loading...",
        success: (data) => {
          return `Berhasil create routes ${data.name}`;
        },
        error: "Error",
      });
    }  

  const onMutate = async (value: IRuteUpdate) => {
    data ? await updateRute(value) : await createRute(value);
  };

  const isLoading = isLoadingUpdate || isLoadingCreate

  return (
    <Card className="max-w-max">
      <CardHeader>
        <CardTitle>{data ? "Edit Routes" : "Add Routes"}</CardTitle>
        <CardDescription>
          Make changes to here form. Click save when you&apos;re done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RuteForm
          data={data}
          onMutate={onMutate}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}
