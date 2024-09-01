"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import { Box, Button, TextField, Typography } from "@mui/material";
import AddFormContainer from "../../Common/Layout/AddFormContainer";
import CheckInCheckOutPicker from "./BookingDatePicker";
import { Dayjs } from "dayjs";
import PropertiesPackageCard from "./PropertiesPackageCard";
import { PackageDTO } from "@/app/properties/[id]/page";

const commonIconStyles = { height: "50px", width: "50px" };

const Icons: Record<string, React.ReactNode> = {
  standard: <StarBorderIcon sx={commonIconStyles} />,
  deluxe: <StarBorderPurple500Icon sx={commonIconStyles} />,
  premium: <AutoAwesomeIcon sx={commonIconStyles} />
};

interface PropertiesPackagesListProps {
  propertyId: string;
  pricePerNight: number;
  hostId: string;
  propertyPackages: PackageDTO[] | null;
}

const PropertiesPackagesList: React.FC<PropertiesPackagesListProps> = ({
  propertyId,
  pricePerNight,
  hostId,
  propertyPackages
}) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [daysCount, setDaysCount] = useState(0);
  const [guests, setGuests] = useState<number>(0);
  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);

  const handleSelectPackage = (title: string) => {
    setSelectedPackage(title);
  };

  const handleDaysCountChange = (daysCount: number) => {
    setDaysCount(daysCount);
  };

  const handleDateChange = (checkIn: Dayjs | null, checkOut: Dayjs | null) => {
    setCheckIn(checkIn);
    setCheckOut(checkOut);
  };

  const handleSubmit = () => {
    let totalPrice = 0;

    if (selectedPackage && propertyPackages) {
      const selectedPackageDetails = propertyPackages.find((pkg) => pkg.packageName === selectedPackage);
      if (selectedPackageDetails) {
        totalPrice = selectedPackageDetails.packagePricePerDay * daysCount;
      }
    } else {
      totalPrice = pricePerNight * daysCount;
    }

    const data = {
      propertyId: propertyId,
      hostId: hostId,
      isPackage: selectedPackage,
      daysCount,
      guests,
      checkIn: checkIn ? checkIn.format("YYYY-MM-DD") : null,
      checkOut: checkOut ? checkOut.format("YYYY-MM-DD") : null,
      totalPrice
    };

    console.log("Form submitted with data:", data);
  };

  return (
    <AddFormContainer>
      <Grid justifyContent={"space-between"} container>
        <Grid item xs={12} md={8}>
          <CheckInCheckOutPicker onDaysCountChange={handleDaysCountChange} onDateChange={handleDateChange} />
        </Grid>
        <Grid mt={1} item xs={12} md={4}>
          <Box display={"flex"} justifyContent={"end"} alignItems={"center"}>
            <TextField
              placeholder="Number of Guests"
              type="number"
              variant="outlined"
              name="guests"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value, 10))}
            />
            <Button type="submit" sx={{ ml: 2, py: 1.75 }} variant="contained" size="large" onClick={handleSubmit}>
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
      {propertyPackages && propertyPackages.length > 0 && (
        <>
          {" "}
          <Typography mt={4} variant="body1" color="text.primary" textAlign="left">
            Select your preferred package or go with the basic price per day
          </Typography>
          <Grid container spacing={2} py={2}>
            {propertyPackages.map((packageType) => {
              const icon = Icons[packageType.packageName];

              const eligibleDaysCount =
                packageType.durationRequirementDays.daysOrWeeks === "weeks"
                  ? packageType.durationRequirementDays.count * 7
                  : packageType.durationRequirementDays.count;

              return (
                <Grid item xs={12} sm={6} md={4} key={packageType.packageName}>
                  <PropertiesPackageCard
                    isDisabled={daysCount < eligibleDaysCount}
                    propertyPackage={packageType}
                    action={() => handleSelectPackage(packageType.packageName)}
                    icon={icon}
                    selectedPackage={selectedPackage}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </AddFormContainer>
  );
};

export default PropertiesPackagesList;
