import { ColumnDef } from "@tanstack/react-table";
import ApplicantsOptions from "./applicants-options";

interface ApplicantsType {
  _id: string;
  name: string;
  title: string;
  createdAt: string;
}

export const ApplicantsColumn: ColumnDef<ApplicantsType>[] = [
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
      return <ApplicantsOptions id={row.original._id} />;
    },
  },
];
