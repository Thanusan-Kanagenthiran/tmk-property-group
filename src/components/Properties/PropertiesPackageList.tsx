import React from "react";
import PropertiesPackageCard from "./PropertiesPackageCard";
import Grid from "@mui/material/Grid";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import VillaIcon from "@mui/icons-material/Villa";
import StorefrontIcon from "@mui/icons-material/Storefront";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import type { ReactNode } from "react";

const commonIconStyles = { height: "35%", width: "35%" };

const Icons: Record<string, ReactNode> = {
  LocationCityIcon: <LocationCityIcon sx={commonIconStyles} />,
  VillaIcon: <VillaIcon sx={commonIconStyles} />,
  StorefrontIcon: <StorefrontIcon sx={commonIconStyles} />,
  NightShelterIcon: <NightShelterIcon sx={commonIconStyles} />
};

const propertyPackagesData = {
  packages: [
    {
      title: "Standard",
      description: "The standard Lorem Ipsum passage, used since the 1500s",
      icon: "LocationCityIcon",
      onLearnMore: () => console.log("Learn More clicked"),
      onSelectPackage: () => console.log("Select Package clicked")
    },
    {
      title: "Standard",
      description: "The standard Lorem Ipsum passage, used since the 1500s",
      icon: "VillaIcon",
      onLearnMore: () => console.log("Learn More clicked"),
      onSelectPackage: () => console.log("Select Package clicked")
    },
    {
      title: "Standard",
      description: "The standard Lorem Ipsum passage, used since the 1500s",
      icon: "StorefrontIcon",
      onLearnMore: () => console.log("Learn More clicked"),
      onSelectPackage: () => console.log("Select Package clicked")
    }
  ]
};

const PropertiesPackageList = () => {
  const handleAction = () => {
    console.log("Button clicked!");
  };

  return (
    <Grid container spacing={2} py={2}>
      {propertyPackagesData.packages.map((packageType, index) => {
        const icon = Icons[packageType.icon as keyof typeof Icons];
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PropertiesPackageCard
              title={packageType.title}
              description={packageType.description}
              action={handleAction}
              actionLabel="Select Package"
              secondaryAction={handleAction}
              secondaryActionLabel="Learn More"
              icon={icon}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PropertiesPackageList;
