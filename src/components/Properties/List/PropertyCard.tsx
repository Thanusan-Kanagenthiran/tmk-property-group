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

const PropertyCard: React.FC<{ property: PropertyDTO }> = ({ property }) => {
  const { id, title, description, image, noOfBaths, noOfBeds, maxNoOfGuests, pricePerNight, region } = property;

  const featureImage = image ? image : `https://placehold.co/300x140?text=${encodeURIComponent(title)}`;
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
          <Chip
            sx={{ px: 0.5 }}
            icon={<KingBedIcon fontSize="small" />}
            label={`${noOfBeds} Beds`}
            variant="outlined"
          />
          <Chip
            sx={{ px: 0.5, ml: 1 }}
            icon={<BathtubIcon fontSize="small" />}
            label={`${noOfBaths} Baths`}
            variant="outlined"
          />
          <Chip
            sx={{ px: 0.5, ml: 1 }}
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
          <Typography variant="subtitle1">{`LKR ${pricePerNight}`}</Typography>
        </div>
        <Button sx={{ fontSize: "11px" }} href={`http://localhost:3000/properties/${id}`} variant="contained">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
