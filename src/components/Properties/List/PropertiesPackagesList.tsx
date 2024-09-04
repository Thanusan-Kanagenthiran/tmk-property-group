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
import axiosClient from "@/services";

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
  unAvailableDates?: string[];
}

const PropertiesPackagesList: React.FC<PropertiesPackagesListProps> = ({
  propertyId,
  pricePerNight,
  hostId,
  propertyPackages,
  unAvailableDates
}) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [daysCount, setDaysCount] = useState(0);
  const [guests, setGuests] = useState<number | null>(null);
  const [checkIn, setCheckIn] = useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = useState<Dayjs | null>(null);

  console.log(unAvailableDates);

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

  const handleSubmit = async () => {
    try {
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
        propertyId,
        hostId,
        isPackage: selectedPackage,
        daysCount,
        guests,
        checkIn: checkIn ? checkIn.format("YYYY-MM-DD") : null,
        checkOut: checkOut ? checkOut.format("YYYY-MM-DD") : null,
        amount: totalPrice
      };

      const response = await axiosClient.post(`/property/${propertyId}/bookings`, data);

      return response.data;
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      throw error;
    }
  };

  return (
    <AddFormContainer>
      <Grid justifyContent={"space-between"} container>
        <Grid item xs={12} md={6}>
          <CheckInCheckOutPicker
            unAvailableDates={unAvailableDates}
            onDaysCountChange={handleDaysCountChange}
            onDateChange={handleDateChange}
          />
        </Grid>
        <Grid mt={1} item xs={12} md={6}>
          <Box display={"flex"} justifyContent={"end"} alignItems={"center"}>
            <TextField
              name="guests"
              value={guests}
              size="small"
              type="number"
              onChange={(e) => setGuests(parseInt(e.target.value, 10))}
              label="Number of Guests"
              variant="outlined"
            />

            <Button type="submit" variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>
              Confirm Booking
            </Button>
          </Box>
        </Grid>
      </Grid>
      {propertyPackages && propertyPackages.length > 0 && (
        <>
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
