import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {} from "@material-ui/core";
import { ExitToApp, Menu } from "@material-ui/icons";

function Header() {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const user = useSelector((state) => state.authReducer.user);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* {isLoggedIn && ( */}
      <AppBar position="static">
        <Toolbar className="tool-bar">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">Patch Scheduler</Typography>

          {isLoggedIn && (
            <div className="flex center">
              <Typography variant="h6" className="mr-3">{`${user.firstName} ${user.lastName}`}</Typography>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  setOpen(true);
                }}
                title="logout"
              >
                <ExitToApp />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to logout?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              dispatch({ type: "LOGOUT" });
              setOpen(false);
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {/* )} */}
    </div>
  );
}

export default Header;
