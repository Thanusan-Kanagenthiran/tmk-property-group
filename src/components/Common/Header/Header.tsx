"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter, usePathname } from "next/navigation";
import { Paths } from "@/constants/Paths";
import AvatarMenuOrAuthButtons from "@/components/Auth/AvatarMenuOrAuthButtons";
import Logo from "../Logo";
import { Divider } from "@mui/material";

function AppHeader() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const menuItems = (
    <Box
      sx={{
        display: "flex",
        py: 2,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <MenuItem
        onClick={() => {
          router.push("/properties");
        }}
        sx={{ py: "6px", px: "12px" }}
      >
        <Typography variant="body2" color="text.primary">
          Features
        </Typography>
      </MenuItem>
    </Box>
  );

  return (
    <Container sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Toolbar
        variant="regular"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          backdropFilter: "blur(24px)",
          maxHeight: 40,
          borderColor: "divider",
          maxWidth: "lg",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            ml: "-18px",
            px: 0,
          }}
        >
          <Logo />
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>{menuItems}</Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          {pathname !== Paths.SIGN_IN && pathname !== Paths.SIGN_UP && (
            <AvatarMenuOrAuthButtons />
          )}
        </Box>

        <Box sx={{ display: { sm: "", md: "none" } }}>
          <Button
            variant="text"
            color="primary"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ minWidth: "30px", p: "4px" }}
          >
            <MenuIcon />
          </Button>
        </Box>
      </Toolbar>
      <Drawer
        sx={{ display: { sm: "", md: "none" } }}
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            minWidth: "50dvw",
            p: 2,
            backgroundColor: "background.paper",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              flexGrow: 1,
            }}
          >
            <Box>
              {pathname !== Paths.SIGN_IN && pathname !== Paths.SIGN_UP && (
                <AvatarMenuOrAuthButtons />
              )}
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          {menuItems}
        </Box>
      </Drawer>
    </Container>
  );
}

export default AppHeader;
