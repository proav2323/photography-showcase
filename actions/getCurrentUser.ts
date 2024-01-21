import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/libs/sb";
export const getSession = async () => {
  getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  // try {
  //   const session = await getSession();
  //   if (!session?.user?.email) {
  //     return null;
  //   }
  //   const user = db.user.findUnique({
  //     where: {
  //       email: session.user.email,
  //     },
  //   });
  //   return user;
  // } catch (err) {
  //   console.log({ err: err });
  //   return null;
  // }
  getSession();
  return null;
};
