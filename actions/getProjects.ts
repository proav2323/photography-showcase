import { db } from "@/libs/sb";

export default async function getProjects() {
  try {
    const projects = await db.projects.findMany({
      include: {
        comments: {
          include: {
            createdBy: true,
          },
        },
        user: true,
      },
    });

    if (projects.length <= 0) {
      return [];
    }

    return projects;
  } catch (Err) {
    console.log(Err);
    return [];
  }
}
