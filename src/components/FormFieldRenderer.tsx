"use client";
import React from "react";
import { FormValues } from "@/types/index";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { formConfig } from "@/lib/config";

interface ConfigItem {
  value: string;
  label: string;
}

type SelectFieldName = Extract<
  keyof FormValues,
  "caste" | "education" | "skinTone" | "bodyCount" | "job" | "cooking"
>;

type FieldType<T extends keyof FormValues> = {
  onChange: (value: FormValues[T]) => void;
  value: FormValues[T];
  name: T;
};

interface FormFieldRendererProps<T extends keyof FormValues> {
  field: FieldType<T>;
  name: T;
}
export const FormFieldRenderer = <T extends keyof FormValues>({
  field,
  name,
}: FormFieldRendererProps<T>) => {
  const isSelectField = (
    fieldName: keyof FormValues
  ): fieldName is SelectFieldName => {
    return [
      "caste",
      "education",
      "skinTone",
      "bodyCount",
      "job",
      "cooking",
    ].includes(fieldName as string);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    field.onChange(value as FormValues[T]);
  };

  return (
    <FormItem>
      <FormLabel>{capitalizeFirstLetter(name)}</FormLabel>
      <FormControl>
        {name === "income" || name === "snapscore" ? (
          <div>
            <Slider
              onValueChange={(value: number[]) =>
                field.onChange(value[0] as FormValues[T])
              }
              defaultValue={[typeof field.value === "number" ? field.value : 0]}
              max={100}
              step={1}
              className="bg-secondary"
            />
            <p className="text-sm mt-2">{field.value}K</p>
          </div>
        ) : isSelectField(name) ? (
          <Select
            onValueChange={(value: string) =>
              field.onChange(value as FormValues[T])
            }
            defaultValue={String(field.value)}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${name}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {formConfig[name].map((option: ConfigItem) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            placeholder={
              name === "height"
                ? `Enter height (e.g. 5.8 for 5'8")`
                : `Enter ${name}`
            }
            type={name === "age" ? "number" : "text"}
            value={field.value as string | number}
            onChange={handleInputChange}
          />
        )}
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
