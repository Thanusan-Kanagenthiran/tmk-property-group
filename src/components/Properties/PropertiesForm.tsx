"use client";

import React, { useState } from "react";
import { Container, Box } from "@mui/material";

import PropertiesTypeList from "./PropertiesTypeList";
import PropertiesPackageList from "./PropertiesPackageList";
import PropertyInfoForm from "./PropertyInfoForm";
import RoomsAndMeasurementsForm from "./RoomsAndMeasurementsForm";
import KeyFeaturesAmenitiesForm from "./KeyFeaturesAmenitiesForm";
import { propertiesService } from "@/services/properties.service";
import { ApiEndPoints } from "@/constants/api";

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
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);
  const [isPropertyInfoFormResponse, setIsPropertyInfoFormResponse] = useState<boolean>(false);
  const [isRoomAndMeasurementsFormResponse, setIsRoomAndMeasurementsFormResponse] = useState<boolean>(false);
  const [isKeyFeaturesAmenitiesFormResponse, setIsKeyFeaturesAmenitiesFormResponse] = useState<boolean>(false);

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

  const handlePackageSelect = (selectedPackage: string) => {
    console.log(selectedPackage);
    setSelectedPackage(selectedPackage);
  };

  const handleTypeSelect = (selectedProperty: string) => {
    console.log(selectedProperty);
    setSelectedPropertyType(selectedProperty);
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

  const endpoint = ApiEndPoints.PROPERTIES;
  const propertyData = {
    packageType: selectedPackage as string,
    propertyType: selectedPropertyType as string,
    title: infoFormValues.title,
    description: infoFormValues.description,
    location: infoFormValues.region,
    address: infoFormValues.address,
    noOfRooms: roomAndMeasurementsFormValues.noOfRooms,
    noOfBeds: roomAndMeasurementsFormValues.noOfBeds,
    noOfBaths: roomAndMeasurementsFormValues.noOfBaths,
    area: roomAndMeasurementsFormValues.area,
    amenities: keyFeaturesAmenitiesFormValues
  };

  const handleKeyFeaturesAmenitiesFormSubmit = (values: string[]) => {
    console.log(values);
    setKeyFeaturesAmenitiesFormValues(values);
    setIsKeyFeaturesAmenitiesFormResponse(true);
    console.log(propertyData);
    propertiesService
      .AddProperty(propertyData, endpoint)
      .then((data) => {
        console.log("Property posted successfully:", data);
      })
      .catch((error) => {
        console.error("Failed to post property:", error);
      });
  };

  return (
    <Container sx={{ flexGrow: 1 }}>
      <Box sx={{ mb: 2 }}>
        {!selectedPackage ? (
          <PropertiesPackageList onPackageSelect={handlePackageSelect} />
        ) : !selectedPropertyType ? (
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
