import React, { useState } from "react";
import Image from "next/image";
import {
  Container,
  Grid,
  Card,
  IconButton,
  Box,
  Typography,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

interface PropertiesImageListProps {
  images: { url: string; public_id: string }[];
  propertyId: string;
}

const PropertiesImageList: React.FC<PropertiesImageListProps> = ({ images, propertyId }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [deletePublicId, setDeletePublicId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  const handleDeleteClick = (publicId: string) => {
    setDeletePublicId(publicId);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    if (deletePublicId) {
      console.log("Deleting image:", deletePublicId);
      try {
        await axios.delete(`/api/property/${propertyId}/images`, {
          data: { public_id: deletePublicId, propertyId }
        });
        setOpenSnackbar(true);
      } catch (error) {
        setError("Error deleting image.");
      } finally {
        setOpenDialog(false);
        setDeletePublicId(null);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Grid container spacing={2} mt={2}>
        {images.map((image, index) => (
          <Grid item xs={6} sm={4} md={3} key={image.public_id}>
            <Card sx={{ height: "100%", position: "relative" }}>
              <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                <Image
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  layout="responsive"
                  width={500} // Adjust width as needed
                  height={300} // Adjust height as needed
                  style={{ borderRadius: "4px" }}
                />
                <IconButton
                  onClick={() => handleDeleteClick(image.public_id)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)"
                    }
                  }}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this image?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Image deleted successfully!
        </Alert>
      </Snackbar>

      {/* Snackbar for error message */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PropertiesImageList;
