"use client";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schemas/formSchema";
import { FormValues } from "@/types/index";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { formConfig } from "@/lib/config";
import SparklesText from "@/components/ui/sparkles-text";
import { BackgroundBeams } from "./ui/background-beams";

export default function ParentPage() {
  const defaultValues: FormValues = {
    name: "",
    age: 18,
    height: "",
    caste: formConfig.caste[0].value,
    education: formConfig.education[0].value,
    skinTone: formConfig.skinTone[0].value,
    income: 0,
    bodyCount: formConfig.bodyCount[0].value,
    cooking: formConfig.cooking[0].value,
    job: formConfig.job[0].value,
  };

  const dulhaForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const dulhanForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    const dulhaData = dulhaForm.getValues();
    const dulhanData = dulhanForm.getValues();

    const dahejAmount = calculateDahej(dulhaData, dulhanData);
    console.log("Final Dahej Amount:", dahejAmount);

    dulhaForm.handleSubmit(onSubmitDulha)();
    dulhanForm.handleSubmit(onSubmitDulhan)();
  };

  const calculateDahej = (dulhaData: FormValues, dulhanData: FormValues) => {
    const dulhaScore = calculateScore(dulhaData, "dulha");
    const dulhanScore = calculateScore(dulhanData, "dulhan");

    return Math.max(dulhaScore - dulhanScore, 0);
  };

  const calculateScore = (data: FormValues, type: string) => {
    let score = 0;

    // Simplify score calculation with reusable logic
    score +=
      type === "dulha"
        ? data.age! > 35
          ? -1000
          : 0
        : data.age! < 25
        ? 5000
        : data.age! > 30
        ? -2000
        : 0;
    score +=
      type === "dulha"
        ? Number(data?.height) > 6
          ? 2000
          : 0
        : Number(data.height!) > 5.5
        ? 2000
        : 0;
    score +=
      data.caste === "Brahmin" ? 5000 : data.caste === "SC/ST" ? -3000 : 0;
    score +=
      data.education === "PhD"
        ? 10000
        : data.education === "Masters"
        ? 5000
        : 0;
    score +=
      type === "dulhan"
        ? data.skinTone === "Fair"
          ? 3000
          : data.skinTone === "Medium"
          ? 1500
          : 0
        : 0;
    score += data.cooking === "Yes" ? 2000 : -1000;
    score -= Number(data.bodyCount)! * (type === "dulha" ? 500 : 1000);
    score += data.job === "Government" ? 8000 : 4000;

    return score;
  };

  const onSubmitDulha = (data: FormValues) => {
    console.log("Dulha Form Submitted:", data);
  };

  const onSubmitDulhan = (data: FormValues) => {
    console.log("Dulhan Form Submitted:", data);
  };

  return (
    <div className="w-full h-[90vh] relative">
      <div className="rounded-2xl border-2 bg-white absolute inset-0 overflow-hidden z-0">
        <div className="absolute -left-4 top-1/4 transform -rotate-12">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M60 10C60 10 80 30 80 60C80 90 60 110 60 110"
              stroke="#FFD6C9"
              strokeWidth="4"
            />
            <circle cx="60" cy="30" r="15" fill="#FFD6C9" />
            <path
              d="M50 50L70 70M70 50L50 70"
              stroke="#FFD6C9"
              strokeWidth="4"
            />
          </svg>
        </div>
        <div className="absolute right-10 bottom-1/4 transform rotate-45">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M60 10C60 10 80 30 80 60C80 90 60 110 60 110"
              stroke="#FFD6C9"
              strokeWidth="4"
            />
            <circle cx="60" cy="30" r="15" fill="#FFD6C9" />
            <path
              d="M50 50L70 70M70 50L50 70"
              stroke="#FFD6C9"
              strokeWidth="4"
            />
          </svg>
        </div>
      </div>

      <div className="w-[90%] h-full relative top-40 z-10 mx-auto rounded-xl bg-rose-200 shadow-sm">
        <div className="bg-[#0F172A] p-8 rounded-2xl shadow-2xl mb-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Dulha and Dulhan forms */}
            {["Dulha", "Dulhan"].map((role) => (
              <FormComponent
                key={role}
                form={role === "Dulha" ? dulhaForm : dulhanForm}
                role={role}
              />
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl">
          <Button
            className="w-full bg-[#FF7B54] text-white hover:bg-[#FF6B3D] text-lg font-semibold py-6"
            onClick={handleMatch}
          >
            Calculate Dahej
          </Button>
        </div>
      </div>

      <div className="absolute top-[10%] w-full text-center z-10">
        {/* <h1 className="text-4xl font-bold text-black mb-2"> */}
        <SparklesText text="Dahej" secondText="Calculator" /> {/* </h1> */}
        <p className="text-black text-4xl font-bold mb-12">
          Fill in your preferences and let us find your soulmate
        </p>
      </div>
      <BackgroundBeams />
    </div>
  );
}

const FormComponent = ({
  form,
  role,
}: {
  form: UseFormReturn<FormValues>;
  role: string;
}) => (
  <Form {...form}>
    <form className="space-y-6">
      <h2 className="text-white text-xl font-semibold mb-6">{`${role} Details`}</h2>
      <div className="grid grid-cols-2 gap-6">
        <RenderFormFields form={form} />
      </div>
    </form>
  </Form>
);

const RenderFormFields = ({ form }: { form: UseFormReturn<FormValues> }) => (
  <>
    {formConfig.formValues.map((field) => (
      <FormField
        key={field}
        control={form.control}
        name={field}
        render={({ field }) => (
          <FormFieldRenderer field={field} name={field.name} />
        )}
      />
    ))}
  </>
);

const FormFieldRenderer = ({ field, name }: { field: any; name: string }) => (
  <FormItem>
    <FormLabel className="text-white">{capitalizeFirstLetter(name)}</FormLabel>
    <FormControl>
      {name === "income" || name === "snapscore" ? (
        <Slider
          onValueChange={(value) => field.onChange(value[0])}
          defaultValue={[field.value || 0]}
          max={100}
          step={1}
          className="bg-[#1E293B]"
        />
      ) : name === "caste" ||
        name === "education" ||
        name === "skinTone" ||
        name === "bodyCount" ||
        name === "job" ||
        name === "cooking" ? (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className="bg-[#1E293B] text-white border-0">
              <SelectValue placeholder={`Select ${name}`} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {formConfig[name]?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          {...field}
          className="bg-[#1E293B] text-white border-0"
          placeholder={`Enter ${name}`}
        />
      )}
    </FormControl>
    <FormMessage />
  </FormItem>
);

const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
