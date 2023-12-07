import { create } from "zustand";
import type { SetState } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { MappingAlgorithm } from "antd";
import { calculateBackgroundColor } from "../../utils";
import { AliasToken } from "antd/es/theme/interface";

export interface ILayoutState {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
  tokenConfig: Partial<AliasToken>;
  setTokenConfig: (config: Partial<AliasToken>) => void;
  algorithmConfig: MappingAlgorithm | MappingAlgorithm[] | undefined;
  setAlgorithmConfig: (config: MappingAlgorithm | MappingAlgorithm[] | undefined) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const useLayoutStore = create(
  persist(
    (set: SetState<ILayoutState>): ILayoutState => {
      const themeColor = "#10aec2";
      const { shade } = calculateBackgroundColor(themeColor);
      return {
        mode: "light",
        setMode: (mode) => set({ mode }),
        tokenConfig: {
          colorPrimary: themeColor,
          colorBgLayout: shade
        },
        setTokenConfig: (config) => set({ tokenConfig: config }),
        algorithmConfig: undefined,
        setAlgorithmConfig: (config) => set({ algorithmConfig: config }),
        collapsed: false,
        setCollapsed: (collapsed) => set({ collapsed })
      };
    },
    {
      name: "layout-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage) // (optional) by default, 'localStorage' is used
    }
  )
);
