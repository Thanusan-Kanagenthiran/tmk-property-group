import React from "react";
import PropertiesForm from "@/components/Properties/PropertiesForm";
import LogoImage from "@/components/Common/LogoImage";
import { Container, Grid } from "@mui/material";

const SignIn = () => {
  return (
    <Container maxWidth={"lg"} sx={{ mt: 4 }}>
      <PropertiesForm />
    </Container>
  );
};
export default SignIn;
