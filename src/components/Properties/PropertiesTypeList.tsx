"use client";

import React, { useState, useEffect, type ReactNode } from "react";
import Grid from "@mui/material/Grid";
import VillaIcon from "@mui/icons-material/Villa";
import StorefrontIcon from "@mui/icons-material/Storefront";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import { Typography } from "@mui/material";
import AddFormContainer from "../Common/Layout/AddFormContainer";
import { Apartment } from "@mui/icons-material";
import PropertiesTypeCard from "./PropertiesTypeCard";

const commonIconStyles = { height: "35%", width: "35%" };

const Icons: Record<string, ReactNode> = {
  apartment: <Apartment sx={commonIconStyles} />,
  house: <VillaIcon sx={commonIconStyles} />,
  villa: <StorefrontIcon sx={commonIconStyles} />,
  hotel: <NightShelterIcon sx={commonIconStyles} />
};

interface Property {
  id: string;
  title: string;
  description: string;
  iconKey: string;
}

interface PropertiesTypeListProps {
  onTypeSelect: (typeId: string) => void;
}

const PropertiesTypeList: React.FC<PropertiesTypeListProps> = ({ onTypeSelect }) => {
  const [propertyData, setPropertyData] = useState<Property[]>([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/property-type");
        const data = await response.json();
        setPropertyData(data); // Adjust based on actual API response structure
      } catch (error) {
        console.error("Failed to fetch property types:", error);
      }
    };

    fetchData();
  }, []);

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
        {propertyData.map((property) => {
          const icon = Icons[property.iconKey as keyof typeof Icons];
          return (
            <Grid item xs={6} md={3} key={property.id}>
              <PropertiesTypeCard
                title={property.title}
                action={() => handleSelectType(property.id)}
                description={property.description}
                actionButtonColor={selectedPropertyType === property.id ? "primary" : "secondary"}
                actionLabel={selectedPropertyType === property.id ? "Selected" : "Select"}
                icon={icon}
              />
            </Grid>
          );
        })}
      </Grid>
    </AddFormContainer>
  );
};

export default PropertiesTypeList;
