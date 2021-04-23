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

import "react-big-calendar/lib/css/react-big-calendar.css";
import { blue } from "@material-ui/core/colors";

function ServiceTab() {
  const localizer = momentLocalizer(moment);

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  // const [server, setServer] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    server: "",
    osVersion: "",
    patchDate: new Date(),
    isApprovalNeeded: "",
    approvalStatus: "",
    approverName: "",
    approverEmail: "",
  });

  const submitButtonRef = useRef();

  const eventList = useSelector((state) => state.serverReducer.events);
  const dispatch = useDispatch();

  useEffect(() => {});

  const handleClickOpen = (scrollType) => {
    console.log("handleClickOpen");
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (e) => {
    console.log(`${e.target.name} : ${e.target.value}`);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    console.log("form submitted", formData);
    e.preventDefault();
    const {patchDate} = formData;
    const event = {...formData, start: patchDate, end: patchDate, resource: {...formData} }
    
    dispatch({ type: "ADD_EVENT", payload: event });
  };

  const getDialog = () => {
    console.log("patch date ", formData.patchDate);
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
        <DialogTitle id="scroll-dialog-title">Schedule a Service</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={12} md={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  name="title"
                  label="title"
                  type="text"
                  value={formData.title}
                  onChange={handleOnChange}
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={12}>
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
              <Grid item sm={12} md={6}>
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
                >
                  <option aria-label="None" value="" />
                  <option value="server-1">Server 1</option>
                  <option value="server-2">Server 2</option>
                  <option value="server-3">Server 3</option>
                </Select>
                {/* </FormControl> */}
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  margin="dense"
                  id="osVersion"
                  name="osVersion"
                  label="OS Version"
                  type="text"
                  value={formData.osVersion}
                  onChange={handleOnChange}
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
              
                <TextField
                  margin="dense"
                  id="patchDate"
                  name="patchDate"
                  label="Patch Date"
                  type="date"
                  value={formData.patchDate}
                  onChange={handleOnChange}
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
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
                  >
                    <FormControlLabel
                      value="Y"
                      control={<Radio />}
                      label="Yes"
                      color="primary"
                    />
                    <FormControlLabel
                      value="N"
                      control={<Radio />}
                      label="No"
                      color="primary"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item sm={12} md={6}>
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
                >
                  <option value="requested">Requested</option>
                  <option value="pending">Pending for Approval</option>
                  <option value="approved">Approved</option>
                  <option value="denied">Denied</option>
                </Select>
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  margin="dense"
                  id="approverName"
                  name="approverName"
                  label="Approver Name"
                  type="text"
                  value={formData.approverName}
                  onChange={handleOnChange}
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <TextField
                  margin="dense"
                  id="approverEmail"
                  name="approverEmail"
                  label="Approver Email"
                  type="text"
                  value={formData.approverEmail}
                  onChange={handleOnChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button type="submit" ref={submitButtonRef} style={{display: "none"}}></Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => {submitButtonRef.current.click(); handleClose()}} color="primary">
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const eventGetter = (event) => {
    const approvalStatus = event.approvalStatus;
    var backgroundColor = approvalStatus === 'requested' ? 'blue' : approvalStatus === 'pending' ? 'yellow' : approvalStatus === 'approved' ? 'green' : approvalStatus === 'denied' ? 'red' : '' ;
    
    var style = {
        backgroundColor: backgroundColor,
    };
    return {style};
  }

  const handleSlotSelect = (e) => {
    console.log("drag", e);
    const {start, end} = e;

    // const title = window.prompt('Event Tile');
    // if(title){
    //   // dispatch({ type: "ADD_EVENT", payload: {start, end, title} });
    // }

    setFormData({...formData, patchDate: start,  start, end});
    handleClickOpen("paper");
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClickOpen("paper")}
        endIcon={<Schedule />}
      >
        Schedule
      </Button>
      {getDialog()}
      <Calendar
        localizer={localizer}
        events={eventList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventGetter}
        slotGroupPropGetter={()=>{}}
        onNavigate={() => {
          console.log("navigating");
        }}
        selectable={true}
        onSelectSlot={(e) => {
          // console.log("select slot", e);
          handleSlotSelect(e)
        }}
        onSelectEvent={(e) => {
          // console.log("select event", e);
          alert(e.title)
        }}
        popup={true}
        handleDragStart={() => {}}
        
      />
    </div>
  );
}

export default ServiceTab;
