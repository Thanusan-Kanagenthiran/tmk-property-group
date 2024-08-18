"use client";
import PropertiesTypeCard from "./PropertiesTypeCard";
import Grid from "@mui/material/Grid";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import VillaIcon from "@mui/icons-material/Villa";
import StorefrontIcon from "@mui/icons-material/Storefront";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import { useEffect, useState, type ReactNode } from "react";
import { Typography } from "@mui/material";
import AddFormContainer from "../Common/Layout/AddFormContainer";
import { PropertyType } from "@/constants/Property";

const commonIconStyles = { height: "35%", width: "35%" };

const Icons: Record<string, ReactNode> = {
  LocationCityIcon: <LocationCityIcon sx={commonIconStyles} />,
  VillaIcon: <VillaIcon sx={commonIconStyles} />,
  StorefrontIcon: <StorefrontIcon sx={commonIconStyles} />,
  NightShelterIcon: <NightShelterIcon sx={commonIconStyles} />
};

const propertyData = {
  propertyType: [
    {
      id: 1,
      title: PropertyType.APARTMENT,
      description: "Furnished and self-catering accommodations where guests rent the entire place.",
      icon: "LocationCityIcon"
    },
    {
      id: 2,
      title: PropertyType.HOUSE,
      description: "Properties like apartments, vacation homes, villas, etc. List your property.",
      icon: "VillaIcon"
    },
    {
      id: 3,
      title: PropertyType.VILLA,
      description: "Properties like hotels, B&Bs, guest houses, hostels, condo hotels, etc. List your property.",
      icon: "StorefrontIcon"
    },
    {
      id: 4,
      title: PropertyType.Hotel,
      description: "Alternative Places Properties like boats, campgrounds, luxury tents, etc. add for.",
      icon: "NightShelterIcon"
    }
  ]
};

interface PropertiesTypeListProps {
  onTypeSelect: (typeId: string) => void;
}

const PropertiesTypeList: React.FC<PropertiesTypeListProps> = ({ onTypeSelect }) => {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);

  const handleSelectType = (selectedPropertyType: string) => {
    setSelectedPropertyType(selectedPropertyType);
    onTypeSelect(selectedPropertyType); // Notify the parent component
    console.log(`Type ${selectedPropertyType} selected`);
  };

  return (
    <AddFormContainer>
      <Typography variant="body1" color="text.primary" textAlign="left" sx={{ mb: -1.5 }}>
        Select Property Type
      </Typography>
      <Grid container spacing={2} py={2}>
        {propertyData.propertyType.map((property, index) => {
          const icon = Icons[property.icon as keyof typeof Icons];
          return (
            <Grid item xs={6} md={3} key={index}>
              <PropertiesTypeCard
                title={property.title}
                action={() => handleSelectType(property.title)}
                description={property.description}
                actionButtonColor={selectedPropertyType === property.title ? "primary" : "secondary"}
                actionLabel={selectedPropertyType === property.title ? "Selected" : "Select"}
                icon={icon}
              />
            </Grid>
          );
        })}
      </Grid>{" "}
    </AddFormContainer>
  );
};

export default PropertiesTypeList;
