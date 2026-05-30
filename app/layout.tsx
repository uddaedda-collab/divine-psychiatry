import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SiteChrome from "@/components/SiteChrome";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display"
});

const SITE_URL = "https://divinepsychiatry.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Divine Psychiatry Clinic — Dr. Sandeep Sharma | Sri Ganganagar",
    template: "%s · Divine Psychiatry Clinic"
  },
  description:
    "Compassionate, evidence-based psychiatric care by Dr. Sandeep Sharma. Mental wellness, addiction recovery, preventive health and healthy ageing — Sri Ganganagar, Rajasthan.",
  keywords: [
    "psychiatrist Sri Ganganagar",
    "Dr. Sandeep Sharma",
    "Divine Psychiatry Clinic",
    "mental health Rajasthan",
    "depression treatment",
    "anxiety treatment",
    "addiction recovery",
    "geriatric psychiatry",
    "child psychiatry",
    "online psychiatrist consultation"
  ],
  authors: [{ name: "Dr. Sandeep Sharma" }],
  creator: "Divine Psychiatry Clinic",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Divine Psychiatry Clinic",
    title: "Divine Psychiatry Clinic — Dr. Sandeep Sharma",
    description:
      "Premium psychiatric care, mental wellness and longevity medicine. Compassionate, evidence-based and confidential.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Divine Psychiatry Clinic" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Divine Psychiatry Clinic — Dr. Sandeep Sharma",
    description:
      "Compassionate, evidence-based psychiatric care. Mental wellness, addiction recovery, healthy ageing."
  },
  alternates: { canonical: SITE_URL },
  category: "health"
};

export const viewport: Viewport = {
  themeColor: "#04070d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Divine Psychiatry Clinic",
    url: SITE_URL,
    image: `${SITE_URL}/og.png`,
    telephone: "+91-00000-00000",
    medicalSpecialty: "Psychiatry",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Divine Psychiatry Clinic",
      addressLocality: "Sri Ganganagar",
      addressRegion: "Rajasthan",
      postalCode: "335001",
      addressCountry: "IN"
    },
    founder: {
      "@type": "Physician",
      name: "Dr. Sandeep Sharma",
      jobTitle: "Consultant Psychiatrist"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "180"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="app-bg font-sans">
        <SmoothScroll>
          <SiteChrome>{children}</SiteChrome>
        </SmoothScroll>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      </body>
    </html>
  );
}
