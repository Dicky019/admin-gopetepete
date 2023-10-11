"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DataTable, DataTableProps } from "./table/data-table";

interface TabsTableProps<TData, TValue> {
  todays: DataTableProps<TData, TValue>["data"];
  all: DataTableProps<TData, TValue>["data"];
  searchKey: DataTableProps<TData, TValue>["searchKey"];
  columns: DataTableProps<TData, TValue>["columns"];
}

export function TabsTable<TData, TValue>({
  todays,
  all,
  searchKey,
  columns,
}: TabsTableProps<TData, TValue>) {
  return (
    <Tabs defaultValue="today">
      <div className="flex flex-row justify-between">
        <TabsList>
          <TabsTrigger value="today">Today {todays.length}</TabsTrigger>
          <TabsTrigger value="all">All {all.length}</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="today">
        <DataTable
          searchKey={searchKey}
          data={todays}
          columns={columns}
        />
      </TabsContent>
      <TabsContent value="all">
        <DataTable
          searchKey={searchKey}
          data={all}
          columns={columns}
        />
      </TabsContent>
    </Tabs>
  );
}

//
