export type Comment = {
  id: number;
  user: string;
  updatedAt: string; // string($date-time)
  createdAt: string; // string($date-time)
  content: string; // 최대 길이: 200
};
