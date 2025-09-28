import { Geist, Geist_Mono } from "next/font/google";
import NewNavBar from "../components/LandingPageComps/NewNavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NewNavBar />
      <main
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </main>
    </>
  );
}
