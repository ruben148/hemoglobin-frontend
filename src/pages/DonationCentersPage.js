import { Link } from "react-router-dom";
import {
  Typography,
  AppBar,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Modal,
  Backdrop,
  Box,
} from "@material-ui/core";
import { Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { PhotoCamera } from "@material-ui/icons";

import useStyles from "../styles";
import DonationCenterCard from "../components/DonationCenterCard";
import DonorNavigation from "../components/layout/DonorNavigation";
import AppointmentForm from "../components/AppointmentForm";

function DonationCentersPage() {
  const classes = useStyles();

  const [donationCenters, setDonationCenters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [makingAppointment, setMakingAppointment] = useState(false);
  const [appointmentDonationCenter, setAppointmentDonationCenter] =
    useState(null);

  const url = `http://localhost:8080/api/donation-centers/all?page=${
    page - 1
  }&size=${pageSize}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDonationCenters(data.content);
        setTotalPages(data.totalPages);
      });
  }, [page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
  };

  const handleButtonClick = () => {};

  const handleAppointmentClick = (clickedDonationCenter) => {
    setAppointmentDonationCenter(clickedDonationCenter);
    setMakingAppointment(true);
  };

  const closeModalHandler = () => {
    setAppointmentDonationCenter(null);
    setMakingAppointment(false);
  };

  return (
    <div>
      <DonorNavigation />
      <div>
        <main>
          <div className={classes.container}>
            <Container maxWidth="sm">
              <Typography
                variant="h3"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Locații
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Aici veți găsi toate locațiile unde puteți dona sânge.
              </Typography>
            </Container>
          </div>
          <div>
            <Container maxWidth="sm" style={{ marginTop: "30px" }}>
              <Typography
                variant="h6"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Blabla
              </Typography>
              <div className={classes.button}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Buton 1
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Buton 2
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Typography></Typography>
          <div>
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
            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={4}>
                {donationCenters.map((donationCenter) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={donationCenter.id}
                  >
                    <DonationCenterCard donationCenter={donationCenter}>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={handleButtonClick}
                      >
                        Descriere
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => handleAppointmentClick(donationCenter)}
                      >
                        Programare
                      </Button>
                    </DonationCenterCard>
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
        </main>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary">
            Something
          </Typography>
        </footer>
      </div>
      <Modal
        open={makingAppointment}
        onClose={closeModalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AppointmentForm
          donationCenter={appointmentDonationCenter}
          closeModalHandler={closeModalHandler}
        ></AppointmentForm>
      </Modal>
    </div>
  );
}

export default DonationCentersPage;
