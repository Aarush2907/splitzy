import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Splitzy",
  description: "Because good friends deserve fair splits",
  icons: {
    icon: "/logos/Logo1.png",
  },
};

import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>

      <head>
        <link rel="icon" type="image/png" href="/logos/Logo1.png" />
      </head>

      <body
        className={`${inter}`}
      >
        <ClerkProvider>
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <main className="min-h-screen">
                {children}
                <Toaster richColors /> 
              </main>
              <Footer />
            </ThemeProvider>
          </ConvexClientProvider>

        </ClerkProvider>
      </body>
    </html>
  );
}
