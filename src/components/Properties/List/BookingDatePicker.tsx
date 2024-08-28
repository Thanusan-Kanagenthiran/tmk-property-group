import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface CheckInCheckOutPickerProps {
  onDaysCountChange: (daysCount: number) => void;
  onDateChange: (checkIn: Dayjs | null, checkOut: Dayjs | null) => void;
}

const CheckInCheckOutPicker: React.FC<CheckInCheckOutPickerProps> = ({ onDaysCountChange, onDateChange }) => {
  const [checkIn, setCheckIn] = React.useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = React.useState<Dayjs | null>(null);

  const minCheckOutDate = checkIn ? checkIn.add(1, "day") : dayjs();

  const daysCount = checkIn && checkOut ? checkOut.diff(checkIn, "day") : 0;

  React.useEffect(() => {
    onDaysCountChange(daysCount);
    onDateChange(checkIn, checkOut);
  }, [daysCount, checkIn, checkOut, onDaysCountChange, onDateChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker label="Check-in" value={checkIn} onChange={(newValue) => setCheckIn(newValue)} minDate={dayjs()} />
        <DatePicker
          label="Check-out"
          value={checkOut}
          onChange={(newValue) => setCheckOut(newValue)}
          minDate={minCheckOutDate}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CheckInCheckOutPicker;
