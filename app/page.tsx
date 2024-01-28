import getCurrentUser  from "@/actions/getCurrentUser";
import getProjects from "@/actions/getProjects";
import Heading from "@/components/Heading";
import ProjectsList from "@/components/ProjectsList";
import { projectWithCommenst } from "@/types";


export default async function Home() {
   const currentUser = await getCurrentUser()
   const projects: projectWithCommenst[] = await getProjects();
  return (
     <div className="flex flex-col gap-2 px-2 my-2">
      <Heading title="Projects" subtitle="Added Projects" />
      <ProjectsList projects={projects} />
     </div>
  );
}
