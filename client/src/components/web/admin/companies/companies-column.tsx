import { ColumnDef } from "@tanstack/react-table";
import CompaniesOptions from "./companies-options";

interface CompaniesType {
  _id: string;
  name: string;
  title: string;
  createdAt: string;
}

export const CompaniesColumn: ColumnDef<CompaniesType>[] = [
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "title",
    header: "Role",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      return <CompaniesOptions id={row.original._id} />;
    },
  },
];
