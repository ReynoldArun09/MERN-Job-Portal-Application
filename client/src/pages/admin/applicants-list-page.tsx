import { DataTable } from "@/components/common/data-table";
import { ApplicantsColumn } from "@/components/web/admin/applicants-columns/applicants-column";
import { RootState, useAppDispatch } from "@/store";
import { fetchAppliedJobs } from "@/store/services/applications/application-service";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function ApplicantsListPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const data = useSelector(
    (state: RootState) => state.applicant.applicationData
  );
  useEffect(() => {
    if (!id) return;
    dispatch(fetchAppliedJobs({ id }));
  }, [dispatch, id]);

  return (
    <section>
      <DataTable
        columns={ApplicantsColumn}
        data={data ?? []}
        filterName="title"
      />
    </section>
  );
}
