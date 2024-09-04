import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface CheckInCheckOutPickerProps {
  onDaysCountChange: (daysCount: number) => void;
  onDateChange: (checkIn: Dayjs | null, checkOut: Dayjs | null) => void;
  unAvailableDates?: string[]; // Add unAvailableDates prop
}

const CheckInCheckOutPicker: React.FC<CheckInCheckOutPickerProps> = ({
  onDaysCountChange,
  onDateChange,
  unAvailableDates = [] // Default to an empty array
}) => {
  const [checkIn, setCheckIn] = React.useState<Dayjs | null>(null);
  const [checkOut, setCheckOut] = React.useState<Dayjs | null>(null);

  const minCheckOutDate = checkIn ? checkIn.add(1, "day") : dayjs();

  const daysCount = checkIn && checkOut ? checkOut.diff(checkIn, "day") : 0;

  React.useEffect(() => {
    onDaysCountChange(daysCount);
    onDateChange(checkIn, checkOut);
  }, [daysCount, checkIn, checkOut, onDaysCountChange, onDateChange]);

  // Function to check if a date should be disabled
  const isDateDisabled = (date: Dayjs) => {
    return unAvailableDates.includes(date.format("YYYY-MM-DD"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker", "DatePicker"]}>
        <DatePicker
          slotProps={{ textField: { size: "small" } }}
          label="Check-in"
          value={checkIn}
          onChange={(newValue) => setCheckIn(newValue)}
          minDate={dayjs()}
          shouldDisableDate={isDateDisabled}
        />
        <DatePicker
          disabled={checkIn ? false : true}
          slotProps={{ textField: { size: "small" } }}
          label="Check-out"
          value={checkOut}
          onChange={(newValue) => setCheckOut(newValue)}
          minDate={minCheckOutDate}
          shouldDisableDate={isDateDisabled}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CheckInCheckOutPicker;
