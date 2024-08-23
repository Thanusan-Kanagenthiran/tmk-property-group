import { Typography, Grid, TextField, Box, Button, Paper } from "@mui/material";
import AddFormContainer from "../Common/Layout/AddFormContainer";

interface PropertiesPricingFormProps {
  onSubmit: (value: number) => void;
}

const PropertiesPricingForm: React.FC<PropertiesPricingFormProps> = ({ onSubmit }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pricePerNightValue = formData.get("pricePerNight");
    if (typeof pricePerNightValue === "string") {
      const pricePerNight = parseFloat(pricePerNightValue);
      if (isNaN(pricePerNight)) {
        console.log("Invalid price value.");
        return;
      } else {
        onSubmit(pricePerNight);
      }
    } else {
      console.log("All fields are required.");
    }
  };
  return (
    <AddFormContainer>
      <form onSubmit={handleSubmit}>
        <Grid component={Paper} container py={2} alignItems={"baseline"} justifyContent={"space-around"}>
          <Grid md={6} xs={12}>
            <Typography variant="body1" color="text.primary" textAlign="left" px={2}>
              Please fix your base price per night
            </Typography>
          </Grid>
          <Grid md={6} xs={6} justifyContent={"end"} display={"flex"} px={2} alignItems={"center"}>
            <Typography variant="body2" color="secondary" mr={1}>
              LKR
            </Typography>
            <TextField type="number" variant="outlined" name="pricePerNight" size="small" sx={{ width: "140px" }} />
            <Button type="submit" sx={{ ml: 2 }} variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </AddFormContainer>
  );
};

export default PropertiesPricingForm;
