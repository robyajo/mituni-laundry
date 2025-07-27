import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shirt,
  Truck,
  Star,
  CheckCircle,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  metadataBase: new URL(siteConfig.url.base),
  title: `Home`,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url.author,
    },
  ],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url.base,
    languages: {
      "id-ID": "/",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "government",
  classification: "government services",
  applicationName: siteConfig.name,
});
export default function LandingPage() {
  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${process.env.NEXT_PUBLIC_APP_URL}`,
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
        <div className="@container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🚀 Layanan Pickup & Delivery Gratis
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  {siteConfig.name}
                  <span className="text-primary"> Berkualitas</span>
                  <br />
                  di Ujung Jari
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                  Nikmati layanan laundry premium dengan teknologi modern.
                  Pickup gratis, cuci bersih, dan antar kembali dalam 24 jam.
                  Mudah, cepat, dan terpercaya!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/login">
                    Pesan Sekarang
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 bg-transparent"
                >
                  Lihat Harga
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Pickup & Delivery Gratis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Garansi Bersih 100%</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/assets/sample-avatar.svg"
                alt="LaundryPro App Dashboard - Aplikasi laundry online terbaik"
                width={800}
                height={600}
                className="rounded-xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="layanan" className="py-20 md:py-32">
        <div className="@container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              {siteConfig.name}
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Layanan Laundry Terlengkap
            </h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Dari cuci reguler hingga dry cleaning premium, kami menyediakan
              semua kebutuhan laundry Anda
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                  <Shirt className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Cuci Reguler</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cuci bersih pakaian sehari-hari dengan deterjen berkualitas
                  dan pewangi yang tahan lama.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                  <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Dry Cleaning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Perawatan khusus untuk pakaian formal, jas, gaun, dan
                  bahan-bahan yang memerlukan penanganan khusus.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Express Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Layanan kilat untuk kebutuhan mendesak. Selesai dalam 6 jam
                  dengan kualitas terjamin.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900">
                  <Truck className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>Pickup & Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Layanan antar jemput gratis di area Jabodetabek. Jadwalkan
                  pickup sesuai waktu Anda.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="harga" className="py-20 md:py-32 bg-muted/50">
        <div className="@container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              Harga Terjangkau
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Paket Laundry Pilihan
            </h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Pilih paket yang sesuai dengan kebutuhan Anda. Semua paket sudah
              termasuk pickup & delivery gratis.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Paket Reguler</CardTitle>
                <CardDescription>
                  Cocok untuk kebutuhan sehari-hari
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Rp 5.000</span>
                  <span className="text-muted-foreground">/kg</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Cuci + Kering + Lipat</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Selesai 2-3 hari</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Pickup & Delivery Gratis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Pewangi Standar</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                Terpopuler
              </Badge>
              <CardHeader>
                <CardTitle>Paket Premium</CardTitle>
                <CardDescription>
                  Kualitas terbaik dengan layanan express
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Rp 8.000</span>
                  <span className="text-muted-foreground">/kg</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">
                      Cuci + Kering + Setrika + Lipat
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Selesai 24 jam</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Pickup & Delivery Gratis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Pewangi Premium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Plastik Wrapping</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle>Paket VIP</CardTitle>
                <CardDescription>
                  Layanan eksklusif untuk pakaian premium
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Rp 15.000</span>
                  <span className="text-muted-foreground">/kg</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Dry Cleaning + Setrika</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Selesai 12 jam</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Pickup & Delivery Priority</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Pewangi Luxury</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Hanger Premium</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimoni" className="py-20 md:py-32">
        <div className="@container px-4 md:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              Testimoni
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Dipercaya Ribuan Pelanggan
            </h2>
            <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
              Lihat apa kata pelanggan kami tentang kualitas layanan LaundryPro
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "Pelayanan LaundryPro sangat memuaskan! Pakaian selalu bersih
                  dan wangi. Pickup dan delivery tepat waktu. Recommended
                  banget!"
                </p>
                <div className="flex items-center space-x-3">
                  <Image
                    src="/assets/sample-avatar.svg?height=40&width=40&text=SR"
                    alt="Sari Rahayu - Pelanggan LaundryPro"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Sari Rahayu</p>
                    <p className="text-sm text-muted-foreground">
                      Ibu Rumah Tangga
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "Sebagai pekerja kantoran yang sibuk, LaundryPro sangat
                  membantu. Aplikasinya mudah digunakan dan hasilnya selalu
                  memuaskan."
                </p>
                <div className="flex items-center space-x-3">
                  <Image
                    src="/assets/sample-avatar.svg?height=40&width=40&text=BP"
                    alt="Budi Pratama - Pelanggan LaundryPro"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Budi Pratama</p>
                    <p className="text-sm text-muted-foreground">
                      Karyawan Swasta
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "Harga terjangkau dengan kualitas premium. Dry cleaning untuk
                  jas kantor hasilnya sempurna. Terima kasih LaundryPro!"
                </p>
                <div className="flex items-center space-x-3">
                  <Image
                    src="/assets/sample-avatar.svg?height=40&width=40&text=DF"
                    alt="Dewi Fortuna - Pelanggan LaundryPro"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Dewi Fortuna</p>
                    <p className="text-sm text-muted-foreground">Manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="@container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold">10,000+</div>
              <div className="text-primary-foreground/80">Pelanggan Puas</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">50,000+</div>
              <div className="text-primary-foreground/80">Pakaian Dicuci</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">99.9%</div>
              <div className="text-primary-foreground/80">Tingkat Kepuasan</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">24/7</div>
              <div className="text-primary-foreground/80">Customer Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
        <div className="@container px-4 md:px-6 text-center">
          <div className="space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Siap Mencoba LaundryPro?
            </h2>
            <p className="text-xl text-muted-foreground">
              Bergabunglah dengan ribuan pelanggan yang sudah merasakan
              kemudahan layanan laundry premium kami. Daftar sekarang dan
              dapatkan diskon 20% untuk pemesanan pertama!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/login">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent"
              >
                Hubungi Kami
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Gratis pickup & delivery • Garansi bersih 100% • Customer service
              24/7
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
