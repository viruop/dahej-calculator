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
import { Button } from "@/components/ui/button"; // Assuming Button component is available
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "./ui/slider";

export default function ParentPage() {
  const defaultValues = {
    name: "",
    age: 18,
    height: "",
    caste: "",
    education: "",
    skinTone: "",
    income: 0,
    bodyCount: "",
    cooking: "",
    job: "",
  };
  const dulhaForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const dulhanForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Combined submit handler for both forms
  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    // Get form values
    const dulhaData = dulhaForm.getValues();
    const dulhanData = dulhanForm.getValues();

    // Calculate dahej
    const dahejAmount = calculateDahej(dulhaData, dulhanData);

    // Log or display the result
    console.log("Final Dahej Amount:", dahejAmount);
    dulhaForm.handleSubmit(onSubmitDulha)();
    dulhanForm.handleSubmit(onSubmitDulhan)();
  };

  const calculateDahej = (dulhaData: FormValues, dulhanData: FormValues) => {
    // Dulha Score
    let dulhaScore = 0;
    dulhaScore += dulhaData.age! > 35 ? -1000 : 0;
    dulhaScore += Number(dulhaData?.height) > 6 ? 2000 : 0;
    dulhaScore +=
      dulhaData.caste === "Brahmin"
        ? 5000
        : dulhaData.caste === "SC/ST"
        ? -3000
        : 0;
    dulhaScore +=
      dulhaData.education === "PhD"
        ? 10000
        : dulhaData.education === "Master's"
        ? 5000
        : 0;
    dulhaScore += Number(dulhaData.income) * 5000;
    dulhaScore +=
      dulhaData.cooking === "Biryani Master"
        ? 2000
        : dulhaData.cooking === "Zomato expert"
        ? -1000
        : 0;
    dulhaScore -= Number(2)! * 500;
    dulhaScore += dulhaData.job === "Software Engineer" ? 8000 : 4000;

    // Dulhan Score
    let dulhanScore = 0;
    dulhanScore +=
      dulhanData.age! < 25 ? 5000 : dulhanData.age! > 30 ? -2000 : 0;
    dulhanScore += Number(dulhanData.height!) > 5.5 ? 2000 : 0;
    dulhanScore +=
      dulhanData.caste === "Brahmin"
        ? 5000
        : dulhanData.caste === "SC/ST"
        ? -3000
        : 0;
    dulhanScore +=
      dulhanData.education === "PhD"
        ? 10000
        : dulhanData.education === "Master's"
        ? 5000
        : 0;
    dulhanScore +=
      dulhanData.skinTone === "Fair"
        ? 3000
        : dulhanData.skinTone === "Medium"
        ? 1500
        : 0;
    dulhanScore += dulhanData.cooking === "Full Thali Master" ? 5000 : -1000;
    dulhanScore -= Number(2)! * 1000;
    dulhanScore += dulhanData.job === "Software Engineer" ? 8000 : 4000;

    // Final Dahej Calculation
    console.log("dulhaScore", dulhaScore);
    console.log("dulhanScore", dulhanScore);
    const dahej = dulhaScore - dulhanScore;
    return dahej > 0 ? dahej : 0;
  };

  const onSubmitDulha = (data: FormValues) => {
    console.log("Dulha Form Submitted:", data);
  };

  const onSubmitDulhan = (data: FormValues) => {
    console.log("Dulhan Form Submitted:", data);
  };

  return (
    <div className="w-full h-[90vh] relative">
      {/* First Section as background */}
      <div className=" rounded-2xl border-2 bg-white absolute inset-0 overflow-hidden z-0">
        {/* Top left running figure */}
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

        {/* Bottom right jumping figure */}
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

        {/* Floating boxes */}
        {/* {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute w-8 h-8 bg-[#FFD6C9] opacity-20 rounded-lg transform rotate-45 animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${4 + Math.random() * 2}s`,
        }}
      />
    ))} */}
      </div>

      {/* Second Section */}
      <div className="w-[90%] h-full relative top-40 z-10 mx-auto rounded-xl bg-rose-200 shadow-sm">
        {/* Main dark form section */}
        <div className="bg-[#0F172A] p-8 rounded-2xl shadow-2xl mb-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Dulha Form */}
            <Form {...dulhaForm}>
              <form className="space-y-6">
                <h2 className="text-white text-xl font-semibold mb-6">
                  Dulha Details
                </h2>
                <RenderFormFields form={dulhaForm} />
              </form>
            </Form>

            {/* Dulhan Form */}
            <Form {...dulhanForm}>
              <form className="space-y-6">
                <h2 className="text-white text-xl font-semibold mb-6">
                  Dulhan Details
                </h2>
                <RenderFormFields form={dulhanForm} />
              </form>
            </Form>

            {/* Match Button */}
          </div>
        </div>
        <div className="p-6 rounded-xl">
          <Button
            className="w-full bg-[#FF7B54] text-white hover:bg-[#FF6B3D] text-lg font-semibold py-6"
            onClick={handleMatch}
          >
            Find Perfect Match
          </Button>
        </div>
      </div>

      {/* Header and Description */}
      <div className="absolute top-[10%] w-full text-center z-10">
        <h1 className="text-4xl font-bold text-black mb-2">Dahej Calculator</h1>
        <p className="text-black mb-12">
          Fill in your preferences and let us find your soulmate
        </p>
      </div>
    </div>
  );
}

// RenderFormFields Component - A reusable function to render form fields
const RenderFormFields = ({ form }: { form: UseFormReturn<FormValues> }) => (
  <>
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Name</FormLabel>
          <FormControl>
            <Input
              {...field}
              className="bg-[#1E293B] text-white border-0"
              placeholder="Enter name"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="age"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Age</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              className="bg-[#1E293B] text-white border-0"
              placeholder="Enter age"
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="height"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Height</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              className="bg-[#1E293B] text-white border-0"
              placeholder="Enter height"
              required
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="caste"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Caste/Sub-Caste</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-[#1E293B] text-white border-0">
                <SelectValue placeholder="Select caste" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Brahmin">Brahmin</SelectItem>
              <SelectItem value="Kshatriya">Kshatriya</SelectItem>
              <SelectItem value="Vaishya">Vaishya</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="education"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Education</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-[#1E293B] text-white border-0">
                <SelectValue placeholder="Select education" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Masters">Masters</SelectItem>
              <SelectItem value="Bachelors">Bachelors</SelectItem>
              <SelectItem value="PhD">PhD</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="skinTone"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Skin Tone</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-[#1E293B] text-white border-0">
                <SelectValue placeholder="Select skin tone" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Fair">Fair</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Dark">Dark</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="income"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Income (in lakhs)</FormLabel>
          <FormControl>
            <Slider
              onValueChange={(value) => field.onChange(value[0])}
              defaultValue={[field?.value || 0]}
              max={100}
              step={1}
              className="bg-[#1E293B]"
            />
          </FormControl>
          <div className="text-white text-sm">{field.value} LPA</div>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="bodyCount"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Body Count</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-[#1E293B] text-white border-0">
                <SelectValue placeholder="Select body count" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="0">0 📈</SelectItem>
              <SelectItem value="1-3">1-3 💸</SelectItem>
              <SelectItem value="4+">4+ 📉</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="cooking"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Can Cook?</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-[#1E293B] text-white border-0">
                <SelectValue placeholder="Select cooking preference" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="job"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white">Job Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-[#1E293B] text-white border-0">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Private">Private</SelectItem>
              <SelectItem value="Government">Government</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);
