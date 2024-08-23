import { Typography, Grid, TextField, Box, Button } from "@mui/material";
import AddFormContainer from "../Common/Layout/AddFormContainer";

interface PropertyInfoFormProps {
  onSubmit: (values: { maxNoOfGuests: number; noOfBeds: number; noOfBaths: number }) => void;
}

const RoomsAndMeasurementsForm: React.FC<PropertyInfoFormProps> = ({ onSubmit }) => {
  const handleRoomsAndAmentiesS = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const noOfBedsValue = formData.get("noOfBeds");
    const noOfBathsValue = formData.get("noOfBaths");
    const maxNoOfGuestsValue = formData.get("maxNoOfGuests");

    // Ensure all fields are provided
    if (
      typeof noOfBedsValue !== "string" ||
      typeof noOfBathsValue !== "string" ||
      typeof maxNoOfGuestsValue !== "string"
    ) {
      console.log("All fields are required.");
      return;
    }

    // Convert values to numbers
    const noOfBeds = parseInt(noOfBedsValue, 10);
    const noOfBaths = parseInt(noOfBathsValue, 10);
    const maxNoOfGuests = parseInt(maxNoOfGuestsValue, 10);

    // Validate the converted numbers
    if (isNaN(noOfBeds) || isNaN(noOfBaths) || isNaN(maxNoOfGuests)) {
      console.log("Invalid number values.");
      return;
    }

    // Create a response object
    const response = {
      noOfBeds,
      noOfBaths,
      maxNoOfGuests
    };

    console.log(response);
    onSubmit(response);
  };

  return (
    <AddFormContainer>
      <form onSubmit={handleRoomsAndAmentiesS}>
        <Grid container spacing={2} p={2}>
          <Typography ml={2} variant="body1" color="text.primary" textAlign="left">
            Room Details & Measurements
          </Typography>
          <Grid container spacing={2} py={2}>
            <Grid item xs={6} md={3} display="flex" alignItems="center" justifyContent={"end"}>
              <Typography variant="body2" color="secondary" mr={2}>
                No of Rooms
              </Typography>
              <TextField type="number" variant="outlined" name="maxNoOfGuests" size="small" sx={{ width: "70px" }} />
            </Grid>
            <Grid item xs={6} md={3} display="flex" alignItems="center" justifyContent={"end"}>
              <Typography variant="body2" color="secondary" mr={2}>
                No of Beds
              </Typography>
              <TextField type="number" variant="outlined" name="noOfBeds" size="small" sx={{ width: "70px" }} />
            </Grid>
            <Grid item xs={6} md={3} display="flex" alignItems="center" justifyContent={"end"}>
              <Typography variant="body2" color="secondary" mr={2}>
                No of baths
              </Typography>
              <TextField type="number" variant="outlined" name="noOfBaths" size="small" sx={{ width: "70px" }} />
            </Grid>
            <Grid item xs={6} md={3} display="flex" alignItems="center" justifyContent={"end"}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button sx={{ px: 4 }} color="primary" type="submit" variant="contained">
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AddFormContainer>
  );
};

export default RoomsAndMeasurementsForm;
