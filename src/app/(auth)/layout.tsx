import type { Metadata } from "next";
import { Box } from "@mui/material";
import { GifBox } from "@mui/icons-material";

export const metadata: Metadata = {
  title: "TMK Property Group",
  description: "TMK Property Group is a property management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Box>{children}</Box>;
}
