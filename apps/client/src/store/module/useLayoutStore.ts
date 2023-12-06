import { create } from "zustand";
import type { SetState } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ThemeConfig } from "antd";
import { calculateBackgroundColor } from "../../utils";

export interface ILayoutState {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
  themeConfig: ThemeConfig;
  originThemeConfig: ThemeConfig;
  setTheme: (config: ThemeConfig) => void;
  setOriginTheme: (config: ThemeConfig) => void;
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
        themeConfig: {
          token: {
            colorPrimary: themeColor,
            colorBgLayout: shade
          }
        },
        setTheme: (config) => set({ themeConfig: config }),
        originThemeConfig: {
          token: {
            colorPrimary: themeColor,
            colorBgLayout: shade
          }
        },
        setOriginTheme: (config) => set({ themeConfig: config }),
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
