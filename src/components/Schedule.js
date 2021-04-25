import React, {useState} from "react";
import { Box, Paper, Tab, Tabs } from "@material-ui/core";
import { PeopleOutlineTwoTone, SettingsApplications } from "@material-ui/icons";

import ServiceTab from './service-tab';
import ServerTeamTab from './server-team';

// import {useSelector} from 'react-redux';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`service-tabpanel-${index}`}
      aria-labelledby={`service-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function tabProps(index) {
  return {
    id: `service-tab-${index}`,
    "aria-controls": `service-tabpanel-${index}`,
  };
}

function Schedule() {
  const [currentTabValue, setCurrentTabValue] = useState(0);

  const handleChange = (event, index) => {
    try {
      setCurrentTabValue(index);
    } catch (error) {
      console.error(`Error occured in handleChange :: ${error}`);
    }
  };

  return (
    <Paper square>
      <Tabs
        value={currentTabValue}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
      >
        <Tab
          label="Service"
          icon={<PeopleOutlineTwoTone />}
          aria-label="person"
          {...tabProps(0)}
        />
        <Tab
          label="Server"
          icon={<SettingsApplications />}
          aria-label="person"
          {...tabProps(1)}
        />
      </Tabs>
      <TabPanel value={currentTabValue} index={0}>
        <ServiceTab />
      </TabPanel>
      <TabPanel value={currentTabValue} index={1}>
        <ServerTeamTab />
      </TabPanel>
    </Paper>
  );
}

export default Schedule;
