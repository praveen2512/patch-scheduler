import "./App.css";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Box, Container } from "@material-ui/core";
import { useSelector } from "react-redux";

import Schedule from "./components/Schedule";
import Login from "./components/auth/Login";
import Header from "./components/Header";
import Copyright from "./components/Copyright";

function App() {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);

  if (!sessionStorage.getItem("isLoggedIn")) {
    return <Login />;
  }

  return (
    <div className="App">
      <Header />
      <Container className="mt-4">
          <Switch>
            <Route path="/" exact component={Schedule} />
            <Route path="/login" exact component={Login} />
          </Switch>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

export default App;
