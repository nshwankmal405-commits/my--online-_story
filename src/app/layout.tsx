import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";

export const metadata: Metadata = {
  title: {
    default: "نجوم الملعب | متجر الملابس والأحذية الرياضية الاحترافية",
    template: "%s | نجوم الملعب",
  },
  description: "متجر نجوم الملعب - وجهتك الأولى للملابس والأحذية الرياضية الاحترافية في اليمن. أحدث تشكيلة من قمصان الأندية والأحذية الرياضية وملابس التدريب من أشهر العلامات التجارية العالمية بأسعار تنافسية مع شحن لجميع أنحاء اليمن.",
  keywords: ["ملابس رياضية", "أحذية رياضية", "قمصان أندية", "نجوم الملعب", "ملابس تدريب", "رياضة", "اليمن", "شحن"],
  authors: [{ name: "نجوم الملعب" }],
  creator: "نجوم الملعب",
  publisher: "نجوم الملعب",
  openGraph: {
    type: "website",
    locale: "ar_YE",
    url: "https://3000-i9tqrsszlxh8mw3srxdlf.e2b.app",
    siteName: "نجوم الملعب",
    title: "نجوم الملعب | متجر الملابس الرياضية",
    description: "أحدث الملابس والأحذية الرياضية الاحترافية بأسعار مميزة مع شحن لجميع أنحاء اليمن",
  },
  twitter: {
    card: "summary_large_image",
    title: "نجوم الملعب | متجر الملابس الرياضية",
    description: "أحدث الملابس والأحذية الرياضية الاحترافية بأسعار مميزة",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: "your-verification-code",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0c4a6e" />
      </head>
      <body className="bg-white text-gray-900 font-[Tajawal] antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Cart />
          <WhatsAppButton />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SportsStore",
                "name": "نجوم الملعب",
                "alternateName": "Stars of the Field",
                "description": "متجر الملابس والأحذية الرياضية الاحترافية في اليمن",
                "url": "https://3000-ihmni7vzuz0hdsxz7eemh.e2b.app",
                "telephone": "+966712641249",
                "email": "aymnalahdl31@gmail.com",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "صنعاء",
                  "addressCountry": "YE"
                },
                "priceRange": "59 - 899 ريال",
                "openingHours": "Sa-Th 09:00-23:00",
                "currenciesAccepted": "SAR",
                "paymentAccepted": "Cash, Credit Card, Bank Transfer"
              }),
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
