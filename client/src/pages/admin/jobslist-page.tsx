import { DataTable } from "@/components/common/data-table";
import { JobsColumn } from "@/components/web/admin/jobs/jobs-column";

export default function JobsListPage() {
  return (
    <section>
      <DataTable columns={JobsColumn} data={[]} filterName="name" />
    </section>
  );
}
