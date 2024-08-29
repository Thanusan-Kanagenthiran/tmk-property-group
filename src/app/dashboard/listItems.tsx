import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Link from "next/link";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HouseIcon from "@mui/icons-material/House";

export const mainListItems = (
  <React.Fragment>
    <Link href="/dashboard" passHref>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <ListItemButton>
      <ListItemIcon>
        <HouseIcon />
      </ListItemIcon>
      <ListItemText primary="Properties" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Bookings" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <Link href="/dashboard/account" passHref>
      <ListItemButton>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
