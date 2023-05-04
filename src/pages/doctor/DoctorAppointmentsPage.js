import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Chip,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  TextField,
  Button,
} from "@material-ui/core";
import { Pagination } from "@mui/material";
import useStyles from "../../styles";
import Cookies from "js-cookie";
import DoctorNavigation from "../../components/layout/DoctorNavigation";

function DoctorAppointmentsPage() {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleClearDate = () => {
    setSelectedDate(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(Cookies.get("token"));
        const url = `http://localhost:8080/api/doctor/${token.userId}`;
        const response = await fetch(url);
        const result = await response.json();
        setUser(result);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      const url = selectedDate
        ? `http://localhost:8080/api/appointments/donation-center/${
            user.donationCenter.id
          }/date?date=${selectedDate}&page=${page - 1}&size=${pageSize}`
        : `http://localhost:8080/api/appointments/donation-center/${
            user.donationCenter.id
          }?page=${page - 1}&size=${pageSize}`;
      console.log("Fetching appointments from: " + url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setAppointments(data.content);
          setTotalPages(data.totalPages);
        });
    }
  }, [user, selectedDate, page, pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  return (
    <div>
      <DoctorNavigation />
      <Container className={classes.cardGrid} maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Appointments
        </Typography>
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4} md={4}>
            <FormControl className={classes.formControl}>
              <InputLabel id="pageSize-label">Dimensiunea paginii</InputLabel>
              <Select
                labelId="pageSize-label"
                id="pageSize"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              id="date"
              label="Select Date"
              type="date"
              value={selectedDate || ""}
              onChange={handleDateChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClearDate}
            >
              Clear Date
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          {appointments.map((appointment) => (
            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
              <Card className={classes.card}>
                <CardHeader
                  title={`Appointment ID: ${appointment.id}`}
                  subheader={appointment.date}
                />
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6">Donor:</Typography>
                  <Typography variant="body1">
                    {appointment.donor.firstName} {appointment.donor.lastName}
                  </Typography>
                  <Typography variant="body1">
                    Email: {appointment.donor.email}
                  </Typography>
                  <Typography variant="body1">
                    Phone: {appointment.donor.phoneNumber}
                  </Typography>
                  <Typography variant="body1">
                    Blood Type: {appointment.donor.bloodType}
                  </Typography>
                  <Typography variant="h6">Donation Center:</Typography>
                  <Typography variant="body1">
                    {appointment.donationCenter.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Container>
    </div>
  );
}

export default DoctorAppointmentsPage;
