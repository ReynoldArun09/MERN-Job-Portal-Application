import { DataTable } from "@/components/common/data-table";
import { ApplicantsColumn } from "@/components/web/admin/applicants/applicants-column";

export default function ApplicantsPage() {
  return (
    <section>
      <DataTable columns={ApplicantsColumn} data={[]} filterName="name" />
    </section>
  );
}
