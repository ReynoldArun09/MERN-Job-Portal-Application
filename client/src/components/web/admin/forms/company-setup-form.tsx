import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CompanySchema, CompanySchemaType } from "@/schemas/company-schema";
import { RootState, useAppDispatch } from "@/store";
import { fetchCompanyById } from "@/store/services/company/company-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { ArrowLeft, Loader2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function CompanySetupForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [photo, setPhoto] = useState("");
  const { id } = useParams<{ id: string }>();
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    location: "",
    description: "",
    website: "",
  });
  const { isLoading, singleCompany } = useSelector(
    (state: RootState) => state.company
  );
  useEffect(() => {
    if (singleCompany) {
      setCompanyDetails({
        name: singleCompany?.name || "",
        location: singleCompany?.location || "",
        description: singleCompany?.description || "",
        website: singleCompany.website || "",
      });
    }
  }, [singleCompany]);

  console.log(singleCompany);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchCompanyById({ id }));
  }, [dispatch, id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanySchemaType>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      name: companyDetails?.name || "",
      location: companyDetails?.location || "",
      description: companyDetails?.description || "",
      website: companyDetails?.website || "",
    },
  });

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<CompanySchemaType> = (
    values: CompanySchemaType
  ) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-5 p-8">
        <Button
          onClick={() => navigate("/admin/companies")}
          variant="outline"
          className="flex items-center gap-2 text-gray-500 font-semibold"
        >
          <ArrowLeft />
          <span>Back</span>
        </Button>
        <h1 className="font-bold text-xl">Company Setup</h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Company Name</Label>
          <Input type="text" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label>Description</Label>
          <Input type="text" {...register("description")} />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div>
          <Label>Website</Label>
          <Input type="text" {...register("website")} />
          {errors.website && (
            <p className="text-red-500 text-sm">{errors.website.message}</p>
          )}
        </div>
        <div>
          <Label>Location</Label>
          <Input type="text" {...register("location")} />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>
        <div>
          <Label>Logo</Label>
          <Input type="file" accept="image/*" onChange={changeFileHandler} />
        </div>
      </div>
      {isLoading ? (
        <Button className="w-full my-4">
          {" "}
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
        </Button>
      ) : (
        <Button type="submit" className="w-full my-4">
          Update
        </Button>
      )}
    </form>
  );
}
