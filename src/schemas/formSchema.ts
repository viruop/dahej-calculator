import { z } from "zod";
import { formConfig } from "@/lib/config";

// This function converts the array to a tuple type for use in z.enum
const toTuple = <T extends string>(arr: T[]): [T, ...T[]] => arr as [T, ...T[]];

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z
    .number()
    .min(18, "Must be at least 18 years old")
    .max(100, "Invalid age"),
  height: z
    .string()
    .min(1, "Height is required")
    .regex(/^\d+(\.\d+)?$/, "Height must be like '6' or '5.8'")
    .refine((val) => {
      if (val.includes(".")) {
        const [feet, inches] = val.split(".");
        const feetNum = parseInt(feet);
        const inchesNum = parseInt(inches);
        return (
          feetNum >= 4 && feetNum <= 7 && inchesNum >= 0 && inchesNum <= 11
        );
      }
      const height = parseInt(val);
      return height >= 4 && height <= 7;
    }, "Height must be between 4 and 7 feet"),
  caste: z.enum(toTuple(formConfig.caste.map((item) => item.value)), {
    required_error: "Please select a caste",
  }),
  education: z.enum(toTuple(formConfig.education.map((item) => item.value)), {
    required_error: "Please select education level",
  }),
  skinTone: z.enum(toTuple(formConfig.skinTone.map((item) => item.value)), {
    required_error: "Please select skin tone",
  }),

  bodyCount: z.enum(toTuple(formConfig.bodyCount.map((item) => item.value)), {
    required_error: "Please select body count",
  }),
  cooking: z.enum(toTuple(formConfig.cooking.map((item) => item.value)), {
    required_error: "Please select cooking preference",
  }),
  job: z.enum(toTuple(formConfig.job.map((item) => item.value)), {
    required_error: "Please select job type",
  }),
  income: z.number().min(0, "Income cannot be negative").optional(),
  snapscore: z.number().min(0, "snapscore cannot be negative").optional(),
});
