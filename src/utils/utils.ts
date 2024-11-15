export const animationCreate = () => {
  if (typeof window !== "undefined") {
    (window as any).WOW = require("wowjs");
  }
  new (window as any).WOW.WOW({ live: false }).init();
};
