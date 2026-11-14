import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#174F68",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://eloramoments.com"),
  title: "Aadhvik's First Birthday Celebration | Elora Moments",
  description:
    "With Little Footsteps and Big Blessings – You are cordially invited to celebrate Aadhvik's 1st Birthday with Lord Krishna's divine grace.",
  openGraph: {
    title: "Aadhvik's First Birthday Celebration | Elora Moments",
    description: "You're Invited! Join us for Aadhvik's 1st Birthday on 15 March 2027.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect & Google Fonts Stylesheet */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Noto+Serif+Tamil:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-deep-night text-ivory-cream selection:bg-antique-gold selection:text-deep-night antialiased">
        {children}
      </body>
    </html>
  );
}
