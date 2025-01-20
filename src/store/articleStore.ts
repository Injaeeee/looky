import { create } from "zustand";

interface ArticleStore {
  ArticleId: string | null;
  setArticleId: (id: string | null) => void;
}

export const useArticleStore = create<ArticleStore>((set) => ({
  ArticleId: null,
  setArticleId: (id) => set({ ArticleId: id }),
}));
