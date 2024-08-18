import React from "react";
import PropertiesTypeCard from "./PropertiesTypeCard";
import Grid from "@mui/material/Grid";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import VillaIcon from "@mui/icons-material/Villa";
import StorefrontIcon from "@mui/icons-material/Storefront";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import type { ReactNode } from "react";

// Define common styles for icons
const commonIconStyles = { height: "35%", width: "35%" };

// Create an Icons namespace locally
const Icons: Record<string, ReactNode> = {
  LocationCityIcon: <LocationCityIcon sx={commonIconStyles} />,
  VillaIcon: <VillaIcon sx={commonIconStyles} />,
  StorefrontIcon: <StorefrontIcon sx={commonIconStyles} />,
  NightShelterIcon: <NightShelterIcon sx={commonIconStyles} />
};

// Define property data with local icon names
const propertyData = {
  propertyType: [
    {
      title: "Apartment",
      description: "Furnished and self-catering accommodations where guests rent the entire place.",
      icon: "LocationCityIcon"
    },
    {
      title: "Homes",
      description: "Properties like apartments, vacation homes, villas, etc. List your property.",
      icon: "VillaIcon"
    },
    {
      title: "Hotel",
      description: "Properties like hotels, B&Bs, guest houses, hostels, condo hotels, etc. List your property.",
      icon: "StorefrontIcon"
    },
    {
      title: "B&Bs & More",
      description: "Alternative Places Properties like boats, campgrounds, luxury tents, etc. add for.",
      icon: "NightShelterIcon"
    }
  ]
};

const PropertiesTypeList = () => {
  const handleAction = () => {
    console.log("Button clicked!");
  };

  return (
    <Grid container spacing={2} py={2}>
      {propertyData.propertyType.map((property, index) => {
        const icon = Icons[property.icon as keyof typeof Icons];
        return (
          <Grid item xs={6} md={3} key={index}>
            <PropertiesTypeCard
              title={property.title}
              description={property.description}
              action={handleAction}
              actionLabel="Share"
              icon={icon}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PropertiesTypeList;
