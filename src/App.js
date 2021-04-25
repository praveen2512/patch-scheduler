import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppBar, Box, Container, IconButton, Link, Toolbar, Typography } from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {Provider} from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Schedule from "./components/Schedule";
import Login from './components/auth/Login'
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
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">Patch Scheduler</Typography>
          </Toolbar>
        </AppBar>
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
