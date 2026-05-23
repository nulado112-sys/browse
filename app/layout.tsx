import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mayel — Order · Eat · Repeat",
  description:
    "Mayel Restaurant — Premium burgers, sandwiches, kaaek and more. Order · Eat · Repeat.",
  keywords: ["Mayel", "restaurant", "burgers", "sandwiches", "kaaek", "food"],
  openGraph: {
    title: "Mayel Restaurant",
    description: "Order · Eat · Repeat",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mayel Restaurant Logo - Order Eat Repeat",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#06070f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Always scroll to top on page load/refresh — fires after browser scroll restore */}
        <script dangerouslySetInnerHTML={{ __html: `
          if(history.scrollRestoration) history.scrollRestoration='manual';
          window.scrollTo(0,0);
          window.addEventListener('load', function(){ setTimeout(function(){ window.scrollTo(0,0); }, 0); });
          window.addEventListener('pageshow', function(){ setTimeout(function(){ window.scrollTo(0,0); }, 0); });
        `}} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Inter:wght@300;400;500;600;700&family=Raleway:wght@700;800;900&family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-dark-bg text-cream antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
