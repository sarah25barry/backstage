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

import { data, getDeploymentFrequency, getDFPerformance } from '../Tools/data';

class DeploymentFrequency extends Component {
  render() {
    return (
      <div className="container mt-5">
        <h3>Metric 1: Deployment Frequency</h3>

        <Chart
          width="400px"
          height="320px"
          chartType="ColumnChart"
          loader={<div>Loading Chart...</div>}
          data={data}
          options={{
            chartArea: { width: '90%' },
            animation: { startup: true },
            hAxis: {
              title: 'Weeks',
              titleTextStyle: { color: 'lightgray', bold: true, italic: false },
              minValue: 0,
              textStyle: { color: 'lightgray' },
            },
            vAxis: {
              title: 'Deployments per Week',
              titleTextStyle: { color: 'lightgray', bold: true, italic: false },
              bold: true,
              textStyle: { color: 'lightgray ' },
            },
            backgroundColor: { fill: 'transparent' },
            colors: ['#26961C'],
            legendTextStyle: { color: 'lightgray' },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
        <Typography>
          Average deployments per week: {getDeploymentFrequency()}
        </Typography>
        <Typography>Performance Result: {getDFPerformance()}</Typography>
      </div>
    );
  }
}

export default DeploymentFrequency;
