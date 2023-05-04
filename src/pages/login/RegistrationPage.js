import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import RegistrationForm from "../../components/login/RegistrationForm";
import { Snackbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegistrationPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    navigate("/login");
    setOpenSnackbar(false);
  };

  const handleRegistration = async (data) => {
    const response = await fetch("http://localhost:8080/api/donor/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirect to login after 3 seconds
    } else {
      // Show an error message or handle the error as you want
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <RegistrationForm onSubmit={handleRegistration} />
        <Button
          component={Link}
          to="/login"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Already have an account? Sign in
        </Button>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Registration successful! Redirecting to login..."
      />
    </Container>
  );
};

export default RegistrationPage;
