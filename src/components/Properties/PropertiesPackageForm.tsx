import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface PropertiesPackageFormProps {
  open: boolean;
  handleClose: () => void;
}

interface PropertiesPackageFormProps {
  packages?: {
    packageName: string;
    packagePricePerDay: number;
    durationRequirementDays?: {
      daysOrWeeks: "days" | "weeks";
      count: number;
    };
  }[];
}

const PropertiesPackageForm: React.FC<PropertiesPackageFormProps> = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const email = formJson.email as string;
          console.log(email);
          handleClose();
        },
        sx: { width: "400px", maxWidth: "90vw" }
      }}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>Please Fill the package Details</DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" size="small" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" size="small" type="submit">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PropertiesPackageForm;
