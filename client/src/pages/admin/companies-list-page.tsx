import { DataTable } from "@/components/common/data-table";
import { CompaniesColumn } from "@/components/web/admin/companies-columns/companies-column";
import { RootState, useAppDispatch } from "@/store";
import { fetchCompanies } from "@/store/services/company/company-service";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

export default function ComapaniesListPage() {
  const dispatch = useAppDispatch();
  const { companiesData } = useSelector((state: RootState) => state.company);

  const columns = useMemo(() => CompaniesColumn, []);

  useEffect(() => {
    if (!companiesData || companiesData.length === 0) {
      dispatch(fetchCompanies());
    }
  }, [dispatch, companiesData]);

  return (
    <section>
      <DataTable
        columns={columns}
        data={companiesData ?? []}
        filterName="name"
      />
    </section>
  );
}
