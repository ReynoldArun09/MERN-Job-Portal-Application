import { DataTable } from "@/components/common/data-table";
import { CompaniesColumn } from "@/components/web/admin/companies/companies-column";

export default function CompaniesPage() {
  return (
    <section>
      <DataTable columns={CompaniesColumn} data={[]} filterName="name" />
    </section>
  );
}
