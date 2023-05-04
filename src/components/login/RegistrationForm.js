import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box
} from '@material-ui/core';

const bloodTypes = [
  'O_POSITIVE',
  'O_NEGATIVE',
  'A_POSITIVE',
  'A_NEGATIVE',
  'B_POSITIVE',
  'B_NEGATIVE',
  'AB_POSITIVE',
  'AB_NEGATIVE'
];

export default function RegistrationForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cnp, setCnp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bloodType, setBloodType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username,
      password,
      firstName,
      lastName,
      email,
      cnp,
      phoneNumber,
      bloodType
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="First Name"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Last Name"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        margin="normal"
        fullWidth
        required
        type="email"
      />
      <TextField
        label="CNP"
        value={cnp}
        onChange={(event) => setCnp(event.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
        margin="normal"
        fullWidth
        required
      />
      <FormControl fullWidth required>
        <InputLabel>Blood Type</InputLabel>
        <Select
          value={bloodType}
          onChange={(event) => setBloodType(event.target.value)}
        >
          {bloodTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box mt={2}>
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </Box>
    </form>
  );
}