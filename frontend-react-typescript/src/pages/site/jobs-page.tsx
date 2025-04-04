import BreadCrumbs from "@/components/common/bread-crumb";
import FilterJobCard from "@/components/common/filter-job-card";
import JobCard from "@/components/common/job-card";
import JobCardSkeleton from "@/components/skeletons/job-card-skeleton";
import UseAllJobs from "@/hooks/apis/use-all-jobs";
import Head from "@/utils/seo/head";
import * as React from "react";
import useFilterQuery from "@/hooks/useFilterQuery";

export default function JobsPage() {
  const { isFetching, allJobsData } = UseAllJobs();
  const [filterJobs, setFilterJobs] = React.useState(allJobsData);
  const { filter } = useFilterQuery();

  React.useEffect(() => {
    if (allJobsData) {
      if (filter) {
        const filteredData = allJobsData.filter((job) => {
          return (
            job.title.toLowerCase().includes(filter.toLowerCase()) ||
            job.location.toLowerCase().includes(filter.toLowerCase())
          );
        });
        setFilterJobs(filteredData);
      } else {
        setFilterJobs(allJobsData);
      }
    }
  }, [allJobsData, filter]);

  return (
    <>
      <Head title="Jobs Page" description="job portal application, Jobs page" />
      <BreadCrumbs />
      <section className="py-10">
        <div className="flex gap-x-10">
          <div>
            <FilterJobCard />
          </div>
          {filterJobs && filterJobs.length <= 0 ? (
            <span className="flex items-center justify-center mx-auto text-blue-600 font-bold text-3xl">
              Jobs Not Found
            </span>
          ) : (
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
              {isFetching && [...new Array(10)].map((_, index) => <JobCardSkeleton key={index} />)}
              {filterJobs?.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
