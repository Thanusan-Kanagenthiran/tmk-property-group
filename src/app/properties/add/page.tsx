import React from "react";
import PropertiesForm from "@/components/Properties/PropertiesForm";
import PropertiesImagesUpload from "@/components/Properties/propertiesImagesUpload";
import { Container } from "@mui/material";

const SignIn = () => {
  return (
    <Container maxWidth={"lg"} sx={{ mt: 4 }}>
      <PropertiesForm />
      <PropertiesImagesUpload propertyId="66c27d9fd334debbc8f9545d" />
    </Container>
  );
};
export default SignIn;
