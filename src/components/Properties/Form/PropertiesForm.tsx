"use client";
import React, { useState } from "react";
import { Container, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import PropertiesTypeList from "./PropertiesTypeList";
import PropertyInfoForm from "./PropertyInfoForm";
import RoomsAndMeasurementsForm from "./RoomsAndMeasurementsForm";
import KeyFeaturesAmenitiesForm from "./KeyFeaturesAmenitiesForm";
import PropertiesPricingForm from "./PropertiesPricingForm";
import { propertiesService, PropertyPostData } from "@/services/properties.service";

interface InfoFormValues {
  title: string;
  description: string;
  region: string;
  address: string;
}

interface RoomAndMeasurementsFormValues {
  maxNoOfGuests: number;
  noOfBeds: number;
  noOfBaths: number;
}

export default function PropertiesForm() {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null);
  const [isPropertyInfoFormResponse, setIsPropertyInfoFormResponse] = useState<boolean>(false);
  const [isRoomAndMeasurementsFormResponse, setIsRoomAndMeasurementsFormResponse] = useState<boolean>(false);
  const [isKeyFeaturesAmenitiesFormResponse, setIsKeyFeaturesAmenitiesFormResponse] = useState<boolean>(false);
  const [pricePerNight, setPricePerNight] = useState<number | null>(null);
  const [keyFeaturesAmenitiesFormValues, setKeyFeaturesAmenitiesFormValues] = useState<string[]>([]);

  const [infoFormValues, setInfoFormValues] = useState<InfoFormValues>({
    title: "",
    description: "",
    region: "",
    address: ""
  });

  const [roomAndMeasurementsFormValues, setRoomAndMeasurementsFormValues] = useState<RoomAndMeasurementsFormValues>({
    maxNoOfGuests: 0,
    noOfBeds: 0,
    noOfBaths: 0
  });

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmData, setConfirmData] = useState<PropertyPostData | null>(null);

  const handleTypeSelect = (selectedProperty: string) => {
    setSelectedPropertyType(selectedProperty);
  };

  const handleInfoFormSubmit = (values: InfoFormValues) => {
    setInfoFormValues(values);
    setIsPropertyInfoFormResponse(true);
  };

  const handleRoomAndMeasurementsFormSubmit = (values: RoomAndMeasurementsFormValues) => {
    setRoomAndMeasurementsFormValues(values);
    setIsRoomAndMeasurementsFormResponse(true);
  };

  const handlePricePerNightSubmit = (value: number) => {
    setPricePerNight(value);

    const propertyData: PropertyPostData = {
      propertyType: selectedPropertyType as string,
      title: infoFormValues.title,
      description: infoFormValues.description,
      region: infoFormValues.region,
      address: infoFormValues.address,
      maxNoOfGuests: roomAndMeasurementsFormValues.maxNoOfGuests,
      noOfBeds: roomAndMeasurementsFormValues.noOfBeds,
      noOfBaths: roomAndMeasurementsFormValues.noOfBaths,
      amenities: keyFeaturesAmenitiesFormValues,
      pricePerNight: value
    };

    setConfirmData(propertyData);
    setOpenConfirmDialog(true);
  };

  const handleKeyFeaturesAmenitiesFormSubmit = (values: string[]) => {
    setKeyFeaturesAmenitiesFormValues(values);
    setIsKeyFeaturesAmenitiesFormResponse(true);
  };

  const handleConfirmSubmit = async () => {
    if (confirmData) {
      try {
        await propertiesService.AddProperty(confirmData);

        console.log("Property saved successfully");
        setOpenConfirmDialog(false);
        resetForm();
      } catch (error) {
        console.error("Failed to save property:", error);
      }
    } else {
      console.error("No data available for submission");
    }
  };

  const handleCancel = () => {
    setOpenConfirmDialog(false);
  };

  const resetForm = () => {
    setSelectedPropertyType(null);
    setIsPropertyInfoFormResponse(false);
    setIsRoomAndMeasurementsFormResponse(false);
    setIsKeyFeaturesAmenitiesFormResponse(false);
    setPricePerNight(null);
    setKeyFeaturesAmenitiesFormValues([]);
    setInfoFormValues({ title: "", description: "", region: "", address: "" });
    setRoomAndMeasurementsFormValues({ maxNoOfGuests: 0, noOfBeds: 0, noOfBaths: 0 });
    setConfirmData(null);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        padding: 0,
        margin: 0,
        overflowY: "auto"
      }}>
      <Box sx={{ maxHeight: "100%" }}>
        {!selectedPropertyType ? (
          <PropertiesTypeList onTypeSelect={handleTypeSelect} />
        ) : !isPropertyInfoFormResponse ? (
          <PropertyInfoForm onSubmit={handleInfoFormSubmit} />
        ) : !isRoomAndMeasurementsFormResponse ? (
          <RoomsAndMeasurementsForm onSubmit={handleRoomAndMeasurementsFormSubmit} />
        ) : !isKeyFeaturesAmenitiesFormResponse ? (
          <KeyFeaturesAmenitiesForm onSubmit={handleKeyFeaturesAmenitiesFormSubmit} />
        ) : !pricePerNight ? (
          <PropertiesPricingForm onSubmit={handlePricePerNightSubmit} />
        ) : null}
      </Box>

      <Dialog open={openConfirmDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Property Details</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Please review the property details before submission:</Typography>
          <pre>{JSON.stringify(confirmData, null, 2)}</pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
