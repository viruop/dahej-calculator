import MainForm from "@/components/MainForm";
import { BackgroundBeams } from "@/components/ui/background-beams";
import SparklesText from "@/components/ui/sparkles-text";
import { siteConfig } from "@/lib/config";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="h-[35rem] w-full rounded-2xl shadow-2xl bg-primary relative flex flex-col items-center justify-center antialiased">
      <MainForm />
      <div className="absolute top-[10%] w-full text-center z-10">
        <SparklesText text="Dahej" secondText="Calculator" />
      </div>
      <BackgroundBeams />
      <div className="rounded-2xl p-4 bg-slate-50 fixed left-4 bottom-4 flex justify-center items-center shadow-md h-9 w-9 z-[9000] ">
        <Link target="_blank" href={siteConfig.links.github}>
          <Github className=" text-secondary" />
        </Link>
      </div>
    </div>
  );
}
