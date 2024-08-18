"use client";
import React, { useState, type ReactNode } from "react";
import PropertiesPackageCard from "./PropertiesPackageCard";
import Grid from "@mui/material/Grid";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import { Typography } from "@mui/material";
import AddFormContainer from "../Common/Layout/AddFormContainer";
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
      title: "Standard",
      description: "The standard Lorem Ipsum passage, used since the 1500s",
      icon: "standard"
    },
    {
      id: 2,
      title: "Deluxe",
      description: "The deluxe Lorem Ipsum passage, with more features",
      icon: "deluxe"
    },
    {
      id: 3,
      title: "Premium",
      description: "The premium Lorem Ipsum passage, with the best features",
      icon: "premium"
    }
  ]
};
interface PropertiesPackageListProps {
  onPackageSelect: (packageId: number) => void;
}

const PropertiesPackageList: React.FC<PropertiesPackageListProps> = ({ onPackageSelect }) => {
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null);

  const handleSelectPackage = (id: number) => {
    setSelectedPackageId(id);
    onPackageSelect(id); // Notify the parent component
    console.log(`Package ${id} selected`);
  };

  const handleLearnMore = (id: number) => {
    console.log(`Learn more about package ${id}`);
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
                action={() => handleSelectPackage(packageType.id)}
                actionLabel={selectedPackageId === packageType.id ? "Selected" : "Select Package"}
                secondaryAction={() => handleLearnMore(packageType.id)}
                secondaryActionLabel="Learn More"
                actionButtonColor={selectedPackageId === packageType.id ? "primary" : "secondary"}
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
