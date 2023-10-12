import { userColumns } from "@/components/table/user/columns";
import { TabsTable } from "@/components/tabs-table";
import { IUsers } from "@/types/user";

interface UsersProps {
  all: IUsers;
  todays: IUsers;
}

export default function Users(props: UsersProps) {
  return <TabsTable columns={userColumns} searchKey="name" {...props} />;
}
