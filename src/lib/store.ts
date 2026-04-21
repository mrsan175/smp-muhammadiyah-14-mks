import { create } from "zustand";

interface AdminUIState {
  isFormOpen: boolean;
  setFormOpen: (open: boolean) => void;
  selectedItem: any | null;
  setSelectedItem: (item: any | null) => void;
}

export const useAdminUIStore = create<AdminUIState>((set) => ({
  isFormOpen: false,
  setFormOpen: (open) => set((state) => ({ isFormOpen: open, selectedItem: open ? state.selectedItem : null })),
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));
