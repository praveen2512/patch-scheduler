import React from 'react';
import { Typography } from "@material-ui/core";

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        Patch Scheduler {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

export default Copyright
