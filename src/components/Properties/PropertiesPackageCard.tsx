"use client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { useState, type ReactNode } from "react";
import PropertiesPackageForm from "./PropertiesPackageForm";

interface PropertiesPackageCardProps {
  title: string;
  description: string;
  action: () => void;
  actionLabel: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  icon: ReactNode;
  actionButtonColor?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}

const PropertiesPackageCard: React.FC<PropertiesPackageCardProps> = ({
  title,
  description,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  actionButtonColor = "secondary",
  icon
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isFullWidth = !secondaryAction || !secondaryActionLabel;

  return (
    <>
      <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <CardActionArea sx={{ flex: 1 }}>
          <Box sx={{ textAlign: "center" }} mt={4}>
            {icon}
          </Box>
          <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "end" }}>
          {secondaryAction && secondaryActionLabel && (
            <Button variant="outlined" size="small" color="secondary" onClick={secondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
          <Button
            variant="contained"
            size="small"
            color={actionButtonColor}
            onClick={handleClickOpen}
            fullWidth={isFullWidth}>
            {actionLabel}
          </Button>
        </CardActions>
      </Card>
      <PropertiesPackageForm open={open} handleClose={handleClose} />
    </>
  );
};

export default PropertiesPackageCard;
