"use client";
import PropertiesTypeCard from "./PropertiesTypeCard";
import Grid from "@mui/material/Grid";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import VillaIcon from "@mui/icons-material/Villa";
import StorefrontIcon from "@mui/icons-material/Storefront";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import { useState, type ReactNode } from "react";
import { Typography } from "@mui/material";
import AddFormContainer from "../Common/Layout/AddFormContainer";
import { PropertyType } from "@/constants/Property";
import { Apartment } from "@mui/icons-material";

const commonIconStyles = { height: "35%", width: "35%" };

const Icons: Record<string, ReactNode> = {
  apartment: <LocationCityIcon sx={commonIconStyles} />,
  house: <VillaIcon sx={commonIconStyles} />,
  villa: <StorefrontIcon sx={commonIconStyles} />,
  hotel: <NightShelterIcon sx={commonIconStyles} />
};

const propertyData = {
  propertyType: [
    {
      id: "66c87d81841416445a215aa0",
      title: "house",
      description: "Furnished and self-catering accommodations where guests rent the entire place.",
      iconKey: "apartment"
    },
    {
      id: "2",
      title: PropertyType.HOUSE,
      description: "Properties like apartments, vacation homes, villas, etc. List your property.",
      icon: "house"
    },
    {
      id: "3",
      title: PropertyType.VILLA,
      description: "Properties like hotels, B&Bs, guest houses, hostels, condo hotels, etc. List your property.",
      icon: "villa"
    },
    {
      id: "4",
      title: PropertyType.Hotel,
      description: "Alternative Places Properties like boats, campgrounds, luxury tents, etc. add for.",
      icon: "hotel"
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
    onTypeSelect(selectedPropertyType);
  };

  return (
    <AddFormContainer>
      <Typography ml={2} variant="body1" color="text.primary" textAlign="left" sx={{ mb: -1.5 }}>
        Select Property Type ( Note: * You can't change this later )
      </Typography>
      <Grid container spacing={2} py={2}>
        {propertyData.propertyType.map((property, index) => {
          const icon = Icons[property.icon as keyof typeof Icons];
          return (
            <Grid item xs={6} md={3} key={index}>
              <PropertiesTypeCard
                title={property.title}
                action={() => handleSelectType(property.id)}
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
