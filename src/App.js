import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppBar, Box, Container, Typography } from "@material-ui/core";
import {Provider} from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Schedule from "./components/Schedule";
import Login from './components/auth/Login';
import Header from './components/Header'
import {store} from './store';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#003C4D',
      dark: "#002029"
    }, 
  }
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
        Patch Scheduler
      {" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function App() {

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
      <div className="App">
        <Header />
        <Router>
          <Container className="mt-4">
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={Schedule} />
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </Router>
      </div>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
