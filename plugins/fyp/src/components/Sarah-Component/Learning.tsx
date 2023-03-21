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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { InfoCard } from '@backstage/core-components';

class Learning extends Component {
  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InfoCard>
              <h3>Deployment Frequency</h3>
              <h4>What</h4>
              <h4>How</h4>
              <h4>Evaluation</h4>
            </InfoCard>
          </Grid>
          <Grid item xs={12}>
            <InfoCard>
              <h3>Lead Time for Changes</h3>
              <h4>What</h4>
              <h4>How</h4>
              <h4>Evaluation</h4>
            </InfoCard>
          </Grid>
          <Grid item xs={12}>
            <InfoCard>
              <h3>Mean Time to Recovery</h3>
              <h4>What</h4>
              <h4>How</h4>
              <h4>Evaluation</h4>
            </InfoCard>
          </Grid>
          <Grid item xs={12}>
            <InfoCard>
              <h3>Change Failure Rate</h3>
              <h4>What</h4>
              <h4>How</h4>
              <h4>Evaluation</h4>
            </InfoCard>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Learning;
