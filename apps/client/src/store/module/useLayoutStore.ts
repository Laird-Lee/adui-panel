import { create } from "zustand";
import { AliasToken } from "antd/es/theme/interface";

export interface ILayoutState {
  token?: Partial<AliasToken>;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const useLayoutStore = create<ILayoutState>((set) => ({
  token: {
    colorPrimary: "#10aec2",
    headerBg: "#d8e3e7",
    siderBg: "#d8e3e7",
    footerBg: "#d8e3e7"
  },
  collapsed: false,
  setCollapsed: (collapsed) => set({ collapsed })
}));
