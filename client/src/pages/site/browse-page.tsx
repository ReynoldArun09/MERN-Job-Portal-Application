import JobCard from "@/components/common/job-card";
import JobCardSkeleton from "@/components/skeletons/job-card-skeleton";
import { RootState, useAppDispatch } from "@/store";
import { fetchAllJobs } from "@/store/features/jobSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function BrowsePage() {
  const { jobs, searchQuery, isFetching } = useSelector(
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

  return (
    <section className="container mx-auto py-10 min-h-screen">
      <h1 className="font-bold text-2xl py-3">
        Search Results ({jobs?.length})
      </h1>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isFetching &&
          [...new Array(10)].map((_, index) => <JobCardSkeleton key={index} />)}
        {!isFetching && jobs?.map((job, i) => <JobCard key={i} job={job} />)}
      </div>
    </section>
  );
}
