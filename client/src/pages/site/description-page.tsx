import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RootState, useAppDispatch } from "@/store";
import { fetchSingleJobs } from "@/store/services/job/job-service";
import { formatSalary } from "@/utils";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function DescriptionPage() {
  const { id } = useParams<{ id: string }>();
  const { singleJob } = useSelector((state: RootState) => state.job);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!id) return;
    dispatch(fetchSingleJobs({ id }));
  }, [dispatch, id]);

  return (
    <section className="flex items-center justify-center min-h-[60vh]">
      <Card className="hover:shadow-md transition-shadow cursor-pointer py-5 w-full h-fit flex flex-col justify-between">
        <div>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">
                  {singleJob?.title || "No Title Found"}
                </CardTitle>
                <CardDescription>
                  {singleJob?.location || "Location is unkown"}
                </CardDescription>
              </div>
              <Badge variant="outline" className="shrink-0">
                {singleJob?.position} Position
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-2.5">
            <p className="text-muted-foreground text-sm line-clamp-3">
              {singleJob?.description}
            </p>
            <div className="flex gap-2 flex-wrap">
              {singleJob?.requirements?.map((req, index) => (
                <Badge variant={"outline"} key={index}>
                  {req}
                </Badge>
              ))}
            </div>
            <Badge className="mt-3">Salary - {singleJob?.salary}</Badge>
          </CardContent>
        </div>

        <CardFooter className="flex flex-wrap gap-2 mt-auto">
          <Badge variant="secondary" className="whitespace-nowrap">
            {singleJob?.jobType}
          </Badge>
          <Badge variant="secondary" className="whitespace-nowrap">
            {formatSalary(singleJob?.salary || 0)}
          </Badge>
          <Badge variant="secondary">
            Experience {singleJob?.experienceLevel}+
          </Badge>
        </CardFooter>
        <div className="flex flex-col pl-6 space-y-2.5">
          <span>Added on : {singleJob?.createdAt.slice(0, 10)}</span>
          <span>Company : {singleJob?.company.name}</span>
        </div>
      </Card>
    </section>
  );
}
