import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Copyright from "../Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const errorMessage = useSelector((state) => state.authReducer.errorMessage);
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    try {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } catch (error) {
      console.error(`Error occured in Login handleChange :: ${error}`);
    }
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      dispatch({ type: "LOGIN", payload: formData });
    } catch (error) {
      console.error(`Error occured in Login handleSubmit :: ${error}`);
    }
  };

  if (sessionStorage.getItem("isLoggedIn") === "true") {
    return <Redirect to="/" />;
  }

  return (
    <Container component="div" maxWidth="xs">
      <CssBaseline />
      <Card className="mt-5">
        <CardContent>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              {errorMessage && errorMessage !== "" && (
                <p className="red-text text-center">{errorMessage}</p>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
