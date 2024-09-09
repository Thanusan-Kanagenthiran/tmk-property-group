"use client";

import { useRouter } from "next/navigation";
import { Paths } from "@/constants/Paths";
import { useSession } from "next-auth/react";
import { Box } from "@mui/material";
import AuthLoader from "@/components/Auth/AuthLoader";
import ClientDashboardLayout from "./ClientDashboardLayout";

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useSession();

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <AuthLoader />
      </Box>
    );
  }

  if (status !== "authenticated") {
    router.push(Paths.SIGN_IN);
    return null;
  }

  return <ClientDashboardLayout>{children}</ClientDashboardLayout>;
}
