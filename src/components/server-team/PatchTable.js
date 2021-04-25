import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Box,
  Collapse,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  Paper,
} from "@material-ui/core";

import {
  CancelOutlined,
  Done,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@material-ui/icons/";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row, dispatch } = props;
  const [open, setOpen] = useState(false);
  const [actionStatus, setActionStatus] = useState(row.approvalStatus);
  const classes = useRowStyles();

  useEffect(()=>{
      setActionStatus(row.approvalStatus);
  }, [props]);

  const handleDenial = (patchId) => {
    const reason = window.prompt("Reason for Denial");
    if(reason){
      dispatch({ type: "DENY_PATCH", payload: { id: patchId, reason: reason } });
    }
  };

  const handleAction = (patchId) => {
    var reason = "";
    var status = actionStatus;
    if(status === "denied"){
      reason = window.prompt("Reason for Denial");
    }
    dispatch({ type: "HANDLE_ACTION", payload: { id: patchId, status, reason: reason } });
  }

  return (
    <React.Fragment>
      <TableRow
        className={row.approvalStatus && `${row.approvalStatus}-row ${classes.root}`}
      >
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.title}</TableCell>
        {/* <TableCell align="center">{row.description}</TableCell> */}
        <TableCell align="center">{row.server}</TableCell>
        <TableCell align="center">{row.osVersion}</TableCell>
        <TableCell align="center">
          {moment(row.start.toString()).format("MMMM Do YYYY, h:mm:ss a")}{" "}to{" "}
          {moment(row.end.toString()).format("MMMM Do YYYY, h:mm:ss a")}
        </TableCell>
        <TableCell align="center">{row.approvalStatus}</TableCell>
        {/* <TableCell align="center">{row.approverName}</TableCell> */}
        {/* <TableCell align="center">{row.approverEmail}</TableCell> */}
        {/* <TableCell align="center">
          <IconButton
            size="small"
            title="Approve"
            className="approve-btn"
            onClick={() => {
              dispatch({ type: "APPROVE_PATCH", payload: row.id });
            }}
            disabled={row.approvalStatus === "approved" ? true : false}
          >
            <Done disabled={row.approvalStatus === "approved" ? true : false} />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton
            size="small"
            title="Deny"
            className="deny-btn"
            onClick={() => {
              handleDenial(row.id);
            }}
          >
            <CancelOutlined />
          </IconButton>
        </TableCell> */}
        <TableCell align="center" className="flex">
          <Select
              native
              fullWidth
              onChange={(e) => {
                setActionStatus(e.target.value);
              }}
              value={actionStatus}
              required
            >
              <option aria-label="None" value="" />
              <option value="requested">Requested</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="denied">Deny</option>
            </Select>
            <IconButton
              size="small"
              title="save"
              className="approve-btn"
              onClick={() => {
                handleAction(row.id);
              }}
            >
              <Done />
            </IconButton>
            <IconButton
              size="small"
              title="cancel"
              className="deny-btn"
              onClick={() => {
                setActionStatus(row.approvalStatus);
              }}
            >
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
              <Typography gutterBottom component="div">
                Approver: <b>{row.approverName}</b>
              </Typography>
              <Typography gutterBottom component="div">
                Approver Email: <b>{row.approverEmail}</b>
              </Typography>
              {row.approvalStatus && row.approvalStatus === "denied" && (
                <Typography gutterBottom component="div">
                  Reason for Denial: <b>{row.denialReason}</b>
                </Typography>
              )}
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
          <caption>Expand to view more details</caption>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Title</TableCell>
              {/* <TableCell align="center">Description</TableCell> */}
              <TableCell align="center">Server</TableCell>
              <TableCell align="center">OS Version</TableCell>
              <TableCell align="center">Proposed Patch Date/Time</TableCell>
              <TableCell align="center">Status</TableCell>
              {/* <TableCell align="center">Approver Name</TableCell>
              <TableCell align="center">Approver Email</TableCell> */}
              {/* <TableCell align="center">Approve</TableCell>
              <TableCell align="center">Deny </TableCell> */}
              <TableCell align="center">Action </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <Row key={row.id} row={row} dispatch={dispatch} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default PatchTable;
