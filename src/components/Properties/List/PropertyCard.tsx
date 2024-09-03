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
    <Card sx={{ maxWidth: 350, p: 2, m: "auto", height: "100%" }}>
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
          textAlign="justify"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            height: "auto"
          }}>
          {description}
        </Typography>
        <Stack direction="row" justifyContent={"start"} mt={1}>
          <Chip icon={<KingBedIcon fontSize="small" />} label={`${noOfBeds} Beds`} variant="outlined" />
          <Chip
            sx={{ ml: 1 }}
            icon={<BathtubIcon fontSize="small" />}
            label={`${noOfBaths} Baths`}
            variant="outlined"
          />
          <Chip
            sx={{ ml: 1 }}
            icon={<PeopleIcon fontSize="small" />}
            label={`${maxNoOfGuests} Guests`}
            variant="outlined"
          />
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", alignItems: "end", px: 2, py: -1 }}>
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
  );
};

export default PropertyCard;
