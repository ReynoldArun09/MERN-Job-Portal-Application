import JobCard from "@/components/common/job-card";
import JobCardSkeleton from "@/components/skeleton/job-card-skeleton";
import { RootState, useAppDispatch } from "@/store";
import { fetchAllJobs } from "@/store/services/job/job-service";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function BrowsePage() {
  const { jobsData, searchQuery, isLoading } = useSelector(
    (state: RootState) => state.job
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      fetchAllJobs({
        query: searchQuery,
      })
    );
  }, [searchQuery, dispatch]);

  console.log(searchQuery);

  return (
    <section className="container mx-auto py-10 min-h-screen">
      <h1 className="font-bold text-2xl py-3">
        Search Results ({jobsData?.length})
      </h1>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading &&
          [...new Array(10)].map((_, index) => <JobCardSkeleton key={index} />)}
        {!isLoading &&
          jobsData?.map((job) => <JobCard key={job._id} job={job} />)}
      </div>
    </section>
  );
}
