import { ColumnDef } from "@tanstack/react-table";
import CompaniesOptions from "./companies-options";

interface CompanyDataType {
  _id: string;
  name: string;
  website: string;
  location: string;
}

export const CompaniesColumn: ColumnDef<CompanyDataType>[] = [
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    accessorKey: "location",
    header: "Location",
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
