import { Button, Box, Avatar } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import { AppDropDown } from "@/components/Common";
import AppSpinner from "../Common/AppSpinner";

const ProfileOrAuthButtons = () => {
  const { status, data: session } = useSession();
  const user = session?.user;
  const userAvatar = <Avatar alt={user?.name as string} src="/profile.jpeg" sx={{ width: 30, height: 30, mx: 2 }} />;

  return (
    <>
      {status === "authenticated" && (
        <AppDropDown tooltipTitle="Profile" menu={userAvatar} menuItems={[{ label: "Logout", onClick: signOut }]} />
      )}

      {status === "loading" && <AppSpinner size={30} />}

      {status === "unauthenticated" && (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button color="primary" variant="contained" size="small" href="/sign-in/">
            Sign in
          </Button>
          <Button color="primary" variant="outlined" size="small" href="/sign-up/">
            Sign up
          </Button>
        </Box>
      )}
    </>
  );
};

export default ProfileOrAuthButtons;
