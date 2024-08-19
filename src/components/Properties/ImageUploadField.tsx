"use client";

import React, { useState, createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Box, Grid, Button, TextField } from "@mui/material";

interface ImageUploadFieldProps {
  name: string;
  id: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ name, id }) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [cropData, setCropData] = useState<string>("#");
  const cropperRef = createRef<ReactCropperElement>();
  const fileInputRef = createRef<HTMLInputElement>();
  const [imageCropped, setImageCropped] = useState<boolean>(false);

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
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const getCropData = () => {
    if (cropperRef.current?.cropper) {
      const croppedImage = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
      setCropData(croppedImage);

      const file = dataURLToFile(croppedImage, "cropped-image.png");
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
      }
      setImageCropped(true);
    }
  };

  return (
    <div>
      <TextField size="small" variant="outlined" type="file" onChange={onChange} />

      <input id={id} ref={fileInputRef} type="file" name={name} required style={{ display: "none" }} />
      <Grid container sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Grid item md={4}>
          <Box sx={{ display: "flex", justifyContent: "center", height: 300, width: 345 }}>
            {image ? (
              <Cropper
                ref={cropperRef}
                style={{ height: "100%", width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={16 / 9}
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
              />
            ) : (
              <img src="https://placehold.co/345x300?text=Please+upload\n+an+image" alt="Please upload an image" />
            )}
          </Box>
        </Grid>
        <Grid item md={6}>
          {imageCropped && <img style={{ height: 300, width: 533.33 }} src={cropData} alt="Cropped Image" />}
          {!imageCropped && (
            <img
              style={{ height: 300, width: 533.33 }}
              src="https://placehold.co/533x300?text=Cropped+Image"
              alt="Cropped Image"
            />
          )}
        </Grid>
      </Grid>
      <Button sx={{ mt: 2 }} size="small" onClick={getCropData} disabled={!image} variant="contained" color="primary">
        Crop Image
      </Button>
    </div>
  );
};

export default ImageUploadField;
