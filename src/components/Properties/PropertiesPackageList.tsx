"use client";
import React, { useState, type ReactNode } from "react";
import PropertiesPackageCard from "./PropertiesPackageCard";
import Grid from "@mui/material/Grid";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
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

const PropertiesPackageList = () => {
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null);

  const handleSelectPackage = (id: number) => {
    setSelectedPackageId(id);
    console.log(`Package ${id} selected`);
  };

  const handleLearnMore = (id: number) => {
    console.log(`Learn more about package ${id}`);
  };

  return (
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
  );
};

export default PropertiesPackageList;
