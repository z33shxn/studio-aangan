"use client";
import { useRouter } from "next/navigation";
import { projects } from "@/content/projects";

export function RandomProjectButton() {
  const router = useRouter();

  const handleRandomProject = () => {
    const randomProject = projects[Math.floor(Math.random() * projects.length)];
    router.push(`/portfolio/${randomProject.slug}`);
  };

  return (
    <button 
      onClick={handleRandomProject}
      className="text-sm font-medium text-ink/70 hover:text-clay transition-colors underline underline-offset-4 decoration-stone-2 hover:decoration-clay"
    >
      Take me somewhere beautiful →
    </button>
  );
}
