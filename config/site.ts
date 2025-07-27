import { SiteConfig } from "@/types";

// Environment Variables
const nameApp = process.env.NEXT_PUBLIC_APP_NAME;
const urlApp = process.env.NEXT_PUBLIC_APP_URL;
export const runtime = "edge";
export const siteConfig: SiteConfig = {
  name: `${nameApp}`,
  author: "Roby Ajo",
  description: `${nameApp} - Layanan Laundry Premium dengan Pickup & Delivery Gratis.`,
  keywords: [
    `${nameApp}`,
    "Laundry",
    "Laundry Online",
    "Laundry Jakarta",
    "Laundry Online Murah",
    "Pickup Delivery Laundry Gratis",
    "Dry Cleaning Jakarta",
    "Laundry Express 24 Jam",
    "Jasa Laundry Terpercaya",
    "Aplikasi Laundry Indonesia",
    "Cuci Baju Online",
    "Laundry Premium Jakarta",
    "Antar Jemput Laundry",
    "Laundry Jakarta",
    "Laundry Online Murah",
    "Pickup Delivery Laundry Gratis",
    "Dry Cleaning Jakarta",
    "Laundry Express 24 Jam",
    "Jasa Laundry Terpercaya",
    "Aplikasi Laundry Indonesia",
    "Cuci Baju Online",
    "Laundry Premium Jakarta",
    "Antar Jemput Laundry",
    "Laundry Jakarta",
    "Laundry Online Murah",
    "Pickup Delivery Laundry Gratis",
    "Dry Cleaning Jakarta",
    "Laundry Express 24 Jam",
    "Jasa Laundry Terpercaya",
    "Aplikasi Laundry Indonesia",
    "Cuci Baju Online",
    "Laundry Premium Jakarta",
    "Antar Jemput Laundry",

   
  ],
  url: {
    base: `${urlApp}`,
    author: "https://portfolio-roby.vercel.app",
  },
  links: {
    github: "https://github.com/robyajo",
  },
  ogImage: `${urlApp}/og.jpg`,
  locale: "id_ID",
  type: "website",
  publishedTime: new Date().toISOString(),
  twitterCard: "summary_large_image",
};


