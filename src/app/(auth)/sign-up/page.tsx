import Register from "@/components/Auth/SignUpForm";
import LogoImage from "@/components/Common/LogoImage";
import { Grid } from "@mui/material";
import Image from "next/image";

const page = () => {
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
        <Register />
      </Grid>
      <Grid
        item
        sx={{ display: { xs: "none", md: "flex" } }}
        sm={5}
        style={{ justifyContent: "start", alignItems: "center" }}
      >
        <LogoImage size={300} />
      </Grid>
    </Grid>
  );
};

export default page;
