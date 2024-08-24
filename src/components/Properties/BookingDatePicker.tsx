import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";

interface CheckInCheckOutPickerProps {
  onDaysCountChange: (daysCount: number) => void;
}

const CheckInCheckOutPicker: React.FC<CheckInCheckOutPickerProps> = ({ onDaysCountChange }) => {
  const [checkIn, setCheckIn] = React.useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = React.useState<Dayjs | null>(null);

  const minCheckOutDate = checkIn ? checkIn.add(1, "day") : dayjs();

  const daysCount = checkIn && checkOut ? checkOut.diff(checkIn, "day") : 0;

  React.useEffect(() => {
    onDaysCountChange(daysCount);
  }, [daysCount, onDaysCountChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          label="Check-in"
          value={checkIn}
          onChange={(newValue) => setCheckIn(newValue)}
          minDate={dayjs()} // Disables past dates for Check-in
        />
        <DatePicker
          label="Check-out"
          value={checkOut}
          onChange={(newValue) => setCheckOut(newValue)}
          minDate={minCheckOutDate} // Ensures Check-out is at least one day after Check-in
        />
      </DemoContainer>
      {/* Display the number of days */}
      {checkIn && checkOut && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Total Nights: {daysCount}
        </Typography>
      )}
    </LocalizationProvider>
  );
};

export default CheckInCheckOutPicker;
