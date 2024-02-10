import { create } from "zustand";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { user } from "@prisma/client";
import { projectWithCommenst, userWithInfo } from "@/types";

export type modelType =
  | "Login"
  | "register"
  | "addProject"
  | "updateProject"
  | "editProfile"
  | "addExp"
  | "addLan"
  | "AddLink";

export interface modelStore {
  type: modelType | null;
  data: modelData;
  isOpen: boolean;
  onOpen: (type: modelType, data?: modelData) => void;
  onClose: () => void;
}

interface modelData {
  currentUser?: userWithInfo;
  project?: projectWithCommenst;
  isEditingProject?: boolean;
}

export const useModal = create<modelStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type: modelType, data = {}) =>
    set({ isOpen: true, type: type, data: data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
