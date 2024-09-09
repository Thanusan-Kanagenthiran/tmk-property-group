import React from "react";
import SignInForm from "@/components/Auth/SignInForm";
import LogoImage from "@/components/Common/LogoImage";
import { Grid } from "@mui/material";

const SignIn = () => {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={7}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
        }}
      >
        <SignInForm />
      </Grid>
      <Grid
        item
        sx={{ display: { xs: "none", md: "flex" } }}
        sm={5}
        style={{ justifyContent: "start", alignItems: "center" }}
      >
        <LogoImage size={350} />
      </Grid>
    </Grid>
  );
};
export default SignIn;
