import JobCard from "@/components/common/job-card";
import JobCardSkeleton from "@/components/skeleton/job-card-skeleton";
import { RootState, useAppDispatch } from "@/store";
import { fetchLatestJobs } from "@/store/services/job/job-service";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function SiteLatestJobs() {
  const { latestJobsData, isLoading } = useSelector(
    (state: RootState) => state.job
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLatestJobs());
  }, [dispatch]);

  return (
    <section className="py-10">
      <h1 className="text-xl font-bold py-5 lg:text-2xl">
        Latest & Top Job Openings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          [...new Array(10)].map((_, index) => <JobCardSkeleton key={index} />)}
        {latestJobsData?.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
}
