import { db } from "@/libs/sb";

export async function getSaerchedJobs({ search }: { search: string }) {
  let query = {};
  let jobs;
  console.log(search);
  if (search) {
    jobs = await db.projects.findMany({
      where: {
        OR: [
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            moreToKnow: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        comments: {
          include: {
            createdBy: true,
          },
        },
        user: true,
      },
    });
  } else {
    jobs = await db.projects.findMany({
      include: {
        comments: {
          include: {
            createdBy: true,
          },
        },
        user: true,
      },
    });
  }

  return jobs;
}
