"use client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea, Box } from "@mui/material";
import type { ReactNode } from "react";

interface PropertiesTypeCardProps {
  title: string;
  description: string;
  action: () => void;
  actionLabel: string;
  icon: ReactNode;
  actionButtonColor?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}

const PropertiesTypeCard: React.FC<PropertiesTypeCardProps> = ({
  title,
  description,
  action,
  actionLabel,
  icon,
  actionButtonColor = "secondary"
}) => {
  return (
    <Card sx={{ maxWidth: 345, textAlign: "center", display: "flex", flexDirection: "column", height: "100%" }}>
      <CardActionArea sx={{ flex: 1 }}>
        <Box height="100" pt={2}>
          {icon}
        </Box>
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" px={2} color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="contained" color={actionButtonColor} onClick={action} fullWidth>
          {actionLabel}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertiesTypeCard;
