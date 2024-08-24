import React from "react";
import { Typography, Grid, FormControl, TextField, Box, Button, MenuItem, Select } from "@mui/material";
import AddFormContainer from "@/components/Common/Layout/AddFormContainer";

const cities = [
  { name: "Colombo", province: "Western" },
  { name: "Kandy", province: "Central" },
  { name: "Galle", province: "Southern" },
  { name: "Jaffna", province: "Northern" },
  { name: "Trincomalee", province: "Eastern" },
  { name: "Batticaloa", province: "Eastern" },
  { name: "Matara", province: "Southern" },
  { name: "Kurunegala", province: "North Western" },
  { name: "Anuradhapura", province: "North Central" },
  { name: "Polonnaruwa", province: "North Central" },
  { name: "Rathnapura", province: "Sabaragamuwa" },
  { name: "Kegalle", province: "Sabaragamuwa" },
  { name: "Nuwara Eliya", province: "Central" },
  { name: "Kilinochchi", province: "Northern" },
  { name: "Mullaitivu", province: "Northern" },
  { name: "Vavuniya", province: "Northern" },
  { name: "Ampara", province: "Eastern" },
  { name: "Hambantota", province: "Southern" },
  { name: "Matale", province: "Central" },
  { name: "Gampaha", province: "Western" },
  { name: "Kalutara", province: "Western" }
];

interface PropertyInfoFormProps {
  onSubmit: (values: { title: string; description: string; region: string; address: string }) => void;
}

const PropertyInfoForm: React.FC<PropertyInfoFormProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      region: formData.get("region") as string,
      address: formData.get("address") as string
    };

    if (!response.title || !response.description || !response.region || !response.address) {
      console.log("All fields are required.");
      return;
    } else {
      onSubmit(response);
      console.log(response);
    }
  };

  return (
    <AddFormContainer>
      <form onSubmit={handleSubmit}>
        <Typography ml={2} variant="body1" color="text.primary" textAlign="left" sx={{ mb: -1.5 }}>
          Property Information
        </Typography>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} md={8} spacing={2} container>
            <Grid item xs={12}>
              <FormControl sx={{ mb: -0.4, width: "100%" }}>
                <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
                  Title
                </Typography>
                <TextField size="small" variant="outlined" margin="normal" name="title" type="text" />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ mb: -0.4, width: "100%" }}>
                <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
                  Description
                </Typography>
                <TextField
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
              <FormControl sx={{ mb: 0.4, width: "100%" }}>
                <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: 0.5 }}>
                  Region of Island
                </Typography>
                <Select size="small" name="region" labelId="demo-simple-select-label" id="demo-simple-select">
                  {cities.map((city, index) => (
                    <MenuItem key={index} value={city.name}>
                      {city.name}, {city.province}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ mb: -0.4, width: "100%" }}>
                <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
                  Address
                </Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  margin="normal"
                  name="address"
                  type="text"
                  rows={4}
                  multiline
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} container justifyContent="end">
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button sx={{ px: 4 }} color="primary" type="submit" variant="contained" size="small">
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AddFormContainer>
  );
};

export default PropertyInfoForm;
