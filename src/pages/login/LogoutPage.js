import React, { useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenDTO = JSON.parse(Cookies.get("token"));
    try {
      fetch("http://localhost:8080/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: tokenDTO.token, // Pass the token string in the request body
      }).then((response) => {
        if (response.ok) {
          console.log("Logged out successfully!");
        } else {
          console.log("Logout failed!");
        }
      });
      Cookies.remove("token");
    } catch (error) {
      console.log("Not logged in!");
    }
    // Show the message for 3 seconds and then redirect to the login page
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }, [navigate]);
  

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        You have been logged out.
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Redirecting to the login page...
      </Typography>
    </Container>
  );
}

export default LogoutPage;
