import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";
import DoctorEditForm from "../../../components/doctor/DoctorEditForm";
import AdminNavigation from "../../../components/layout/AdminNavigation";

const DoctorEditPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    // Fetch the doctor information from the backend using the id
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/doctor/${id}`);
        const data = await response.json();
        setDoctor(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleSave = async (updatedDoctor) => {
    try {
      // Send the updated doctor information to the backend
      const response = await fetch(
        `http://localhost:8080/api/doctor/${id}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDoctor),
        }
      );
      const data = await response.json();
      setDoctor(data);
      //alert("Doctor information saved successfully!");
    } catch (error) {
      console.error(error);
      //alert("Failed to save doctor information!");
    }
  };

  return (
    <div>
      <AdminNavigation />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Edit Doctor Information
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {doctor ? (
            <DoctorEditForm doctor={doctor} onSave={handleSave} />
          ) : (
            <Typography variant="body1">Loading...</Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default DoctorEditPage;
