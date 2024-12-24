import { Badge } from "@/components/ui/badge";
import { formatSalary } from "@/utils";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function JobCard({ job }: any) {
  const navigate = useNavigate();
  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer h-[280px] flex flex-col justify-between"
      onClick={() => navigate(`/description/${job._id}`)}
    >
      <div>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">Tata Steel</CardTitle>
              <CardDescription>India</CardDescription>
            </div>
            <Badge variant="outline" className="shrink-0">
              {job.position} Position
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-2.5">
          <h1 className="text-md font-semibold line-clamp-1">{job.title}</h1>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {job.description}
          </p>
        </CardContent>
      </div>

      <CardFooter className="flex flex-wrap gap-2 mt-auto">
        <Badge variant="secondary" className="whitespace-nowrap">
          {job.jobType}
        </Badge>
        <Badge variant="secondary" className="whitespace-nowrap">
          {formatSalary(job.salary)}
        </Badge>
        <Badge variant="secondary">Experience {job.experienceLevel}</Badge>
      </CardFooter>
    </Card>
  );
}
