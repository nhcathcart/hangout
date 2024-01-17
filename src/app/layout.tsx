import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const heebo = Heebo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heebo",
});

export const metadata: Metadata = {
  title: "bb",
  description: "A place to post memes, and generally bullshit around.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heebo.variable} `}>
      <body className="xl:items-center xl:flex-col w-full font-heebo font-thin text-neutral-900 bg-neutral-50">
        <Navbar />
        <div className="w-full max-w-[1920px] mt-[10vh]">{children}</div>
      </body>
    </html>
  );
}
