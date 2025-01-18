import { User } from "./user.types";

export type Comment = {
  id: number;
  user: User;
  updatedAt: string;
  createdAt: string;
  content: string;
};
