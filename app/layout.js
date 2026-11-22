import { Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

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
  const htmlClass = `${sora.variable} h-full antialiased`;

  return (
    <html lang="en" className={htmlClass} suppressHydrationWarning>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
