import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/libs/sb";
export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const user = db.user.findUnique({
      where: {
        email: session.user.email as string,
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
  } catch (err) {
    console.log({ err: err });
    return null;
  }
}
