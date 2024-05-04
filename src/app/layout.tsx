import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Provider from "./_trpc/Provider";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokeHub",
  description: "A hub for all things Pokémon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          <Box sx={{ minHeight: "calc(100vh - 100px)", position: "relative" }}>
            {children}
          </Box>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
