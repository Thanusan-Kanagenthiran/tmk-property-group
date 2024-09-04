import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

interface DateFilterProps {
  onDateChange: (checkIn: Dayjs | null, checkOut: Dayjs | null) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onDateChange }) => {
  const [checkIn, setCheckIn] = React.useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = React.useState<Dayjs | null>(null);

  const minCheckOutDate = checkIn ? checkIn.add(1, "day") : dayjs();

  React.useEffect(() => {
    onDateChange(checkIn, checkOut);
  }, [checkIn, checkOut, onDateChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          label="Check-in"
          value={checkIn}
          onChange={(newValue) => setCheckIn(newValue)}
          minDate={dayjs()}
        />
        <DatePicker
          disabled={!checkIn}
          label="Check-out"
          value={checkOut}
          onChange={(newValue) => setCheckOut(newValue)}
          minDate={minCheckOutDate}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateFilter;
