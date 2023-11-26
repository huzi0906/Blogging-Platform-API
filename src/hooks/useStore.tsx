import create from "zustand";

type State = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const useStore = create<State>(set => ({
  token: null,
  setToken: token => set({ token }),
}));
