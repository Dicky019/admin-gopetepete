import { DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { statuses } from "@/lib/data";

export const DropdownMenuRadioItemStatuses = ({
    status,
}: {
    status: string;
}) => (
    <DropdownMenuRadioGroup value={status}>
        {statuses.map((label) =>
            label.value !== status ? (
                <DialogTrigger key={label.value} id="update" asChild>
                    <DropdownMenuRadioItem value={label.value}>
                        {label.label}
                    </DropdownMenuRadioItem>
                </DialogTrigger>
            ) : (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                    {label.label}
                </DropdownMenuRadioItem>
            )
        )}
    </DropdownMenuRadioGroup>
);
