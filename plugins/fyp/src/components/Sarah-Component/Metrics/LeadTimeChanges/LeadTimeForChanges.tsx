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
  getLeadTimeForChanges,
  getLTFCPerformance,
  getLTFCColor,
} from '../../Tools/UseData';
import { ltfc_data } from '../../Tools/data';

class LeadTimeForChanges extends Component {
  render() {
    return (
      <div className="container mt-5">
        <h3>Metric 2: Lead Time for Changes</h3>
        <Chart
          width="100%"
          height="320px"
          chartType="ColumnChart"
          loader={<div>Loading Chart...</div>}
          data={ltfc_data}
          options={{
            chartArea: { width: '85%' },
            animation: { startup: true },
            hAxis: {
              title: 'Repository Name',
              titleTextStyle: { color: 'black', bold: true, italic: false },
              textStyle: { color: 'black' },
            },
            vAxis: {
              title: 'Lead Time for Changes',
              titleTextStyle: { color: 'black', bold: true, italic: false },
              bold: true,
              textStyle: { color: 'black ' },
            },
            backgroundColor: { fill: 'transparent' },
            colors: [getLTFCColor()],
            legend: { position: 'none' },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
        <Typography>
          Lead Time for Changes: {getLeadTimeForChanges().toFixed(2)} day(s)
        </Typography>
        <Typography>Performance Result: {getLTFCPerformance()}</Typography>
      </div>
    );
  }
}

export default LeadTimeForChanges;
