import { JobType } from "@/store/types";
import { ColumnDef } from "@tanstack/react-table";
import JobsOptions from "./jobs-options";

type AdminJobsProps = Pick<JobType, "company" | "_id" | "createdAt" | "title">;

export const JobsColumn: ColumnDef<AdminJobsProps>[] = [
  {
    header: "Company Name",
    cell: ({ row }) => {
      return row.original.company?.name || "No Company Name";
    },
  },
  {
    accessorKey: "title",
    header: "Job Title",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const companyId = row.original.company._id;
      return <JobsOptions id={companyId} />;
    },
  },
];
