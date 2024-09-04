"use client";
import { useState, useEffect } from "react";
import { Container, TextField, MenuItem, Grid, Box, Autocomplete, Typography, CircularProgress } from "@mui/material";
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
import { alpha } from "@mui/material";

export default function Page() {
  const [properties, setProperties] = useState<any[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    propertyType: "",
    region: "",
    checkIn: null as Dayjs | null,
    checkOut: null as Dayjs | null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Start loading
      try {
        const fetchedPropertyTypes = await propertiesService.GetPropertyTypes();
        setPropertyTypes(fetchedPropertyTypes);

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
      } finally {
        setLoading(false); // End loading
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
        <Grid container spacing={2} sx={{ py: 4 }} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
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
                    sx={{ cursor: "pointer", mr: 1, pr: 2, fontSize: 36 }}
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

          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              sx={{ width: "100%" }}
              label="Check-in"
              value={filters.checkIn}
              onChange={handleDateChange("checkIn")}
              minDate={dayjs()}
              slotProps={{ textField: { color: "secondary" } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src="/images/property-listing.jpg"
          alt="Property Listing"
          sx={{
            width: "100%",
            objectFit: "cover",
            minHeight: { xs: "80vh", sm: "70vh", md: "60vh" }
          }}
        />
        <Box
          display={"flex"}
          alignItems={"center"}
          textAlign={"center"}
          position={"absolute"}
          top={0}
          left={0}
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: (theme) => alpha(theme.palette.grey[900], 0.6)
          }}>
          <Container maxWidth="lg">
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
      <Container className={styles.main} maxWidth="lg" sx={{ minHeight: "50vh" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              minHeight: "30vh"
            }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : properties.length > 0 ? (
          <PropertyList properties={properties} />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              minHeight: "30vh"
            }}>
            <Typography
              variant="h4"
              color="secondary"
              sx={{
                px: 5,
                fontWeight: "bold"
              }}>
              No properties found
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}
