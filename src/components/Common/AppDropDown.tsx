import { Tooltip, Typography, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { useState, MouseEvent, FC, ReactNode } from "react";

interface AppDropDownProps {
  menu: ReactNode;
  tooltipTitle?: string;
  menuContent?: ReactNode;
  menuItems?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
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
              fontSize: "10px"
            }}
            onClick={() => {
              item.onClick();
              handleClose();
            }}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.label} />
          </MenuItem>
        ))}
        {menuContent}
      </Menu>
    </div>
  );
};

export default AppDropDown;
