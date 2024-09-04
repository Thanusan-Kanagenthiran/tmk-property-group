import { useEffect, useState } from "react";
import { Button, Box, Avatar } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import AppDropDown from "@/components/Common/AppDropDown";
import AppSpinner from "../Common/AppSpinner";
import { Person, Logout } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { accountServices } from "@/services/users.service";

const ProfileOrAuthButtons = () => {
  const { status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await accountServices.GetAccountDetails();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const userAvatar = <Avatar alt={user?.name} src={user?.image} sx={{ width: 30, height: 30, mx: 2 }} />;

  const menuItems = [
    { label: "Profile", onClick: () => router.push("/profile"), icon: <Person /> },
    { label: "Dashboard", onClick: () => router.push("/dashboard"), icon: <DashboardIcon /> },
    { label: "Logout", onClick: () => signOut(), icon: <Logout /> }
  ];

  return (
    <>
      {status === "authenticated" && !loading && user && (
        <AppDropDown tooltipTitle="Profile" menu={userAvatar} menuItems={menuItems} />
      )}

      {status === "loading" || loading ? (
        <AppSpinner size={30} />
      ) : (
        status === "unauthenticated" && (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button color="primary" variant="contained" size="small" href="/sign-in/">
              Sign in
            </Button>
            <Button color="primary" variant="outlined" size="small" href="/sign-up/">
              Sign up
            </Button>
          </Box>
        )
      )}
    </>
  );
};

export default ProfileOrAuthButtons;
