// ThemeColorCalculator.ts
import tinycolor from "tinycolor2";

interface BackgroundColors {
  tint: string;
  shade: string;
  tone: string;
}

function mix(color1: string, color2: string, weight = 50): string {
  return tinycolor.mix(color1, color2, weight).toHexString();
}

export function calculateBackgroundColor(themeColorHex: string): BackgroundColors {
  return {
    tint: mix("#ffffff", themeColorHex, 30), // Tint - add white
    shade: mix("#000000", themeColorHex, 50), // Shade - add black
    tone: mix("#808080", themeColorHex, 30) // Tone - add gray
  };
}
