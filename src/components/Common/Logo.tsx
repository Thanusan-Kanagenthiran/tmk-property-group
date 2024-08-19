import { Box } from "@mui/material";

interface LogoProps {
  height?: number; // Optional height prop
}

const Logo: React.FC<LogoProps> = ({ height = 34 }) => {
  // Calculate width based on height using the aspect ratio (208:60)
  const aspectRatio = 208 / 60;
  const width = height * aspectRatio;

  return (
    <Box
      sx={{
        px: 2,
        width: `${width}px`, // Set width based on calculated value
        height: `${height}px`, // Set height from prop
        maxWidth: "100%", // Ensure the Box does not exceed parent width
        maxHeight: `${height}px`, // Limit max height to maintain aspect ratio
        display: "flex",
        alignItems: "center", // Center align SVG vertically
        justifyContent: "center" // Center align SVG horizontally
      }}>
      <svg
        viewBox="0 0 208 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }} // Scale SVG within Box dimensions
      >
        <path d="M30 60C13.4333 60 0 46.5667 0 30H30V60Z" fill="#703BF7" />
        <path d="M0 0C16.5667 0 30 13.4333 30 30H0V0Z" fill="#14B8A6" />
        <path d="M30 60C46.5667 60 60 46.5667 60 30H30V60Z" fill="#14B8A6" />
        <path d="M60 30C60 13.4333 46.5667 0 30 0V30H60Z" fill="#4F46E5" />
        <path
          d="M107.88 11.4V20.58H95.28V51H83.04V20.58H70.32V11.4H107.88ZM161.454 11.4V51H150.654V35.16L150.894 22.38H150.774L142.074 51H132.234L123.654 22.38H123.474L123.714 35.16V51H112.914V11.4H130.194L135.534 30.18L137.514 38.04H137.634L139.614 30.18L144.954 11.4H161.454ZM206.315 11.4L187.295 35.22L186.695 32.88L177.635 44.58L174.995 35.52L193.055 11.4H206.315ZM180.935 11.4V51H168.695V11.4H180.935ZM191.675 23.94L207.275 51H193.415L182.615 30.72L191.675 23.94Z"
          fill="#4F46E5"
        />
      </svg>
    </Box>
  );
};

export default Logo;
