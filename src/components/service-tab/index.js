import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import { Schedule } from "@material-ui/icons";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import "react-big-calendar/lib/css/react-big-calendar.css";

const initialState = {
  title: "",
  description: "",
  server: "",
  osVersion: "",
  patchDate: new Date(),
  isApprovalNeeded: "N",
  approvalStatus: "requested",
  approverName: "",
  approverEmail: "",
  start: moment().format("YYYY-MM-DDThh:mm"),
  end: moment().format("YYYY-MM-DDThh:mm"),
};

function ServiceTab() {
  const localizer = momentLocalizer(moment);

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  // const [server, setServer] = useState("");
  const [formData, setFormData] = useState(initialState);

  const submitButtonRef = useRef();

  const eventList = useSelector((state) => state.serverReducer.events);
  const dispatch = useDispatch();

  useEffect(() => {
    
  },[]);

  const handleClickOpen = (scrollType) => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSlotSelect = (e) => {
    const { start, end } = e;
    
    //setFormData({ ...formData, patchDate: start, start, end });
    setFormData({
      ...formData,
      patchDate: moment(start).format("YYYY-MM-DDThh:mm"),
      start: moment(start).format("YYYY-MM-DDThh:mm"),
      end: moment(end).format("YYYY-MM-DDThh:mm"),
    });
    handleClickOpen("paper");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { start, end } = formData;

    //const event = { ...formData, resource: { ...formData } };
    const event = { ...formData, start: new Date(start).toISOString(), end: new Date(end).toISOString(), id: uuidv4(), resource: {  } };
    
    console.log(`new event is ${JSON.stringify(event)}`);
    dispatch({ type: "ADD_EVENT", payload: event });
    setFormData(initialState);
    handleClose();
  };

  const getPatchDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        fullWidth
        maxWidth="md"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Expand to see more information
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText align="center" color="primary">
              {/* Schedule for {`${moment(formData.start).format("MMMM Do YYYY, h:mm:ss a")} to ${moment(formData.end).format("MMMM Do YYYY, h:mm:ss a")}`} */}
              Schedule for{" "}
              {`${moment(formData.start).format("MMMM Do YYYY, h:mm:ss a")}`}
            </DialogContentText>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  name="title"
                  label="Title"
                  type="text"
                  value={formData.title}
                  onChange={handleOnChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  margin="dense"
                  id="description"
                  name="description"
                  label="Description"
                  type="text"
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={handleOnChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/* <FormControl> */}
                <InputLabel htmlFor="server-label">Server</InputLabel>
                <Select
                  native
                  fullWidth
                  value={formData.server}
                  onChange={handleOnChange}
                  inputProps={{
                    name: "server",
                    id: "server-label",
                  }}
                  required
                >
                  <option aria-label="None" value="" />
                  <option value="server-1">Server 1</option>
                  <option value="server-2">Server 2</option>
                  <option value="server-3">Server 3</option>
                </Select>
                {/* </FormControl> */}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  margin="dense"
                  id="osVersion"
                  name="osVersion"
                  label="OS Version"
                  type="text"
                  value={formData.osVersion}
                  onChange={handleOnChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/* <TextField
                    margin="dense"
                    id="patchDate"
                    name="patchDate"
                    label="Patch Date"
                    type="date"
                    value={formData.patchDate}
                    onChange={handleOnChange}
                    fullWidth
                    required
                  /> */}
                <TextField
                  label="Patch From Date/Time"
                  id="start"
                  name="start"
                  type="datetime-local"
                  value={formData.start}
                  onChange={handleOnChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  label="Patch To Date/Time"
                  id="end"
                  name="end"
                  type="datetime-local"
                  value={formData.end}
                  onChange={handleOnChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              {/* <Grid item xs={12} sm={12} md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Application Team Approval needed
                  </FormLabel>
                  <RadioGroup
                    aria-label="Application Team Approval needed"
                    name="isApprovalNeeded"
                    style={{ flexDirection: "row" }}
                    value={formData.isApprovalNeeded}
                    onChange={handleOnChange}
                    required
                  >
                    <FormControlLabel
                      value="Y"
                      control={<Radio color="primary" />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio color="primary" />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <InputLabel htmlFor="approval-status-label">
                  Approval Status
                </InputLabel>
                <Select
                  native
                  fullWidth
                  name="approvalStatus"
                  id="approvalStatus"
                  value={formData.approvalStatus}
                  onChange={handleOnChange}
                  inputProps={{
                    name: "approvalStatus",
                    id: "approval-status-label",
                  }}
                  required
                >
                  <option aria-label="None" value="" />
                  <option value="requested">Requested</option>
                  <option value="pending">Pending for Approval</option>
                  <option value="approved">Approved</option>
                  <option value="denied">Denied</option>
                </Select>
              </Grid> */}
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  margin="dense"
                  id="approverName"
                  name="approverName"
                  label="Approver Name"
                  type="text"
                  value={formData.approverName}
                  onChange={handleOnChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  margin="dense"
                  id="approverEmail"
                  name="approverEmail"
                  label="Approver Email"
                  type="text"
                  value={formData.approverEmail}
                  onChange={handleOnChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              ref={submitButtonRef}
              style={{ display: "none" }}
            ></Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Schedule
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  const eventGetter = (event) => {
    const approvalStatus = event.approvalStatus;
    var backgroundColor =
      approvalStatus === "requested"
        ? "#3174ad"
        : approvalStatus === "pending"
        ? "yellow"
        : approvalStatus === "approved"
        ? "green"
        : approvalStatus === "denied"
        ? "red"
        : "";

    var style = {
      backgroundColor: backgroundColor,
    };
    return { style };
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={12} className="my-2">
          <div>
            <Button
              my={1}
              variant="contained"
              color="primary"
              onClick={() => handleClickOpen("paper")}
              endIcon={<Schedule />}
              className="btn schedule-btn"
            >
              Schedule
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Calendar
            localizer={localizer}
            events={eventList}
            defaultDate={new Date()}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={eventGetter}
            slotGroupPropGetter={() => {}}
            onNavigate={() => {
              // console.log("navigating");
            }}
            selectable={true}
            onSelectSlot={(e) => {
              // console.log("select slot", e);
              handleSlotSelect(e);
            }}
            onSelectEvent={(e) => {
              // console.log("select event", e);
              alert(e.title);
            }}
            popup={true}
            handleDragStart={() => {}}
          />
        </Grid>
      </Grid>
      {getPatchDialog()}
    </div>
  );
}

export default ServiceTab;
