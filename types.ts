import {
  projects,
  comments,
  user,
  links,
  language,
  Experince,
} from "@prisma/client";

export type projectWithCommenst = Omit<projects, "comments" | "user"> & {
  comments: CommentsWithUser[];
  user: user;
};

export type CommentsWithUser = Omit<comments, "createdBy"> & {
  createdBy: user;
};

export type userWithInfo = Omit<
  user,
  "projects" | "workExperince" | "languages" | "socialLinks"
> & {
  projects: projectWithCommenst[];
  socialLinks: links[];
  languages: language[];
  workExperince: Experince[];
};
