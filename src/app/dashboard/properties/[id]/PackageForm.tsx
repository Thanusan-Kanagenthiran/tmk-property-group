"use client";

import { useRef, useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Snackbar,
  Alert
} from "@mui/material";

import AppSpinner from "@/components/Common/AppSpinner";

interface PackageDTO {
  packageName: "standard" | "deluxe" | "premium";
  durationRequirementDays: {
    daysOrWeeks: "days" | "weeks";
    count: number;
  };
  packagePricePerDay: number;
}

interface PackageFormProps {
  initialData?: PackageDTO | null;
  onSave: (packageData: PackageDTO) => void;
}

const initialPackageErrors = {
  packagePricePerDay: "",
  durationRequirementDays: ""
};

export default function PackageForm({
  initialData,
  onSave
}: PackageFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [packageData, setPackageData] = useState<Partial<PackageDTO>>(initialData || {});
  const [errors, setErrors] = useState(initialPackageErrors);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [backendSuccess, setBackendSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setPackageData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = { ...initialPackageErrors };
    let isValid = true;

    if (!packageData.packagePricePerDay) {
      newErrors.packagePricePerDay = "Price per day is required.";
      isValid = false;
    }

    if (!packageData.durationRequirementDays?.count) {
      newErrors.durationRequirementDays = "Duration count is required.";
      isValid = false;
    }

    if (!packageData.durationRequirementDays?.daysOrWeeks) {
      newErrors.durationRequirementDays = "Duration type (days or weeks) is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      await onSave({
        packageName: packageData.packageName || "standard",
        durationRequirementDays: {
          daysOrWeeks: packageData.durationRequirementDays?.daysOrWeeks || "days",
          count: packageData.durationRequirementDays?.count || 0
        },
        packagePricePerDay: packageData.packagePricePerDay || 0
      });
      setBackendSuccess("Package saved successfully.");
    } catch (error) {
      setBackendError("Failed to save package.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setBackendError(null);
    setBackendSuccess(null);
  };

  return (
    <Container maxWidth="xs">
      <Snackbar autoHideDuration={3000} onClose={handleClose} open={!!backendError}>
        <Alert severity="error">{backendError}</Alert>
      </Snackbar>

      <Snackbar autoHideDuration={3000} onClose={handleClose} open={!!backendSuccess}>
        <Alert severity="success">{backendSuccess}</Alert>
      </Snackbar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          autoComplete="off"
          style={{ maxWidth: "350px", marginBottom: "2rem" }}
        >
          <Grid container spacing={2} mb={-4}>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.packagePricePerDay}>
                <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
                  Price Per Day
                </Typography>
                <TextField
                  type="number"
                  size="small"
                  variant="outlined"
                  margin="normal"
                  name="packagePricePerDay"
                  value={packageData.packagePricePerDay || ""}
                  onChange={(e) => setPackageData({
                    ...packageData,
                    packagePricePerDay: Number(e.target.value)
                  })}
                  error={!!errors.packagePricePerDay}
                  helperText={errors.packagePricePerDay || " "}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: 0.5 }}>
                Duration Requirement
              </Typography>
              <FormControl fullWidth size="small" error={!!errors.durationRequirementDays}>
                <Select
                  value={packageData.durationRequirementDays?.daysOrWeeks || ""}
                  onChange={(e) => setPackageData({
                    ...packageData,
                    durationRequirementDays: {
                      ...(packageData.durationRequirementDays || {}),
                      daysOrWeeks: e.target.value as "days" | "weeks",
                      count: packageData.durationRequirementDays?.count || 0
                    }
                  })}
                  name="daysOrWeeks"
                >
                  <MenuItem value="days">Days</MenuItem>
                  <MenuItem value="weeks">Weeks</MenuItem>
                </Select>
                {errors.durationRequirementDays && (
                  <FormHelperText>{errors.durationRequirementDays}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="secondary" textAlign="left" sx={{ mb: -1.5 }}>
                Count
              </Typography>
              <TextField
                type="number"
                size="small"
                variant="outlined"
                margin="normal"
                name="durationCount"
                value={packageData.durationRequirementDays?.count || ""}
                onChange={(e) => setPackageData({
                  ...packageData,
                  durationRequirementDays: {
                    daysOrWeeks: packageData.durationRequirementDays?.daysOrWeeks || "days",
                    count: Number(e.target.value) || 0
                  }
                })}
                error={!!errors.durationRequirementDays}
                helperText={errors.durationRequirementDays || " "}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="center" gap={2}>
            <Button
              type="submit"
              variant="contained"
              startIcon={loading ? <AppSpinner size={15} /> : null}
              size="medium"
              fullWidth
              color="primary"
            >
              {loading ? "Saving..." : "Save Package"}
            </Button>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
