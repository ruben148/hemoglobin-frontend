import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const DoctorEditForm = ({ doctor, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(doctor);

  useEffect(() => {
    setFormData(doctor);
  }, [doctor]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (event) => {
    event.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setFormData(doctor);
    setIsEditing(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form onSubmit={handleSaveClick}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        value={formData.username}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="First Name"
        name="firstName"
        autoComplete="given-name"
        value={formData.firstName}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        autoComplete="family-name"
        value={formData.lastName}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="cnp"
        label="CNP"
        name="cnp"
        autoComplete="off"
        value={formData.cnp}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="phoneNumber"
        label="Phone Number"
        name="phoneNumber"
        autoComplete="tel"
        value={formData.phoneNumber}
        onChange={handleChange}
        disabled={!isEditing}
      />
      {/*segrfawe
      esfsefess
      <FormControl variant="outlined" fullWidth margin="normal" required>
        <InputLabel id="donation-center-label">Donation Center</InputLabel>
        <Select
          labelId="donation-center-label"
          id="donation-center"
          name="donationCenter"
          value={data.donationCenter}
          onChange={handleChange}
          label="Donation Center"
        >
          /* Here you will map through the donation centers from the backend *
          /* and render a MenuItem for each one *
          <MenuItem value="donation-center-1">Donation Center 1</MenuItem>
          <MenuItem value="donation-center-2">Donation Center 2</MenuItem>
          <MenuItem value="donation-center-3">Donation Center 3</MenuItem>
        </Select>
        <FormHelperText>
          Search for the donation center where you work
        </FormHelperText>
      </FormControl>
    */}
      {isEditing ? (
        <div>
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Save
          </Button>
          <Button
            variant="contained"
            color="default"
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button variant="contained" color="primary" onClick={handleEditClick}>
          Edit
        </Button>
      )}
    </form>
  );
};

export default DoctorEditForm;
