import { z } from "zod";

export const CompanySchema = z.object({
  companyName: z
    .string()
    .min(4, { message: "CompanyName should be more than 4 charc" }),
});

export type CompanySchemaType = z.infer<typeof CompanySchema>;
