import { projects, comments, user } from "@prisma/client";

export type projectWithCommenst = Omit<projects, "comments" | "user"> & {
  comments: CommentsWithUser[];
  user: user;
};

export type CommentsWithUser = Omit<comments, "createdBy"> & {
  createdBy: user;
};
