import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Box, Container, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import Schedule from "./components/Schedule";
import Login from "./components/auth/Login";
import Header from "./components/Header";

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
    <div className="App">
      <Header />
      <Container className="mt-4">
        <Router>
          <Switch>
            <Route path="/" exact component={Schedule} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </Router>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

export default App;
