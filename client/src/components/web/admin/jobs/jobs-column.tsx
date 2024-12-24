import { ColumnDef } from "@tanstack/react-table";
import JobsOptions from "./jobs-options";

interface JobsType {
  _id: string;
  name: string;
  title: string;
  createdAt: string;
}

export const JobsColumn: ColumnDef<JobsType>[] = [
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
      return <JobsOptions id={row.original._id} />;
    },
  },
];
