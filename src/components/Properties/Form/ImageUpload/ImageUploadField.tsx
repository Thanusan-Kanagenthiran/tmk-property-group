"use client";
import React, { useState, createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Slider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

interface ImageUploadFieldProps {
  onImageChange: (file: File) => void;
  buttonWidth?: string;
  aspectRatio?: number;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  onImageChange,
  buttonWidth = "210px",
  aspectRatio = 16 / 9
}) => {
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
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        sx={{ width: `${buttonWidth}`, display: "flex", justifyContent: "center" }}>
        {imageCropped ? <CloudDoneIcon color="success" /> : <CloudUploadIcon color="action" />}
        <TextField
          style={{ display: "none" }}
          size="small"
          variant="outlined"
          type="file"
          inputRef={fileInputRef}
          onChange={onChange}
          inputProps={{ accept: "image/png, image/jpeg, image/jpg, image/svg+xml" }}
          hidden
        />
      </Button>

      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Crop Image</DialogTitle>
        <DialogContent>
          <Slider
            size="small"
            defaultValue={zoomValue}
            onChange={(e, value) => setZoomValue(value as number)}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center" }}>
            {image && (
              <Cropper
                ref={cropperRef}
                style={{ height: "100%", maxHeight: "350px", width: "100%" }}
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
        <DialogActions sx={{ mb: 2, px: 5 }}>
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

export default ImageUploadField;
