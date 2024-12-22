import JobCard from "@/components/common/job-card";
import { jobs } from "@/constants";

export default function SiteLatestJobs() {
  return (
    <section className="py-10">
      <h1 className="text-xl font-bold py-5 lg:text-2xl">
        Latest & Top Job Openings
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.title} job={job} />
        ))}
      </div>
    </section>
  );
}
