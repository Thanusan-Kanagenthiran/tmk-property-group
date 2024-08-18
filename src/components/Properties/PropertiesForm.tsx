"use client";

import React, { useState } from "react";
import { Container, Box } from "@mui/material";

import PropertiesTypeList from "./PropertiesTypeList";
import PropertiesPackageList from "./PropertiesPackageList";
import PropertyInfoForm from "./PropertyInfoForm";
import RoomsAndMeasurementsForm from "./RoomsAndMeasurementsForm";
import KeyFeaturesAmenitiesForm from "./KeyFeaturesAmenitiesForm";

interface InfoFormValues {
  title: string;
  description: string;
  region: string;
  address: string;
}

interface RoomAndMeasurementsFormValues {
  noOfRooms: string;
  noOfBeds: string;
  noOfBaths: string;
  area: string;
}

export default function PropertiesForm() {
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null);
  const [selectedPropertyTypeId, setSelectedPropertyTypeId] = useState<number | null>(null);
  const [isPropertyInfoFormResponse, setIsPropertyInfoFormResponse] = useState<boolean>(false);
  const [isRoomAndMeasurementsFormResponse, setIsRoomAndMeasurementsFormResponse] = useState<boolean>(false);
  const [isKeyFeaturesAmenitiesFormResponse,setIsKeyFeaturesAmenitiesFormResponse]=useState<boolean>(false);
  
  const [infoFormValues, setInfoFormValues] = useState<InfoFormValues>({
    title: "",
    description: "",
    region: "",
    address: ""
  });
  const [roomAndMeasurementsFormValues, setRoomAndMeasurementsFormValues] = useState<RoomAndMeasurementsFormValues>({
    noOfRooms: "",
    noOfBeds: "",
    noOfBaths: "",
    area: ""
  });
  const [keyFeaturesAmenitiesFormValues, setKeyFeaturesAmenitiesFormValues] = useState<string[]>([]);

  const handlePackageSelect = (packageId: number) => {
    console.log(`Selected package ID in parent: ${packageId}`);
    setSelectedPackageId(packageId);
  };

  const handleTypeSelect = (typeId: number) => {
    console.log(`Selected type ID in parent: ${typeId}`);
    setSelectedPropertyTypeId(typeId);
  };

  const handleInfoFormSubmit = (values: InfoFormValues) => {
    console.log(values);
    setInfoFormValues(values);
    setIsPropertyInfoFormResponse(true);
  };

  const handleRoomAndMeasurementsFormSubmit = (values: RoomAndMeasurementsFormValues) => {
    console.log(values);
    setRoomAndMeasurementsFormValues(values);
    setIsRoomAndMeasurementsFormResponse(true);
  };

  const handleKeyFeaturesAmenitiesFormSubmit = (values: string[]) => {
    console.log(values);
    setKeyFeaturesAmenitiesFormValues(values);
    setIsKeyFeaturesAmenitiesFormResponse(true);
  };

  return (
    <Container sx={{ flexGrow: 1 }}>
      <Box sx={{ mb: 2 }}>
        {!selectedPackageId ? (
          <PropertiesPackageList onPackageSelect={handlePackageSelect} />
        ) : !selectedPropertyTypeId ? (
          <PropertiesTypeList onTypeSelect={handleTypeSelect} />
        ) : !isPropertyInfoFormResponse ? (
          <PropertyInfoForm onSubmit={handleInfoFormSubmit} />
        ) : !isRoomAndMeasurementsFormResponse ? (
          <RoomsAndMeasurementsForm onSubmit={handleRoomAndMeasurementsFormSubmit} />
        ) : !isKeyFeaturesAmenitiesFormResponse ? (
          <KeyFeaturesAmenitiesForm onSubmit={handleKeyFeaturesAmenitiesFormSubmit} />
        ) : null}
      </Box>
    </Container>
  );
}
