import FilterCard from "@/components/common/filter-card";
import JobCard from "@/components/common/job-card";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function JobsPage() {
  const { searchQuery, jobsData } = useSelector(
    (state: RootState) => state.job
  );

  const [filterJobs, setFilterJobs] = useState(jobsData);

  useEffect(() => {
    if (searchQuery) {
      const filteredData = jobsData.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredData);
    } else {
      setFilterJobs(jobsData);
    }
  }, [searchQuery, jobsData]);

  return (
    <section>
      <div className="flex gap-x-10">
        <div>
          <FilterCard />
        </div>
        {filterJobs.length <= 0 ? (
          <span className="flex items-center justify-center mx-auto text-blue-600 font-bold text-3xl">
            Jobs Not Found
          </span>
        ) : (
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {filterJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
