import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TMK Property Group",
  description: "TMK Property Group is a property management system"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Box sx={{ pt: { xs: 10 } }}>{children}</Box>;
}
