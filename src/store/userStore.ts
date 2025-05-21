import { create } from 'zustand';

interface UserState {
  streak: number;
  xp: number;
  setStreak: (value: number) => void;
  setXp: (value: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  streak: 0,
  xp: 0,
  setStreak: (streak) => set({ streak }),
  setXp: (xp) => set({ xp })
}));
