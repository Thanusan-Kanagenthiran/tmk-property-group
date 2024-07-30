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

interface Property {
  title: string;
  description: string;
  price: string;
  link: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { title, description, price, link, bedrooms, bathrooms, image } = property;

  return (
    <Card sx={{ maxWidth: 345, p: 4, m: "auto" }}>
      <CardMedia sx={{ height: 140 }} className="rounded" image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
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
            height: "auto",
          }}>
          {description}
        </Typography>
        <Stack direction="row" spacing={1} mt={2}>
          <Chip
            sx={{ px: 0.5 }}
            icon={<KingBedIcon fontSize="small" />}
            label={`${bedrooms} Bedrooms`}
            variant="outlined"
          />
          <Chip
            sx={{ px: 0.5 }}
            icon={<BathtubIcon fontSize="small" />}
            label={`${bathrooms} Bathrooms`}
            variant="outlined"
          />
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", alignItems: "end" }}>
        <div>
          <Typography variant="body2" color="text.secondary">
            Price
          </Typography>
          <Typography variant="subtitle1">{price}</Typography>
        </div>
        <Button sx={{ fontSize: "11px" }} href={link} variant="contained">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
