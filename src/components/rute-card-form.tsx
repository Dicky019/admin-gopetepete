import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RuteForm } from "./rute-form";
import { IRute } from "@/types/rute";

interface CardRuteFormProps {
  data?: IRute;
}

export default function CardRuteForm({ data }: CardRuteFormProps) {
  return (
    <Card className="max-w-max">
      <CardHeader>
        <CardTitle>{data ? "Edit Rute" : "Add Rute"}</CardTitle>
        <CardDescription>
          Make changes to here form. Click save when you&apos;re done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RuteForm data={data} />
      </CardContent>
    </Card>
  );
}
