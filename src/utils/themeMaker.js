import { hexToHSL } from "./hexToHSL";

export const themeMaker = hexColor => {
  // let color =  new ToHSL("var(--color1)");
  let color = new hexToHSL(hexColor);
  let color1 = color.getColor();
  document.documentElement.style.setProperty("--color1", color1);

  let color2_S = color.getSValue() - 60;
  let color2_L = color.getLValue();
  let color2 = color.getColor(color2_S, color2_L);
  document.documentElement.style.setProperty("--color2", color2);

  let color3_S = color.getSValue() - 5;
  let color3_L = color.getLValue() + 23;
  let color3 = color.getColor(color3_S, color3_L);
  document.documentElement.style.setProperty("--color3", color3);

  let color4_S = color.getSValue() - 14;
  let color4_L = color.getLValue() + 40;
  let color4 = color.getColor(color4_S, color4_L);
  document.documentElement.style.setProperty("--color4", color4);

  let color5_S = color.getSValue() - 18;
  let color5_L = color.getLValue() + 57;
  let color5 = color.getColor(color5_S, color5_L);
  document.documentElement.style.setProperty("--color5", color5);
};
