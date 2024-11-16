import localFont from "next/font/local";

const switzer = localFont({
  src: [
    {
      path: "./Switzer-Regular.otf",
      weight: "400"
    },
    {
      path: "./Switzer-Medium.otf",
      weight: "500"
    },
    {
      path: "./Switzer-Semibold.otf",
      weight: "600"
    }
  ],
  variable: "--font-sans"
});

export const fonts = [switzer];
