import * as React from "react";
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Avatar,
  Grid
} from "@mui/material";
import { accountServices } from "../../services/users.service";
import ProfileImageUpload from "@/components/Account/ProfileImageUpload";
import EditPhoneNumber from "./EditAccount";
import EditPassword from "./EditPassword";
import CloseIcon from "@mui/icons-material/Close";

import EditIcon from "@mui/icons-material/Edit";
interface AccountDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export default function AccountDetails() {
  const [accountDetails, setAccountDetails] = React.useState<AccountDetails | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [openModal, setOpenModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState<React.ReactNode>(null);
  const [modalTitle, setModalTitle] = React.useState<string>("");
  const handleOpenModal = (content: React.ReactNode, title: string) => {
    setModalContent(content);
    setModalTitle(title);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  React.useEffect(() => {
    async function fetchProperties() {
      try {
        const propertiesData = await accountServices.GetAccountDetails();
        setAccountDetails(propertiesData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!accountDetails) {
    return <p>No account details available.</p>;
  }

  return (
    <>
      <Grid container spacing={2}  justifyContent={"center"} alignItems={"center"} sx={{minHeight:"100%"}}>
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box position="relative" display="inline-block" width={200} height={200}>
              <Avatar alt="Profile Image" src={accountDetails.image} sx={{ width: 200, height: 200 }} />
              <IconButton
                color="secondary"
                sx={{ position: "absolute", top: 15, right: 10, backgroundColor: "#333" }}
                onClick={() => handleOpenModal(<ProfileImageUpload />, "Profile Image")}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ px: 5 }} display="flex" justifyContent="center" alignItems="center">
          <Box mb={2}>
            <Typography variant="body1" gutterBottom>
              Name: {accountDetails.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {accountDetails.email}
            </Typography>
            <Typography variant="body1">
              Phone: {accountDetails.phone}
              <IconButton onClick={() => handleOpenModal(<EditPhoneNumber />, "Edit Phone Number")} sx={{ ml: 1 }}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleOpenModal(<EditPassword />, "Edit Password")}
              sx={{ mt: 2 }}>
              Change Password
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>
          {modalTitle}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>{modalContent}</DialogContent>
      </Dialog>
    </>
  );
}
