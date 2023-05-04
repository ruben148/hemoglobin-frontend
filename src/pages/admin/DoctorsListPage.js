import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AdminNavigation from "../../components/layout/AdminNavigation";
import { Pagination } from "@mui/material";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const DoctorListPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchDoctors();
  }, [searchQuery, page]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/doctor?page=${page-1}&search=${searchQuery}`
      );
      const data = await response.json();
      setDoctors(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDoctors();
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/doctor/${id}`, {
        method: "DELETE",
      });
      fetchDoctors();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AdminNavigation />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Doctors
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSearch}>
            <TextField
              label="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </form>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="doctors table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {doctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>{doctor.firstName}</TableCell>
                    <TableCell>{doctor.lastName}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.phoneNumber}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            navigate(`/doctor/${doctor.id}`)
                        }
                      >
                        View/Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(doctor.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default DoctorListPage;