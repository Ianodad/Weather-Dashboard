import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import appStore from "./app";

const useSkySiteStore = create(
  devtools(
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
);
export default useSkySiteStore;
