import React from "react";
import PropertiesForm from "@/components/Properties/PropertiesForm";
import PropertiesImagesUpload from "@/components/Properties/propertiesImagesUpload";
import { Container } from "@mui/material";

const SignIn = () => {
  return (
    <Container maxWidth={"lg"} sx={{ mt: 4 }}>
      <PropertiesForm />
      <PropertiesImagesUpload />
    </Container>
  );
};
export default SignIn;
