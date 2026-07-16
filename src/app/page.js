import HomeContent from "@/components/home/HomeContent";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const projects = getAllProjects();
  return <HomeContent projects={projects} />;
}
