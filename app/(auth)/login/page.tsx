import type { Metadata } from "next"
import PageLogin from "../_components/page-login"

export const metadata: Metadata = {
  title: "Masuk | LaundryPro - Layanan Laundry Premium",
  description:
    "Masuk ke akun LaundryPro Anda untuk mengakses layanan laundry premium dengan pickup & delivery gratis. Daftar sekarang jika belum memiliki akun.",
  keywords: ["login laundry", "masuk laundrypro", "daftar laundry online", "akun laundry", "login aplikasi laundry"],
  openGraph: {
    title: "Masuk | LaundryPro - Layanan Laundry Premium",
    description:
      "Masuk ke akun LaundryPro Anda untuk mengakses layanan laundry premium dengan pickup & delivery gratis.",
    url: "https://laundrypro.id/login",
  },
  twitter: {
    title: "Masuk | LaundryPro - Layanan Laundry Premium",
    description:
      "Masuk ke akun LaundryPro Anda untuk mengakses layanan laundry premium dengan pickup & delivery gratis.",
  },
  alternates: {
    canonical: "https://laundrypro.id/login",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LoginPage() {
  return <PageLogin />
}
