"use client";

import React, { useState, type ReactNode } from "react";
import PropertiesPackageCard from "./PropertiesPackageCard";
import Grid from "@mui/material/Grid";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import { Typography } from "@mui/material";
import AddFormContainer from "../Common/Layout/AddFormContainer";
import CheckInCheckOutPicker from "./BookingDatePicker";

const commonIconStyles = { height: "50px", width: "50px" };

const Icons: Record<string, ReactNode> = {
  standard: <StarBorderIcon sx={commonIconStyles} />,
  deluxe: <StarBorderPurple500Icon sx={commonIconStyles} />,
  premium: <AutoAwesomeIcon sx={commonIconStyles} />
};

interface PackageDTO {
  title: string;
  description: string;
  durationRequirementDays: {
    daysOrWeeks: "days" | "weeks";
    count: number;
  };
  packagePricePerDay: number;
}

const propertyPackages: PackageDTO[] = [
  {
    title: "standard",
    description: "The standard Lorem Ipsum passage, used since the 1500s",
    durationRequirementDays: { daysOrWeeks: "days", count: 2 },
    packagePricePerDay: 15000
  },
  {
    title: "deluxe",
    description: "The deluxe Lorem Ipsum passage, with more features",
    durationRequirementDays: { daysOrWeeks: "weeks", count: 1 },
    packagePricePerDay: 13500
  },
  {
    title: "premium",
    description: "The premium Lorem Ipsum passage, with the best features",
    durationRequirementDays: { daysOrWeeks: "weeks", count: 2 },
    packagePricePerDay: 10000
  }
];

const PropertiesPackagesList: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const handleSelectPackage = (title: string) => {
    setSelectedPackage(title);
  };

  const [daysCount, setDaysCount] = useState(0);

  const handleDaysCountChange = (daysCount: number) => {
    console.log("Days Count Updated:", daysCount); // Debugging line
    setDaysCount(daysCount);
  };

  return (
    <AddFormContainer>
      <CheckInCheckOutPicker onDaysCountChange={handleDaysCountChange} />
      <Typography ml={2} variant="body1" color="text.primary" textAlign="left">
        Select your preferred package or go with the basic price per day
      </Typography>

      <Grid container spacing={2} py={2}>
        {propertyPackages.map((packageType) => {
          const icon = Icons[packageType.title];

          const totalDaysCount =
            packageType.durationRequirementDays.daysOrWeeks === "weeks"
              ? packageType.durationRequirementDays.count * 7
              : packageType.durationRequirementDays.count;

          console.log("Total Days Count:", totalDaysCount); // Debugging line

          return (
            <Grid item xs={12} sm={6} md={4} key={packageType.title}>
              <PropertiesPackageCard
                isDisabled={daysCount < totalDaysCount}
                propertyPackage={packageType}
                action={() => handleSelectPackage(packageType.title)}
                icon={icon}
                selectedPackage={selectedPackage}
              />
            </Grid>
          );
        })}
      </Grid>
      {selectedPackage && (
        <Typography variant="h6" mt={2}>
          Selected Package: {selectedPackage}
        </Typography>
      )}
    </AddFormContainer>
  );
};

export default PropertiesPackagesList;
