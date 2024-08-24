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

export default async function Orders() {
  const propertiesTypes = await propertiesService.GetPropertyTypes();
  const properties = await propertiesService.GetProperties();

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price Per Night</TableCell>
            <TableCell></TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((row: PropertyDTO) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.pricePerNight}</TableCell>
              <TableCell>{row.noOfBeds + row.noOfBaths + row.maxNoOfGuests}</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
