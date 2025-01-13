import { formSchema } from "@/schemas/formSchema";
import { z } from "zod";

export type PersonType = "dulha" | "dulhan";

// Generate TypeScript type from the Zod schema
export type FormValues = z.infer<typeof formSchema>;
