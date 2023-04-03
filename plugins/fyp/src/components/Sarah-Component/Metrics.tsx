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
import { Box, Grid } from '@material-ui/core';
import { InfoCard } from '@backstage/core-components';
import DeploymentFrequency from './Metrics/DeployFrequency/DeploymentFrequency';
import LeadTimeForChanges from './Metrics/LeadTimeChanges/LeadTimeForChanges';
import MeanTimeToRecovery from './Metrics/MeanTimeRecovery/MeanTimeToRecovery';
import ChangeFailureRate from './Metrics/ChangeFail/ChangeFailureRate';

class Metrics extends Component {
  render() {
    return (
      <Box sx={{ flexGrow: 1 }} alignItems="center" justifyContent="center">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <InfoCard>
              <DeploymentFrequency />
            </InfoCard>
          </Grid>
          <Grid item xs={6}>
            <InfoCard>
              <LeadTimeForChanges />
            </InfoCard>
          </Grid>
          <Grid item xs={6}>
            <InfoCard>
              <MeanTimeToRecovery />
            </InfoCard>
          </Grid>
          <Grid item xs={6}>
            <InfoCard>
              <ChangeFailureRate />
            </InfoCard>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Metrics;
