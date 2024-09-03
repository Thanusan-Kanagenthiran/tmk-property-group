"use client";
import { useState, useEffect } from "react";
import { Container, TextField, MenuItem, Grid, Box, Autocomplete, Typography } from "@mui/material";
import styles from "./home.module.scss";
import { propertiesService } from "@/services/properties.service";
import PropertyList from "@/components/Properties/List/PropertyList";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import CloseIcon from "@mui/icons-material/Close";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { cities } from "@/components/Properties/Form/PropertyInfoForm";

export default function Page() {
  const [properties, setProperties] = useState<any[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    propertyType: "",
    region: "",
    checkIn: null as Dayjs | null,
    checkOut: null as Dayjs | null
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedPropertyTypes = await propertiesService.GetPropertyTypes();
        setPropertyTypes(fetchedPropertyTypes);

        // Convert Dayjs objects to ISO strings for API requests
        const { propertyType, region, checkIn, checkOut } = filters;
        const fetchedProperties = await propertiesService.GetProperties({
          propertyType,
          region,
          checkIn: checkIn ? checkIn.toISOString() : undefined,
          checkOut: checkOut ? checkOut.toISOString() : undefined
        });
        setProperties(fetchedProperties.properties);
      } catch (error) {
        console.error("Error loading data", error);
      }
    }

    fetchData();
  }, [filters]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value
    });
  };

  const handleAutocompleteChange = (
    event: React.ChangeEvent<{}>,
    newValue: { name: string; province: string } | null
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      region: newValue ? newValue.name : ""
    }));
  };

  const handleDateChange = (name: "checkIn" | "checkOut") => (newValue: Dayjs | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: newValue
    }));
  };

  const filterComponent = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2} sx={{ my: 4 }} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={3} >
            <TextField
              select
              color="secondary"
              fullWidth
              label="Property Type"
              name="propertyType"
              value={filters.propertyType}
              onChange={handleFilterChange}
              InputProps={{
                endAdornment: filters.propertyType && (
                  <CloseIcon
                    sx={{ cursor: "pointer", mr: 2 }}
                    onClick={() => {
                      setFilters({ ...filters, propertyType: "" });
                      handleFilterChange;
                    }}
                  />
                )
              }}>
              {propertyTypes.map((type) => (
                <MenuItem key={type.id} value={type.title}>
                  {type.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <Autocomplete
              disablePortal
              options={cities}
              getOptionLabel={(option) => option.name}
              value={cities.find((city) => city.name === filters.region) || null}
              onChange={handleAutocompleteChange}
              renderInput={(params) => (
                <TextField
                  color="secondary"
                  {...params}
                  label="Region"
                  InputProps={{
                    ...params.InputProps
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} >
            <DatePicker
              sx={{ width: "100%" }}
              label="Check-in"
              value={filters.checkIn}
              onChange={handleDateChange("checkIn")}
              minDate={dayjs()}
              slotProps={{ textField: { color: "secondary" } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} >
            <DatePicker
              sx={{ width: "100%" }}
              disabled={!filters.checkIn}
              label="Check-out"
              value={filters.checkOut}
              onChange={handleDateChange("checkOut")}
              minDate={filters.checkIn || dayjs()}
              slotProps={{ textField: { color: "secondary" } }}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    );
  };
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "auto"
        }}>
        <Box
          component="img"
          src="/images/property-listing.jpg"
          alt="Property Listing"
          sx={{
            width: "100%",
            height: "auto",
            objectFit: "cover"
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            background: "rgba(0, 0, 0, 0.33)",
            backdropFilter: "blur(2.5px)"
          }}>
          <Container>
            <Typography
              variant="h1"
              color="white"
              sx={{
                px: 5,
                fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                fontWeight: "bold"
              }}>
              Find Your Next Stay
            </Typography>
            {filterComponent()}
          </Container>
        </Box>
      </Box>
      <Container className={styles.main} maxWidth="lg">
        {properties.length > 0 ? <PropertyList properties={properties} /> : <p>No properties found.</p>}
      </Container>
    </>
  );
}
