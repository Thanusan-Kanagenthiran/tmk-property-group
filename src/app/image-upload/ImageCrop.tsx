"use client";

import React, { useState, createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Box, Grid, Button } from "@mui/material";

interface ImageUploadFieldProps {
  name: string;
  id: string;
}

export const DemoCropper: React.FC<ImageUploadFieldProps> = ({ name, id }) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [cropData, setCropData] = useState<string>("#");
  const cropperRef = createRef<ReactCropperElement>();
  const fileInputRef = createRef<HTMLInputElement>();

  // Convert base64 data URL to File object
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

      // Convert cropped image data URL to File and trigger file input change
      const file = dataURLToFile(croppedImage, "cropped-image.png");
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={onChange} />
      <Button onClick={getCropData} disabled={!image} variant="contained" color="primary">
        Crop Image
      </Button>
      <input
        id={id}
        ref={fileInputRef}
        className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        type="file"
        name={name}
        required
        style={{ display: "none" }} // Hide the file input if it's not visible
      />
      <Grid container sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Grid item md={6}>
          <Box sx={{ display: "flex", justifyContent: "center", height: 400, width: 400 }}>
            {image && (
              <Cropper
                ref={cropperRef}
                style={{ height: "100%", width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
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
            )}
          </Box>
        </Grid>
        <Grid item md={6}>
          {cropData && <img style={{ height: 400, width: 400 }} src={cropData} alt="Cropped Image" />}
        </Grid>
      </Grid>
    </div>
  );
};

export default DemoCropper;
