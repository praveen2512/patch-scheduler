import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { ExitToApp, Menu } from "@material-ui/icons";

function Header() {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <div>
      {/* {isLoggedIn && ( */}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">Patch Scheduler</Typography>
        </Toolbar>
        {isLoggedIn && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              dispatch({ type: "LOGOUT" });
            }}
          >
            <ExitToApp />
          </IconButton>
        )}
      </AppBar>
      {/* )} */}
    </div>
  );
}

export default Header;
