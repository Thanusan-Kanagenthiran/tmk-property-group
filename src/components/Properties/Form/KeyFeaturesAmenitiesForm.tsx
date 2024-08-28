import React, { useState } from "react";
import { Typography, Grid, Box, Button, Checkbox, FormControlLabel } from "@mui/material";
import AddFormContainer from "@/components/Common/Layout/AddFormContainer";

interface Label {
  label: string;
  key: string;
}

interface FormState {
  [key: string]: boolean;
}

const labels: Label[] = [
  { label: "Air conditioning", key: "air_conditioning" },
  { label: "Tile or Marble floor", key: "tile_or_marble_floor" },
  { label: "Clothes rack", key: "clothes_rack" },
  { label: "Upper floors accessible by elevator", key: "upper_floors_accessible_by_elevator" },
  { label: "Dining area", key: "dining_area" },
  { label: "Kitchenware", key: "kitchenware" },
  { label: "Laundry area", key: "laundry_area" },
  { label: "Washing machine", key: "washing_machine" },
  { label: "Dryer", key: "dryer" },
  { label: "Parking area", key: "parking_area" }
];

interface KeyFeaturesAmenitiesFormProps {
  onSubmit: (values: string[]) => void;
}

const KeyFeaturesAmenitiesForm: React.FC<KeyFeaturesAmenitiesFormProps> = ({ onSubmit }) => {
  const [formState, setFormState] = useState<FormState>({});

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.checked
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amenities = labels.reduce<string[]>((acc, label) => {
      if (formState[label.key]) {
        acc.push(label.label);
      }
      return acc;
    }, []);

    // Create a response object
    const response = { amenities };

    if (amenities.length === 0) {
      console.log("At least one feature should be selected.");
      return;
    } else {
      onSubmit(amenities);
      console.log(response);
    }
  };

  return (
    <AddFormContainer>
      <Typography ml={2} variant="body1" color="text.primary" textAlign="left" sx={{ mb: -1.5 }}>
        Key Features and Amenities
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} p={2}>
          {labels.map((label) => (
            <Grid item xs={12} sm={6} md={4} key={label.key}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={label.key}
                    color="secondary"
                    checked={!!formState[label.key]}
                    onChange={handleCheckboxChange}
                  />
                }
                label={label.label}
              />
            </Grid>
          ))}

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

export default KeyFeaturesAmenitiesForm;
