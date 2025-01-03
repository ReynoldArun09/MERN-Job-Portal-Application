import { z } from "zod";

export const CompanySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  description: z.string().min(1, "Description is required"),
  website: z.string().url("Please enter a valid URL").optional(),
  location: z.string().optional(),
  logo: z
    .instanceof(File)
    .refine(
      (file) => file.type.startsWith("image/"),
      "Logo must be an image file"
    )
    .optional(),
});

export type CompanySchemaType = z.infer<typeof CompanySchema>;
