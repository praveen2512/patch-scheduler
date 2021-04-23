import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { AppBar, Button, Container, IconButton, Toolbar, Typography } from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {Provider} from 'react-redux'

import Schedule from "./components/Schedule";
import {store} from './store';

function App() {
  return (
    <Provider store={store}>
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
          <Container>
            <Route path="/" component={Schedule} />
          </Container>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
