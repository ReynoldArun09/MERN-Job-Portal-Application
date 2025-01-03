import { JobType } from "@/store/types";
import { ColumnDef } from "@tanstack/react-table";
import ApplicantsOptions from "./applicants-options";

type ApplicationTypeProps = JobType;

export const ApplicantsColumn: ColumnDef<ApplicationTypeProps>[] = [
  {
    header: "FullName",
    cell: ({ row }) => {
      const firstApplicant = row.original?.applications?.[0];
      return firstApplicant ? firstApplicant?.fullname : "No applicants";
    },
  },
  {
    header: "Email",
    cell: ({ row }) => {
      const firstApplicant = row.original?.applications[0];
      return firstApplicant ? firstApplicant?.email : "No applicants";
    },
  },
  {
    accessorKey: "PhoneNumber",
    header: "Contact",
  },
  {
    accessorKey: "Date",
    header: "createdAt",
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
