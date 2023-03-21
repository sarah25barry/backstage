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

import { changefail, getChangeFail, getCFRPerformance } from '../../Tools/data';

class ChangeFailureRate extends Component {
  render() {
    return (
      <div className="container mt-5">
        <h3>Metric 4: Change Failure Rate</h3>

        <Chart
          width="600px"
          height="320px"
          chartType="PieChart"
          loader={<div>Loading Chart...</div>}
          data={changefail}
          options={{
            chartArea: { width: '70%' },
            animation: { startup: true },
            pieHole: 0.4,
            colors: ['#26961C', '#AE1F1F'],
            backgroundColor: { fill: 'transparent' },
            legendTextStyle: { color: 'lightgray' },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
        <Typography>Change Failure Rate: {getChangeFail()}</Typography>
        <Typography>Performance Result: {getCFRPerformance()}</Typography>
      </div>
    );
  }
}

export default ChangeFailureRate;
