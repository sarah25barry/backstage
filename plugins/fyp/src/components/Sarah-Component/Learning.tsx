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
import { Grid, Box } from '@material-ui/core';
import DFLearning from './Metrics/DeployFrequency/DFLearning';
import LTFCLearning from './Metrics/LeadTimeChanges/LTFCLearning';
import MTTRLearning from './Metrics/MeanTimeRecovery/MTTRLearning';
import CFLearning from './Metrics/ChangeFail/CFLearning';

class Learning extends Component {
  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
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
