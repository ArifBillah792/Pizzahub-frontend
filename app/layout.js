import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata = {
  title: "PizzaHub — Hot & Fresh Pizza Delivered",
  description:
    "Discover local pizza shops, browse menus and order your favourite pizza online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
