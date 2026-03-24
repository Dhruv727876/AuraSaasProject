import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/ui/Preloader";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ThemeTintToggle } from "@/components/ui/ThemeTintToggle";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { WaitlistProvider } from "@/components/providers/WaitlistProvider";
import { BlueprintProvider } from "@/components/providers/BlueprintProvider";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Aura | Fluid Architecture & SaaS Infrastructure",
    template: "%s | Aura"
  },
  description: "We build software not as a tool, but as a structure that breathes. Aura is the high-fidelity monograph where code meets architectural clarity and global node engineering.",
  keywords: ["Aura Architecture", "SaaS Infrastructure", "Global Node Engineering", "Fluid Design", "Data Structure", "Architectural Software", "Digital Monograph"],
  authors: [{ name: "Aura Studio" }],
  creator: "Aura Studio",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aura.io",
    title: "Aura | Elite SaaS Architecture",
    description: "The next generation of digital infrastructure. Engineered for precision, designed for fluidity.",
    siteName: "Aura",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura | Elite SaaS Architecture",
    description: "Architecting the boundaries of digital infrastructure through high-fidelity distillation.",
    creator: "@aura_studio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased text-foreground bg-background selection:bg-primary selection:text-white`}>
        <BlueprintProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <SmoothScroll>
              <WaitlistProvider>
                <Preloader />
                <GrainOverlay />
                <CustomCursor />
                <ScrollProgress />
                <ThemeTintToggle />
                <Toaster position="bottom-right" closeButton />
                {children}
              </WaitlistProvider>
            </SmoothScroll>
          </ThemeProvider>
        </BlueprintProvider>
      </body>
    </html>
  );
}
