import * as React from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HouseIcon from "@mui/icons-material/House";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaymentIcon from "@mui/icons-material/Payment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

interface ListItemProps {
  href: string;
  icon: React.ElementType;
  text: string;
}

const ListItem: React.FC<ListItemProps> = ({ href, icon: Icon, text }) => {
  const pathname = usePathname();
  const theme = useTheme();
  const isActive = pathname === href;

  return (
    <Link href={href} passHref>
      <ListItemButton
        sx={{
          backgroundColor: isActive
            ? theme.palette.action.selected
            : "transparent",
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <ListItemIcon>
          <Icon color={isActive ? "secondary" : "primary"} />
        </ListItemIcon>
        <ListItemText
          sx={{
            color: isActive
              ? theme.palette.text.primary
              : theme.palette.secondary.main,
          }}
          primary={text}
        />
      </ListItemButton>
    </Link>
  );
};

export const MainListItems: React.FC = () => {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  return (
    <React.Fragment>
      <ListItem href="/dashboard" icon={DashboardIcon} text="Dashboard" />
      {userRole === "host" && (
        <>
          <ListItem
            href="/dashboard/properties"
            icon={HouseIcon}
            text="Properties"
          />
          <ListItem
            href="/dashboard/bookings"
            icon={AssignmentIcon}
            text="Bookings"
          />
        </>
      )}
      <ListItem href="/dashboard/payments" icon={PaymentIcon} text="Payments" />
    </React.Fragment>
  );
};

export const SecondaryListItems: React.FC = () => (
  <React.Fragment>
    <ListItem
      href="/dashboard/account"
      icon={ManageAccountsIcon}
      text="Account"
    />
  </React.Fragment>
);


