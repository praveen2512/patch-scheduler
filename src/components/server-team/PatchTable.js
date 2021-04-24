import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {IconButton, Box, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper} from "@material-ui/core"

import {CancelOutlined, Done, KeyboardArrowUp, KeyboardArrowDown} from "@material-ui/icons/";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row, dispatch } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        {/* <TableCell align="center">{row.description}</TableCell> */}
        <TableCell align="center">{row.server}</TableCell>
        <TableCell align="center">{row.osVersion}</TableCell>
        <TableCell align="center">{moment(row.start.toString()).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
        <TableCell align="center">{row.approvalStatus}</TableCell>
        {/* <TableCell align="center">{row.approverName}</TableCell> */}
        {/* <TableCell align="center">{row.approverEmail}</TableCell> */}
        <TableCell align="center">
            <IconButton size="small" title="Approve" className="approve-btn" onClick={()=> {dispatch({ type: "APPROVE_PATCH", payload: row.id })}}
              disabled={row.approvalStatus === "approved" ? true : false}>
              <Done disabled={row.approvalStatus === "approved" ? true : false}/>
            </IconButton>
            <IconButton size="small" title="Deny" className="deny-btn" onClick={()=> {dispatch({ type: "DENY_PATCH", payload: row.id })}}>
              <CancelOutlined />
            </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {row.title}
              </Typography>
              <Typography gutterBottom component="div">
                {row.description}
              </Typography>
              Approver: {row.approverName}
              Approver Email: {row.approverEmail}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function PatchTable() {

  const rows = useSelector((state) => state.serverReducer.events);
  const dispatch = useDispatch();

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <caption>Expand to view more information</caption>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              {/* <TableCell align="center">Description</TableCell> */}
              <TableCell align="center">Server</TableCell>
              <TableCell align="center">OS Version</TableCell>
              <TableCell align="center">Patch date</TableCell>
              <TableCell align="center">Status</TableCell>
              {/* <TableCell align="center">Approver Name</TableCell>
              <TableCell align="center">Approver Email</TableCell> */}
              <TableCell align="center">
                
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <Row key={row.id} row={row} dispatch={dispatch}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default PatchTable;
