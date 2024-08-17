"use client";
import { Tooltip, Typography, Menu, MenuItem } from "@mui/material";
import { useState, MouseEvent, FC, ReactNode } from "react";

interface AppDropDownProps {
  menu: ReactNode;
  tooltipTitle?: string;
  menuContent?: ReactNode;
  menuItems?: {
    label: string;
    onClick: () => void;
  }[];
}

const AppDropDown: FC<AppDropDownProps> = ({ menu, tooltipTitle, menuContent, menuItems }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title={tooltipTitle || ""}>
        <Typography
          sx={{ cursor: "pointer" }}
          id="dropdown-button"
          aria-controls={open ? "dropdown-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}>
          {menu}
        </Typography>
      </Tooltip>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "dropdown-button" }}>
        {menuItems?.map((item, index) => (
          <MenuItem
            key={index}
            sx={{
              mb: 0.5,
              py: { xs: 0, md: 0.5 },
              fontSize: { xs: "0.75rem", sm: "0.875rem" }
            }}
            onClick={() => {
              item.onClick();
              handleClose();
            }}>
            {item.label}
          </MenuItem>
        ))}
        {menuContent}
      </Menu>
    </div>
  );
};

export default AppDropDown;
