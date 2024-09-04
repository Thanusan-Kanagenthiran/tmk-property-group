"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Container,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box
} from "@mui/material";
import axios from "axios";
import PackageForm from "./PackageForm";
import CloseIcon from "@mui/icons-material/Close";
import AppSpinner from "@/components/Common/AppSpinner";
interface PackageDTO {
  packageName: "standard" | "deluxe" | "premium";
  durationRequirementDays: {
    daysOrWeeks: "days" | "weeks";
    count: number;
  };
  packagePricePerDay: number;
}

interface PackageListProps {
  propertyId: string;
}

const defaultPackages: Omit<PackageDTO, "durationRequirementDays" | "packagePricePerDay">[] = [
  { packageName: "standard" },
  { packageName: "deluxe" },
  { packageName: "premium" }
];

export default function PackageList({ propertyId }: PackageListProps) {
  const [packages, setPackages] = useState<PackageDTO[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<PackageDTO | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/property/${propertyId}/packages`);
        setPackages(response.data.packages || []);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [propertyId]);

  const handleOpenForm = (type: "add" | "edit", packageData?: PackageDTO) => {
    setModalType(type);
    setSelectedPackage(packageData || null);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedPackage(null);
  };

  const handleAddOrUpdate = async (packageData: PackageDTO) => {
    try {
      setLoading(true);
      if (modalType === "add") {
        await axios.put(`/api/property/${propertyId}/packages`, packageData);
      } else if (modalType === "edit" && selectedPackage) {
        await axios.put(`/api/property/${propertyId}/packages`, packageData);
      }
      // Refresh the package list after adding or updating
      await fetchPackages();
      handleCloseForm();
    } catch (error) {
      console.error("Error saving package:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (packageName: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/property/${propertyId}/packages`, {
        data: { packageName } // Send the packageName in the body of the request
      });
      // Refresh the package list after deletion
      await fetchPackages();
    } catch (error) {
      console.error("Error deleting package:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/property/${propertyId}/packages`);
      setPackages(response.data.packages || []);
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography ml={2} mt={4} pb={2} variant="body1" color="text.primary" textAlign="left">
        Property Packages
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" mb={2}>
          <AppSpinner size={15} />
        </Box>
      ) : (
        <Grid container spacing={2} mb={2}>
          {defaultPackages.map((defaultPkg) => {
            const existingPackage = packages.find((pkg) => pkg.packageName === defaultPkg.packageName);

            return (
              <Grid item xs={12} sm={6} md={4} key={defaultPkg.packageName}>
                <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">
                      {defaultPkg.packageName.charAt(0).toUpperCase() + defaultPkg.packageName.slice(1)}
                    </Typography>
                    {existingPackage ? (
                      <>
                        <Typography variant="body2">Price Per Day: ${existingPackage.packagePricePerDay}</Typography>
                        <Typography variant="body2">
                          Duration: {existingPackage.durationRequirementDays.count}{" "}
                          {existingPackage.durationRequirementDays.daysOrWeeks}
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="body2">Package not added yet</Typography>
                    )}
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    {existingPackage ? (
                      <>
                        <Button size="small" color="primary" onClick={() => handleOpenForm("edit", existingPackage)}>
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => handleDelete(existingPackage.packageName)}>
                          Delete
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                          handleOpenForm("add", {
                            packageName: defaultPkg.packageName,
                            durationRequirementDays: {
                              daysOrWeeks: "days",
                              count: 0
                            },
                            packagePricePerDay: 0
                          })
                        }>
                        Add
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Dialog open={formOpen} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <DialogTitle>
          {modalType === "add" ? "Add Package: " : "Edit Package: "} {selectedPackage?.packageName}
          <IconButton
            aria-label="close"
            onClick={handleCloseForm}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <PackageForm onSave={handleAddOrUpdate} initialData={selectedPackage} />
        </DialogContent>
      </Dialog>
    </>
  );
}
