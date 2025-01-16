"use client";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schemas/formSchema";
import { FormValues } from "@/types/index";
import { Form, FormField } from "@/components/ui/form";
import { formConfig, siteConfig } from "@/lib/config";
import { FormFieldRenderer } from "./FormFieldRenderer";
import ShimmerButton from "./ui/shimmer-button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { useState } from "react";
import { EvervaultCard } from "./ui/evervault-card";
import Link from "next/link";

export default function MainForm() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [message, setMessage] = useState("");
  const [dahejAmount, setDahejAmount] = useState(0);
  const defaultValues: FormValues = {
    name: "",
    age: 18,
    height: "",
    caste: formConfig.caste[0].value,
    education: formConfig.education[0].value,
    skinTone: formConfig.skinTone[0].value,
    income: 0,
    snapscore: 0,
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

  const handleMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    await Promise.all([dulhaForm.trigger(), dulhanForm.trigger()]);

    const isDulhaFormValid = dulhaForm.formState.isValid;
    const isDulhanFormValid = dulhanForm.formState.isValid;
    if (isDulhaFormValid && isDulhanFormValid) {
      const dulhaData = dulhaForm.getValues();
      const dulhanData = dulhanForm.getValues();

      const dahejAmount = calculateDahej(dulhaData, dulhanData);
      console.log("Final Dahej Amount:", dahejAmount);
      setDahejAmount(dahejAmount);
      // Get the dynamic funny message based on dahejAmount
      const funnyMessage = getFunnyMessage(dahejAmount);
      setMessage(funnyMessage);
      // Only open the drawer if both forms are valid
      setOpenDrawer(true);

      // Handle form submission for both forms
      dulhaForm.handleSubmit(onSubmitDulha)();
      dulhanForm.handleSubmit(onSubmitDulhan)();
    } else {
      dulhaForm.handleSubmit(onSubmitDulha)();
      dulhanForm.handleSubmit(onSubmitDulhan)();
      // Optionally, you can show an error message or handle invalid form case here
      console.log("Please fill out both forms correctly.");
    }
  };

  const getFunnyMessage = (dahejAmount: number) => {
    if (dahejAmount < 100000) {
      return "Bhai, Activa le le";
    }
    if (dahejAmount < 500000) {
      return "Bhai, is dahej se tum ek bullet ayeagi buss!";
    } else if (dahejAmount < 1000000) {
      return "Bhai, is dahej se tum ek chhoti si car aur ek local plot khareed sakte ho!";
    } else if (dahejAmount < 5000000) {
      return "Yeh dahej ka amount toh tumhein ek achha sa plot aur ek luxury hatchback de sakta hai!";
    } else if (dahejAmount < 10000000) {
      return "Bhai, is dahej se tum ek SUV aur ek 2BHK flat le sakte ho! Badhiya deal hai!";
    } else if (dahejAmount < 20000000) {
      return "Arre bhai, is dahej ke amount se toh tum ek Fortuner, 2 plots, aur 3 international trips kar sakte ho!";
    } else if (dahejAmount < 50000000) {
      return "Bhai, is dahej ka amount toh tumhein ek luxury car, Dubai mein property, aur ek saal ka vacation karane ke liye kaafi hai!";
    } else {
      return "Bhai, tumhare dahej se toh tum ek private jet khareed lo, Dubai mein apni 10 properties khareed lo!";
    }
  };

  const calculateDahej = (dulhaData: FormValues, dulhanData: FormValues) => {
    const dulhaScore = calculateScore(dulhaData, "dulha");
    const dulhanScore = calculateScore(dulhanData, "dulhan");
    console.log(dulhanScore);
    const dahejAmount = dulhaScore;

    return dahejAmount;
  };

  const calculateScore = (data: FormValues, type: string) => {
    let score = 500000; // Initial base score

    // Helper function to calculate the score based on the percentage
    const calculatePercentageImpact = (baseValue: number, percentage: number) =>
      baseValue * percentage;

    // Helper function to get percentage from formConfig based on value
    const getPercentage = (
      category: keyof typeof formConfig,
      value: string
    ) => {
      if (Array.isArray(formConfig[category])) {
        const selectedOption = formConfig[category].find(
          (option) => option.value === value
        );
        return selectedOption ? selectedOption.percentage : 0; // Default to 0 if not found
      }
      return 0; // If not an array with options, return 0 (safe fallback)
    };

    // Age-based scoring
    if (type === "dulha") {
      score += data.age! > 35 ? -calculatePercentageImpact(10000, 0.1) : 0; // Older dulhas may have lower dowry expectations
    } else {
      if (data.age! < 25) score += calculatePercentageImpact(50000, 0.1); // Younger dulhans typically have higher dowry expectations
      if (data.age! > 30) score -= calculatePercentageImpact(10000, 0.1); // Older dulhans might face a slight reduction
    }

    // Height-based scoring
    if (type === "dulha") {
      score +=
        data.height && Number(data?.height) > 6
          ? calculatePercentageImpact(20000, 0.15)
          : 0;
    } else {
      score +=
        data.height && Number(data.height!) > 5.5
          ? calculatePercentageImpact(20000, 0.1)
          : 0;
    }

    // Caste-based scoring (fetch percentage from config)
    const castePercentage = getPercentage("caste", data.caste);
    score += calculatePercentageImpact(30000, castePercentage);
    console.log("castePercentage", castePercentage);

    // Education-based scoring (fetch percentage from config)
    const educationPercentage = getPercentage("education", data.education);
    score += calculatePercentageImpact(100000, educationPercentage);

    console.log("educationPercentage", educationPercentage);

    // Skin tone-based scoring (fetch percentage from config)
    const skinTonePercentage = getPercentage("skinTone", data.skinTone);
    console.log("skinTonePercentage", skinTonePercentage);
    if (type === "dulhan") {
      if (data.skinTone === "Fair")
        score += calculatePercentageImpact(30000, skinTonePercentage);
      if (data.skinTone === "Medium")
        score += calculatePercentageImpact(15000, skinTonePercentage);
    }

    // Cooking ability scoring (fetch percentage from config)
    const cookingPercentage = getPercentage("cooking", data.cooking);
    score +=
      data.cooking === "Yes"
        ? calculatePercentageImpact(20000, cookingPercentage)
        : calculatePercentageImpact(-10000, cookingPercentage);

    // Body count-based scoring (fetch percentage from config)
    // const bodyCountPercentage = getPercentage("bodyCount", data.bodyCount);
    // score -= calculatePercentageImpact(
    //   data.bodyCount !== "2+"
    //     ? Number(data.bodyCount)! * (type === "dulha" ? 5000 : 10000)
    //     : 0,
    //   bodyCountPercentage
    // );
    score -=
      data.bodyCount !== "2+"
        ? Number(data.bodyCount)! * (type === "dulha" ? 5000 : 10000)
        : 40000;

    // Job-based scoring (fetch percentage from config)
    const jobPercentage = getPercentage("job", data.job);
    score += calculatePercentageImpact(80000, jobPercentage);

    // Snapscore-based scoring (snapscore percentage can be a separate factor, if desired)
    if (data.snapscore) {
      const snapscore = data.snapscore * 10000;
      score -= snapscore;
    }

    // Income-based scoring (percentage-based impact)
    if (data.income) {
      const income = data.income * 10000;
      if (income > 100000) score += calculatePercentageImpact(50000, 0.1);
      else if (income > 50000) score += calculatePercentageImpact(20000, 0.05);
      else if (income > 20000) score += calculatePercentageImpact(5000, 0.03);
    }

    return score;
  };

  const onSubmitDulha = (data: FormValues) => {
    console.log("Dulha Form Submitted:", data);
  };

  const onSubmitDulhan = (data: FormValues) => {
    console.log("Dulhan Form Submitted:", data);
  };

  return (
    <div className="w-[90%] -mt-[10%] md:mt-0 shadow-sm h-full  relative top-40 z-10 mx-auto ">
      <div className="bg-gradient-to-b from-[#EFF0F4] to-[#FBF6F2] p-8 rounded-2xl border-2 border-white  mb-2">
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

      <div className="p-6 flex justify-center items-center rounded-xl">
        <ShimmerButton onClick={(e) => handleMatch(e)} className="shadow-2xl">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight  dark:from-white dark:to-slate-900/10 lg:text-lg">
            Calculate Dahej
          </span>
        </ShimmerButton>
      </div>
      <Drawer
        onOpenChange={(open) => {
          setOpenDrawer(open);
        }}
        open={openDrawer}
      >
        <DrawerContent>
          <div className="mx-auto h-[85vh] p-6 flex justify-center items-center flex-col w-full">
            <DrawerHeader>
              <DrawerTitle className="sr-only">Dahej Amount</DrawerTitle>
            </DrawerHeader>

            <div className="rounded-md flex flex-col items-start max-w-lg mx-auto p-4 relative">
              <EvervaultCard
                text={dahejAmount.toString()}
                backgroundMessage={message}
              />

              <h2 className="dark:text-white text-black mt-4 text-sm font-light">
                {message}
              </h2>
              <Link
                target="_blank"
                href={siteConfig.links.github}
                className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5"
              >
                Star it on Github
              </Link>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
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
      <h2 className="tracking-tight text-xl font-semibold mb-6">{`${role} Details`}</h2>
      <div className="grid grid-cols-2 gap-6 [&>*:last-child]:col-span-2">
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
