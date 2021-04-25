import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppBar, Box, Container, Typography } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import Schedule from "./components/Schedule";
import Login from "./components/auth/Login";
import Header from "./components/Header";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#003C4D",
      dark: "#002029",
    },
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Patch Scheduler {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function App() {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Container className="mt-4">
          <Router>
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={Schedule} />
            </Switch>
          </Router>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
