"use client";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";

import PropertiesTypeList from "./PropertiesTypeList";
import PropertiesPackageList from "./PropertiesPackageList";
import AddFormContainer from "@/components/Common/Layout/AddFormContainer";
import PropertyInfoForm from "./PropertyInfoForm";
import RoomsAndMeasurementsForm from "./RoomsAndMeasurementsForm";
import KeyFeaturesAmenitiesForm from "./KeyFeaturesAmenitiesForm";

export default function PropertiesForm() {
  return (
    <Container sx={{ flexGrow: 1 }}>
      <AddFormContainer>
        <Typography variant="body1" color="text.primary" textAlign="left" sx={{ mb: -1.5 }}>
          Select Convenient Package for you
        </Typography>
        <PropertiesPackageList />
      </AddFormContainer>
      <AddFormContainer>
        <Typography variant="body1" color="text.primary" textAlign="left" sx={{ mb: -1.5 }}>
          Select Property Type
        </Typography>
        <PropertiesTypeList />
      </AddFormContainer>
      <PropertyInfoForm />
      <RoomsAndMeasurementsForm />
      <KeyFeaturesAmenitiesForm />
    </Container>
  );
}
