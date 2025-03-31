import { createContext, Dispatch, SetStateAction } from "react";

export const CasinoDetailsContext = createContext<{
  id: string;
  setId: Dispatch<SetStateAction<string>>;
}>({ id: "", setId: () => "" });
