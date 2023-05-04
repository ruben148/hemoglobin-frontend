import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import Cookies from "js-cookie";

function AppointmentForm({ donationCenter, closeModalHandler }) {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [emailNotification, setEmailNotification] = useState(false);
  const [smsNotification, setSmsNotification] = useState(false);

  const token = JSON.parse(Cookies.get("token"));

  const url = `http://localhost:8080/api/donation-centers/${donationCenter.id}/availability`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAvailableDates(data);
      });
  }, [donationCenter]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEmailNotificationChange = (event) => {
    setEmailNotification(event.target.checked);
  };

  const handleSmsNotificationChange = (event) => {
    setSmsNotification(event.target.checked);
  };

  const handleSubmit = () => {
    if (selectedDate) {
      const appointmentData = {
        donor: { id: token.userId },
        donationCenter: donationCenter,
        date: selectedDate.toISOString().split("T")[0],
        emailNotification,
        smsNotification,
      };

      fetch("http://localhost:8080/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "The selected date is not available for appointments"
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log("Appointment created:", data);
          closeModalHandler();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("No date selected");
    }
    console.log("Selected Date:", selectedDate);
    closeModalHandler();
  };

  const shouldDisableDate = (day) => {
    const index = day.diff(dayjs(), "day");
    return index < 0 || index > 60 || availableDates[index] === false;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open onClose={closeModalHandler}>
        <DialogTitle>Make an Appointment</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <DatePicker
              label="Appointment Date"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <Box {...params} />}
              shouldDisableDate={shouldDisableDate}
            />
          </FormControl>
        </DialogContent>
        <FormControl fullWidth>
          <FormControlLabel
            control={
              <Checkbox
                checked={emailNotification}
                onChange={handleEmailNotificationChange}
              />
            }
            label="Email Notification"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={smsNotification}
                onChange={handleSmsNotificationChange}
              />
            }
            label="SMS Notification"
          />
        </FormControl>
        <DialogActions>
          <Button onClick={closeModalHandler}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

export default AppointmentForm;
