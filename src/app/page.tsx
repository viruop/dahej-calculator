import MainForm from "@/components/MainForm";
import { BackgroundBeams } from "@/components/ui/background-beams";
import SparklesText from "@/components/ui/sparkles-text";

export default function Home() {
  return (
    <div className="h-[35rem] w-full rounded-2xl shadow-2xl bg-slate-50  relative flex flex-col items-center justify-center antialiased">
      <MainForm />
      <div className="absolute top-[10%] w-full text-center z-10">
        <SparklesText text="Dahej" secondText="Calculator" />
      </div>
      <BackgroundBeams />
    </div>
  );
}
