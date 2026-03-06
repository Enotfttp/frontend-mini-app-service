import { create } from 'zustand';

interface SelectedCardStore {
  selectedCardId: string | null;
  openCard: (id: string) => void;
  closeCard: () => void;
}

export const useSelectedCardStore = create<SelectedCardStore>((set) => ({
  selectedCardId: null,
  openCard: (id) => set({ selectedCardId: id }),
  closeCard: () => set({ selectedCardId: null }),
}));
