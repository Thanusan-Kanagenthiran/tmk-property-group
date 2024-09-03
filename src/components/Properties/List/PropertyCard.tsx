"use client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import KingBedIcon from "@mui/icons-material/KingBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import PeopleIcon from "@mui/icons-material/People";
import { formatCurrency } from "@/lib/util/formatCurrency";
import { Grid } from "@mui/material";

export interface PropertyDTO {
  id: string;
  title: string;
  description: string;
  image?: string;
  noOfBaths: number;
  noOfBeds: number;
  maxNoOfGuests: number;
  pricePerNight: number;
  region: string;
}

interface PropertyCardProps {
  property: PropertyDTO;
  isDashboard?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isDashboard = false }) => {
  const { id, title, description, image, noOfBaths, noOfBeds, maxNoOfGuests, pricePerNight, region } = property;

  const featureImage = image ? image : `https://placehold.co/300x140?text=${encodeURIComponent(title)}`;

  const propertyUrl = isDashboard ? `/dashboard/properties/${id}` : `/properties/${id}`;
  return (
    <Grid item xs={12} md={6}  lg={4} key={property.id} display="flex" justifyContent="center">
      <Card
        sx={{
          width: "100%", 
          p: 2,
          m: "auto",
          height: "100%",
          boxSizing: "border-box" // Ensure padding is included in width calculation
        }}>
        <CardMedia sx={{ height: 140, mx: 2, mt: 2 }} className="rounded" image={featureImage} />
        <CardContent>
          <Typography
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              height: "auto"
            }}
            gutterBottom
            variant="h6"
            component="div">
            <span> {region} </span> {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            mb={1}
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              height: "auto",
              lineHeight: "1.5rem",
              minHeight: "3rem"
            }}>
            {description}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              flexWrap: "nowrap",
              overflowX: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" }
            }}>
            <Chip icon={<KingBedIcon fontSize="small" />} label={`${noOfBeds} Beds`} variant="outlined" />
            <Chip icon={<BathtubIcon fontSize="small" />} label={`${noOfBaths} Baths`} variant="outlined" />
            <Chip icon={<PeopleIcon fontSize="small" />} label={`${maxNoOfGuests} Guests`} variant="outlined" />
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between", alignItems: "end", px: 2, py: -2 }}>
          <div>
            <Typography variant="body2" color="text.secondary">
              Price starts from
            </Typography>
            <Typography variant="subtitle1"> {formatCurrency(pricePerNight)}</Typography>
          </div>
          <Button sx={{ fontSize: "11px" }} href={propertyUrl} variant="contained">
            {isDashboard ? "Manage Property" : "Book Now"}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PropertyCard;
