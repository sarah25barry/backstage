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
          width="475px"
          height="320px"
          chartType="ColumnChart"
          loader={<div>Loading Chart...</div>}
          data={ltfc_data}
          options={{
            chartArea: { width: '90%' },
            animation: { startup: true },
            hAxis: {
              title: 'Repositories',
              titleTextStyle: { color: 'lightgray', bold: true, italic: false },
              minValue: 0,
              textStyle: { color: 'lightgray' },
            },
            vAxis: {
              title: 'Lead Time for Changes in Days',
              titleTextStyle: { color: 'lightgray', bold: true, italic: false },
              bold: true,
              minValue: 0,
              maxValue: getLeadTimeForChanges() * 1.5,
              textStyle: { color: 'lightgray ' },
            },
            backgroundColor: { fill: 'transparent' },
            colors: [getLTFCColor()],
            legendTextStyle: { color: 'lightgray' },
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
