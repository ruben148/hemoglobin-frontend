import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Link,
  Checkbox
} from "@material-ui/core";
import Cookies from "js-cookie";

function LoginForm({ onLogin, registerUrl, forgotPasswordUrl }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ username, password }));
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      const token = await response.json();
      console.log(token);
      Cookies.set("token", JSON.stringify(token));
      const cookie = Cookies.get("token");
      console.log(cookie);
      onLogin(token);
    } else {
      onLogin(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button type="submit" fullWidth variant="contained" color="primary">
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href={forgotPasswordUrl} variant="body1">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href={registerUrl} variant="body1">
            {"Don't have an account? Register"}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default LoginForm;
