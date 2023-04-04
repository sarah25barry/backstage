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
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Paper,
  Typography,
} from '@material-ui/core';
import { InfoCard } from '@backstage/core-components';

function chnagefailData(
  name: string,
  elite: string,
  high: string,
  medium: string,
  low: string,
) {
  return { name, elite, high, medium, low };
}

const rows = [
  chnagefailData('Change Failure Rate', '0-15%', '0-15%', '0-15%', '46-60%'),
];

class CFLearning extends Component {
  render() {
    return (
      <Grid item xs={12}>
        <InfoCard>
          <h3>Change Failure Rate</h3>
          <h4>What</h4>
          <Typography>
            The percentage of deployments to production that results in needing
            some form of remediation.
          </Typography>
          <h4>How</h4>
          <Typography>
            Count all deployments to production (both successful and failed) and
            get the percentage of deployments that needed remediation or caused
            errors.
          </Typography>
          <h4>Evaluation</h4>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow style={{ backgroundColor: '#333333' }}>
                  <TableCell
                    align="center"
                    style={{
                      backgroundColor: '#7adeff',
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    Performance
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      backgroundColor: '#8aff7a',
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    Elite
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      backgroundColor: '#ffff7a',
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    High
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      backgroundColor: '#ffbd7a',
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    Medium
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      backgroundColor: '#ff7a7a',
                      fontWeight: 'bold',
                      color: 'black',
                    }}
                  >
                    Low
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      width="20%"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="center" width="20%">
                      {row.elite}
                    </TableCell>
                    <TableCell align="center" width="20%">
                      {row.high}
                    </TableCell>
                    <TableCell align="center" width="20%">
                      {row.medium}
                    </TableCell>
                    <TableCell align="center" width="20%">
                      {row.low}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </InfoCard>
      </Grid>
    );
  }
}

export default CFLearning;
