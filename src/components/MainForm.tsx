"use client";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schemas/formSchema";
import { FormValues } from "@/types/index";
import { Form, FormField } from "@/components/ui/form";
import { formConfig } from "@/lib/config";
import { FormFieldRenderer } from "./FormFieldRenderer";
import ShimmerButton from "./ui/shimmer-button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { useState } from "react";
import NumberTicker from "./ui/number-ticker";

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
    if (dahejAmount < 1000000) {
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
    // const dulhanScore = calculateScore(dulhanData, "dulhan");
    const dahejAmount = dulhaScore;

    return dahejAmount;
  };

  const calculateScore = (data: FormValues, type: string) => {
    let score = 500000;

    // Age-based scoring
    if (type === "dulha") {
      score += data.age! > 35 ? -1000 : 0; // Older dulhas may have lower dowry expectations
    } else {
      // dulhan
      if (data.age! < 25) score += 5000; // Younger dulhans typically have higher dowry expectations
      if (data.age! > 30) score -= 1000; // Older dulhans might face a slight reduction in dowry expectations
    }

    // Height-based scoring
    if (type === "dulha") {
      score += Number(data?.height) > 6 ? 2000 : 0; // Taller dulhas typically have higher dowry expectations
    } else {
      score += Number(data.height!) > 5.5 ? 2000 : 0; // Taller dulhans also may have higher expectations
    }

    // Caste-based scoring (with more nuanced caste system)
    if (data.caste === "Brahmin") score += 3000; // Brahmin caste may have higher dowry expectations
    if (data.caste === "Kshatriya") score += 2000; // Kshatriya caste also adds to dowry expectations
    if (data.caste === "Bhumihar") score += 18000; // Kshatriya caste also adds to dowry expectations

    if (data.caste === "Yadav" || data.caste === "General") score += 1000; // Yadav/Bhumihar caste adds moderate expectations
    if (data.caste === "SC/ST") score -= 3000; // SC/ST may face lower dowry expectations due to social dynamics

    // Education-based scoring
    if (data.education === "PhD") score += 10000; // PhD holders are seen as higher value
    if (data.education === "Masters") score += 5000; // Masters degrees also increase dowry expectations
    if (data.education === "Bachelors") score += 3000; // Bachelors increase expectations moderately
    if (data.education === "12th Pass") score += 1000; // Minimal increase for 12th pass

    // Skin tone-based scoring (traditional but we limit impact)
    if (type === "dulhan") {
      if (data.skinTone === "Fair") score += 3000; // Fair skin typically increases dowry expectations
      if (data.skinTone === "Medium") score += 1500; // Medium skin tone moderately increases dowry expectations
    }

    // Cooking ability
    score += data.cooking === "Yes" ? 2000 : -1000; // Cooking ability typically adds to expectations

    // Body count-based scoring (important in traditional settings)
    score -= Number(data.bodyCount)! * (type === "dulha" ? 500 : 1000); // Higher body count lowers dowry expectations

    // Job-based scoring (Government jobs are highly valued)
    score += data.job === "Government" ? 8000 : 4000; // Government jobs tend to significantly raise dowry expectations
    score += data.job === "Business" ? 6000 : 0; // Business also raises expectations but slightly less than Government jobs
    score += data.job === "Private" ? 4000 : 0; // Private job also contributes moderately

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
          <div className="mx-auto h-[85vh] p-6 flex justify-center items-center flex-col overflow-auto w-full">
            <DrawerHeader>
              <DrawerTitle>Dahej Amount</DrawerTitle>
              {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
            </DrawerHeader>
            <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
              <NumberTicker value={dahejAmount} />
            </p>
            <p>{message}</p>
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
      <h2 className=" tracking-tight text-xl font-semibold mb-6">{`${role} Details`}</h2>
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
