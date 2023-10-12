"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/icons";
import { type IRute, IRuteCreate } from "@/types/rute";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { ruteCreateSchema } from "@/schemas/rute";

type RuteFormProps = {
  data?: IRute;
} & React.HTMLAttributes<HTMLDivElement>;

export function RuteForm({ className, data, ...props }: RuteFormProps) {
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const kodeStart = "Kode ";

  const form = useForm<IRuteCreate>({
    resolver: zodResolver(ruteCreateSchema),
    defaultValues: {
      ...data,
      kode: data?.kode.replace(kodeStart, ""),
      locations: data?.locations ?? [
        {
          id: "",
          latAwal: "",
          latAkhir: "",
          longAwal: "",
          longAkhir: "",
        },
      ],
    },
  });

  const locationsForm = useFieldArray({
    control: form.control,
    name: "locations",
  });

  const addLocation = () => {
    locationsForm.append({
      id: "",
      latAwal: "",
      latAkhir: "",
      longAwal: "",
      longAkhir: "",
    });
  };

  const deleteLocation = (index: number) => {
    locationsForm.remove(index);
  };

  // 2. Define a submit handler.
  function onSubmit(values: IRuteCreate) {
    startTransition(async () => {
      try {
        const { kode, ...dataWithOutKode } = values;
        console.log("Locations", values.locations);

        const rute = {
          kode: kodeStart + kode,
          ...dataWithOutKode,
        };

        if (data) {
          // await editRute({ data: { id: data.id, ...rute } });
          toast.success("Successfully Edit!");
          return;
        }
        // await createRute(rute);
        toast.success("Successfully Create!");
      } catch (error) {
        toast.error("There is something wrong!");
      }
    });
  }

  const resetForm = () => form.reset();

  return (
    <div className={cn("grid gap-6 max-w-96", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex mb-2 gap-x-2">
              <FormField
                control={form.control}
                name="color"
                defaultValue="#000000"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input type="color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kode"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Kode</FormLabel>
                    <FormControl>
                      <Input placeholder="A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location Awal */}
            <div className="flex flex-col mb-2 gap-y-2">
              {/* <pre>{JSON.stringify(locationsForm.fields, null, 2)}</pre> */}
              {locationsForm.fields.map((_, index) => {
                return (
                  <Card key={index} className="rounded-sm">
                    {/* <div className="absolute"> */}
                    <div className="flex justify-between items-center pl-2">
                      <Label>Rute {index + 1} </Label>
                      <Button
                        onClick={() => deleteLocation(index)}
                        variant="ghost"
                        size="icon"
                      >
                        <TiDeleteOutline className="h-4 w-4" />
                      </Button>
                    </div>
                    {/* </div> */}
                    <RuteAwal index={index} />
                    <RuteAkhir index={index} />
                  </Card>
                );
              })}
              <Button
                disabled={isPending}
                variant="secondary"
                onClick={addLocation}
              >
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Add Rute
              </Button>
            </div>

            <div className="flex flex-col gap-4 my-4">
              <Button disabled={isPending} type="submit">
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>

              <Button
                disabled={isPending}
                variant="outline"
                onClick={resetForm}
                type="button"
              >
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Clear
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

function RuteAwal({ index }: { index: number }) {
  return (
    <div className="flex px-2 pb-2 gap-x-2">
      <FormField
        name={`locations.${index}.latAwal`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Lat</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`locations.${index}.longAwal`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Long</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function RuteAkhir({ index }: { index: number }) {
  return (
    <div className="flex px-2 pb-2 gap-x-2">
      <FormField
        name={`locations.${index}.latAkhir`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Lat</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name={`locations.${index}.longAkhir`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Long</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
