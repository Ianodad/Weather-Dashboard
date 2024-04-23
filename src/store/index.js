import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import appStore from "./app";

export const useMCStore = create(
  devtools(
    persist(
      immer(
        (...a) => ({
          ...appStore(...a),
        }),
        {
          name: "SkySight",
          onRehydrateStorage(state) {
            console.error("State on hydrate", state);
          },
        }
      )
    )
  )
);
