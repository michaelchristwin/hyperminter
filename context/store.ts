import { create } from "zustand";

interface State {
  program: string;
  setProgram: (arg: string) => void;
}

const useStore = create<State>((set) => ({
  program: "",
  setProgram: (newProgram: string) => set({ program: newProgram }),
}));

export default useStore;
