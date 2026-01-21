import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CryptoTracker",
  description: "Real-time cryptocurrency tracker using CoinGecko API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full relative`}>
        {/* Animated dark gradient background */}
        <div className="fixed inset-0 bg-black z-0">
          <div className="bg-animated-gradient absolute inset-0"></div>
        </div>

        {/* Floating dots & blobs */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="bg-dots"></div>
          <div className="bg-blob top-10 left-20"></div>
          <div className="bg-blob top-80 left-72"></div>
          <div className="bg-blob top-1/2 left-1/2"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
