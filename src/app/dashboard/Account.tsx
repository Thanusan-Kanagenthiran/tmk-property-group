import * as React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { accountServices } from "../../services/users.service";
import Image from "next/image";
import ProfileImagesUpload from "@/components/Account/ProfileImageUpload";
import ProfileImageDelete from "@/components/Account/ProfileImageDelete";
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

  React.useEffect(() => {
    async function fetchProperties() {
      try {
        const propertiesData = await accountServices.GetAccountDetails();
        setAccountDetails(propertiesData);
        console.log(propertiesData); // Log the fetched data
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
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        My Account
      </Typography>
      <Typography variant="body1">Name: {accountDetails.name}</Typography>
      <Typography variant="body1">Email: {accountDetails.email}</Typography>
      <Typography variant="body1">Phone: {accountDetails.phone}</Typography>
      <Box>
        {accountDetails.image && (
          <Box position="relative" display="inline-block" width={200} height={200}>
            <Image
              src={accountDetails.image}
              style={{ borderRadius: "50%" }}
              width={200}
              height={200}
              alt="Profile Image"
              loading="lazy"
            />
            <Box position="absolute" top={-30} right={-40} display="flex" alignItems="end" justifyContent="end">
              <ProfileImageDelete />
              <ProfileImagesUpload />
            </Box>
          </Box>
        )}
        
      </Box>
    </React.Fragment>
  );
}
