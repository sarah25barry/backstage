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
import { Typography } from '@material-ui/core';
import Chart from 'react-google-charts';

import {
  getMeanTimeToRecover,
  getMTTRPerformance,
  getMTTRColor,
} from '../../Tools/UseData';
import { mttr_data } from '../../Tools/data';

class MeanTimeToRecovery extends Component {
  render() {
    return (
      <div className="container mt-5">
        <h3>Metric 3: Mean Time to Recovery</h3>
        <Chart
          width="100%"
          height="320px"
          chartType="ColumnChart"
          loader={<div>Loading Chart...</div>}
          data={mttr_data}
          options={{
            chartArea: { width: '85%' },
            animation: { startup: true },
            hAxis: {
              title: 'Repos',
              titleTextStyle: { color: 'black', bold: true, italic: false },
              textStyle: { color: 'black' },
            },
            vAxis: {
              title: 'Hours to Recover',
              titleTextStyle: { color: 'black', bold: true, italic: false },
              bold: true,
              textStyle: { color: 'black ' },
            },
            backgroundColor: { fill: 'transparent' },
            colors: [getMTTRColor()],
            legend: { position: 'none' },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
        <Typography>
          Mean Time to Recovery: {getMeanTimeToRecover().toFixed(2)} hour(s)
        </Typography>
        <Typography>Performance Result: {getMTTRPerformance()}</Typography>
      </div>
    );
  }
}

export default MeanTimeToRecovery;
