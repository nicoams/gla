import { configureStore } from "@reduxjs/toolkit";

import personagensSlicer from "@/lib/features/personagens/personagensSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      personagens: personagensSlicer
    },
  });
};
