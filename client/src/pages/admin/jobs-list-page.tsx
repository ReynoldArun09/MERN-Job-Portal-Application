import { DataTable } from "@/components/common/data-table";
import { JobsColumn } from "@/components/web/admin/jobs-columns/jobs-column";
import { RootState, useAppDispatch } from "@/store";
import { fetchAdminJobs } from "@/store/services/job/job-service";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

export default function JobsListPage() {
  const dispatch = useAppDispatch();
  const { adminJobsData } = useSelector((state: RootState) => state.job);
  useEffect(() => {
    if (!adminJobsData || adminJobsData.length === 0) {
      dispatch(fetchAdminJobs());
    }
  }, [dispatch, adminJobsData]);

  const columns = useMemo(() => JobsColumn, []);

  return (
    <section>
      <DataTable
        columns={columns}
        data={adminJobsData ?? []}
        filterName="title"
      />
    </section>
  );
}
