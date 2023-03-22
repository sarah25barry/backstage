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
import React, { Component } from 'react';
import {
  Grid,
  Box,
  List,
  ListItem,
  Typography,
  Button,
} from '@material-ui/core';
import DFLearning from './Metrics/DeployFrequency/DFLearning';
import LTFCLearning from './Metrics/LeadTimeChanges/LTFCLearning';
import MTTRLearning from './Metrics/MeanTimeRecovery/MTTRLearning';
import CFLearning from './Metrics/ChangeFail/CFLearning';
import { InfoCard } from '@backstage/core-components';

class Learning extends Component {
  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item>
            <InfoCard title="What are DORA Metrics?">
              <Typography variant="body1">
                DevOps and Research Assessment (DORA) metrics are a set of
                criteria developed by Gene Kim, Jez Humble and Dr. Nicole
                Forsgren, who founded the DORA startup. The derived metrics can
                be used by software teams to evaluate their peformance by
                comparing the results of the metrics for themselves with the
                benchmarks established by the DORA team. Each benchmark
                categorizes software teams into elite, high, medium and low
                performing teams.
              </Typography>
              <Typography>
                The metrics are:
                <List>
                  <ListItem>Deployment Frequency</ListItem>
                  <ListItem>Lead Time for Changes</ListItem>
                  <ListItem>Mean Time to Recovery</ListItem>
                  <ListItem>Change Failure Rate</ListItem>
                </List>
              </Typography>
              <Typography>
                Adopting these metrics and tracking performance can highlight
                areas which need improvement and aid in decision making.
              </Typography>
            </InfoCard>
          </Grid>
          <DFLearning />
          <LTFCLearning />
          <MTTRLearning />
          <CFLearning />
        </Grid>
      </Box>
    );
  }
}

export default Learning;
