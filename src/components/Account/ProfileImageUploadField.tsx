"use client";
import React, { useState, createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  ButtonGroup
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import ProfileImageDelete from "./ProfileImageDelete";

interface ProfileImageUploadFieldProps {
  onImageChange: (file: File) => void;
  aspectRatio?: number;
}

export const ProfileImageUploadField: React.FC<ProfileImageUploadFieldProps> = ({ onImageChange, aspectRatio = 1 }) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [cropData, setCropData] = useState<string>("#");
  const cropperRef = createRef<ReactCropperElement>();
  const fileInputRef = createRef<HTMLInputElement>();
  const [imageCropped, setImageCropped] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [zoomValue, setZoomValue] = useState<number>(50);

  const dataURLToFile = (dataURL: string, filename: string) => {
    const [header, base64] = dataURL.split(",");
    const mime = header.match(/:(.*?);/)?.[1] || "image/png";
    const byteString = window.atob(base64);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([uintArray], { type: mime });
    return new File([blob], filename, { type: mime });
  };

  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0] && allowedTypes.includes(files[0].type)) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setDialogOpen(true);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const getCropData = () => {
    if (cropperRef.current?.cropper) {
      const croppedImage = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
      setCropData(croppedImage);

      const file = dataURLToFile(croppedImage, "cropped-image.png");
      onImageChange(file);
      setImageCropped(true);
      setDialogOpen(false);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <ButtonGroup aria-label="Loading button group"  sx={{
        display: "flex",
        justifyContent: "center", 
        gap: 2, 
      }}>
        <Button  variant="contained"  component="label" role={undefined}  tabIndex={-1}>
          Upload an Image
          <TextField
            style={{ display: "none" }}
            type="file"
            inputRef={fileInputRef}
            onChange={onChange}
            inputProps={{ accept: "image/png, image/jpeg, image/jpg, image/svg+xml" }}
            hidden
          />
        </Button>
        <ProfileImageDelete />
      </ButtonGroup>

      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="xs" sx={{ justifyContent: "center" }} fullWidth>
        <DialogTitle>Crop Image</DialogTitle>
        <DialogContent>
          <Slider
            size="small"
            defaultValue={zoomValue}
            onChange={(e, value) => setZoomValue(value as number)}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
          <Box>
            {image && (
              <Cropper
                ref={cropperRef}
                style={{
                  height: "350px",
                  display: "flex",
                  justifyContent: "center",
                  maxHeight: "350px",
                  width: "100%"
                }}
                zoomTo={zoomValue / 100}
                aspectRatio={aspectRatio}
                src={image}
                viewMode={1}
                background={false}
                responsive={true}
                checkOrientation={false}
                guides={true}
                disabled={true}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ mt: -2, mb: 2, px: 2 }}>
          <Button color="secondary" size="small" variant="outlined" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button color="secondary" size="small" onClick={getCropData} disabled={!image} variant="contained">
            Crop Image
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileImageUploadField;
