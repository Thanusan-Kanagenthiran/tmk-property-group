"use client";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { type ReactNode } from "react";

interface PackageDTO {
  packageName: string;
  durationRequirementDays: {
    daysOrWeeks: "days" | "weeks";
    count: number;
  };
  packagePricePerDay: number;
}

interface PropertiesPackageCardProps {
  propertyPackage: PackageDTO;
  action: () => void;
  icon: ReactNode;
  selectedPackage: string | null;
  isDisabled: boolean;
}

const PropertiesPackageCard: React.FC<PropertiesPackageCardProps> = ({
  propertyPackage,
  action,
  icon,
  selectedPackage,
  isDisabled
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}>
      <Box sx={{ textAlign: "center" }} mt={4}>
        {icon}
      </Box>
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Typography gutterBottom variant="h5" component="div">
          {propertyPackage.packageName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "bold" }}>
          For
          <Box component="span" sx={{ color: "primary.main", fontWeight: "bold", fontSize: "1.2em", px: 0.5 }}>
            {propertyPackage.durationRequirementDays.count} {propertyPackage.durationRequirementDays.daysOrWeeks}
          </Box>
          at{" "}
          <Box component="span" sx={{ color: "secondary.main", fontWeight: "bold", fontSize: "1.2em", px: 0.5 }}>
            Rs.{propertyPackage.packagePricePerDay}
          </Box>
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "end" }}>
        <Button
          disabled={isDisabled}
          variant={selectedPackage === propertyPackage.packageName ? "contained" : "outlined"}
          size="small"
          color="secondary"
          onClick={action}>
          {selectedPackage === propertyPackage.packageName ? "Selected" : "Select package"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertiesPackageCard;
