import { db } from "@/libs/sb";

export default async function getUser(id: string) {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
    include: {
      projects: {
        include: {
          comments: {
            include: {
              createdBy: true,
            },
          },
          user: true,
        },
      },
      workExperince: true,
      languages: true,
      socialLinks: true,
    },
  });

  return user;
}
