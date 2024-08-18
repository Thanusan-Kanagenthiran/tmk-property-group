"use client";
import React, { useState, type ReactNode } from "react";
import PropertiesPackageCard from "./PropertiesPackageCard";
import Grid from "@mui/material/Grid";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import { Typography } from "@mui/material";
import AddFormContainer from "../Common/Layout/AddFormContainer";
import { PropertyPackageTypes } from "@/constants/Property";
const commonIconStyles = { height: "35%", width: "35%" };

const Icons: Record<string, ReactNode> = {
  standard: <StarBorderIcon sx={commonIconStyles} />,
  deluxe: <StarBorderPurple500Icon sx={commonIconStyles} />,
  premium: <AutoAwesomeIcon sx={commonIconStyles} />
};

const propertyPackagesData = {
  packages: [
    {
      id: 1,
      title: PropertyPackageTypes.STANDARD,
      description: "The standard Lorem Ipsum passage, used since the 1500s",
      icon: "standard"
    },
    {
      id: 2,
      title: PropertyPackageTypes.DELUXE,
      description: "The deluxe Lorem Ipsum passage, with more features",
      icon: "deluxe"
    },
    {
      id: 3,
      title: PropertyPackageTypes.PREMIUM,
      description: "The premium Lorem Ipsum passage, with the best features",
      icon: "premium"
    }
  ]
};
interface PropertiesPackageListProps {
  onPackageSelect: (packageType: string) => void;
}

const PropertiesPackageList: React.FC<PropertiesPackageListProps> = ({ onPackageSelect }) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleSelectPackage = (packageType: string) => {
    setSelectedPackage(packageType);
    onPackageSelect(packageType); // Notify the parent component
    console.log(`Package ${packageType} selected`);
  };

  const handleLearnMore = (packageType: string) => {
    console.log(`Learn more about package ${packageType}`);
  };

  return (
    <AddFormContainer>
      <Typography variant="body1" color="text.primary" textAlign="left" sx={{ mb: -1.5 }}>
        Select Convenient Package for you
      </Typography>

      <Grid container spacing={2} py={2}>
        {propertyPackagesData.packages.map((packageType) => {
          const icon = Icons[packageType.icon as keyof typeof Icons];
          return (
            <Grid item xs={12} sm={6} md={4} key={packageType.id}>
              <PropertiesPackageCard
                title={packageType.title}
                description={packageType.description}
                action={() => handleSelectPackage(packageType.title)}
                actionLabel={selectedPackage === packageType.title ? "Selected" : "Select Package"}
                secondaryAction={() => handleLearnMore(packageType.title)}
                secondaryActionLabel="Learn More"
                actionButtonColor={selectedPackage === packageType.title ? "primary" : "secondary"}
                icon={icon}
              />
            </Grid>
          );
        })}
      </Grid>
    </AddFormContainer>
  );
};

export default PropertiesPackageList;
