/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Tabs, Tab, Typography, AppBar } from '@material-ui/core';
import BarChart from '@material-ui/icons/BarChart';
import School from '@material-ui/icons/School';
import Home from '@material-ui/icons/Home';

import Learning from './Learning';
import Metrics from './Metrics';
import HomePage from './Home';
import { SupportButton } from '@backstage/core-components';

function TabPanel(props: {
  [x: string]: any;
  children: any;
  value: any;
  index: any;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'theme.palette.background.paper',
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ background: '#8530db', color: '#cca8f0' }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Navigation Tabs"
          centered
          variant="fullWidth"
          TabIndicatorProps={{
            style: { background: '#cca8f0' },
          }}
        >
          <Tab label="Overview" icon={<Home />} {...a11yProps(0)} />
          <Tab label="Dashboard" icon={<BarChart />} {...a11yProps(1)} />
          <Tab label="Learning" icon={<School />} {...a11yProps(2)} />
          <SupportButton>
            If you'd like to report a problem on GitHub or join Spotify's
            Discord, check out these links.
          </SupportButton>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <HomePage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Metrics />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Learning />
      </TabPanel>
    </div>
  );
}
