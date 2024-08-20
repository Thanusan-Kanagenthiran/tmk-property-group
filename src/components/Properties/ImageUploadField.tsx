"use client";
import React, { useState, createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface ImageUploadFieldProps {
  onImageChange: (file: File) => void;
  buttonWidth?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ onImageChange, buttonWidth = "210px" }) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [cropData, setCropData] = useState<string>("#");
  const cropperRef = createRef<ReactCropperElement>();
  const fileInputRef = createRef<HTMLInputElement>();
  const [imageCropped, setImageCropped] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
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
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        sx={{ width: `${buttonWidth}`, display: "flex", justifyContent: "center" }}>
        <CloudUploadIcon />
        <TextField
          style={{ display: "none" }}
          size="small"
          variant="outlined"
          type="file"
          inputRef={fileInputRef}
          onChange={onChange}
          hidden
        />
      </Button>

      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Crop Image</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            {image && (
              <Cropper
                ref={cropperRef}
                style={{ height: "360px", width: "640px" }}
                zoomTo={0.5}
                aspectRatio={16 / 9}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                guides={true}
                disabled={true}
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={getCropData} disabled={!image} variant="contained" color="primary">
            Crop Image
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageUploadField;
