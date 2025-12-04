import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] }); 

export const metadata = {
  title: "Splitzy",
  description: "Because good friends deserve fair splits",
  icons: {
    icon: "/logos/Logo1.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/logos/Logo1.png" />
      </head>

      <body
        className={`${inter}`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
