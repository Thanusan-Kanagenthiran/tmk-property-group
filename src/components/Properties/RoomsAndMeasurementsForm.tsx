import { Typography, Grid, TextField, Box, Button } from "@mui/material";
import AddFormContainer from "../Common/Layout/AddFormContainer";

const handleRoomsAndAmentiesS = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const response = {
    noOfRooms: formData.get("noOfRooms") as string,
    noOfBeds: formData.get("noOfBeds") as string,
    noOfBaths: formData.get("noOfBaths") as string,
    area: formData.get("area") as string
  };

  if (!response.noOfRooms || !response.noOfBeds || !response.noOfBaths || !response.area) {
    console.log("All fields are required.");
    return;
  } else {
    console.log(response);
  }
};

const RoomsAndMeasurementsForm = () => {
  return (
    <AddFormContainer>
      <form onSubmit={handleRoomsAndAmentiesS}>
        <Typography variant="body1" color="text.primary" textAlign="left" sx={{ mb: -1.5 }}>
          Room Details & Measurements
        </Typography>
        <Grid container spacing={2} p={2}>
          <Grid item xs={6} md={3} display="flex" alignItems="center" justifyContent={"end"}>
            <Typography variant="body2" color="secondary" mr={2}>
              No of Rooms
            </Typography>
            <TextField variant="outlined" name="noOfRooms" size="small" sx={{ width: "140px" }} />
          </Grid>
          <Grid item xs={6} md={3} display="flex" alignItems="center" justifyContent={"end"}>
            <Typography variant="body2" color="secondary" mr={2}>
              No of Beds
            </Typography>
            <TextField variant="outlined" name="noOfBeds" size="small" sx={{ width: "140px" }} />
          </Grid>
          <Grid item xs={6} md={3} display="flex" alignItems="center" justifyContent={"end"}>
            <Typography variant="body2" color="secondary" mr={2}>
              No of baths
            </Typography>
            <TextField variant="outlined" name="noOfBaths" size="small" sx={{ width: "140px" }} />
          </Grid>
          <Grid item xs={6} md={3} display="flex" alignItems="center" justifyContent={"end"}>
            <Typography variant="body2" color="secondary" mr={2}>
              Area in sqft
            </Typography>
            <TextField variant="outlined" name="area" size="small" sx={{ width: "140px" }} />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }} container justifyContent="end">
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

export default RoomsAndMeasurementsForm;
