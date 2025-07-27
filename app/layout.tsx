

import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import QueryProvider from "@/provider/QueryProvider";
import NextAuthSessionProvider from "@/provider/SessionProvider";




import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  colorScheme: "light dark",
}

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Nikmati layanan laundry premium LaundryPro dengan pickup & delivery gratis. Cuci reguler, dry cleaning, express service dalam 24 jam. Garansi bersih 100%. Pesan sekarang!",
  keywords: [
    "laundry",
    "laundry jakarta",
    "laundry online",
    "pickup delivery laundry",
    "dry cleaning",
    "cuci baju",
    "laundry express",
    "laundry premium",
    "jasa laundry",
    "laundry terdekat",
    "aplikasi laundry",
    "laundry murah",
    "laundry berkualitas",
    "antar jemput laundry",
  ],
  authors: [{ name: "LaundryPro Team" }],
  creator: "LaundryPro",
  publisher: "LaundryPro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "business",
  classification: "Laundry Service",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description:
      "Nikmati layanan laundry premium LaundryPro dengan pickup & delivery gratis. Cuci reguler, dry cleaning, express service dalam 24 jam. Garansi bersih 100%.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LaundryPro - Layanan Laundry Premium",
        type: "image/jpeg",
      },
      {
        url: "/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "LaundryPro Logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@laundrypro_id",
    creator: "@laundrypro_id",
    title: siteConfig.name,
    description:
      "Nikmati layanan laundry premium LaundryPro dengan pickup & delivery gratis. Cuci reguler, dry cleaning, express service dalam 24 jam. Garansi bersih 100%.",
    images: ["/twitter-image.jpg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LaundryPro",
    startupImage: [
      "/apple-touch-startup-image-768x1004.png",
      {
        url: "/apple-touch-startup-image-1536x2008.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
  applicationName: "LaundryPro",
  appLinks: {
    ios: {
      url: "laundrypro://app",
      app_store_id: "123456789",
    },
    android: {
      package: "id.laundrypro.app",
      app_name: "LaundryPro",
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-config": "/browserconfig.xml",
    "color-scheme": "light dark",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme Color Meta Tags */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />

        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="ID-JK" />
        <meta name="geo.placename" content="Jakarta" />
        <meta name="geo.position" content="-6.2088;106.8456" />
        <meta name="ICBM" content="-6.2088, 106.8456" />

        {/* Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${process.env.NEXT_PUBLIC_APP_URL}/#business`,
              name: siteConfig.name,
              image: `${process.env.NEXT_PUBLIC_APP_URL}/assets/og.jpg`,
              description: "Layanan laundry premium dengan pickup & delivery gratis di Jakarta",
              url: `${process.env.NEXT_PUBLIC_APP_URL}`,
              telephone: "+62-812-3456-7890",
              email: "info@laundrypro.id",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Jl. Sudirman No. 123",
                addressLocality: "Jakarta",
                addressRegion: "DKI Jakarta",
                postalCode: "10220",
                addressCountry: "ID",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -6.2088,
                longitude: 106.8456,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "06:00",
                  closes: "22:00",
                },
              ],
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: -6.2088,
                  longitude: 106.8456,
                },
                geoRadius: "50000",
              },
              priceRange: "Rp 5.000 - Rp 15.000",
              paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Mobile Payment"],
              currenciesAccepted: "IDR",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Layanan Laundry",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Cuci Reguler",
                      description: "Layanan cuci standar untuk pakaian sehari-hari",
                    },
                    price: "5000",
                    priceCurrency: "IDR",
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      price: "5000",
                      priceCurrency: "IDR",
                      referenceQuantity: {
                        "@type": "QuantitativeValue",
                        value: "1",
                        unitCode: "KGM",
                      },
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Dry Cleaning",
                      description: "Perawatan khusus untuk pakaian premium",
                    },
                    price: "15000",
                    priceCurrency: "IDR",
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      price: "15000",
                      priceCurrency: "IDR",
                      referenceQuantity: {
                        "@type": "QuantitativeValue",
                        value: "1",
                        unitCode: "KGM",
                      },
                    },
                  },
                ],
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "1250",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Sari Rahayu",
                  },
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  reviewBody:
                    "Pelayanan LaundryPro sangat memuaskan! Pakaian selalu bersih dan wangi. Pickup dan delivery tepat waktu. Recommended banget!",
                  datePublished: "2024-01-15",
                },
              ],
              sameAs: [
                "https://www.facebook.com/laundrypro.id",
                "https://www.instagram.com/laundrypro.id",
                "https://twitter.com/laundrypro_id",
              ],
            }),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://laundrypro.id/#website",
              url: "https://laundrypro.id",
              name: "LaundryPro",
              description: "Layanan laundry premium dengan pickup & delivery gratis",
              publisher: {
                "@id": "https://laundrypro.id/#business",
              },
              potentialAction: [
                {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://laundrypro.id/search?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
              ],
              inLanguage: "id-ID",
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://laundrypro.id/#organization",
              name: "LaundryPro",
              url: "https://laundrypro.id",
              logo: "https://laundrypro.id/logo.png",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+62-812-3456-7890",
                  contactType: "customer service",
                  areaServed: "ID",
                  availableLanguage: ["Indonesian", "English"],
                  hoursAvailable: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    opens: "06:00",
                    closes: "22:00",
                  },
                },
              ],
              sameAs: [
                "https://www.facebook.com/laundrypro.id",
                "https://www.instagram.com/laundrypro.id",
                "https://twitter.com/laundrypro_id",
              ],
            }),
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Berapa lama waktu pengerjaan laundry?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Waktu pengerjaan bervariasi: Paket Reguler 2-3 hari, Paket Premium 24 jam, Paket VIP 12 jam, dan Express Service 6 jam.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Apakah ada layanan pickup dan delivery?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ya, kami menyediakan layanan pickup dan delivery gratis untuk semua area Jabodetabek. Anda bisa jadwalkan pickup sesuai waktu yang diinginkan.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Bagaimana cara memesan layanan LaundryPro?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Anda bisa memesan melalui aplikasi mobile kami atau website. Daftar akun, pilih layanan, jadwalkan pickup, dan kami akan datang ke lokasi Anda.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Apakah ada garansi untuk hasil laundry?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ya, kami memberikan garansi bersih 100%. Jika Anda tidak puas dengan hasil laundry, kami akan mengulang proses tanpa biaya tambahan.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <TooltipProvider>
            <SonnerToaster />
            <QueryProvider>
              <NextAuthSessionProvider>
                <div className="" vaul-drawer-wrapper="">
                  {children}
                </div>
              </NextAuthSessionProvider>
            </QueryProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
