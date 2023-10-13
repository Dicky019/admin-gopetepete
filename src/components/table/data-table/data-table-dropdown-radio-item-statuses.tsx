// import { AlertDialogContentDelete } from "@/components/alerts/delete-alerts";
// import { AlertDialogContentUpdate } from "@/components/alerts/update-alerts";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { statuses } from "@/lib/data";
import { Rute } from "@prisma/client";

export const DropdownMenuRadioItemStatuses = ({
  status,
  onClick,
}: {
  status: string;
  onClick: () => Promise<void>;
}) => (
  <DropdownMenuRadioGroup value={status}>
    {statuses.map((label) => (
      <DropdownMenuRadioItem key={label.value} value={label.value}>
        {label.label}
      </DropdownMenuRadioItem>
    ))}
  </DropdownMenuRadioGroup>
);

interface DropdownMenuRadioItemRutesProps {
  list: Rute[];
  name: string;
  onChangeRuteDriver: (ruteId: string) => Promise<void>;
}

export function DropdownMenuRadioItemRutes({
  name,
  list,
  onChangeRuteDriver,
}: DropdownMenuRadioItemRutesProps) {
  return (
    <DropdownMenuRadioGroup value={name}>
      {list.map((label) => (
        <DropdownMenuRadioItem
          onClick={async () => await onChangeRuteDriver(label.id)}
          key={label.id}
          disabled={name === label.name}
          value={label.name}
        >
          {label.name}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );
}
