import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { propertiesService } from "@/services/properties.service";
import { PropertyDTO } from "@/components/Properties/List/PropertyCard";
import { CircularProgress, Box } from "@mui/material";

export default function Orders() {
  const [properties, setProperties] = React.useState<PropertyDTO[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchProperties() {
      try {
        const propertiesData = await propertiesService.GetProperties();
        setProperties(propertiesData);
      } catch (err) {
        setError("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price Per Night</TableCell>
            <TableCell>Details</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((row: PropertyDTO) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.pricePerNight}</TableCell>
              <TableCell>
                {row.noOfBeds} Beds, {row.noOfBaths} Baths, {row.maxNoOfGuests} Guests
              </TableCell>
              <TableCell align="right">{/* Add action buttons or links here */}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
