import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z
    .number()
    .min(18, "Must be at least 18 years old")
    .max(100, "Invalid age"),
  height: z.string({
    required_error: "Height is required",
  }),
  caste: z.enum(["Brahmin", "Kshatriya", "Vaishya", "SC/ST"], {
    required_error: "Please select a caste",
  }),
  education: z.enum(["Masters", "Bachelors", "PhD"], {
    required_error: "Please select education level",
  }),
  skinTone: z.enum(["Fair", "Medium", "Dark"], {
    required_error: "Please select skin tone",
  }),
  income: z.number().min(0, "Income cannot be negative"),
  bodyCount: z.enum(["0", "1-3", "4+"], {
    required_error: "Please select body count",
  }),
  cooking: z.enum(["Yes", "No"], {
    required_error: "Please select cooking preference",
  }),
  job: z.enum(["Private", "Government", "Business", "Other"], {
    required_error: "Please select job type",
  }),
});
