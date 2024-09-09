import { useEffect } from "react";
import { Button, Box, Avatar } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import AppDropDown from "@/components/Common/AppDropDown";
import { Person, Logout } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

const AvatarMenuOrAuthButtons = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        update();
      }
    };

    const interval = setInterval(update, 1000 * 60 * 60);
    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [update]);

  const userAvatar = session && (
    <Avatar
      alt={session.user?.name || "User"}
      src={session.user?.image || "/default-avatar.png"}
      sx={{ width: 30, height: 30, mx: 2 }}
    />
  );

  const menuItems = [
    {
      label: "Profile",
      onClick: () => router.push("/dashboard/account"),
      icon: <Person sx={{ fontSize: 16 }} />,
    },
    ...(session?.user?.role === "host"
      ? [
          {
            label: "Dashboard",
            onClick: () => router.push("/dashboard"),
            icon: <DashboardIcon sx={{ fontSize: 16 }} />,
          },
          {
            label: "Properties",
            onClick: () => router.push("/dashboard/properties"),
            icon: <MapsHomeWorkIcon sx={{ fontSize: 16 }} />,
          },
        ]
      : []),
    {
      label: "Bookings",
      onClick: () => router.push("/dashboard/bookings"),
      icon: <AddBusinessIcon sx={{ fontSize: 16 }} />,
    },
    {
      label: "Logout",
      onClick: () => signOut(),
      icon: <Logout sx={{ fontSize: 16 }} />,
    },
  ];

  return status === "authenticated" ? (
    <AppDropDown
      tooltipTitle="Profile"
      menu={userAvatar}
      menuItems={menuItems}
    />
  ) : (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Button color="primary" variant="contained" size="small" href="/sign-in/">
        Sign in
      </Button>
      <Button
        color="secondary"
        variant="contained"
        size="small"
        href="/sign-up/"
      >
        Sign up
      </Button>
    </Box>
  );
};

export default AvatarMenuOrAuthButtons;
