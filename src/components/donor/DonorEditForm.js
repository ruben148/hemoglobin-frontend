import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const bloodTypeMap = {
  "O+": "O_POSITIVE",
  "O-": "O_NEGATIVE",
  "A+": "A_POSITIVE",
  "A-": "A_NEGATIVE",
  "B+": "B_POSITIVE",
  "B-": "B_NEGATIVE",
  "AB+": "AB_POSITIVE",
  "AB-": "AB_NEGATIVE",
};

function DonorEditForm({ donor, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(donor);

  useEffect(() => {
    setFormData(donor);
  }, [donor]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (event) => {
    event.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setFormData(donor);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form>
      <TextField
        name="username"
        label="Username"
        value={formData.username}
        disabled={!isEditing}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="firstName"
        label="First Name"
        value={formData.firstName}
        disabled={!isEditing}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="lastName"
        label="Last Name"
        value={formData.lastName}
        disabled={!isEditing}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="email"
        label="Email"
        value={formData.email}
        disabled={!isEditing}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="cnp"
        label="CNP"
        value={formData.cnp}
        disabled={!isEditing}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="phoneNumber"
        label="Phone Number"
        value={formData.phoneNumber}
        disabled={!isEditing}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Blood Type</InputLabel>
        <Select
          name="bloodType"
          value={formData.bloodType}
          disabled={!isEditing}
          onChange={handleChange}
          required
        >
          <MenuItem value="A_POSITIVE">A+</MenuItem>
          <MenuItem value="A_NEGATIVE">A-</MenuItem>
          <MenuItem value="B_POSITIVE">B+</MenuItem>
          <MenuItem value="B_NEGATIVE">B-</MenuItem>
          <MenuItem value="AB_POSITIVE">AB+</MenuItem>
          <MenuItem value="AB_NEGATIVE">AB-</MenuItem>
          <MenuItem value="O_POSITIVE">O+</MenuItem>
          <MenuItem value="O_NEGATIVE">O-</MenuItem>
        </Select>
      </FormControl>
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
}

export default DonorEditForm;
