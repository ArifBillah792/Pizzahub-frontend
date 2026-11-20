import { Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata = {
  title: "PizzaHub — Hot & Fresh Pizza Delivered",
  description:
    "Discover local pizza shops, browse menus and order your favourite pizza online.",
};

export default function RootLayout({ children }) {
  const htmlClass = `${sora.variable} dark h-full antialiased`;

  return (
    <html lang="en" className={htmlClass}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <Toaster richColors theme="dark" position="top-center" />

        <Toaster richColors theme="dark" position="top-center" />
      </body>
    </html>
  );
}
