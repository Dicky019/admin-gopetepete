import { Icons } from "@/components/icons";

export default function Loading() {
  return (
    <div className="w-full flex justify-center my-40">
    <Icons.spinner className="h-10 w-10 animate-spin" />
  </div>
  )
}
