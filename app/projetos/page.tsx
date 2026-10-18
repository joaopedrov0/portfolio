import type { Metadata } from "next";
import ProjectsBrowser from "@/components/projects/ProjectsBrowser";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Sistemas em produção e projetos de laboratório de João Pedro Veríssimo Gonçalves, desde 2021.",
};

export default function ProjectsPage() {
  return <ProjectsBrowser />;
}
