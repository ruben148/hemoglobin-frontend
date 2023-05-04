import React, { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import LoginForm from "../../components/login/LoginForm";
import { useNavigate, useLocation } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { set } from "date-fns";
import Cookies from "js-cookie";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [wrongPassword, setWrongPassword] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setWrongPassword(false);
  };

  const handleLogin = (token) => {
    if (token === null) {
      setWrongPassword(true);
      return;
    }
    redirect(token);
  };

  const redirect = (token) => {
    switch (token.userType) {
      case "DONOR":
        console.log("Navigating to donor home");
        navigate("/donor/home");
        break;
      case "DOCTOR":
        console.log("Navigating to doctor home");
        navigate("/doctor/home");
        break;
      case "ADMIN":
        console.log("Navigating to admin home");
        navigate("/admin/home");
        break;
      default:
        console.log("User type=" + token.userType);
        break;
    }
  };

  useEffect(() => {
    try {
      const savedToken = JSON.parse(Cookies.get("token"));
      redirect(savedToken);
    } catch (error) {
      console.log("Not logged in!");
    }
  }, [location]);

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <LoginForm
          onLogin={handleLogin}
          registerUrl="/register"
          forgotPasswordUrl="/forgot-password"
        />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={wrongPassword}
          onClose={handleCloseSnackbar}
          autoHideDuration={3000}
          message="Wrong username or password!"
        />
      </Container>
    </div>
  );
}

export default LoginPage;
