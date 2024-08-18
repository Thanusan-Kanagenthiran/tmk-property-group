"use client";

import { Checkbox, Container, FormControl, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";

import PropertiesTypeList from "./PropertiesTypeList";
import PropertiesPackageList from "./PropertiesPackageList";
import AddFormContainer from "@/components/Common/Layout/AddFormContainer";

export default function PropertiesForm() {
  return (
    <Container sx={{ flexGrow: 1 }}>
      <AddFormContainer>
        <Typography variant="body1" color="text.primary" textAlign="left" sx={{ mb: -1.5 }}>
          Property Information
        </Typography>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} md={8} spacing={2} container>
            <Grid item xs={12}>
              <FormControl sx={{ mb: -0.4, width: "100%" }}>
                <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
                  Title
                </Typography>
                <TextField
                  onClick={() => ({})}
                  size="small"
                  variant="outlined"
                  margin="normal"
                  name="password"
                  type="password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ mb: -0.4, width: "100%" }}>
                <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
                  Description
                </Typography>
                <TextField
                  onClick={() => ({})}
                  size="small"
                  variant="outlined"
                  margin="normal"
                  name="description"
                  type="text"
                  rows={4}
                  multiline
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} spacing={2} container>
            <Grid item xs={12}>
              <FormControl sx={{ mb: -0.4, width: "100%" }}>
                <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
                  Country Region
                </Typography>
                <TextField
                  onClick={() => ({})}
                  size="small"
                  variant="outlined"
                  margin="normal"
                  name="password"
                  type="password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ mb: -0.4, width: "100%" }}>
                <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
                  Address
                </Typography>
                <TextField
                  onClick={() => ({})}
                  size="small"
                  variant="outlined"
                  margin="normal"
                  name="text"
                  type="text"
                  rows={4}
                  multiline
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </AddFormContainer>
      <AddFormContainer>
        <Typography variant="body1" color="text.primary" textAlign="left" sx={{ mb: -1.5 }}>
          Room Details & Measurements
        </Typography>
        <Grid container spacing={2} p={2}>
          <Grid item xs={6} md={3} display="flex" alignItems="center" justifyContent={"end"}>
            <Typography variant="body2" color="secondary" mr={2}>
              No of Rooms
            </Typography>
            <TextField variant="outlined" size="small" sx={{ width: "150px" }} />
          </Grid>
          <Grid item xs={6} md={3} display="flex" alignItems="center" justifyContent={"end"}>
            <Typography variant="body2" color="secondary" mr={2}>
              No of Beds
            </Typography>
            <TextField variant="outlined" size="small" sx={{ width: "150px" }} />
          </Grid>
          <Grid item xs={6} md={3} display="flex" alignItems="center" justifyContent={"end"}>
            <Typography variant="body2" color="secondary" mr={2}>
              No of baths
            </Typography>
            <TextField variant="outlined" size="small" sx={{ width: "150px" }} />
          </Grid>
          <Grid item xs={6} md={3} display="flex" alignItems="center" justifyContent={"end"}>
            <Typography variant="body2" color="secondary" mr={2}>
              Area in sqft
            </Typography>
            <TextField variant="outlined" size="small" sx={{ width: "150px" }} />
          </Grid>
        </Grid>
      </AddFormContainer>
      <AddFormContainer>
        <Typography variant="body1" color="text.primary" textAlign="left" sx={{ mb: -1.5 }}>
          Key Features and Amenities
        </Typography>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel control={<Checkbox color="secondary" defaultChecked />} label="Air conditioning" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel control={<Checkbox color="secondary" defaultChecked />} label="Air conditioning" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel control={<Checkbox color="secondary" defaultChecked />} label="Tile/Marble floor" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel control={<Checkbox color="secondary" defaultChecked />} label="Clothes rack" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel
              control={<Checkbox color="secondary" defaultChecked />}
              label="Upper floors accessible by elevator"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel control={<Checkbox color="secondary" defaultChecked />} label="Dining area" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControlLabel control={<Checkbox color="secondary" defaultChecked />} label="Kitchenware" />
          </Grid>
        </Grid>
      </AddFormContainer>
      <AddFormContainer>
        <Typography variant="body1" color="text.primary" textAlign="left" sx={{ mb: -1.5 }}>
          Select Property Type
        </Typography>
        <PropertiesTypeList />{" "}
      </AddFormContainer>
      <AddFormContainer>
        <Typography variant="body1" color="text.primary" textAlign="left" sx={{ mb: -1.5 }}>
          Select Convenient Package for you
        </Typography>
        <PropertiesPackageList />{" "}
      </AddFormContainer>
    </Container>
  );
}
