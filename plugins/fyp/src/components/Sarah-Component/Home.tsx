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
import { Box, Grid, Typography } from '@material-ui/core';
import { InfoCard } from '@backstage/core-components';

import book from './Tools/img/book.png';
import piechart from './Tools/img/piechart.png';

class HomePage extends Component {
  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InfoCard title="DORA Metrics Dashboard">
              <Typography variant="body1">
                DevOps and Research Assessment (DORA) metrics are a set of
                metrics used by software teams to evaluate their peformance.
              </Typography>
              &nbsp;
              <Typography>
                The DORA Metrics Dashboard provides insights into a team's
                performance (CH Robinson's DevOps team in this demonstration),
                and evaulates their performance. Teams are catergorized into
                elite, high, medium, or low performning criteria.
              </Typography>
            </InfoCard>
          </Grid>
          <Grid item xs={6}>
            <InfoCard>
              <Grid container alignItems="center" justifyContent="center">
                <img src={piechart} alt="piechart" />
                <Typography>
                  &nbsp; To check out the dashboard, navigate to the 'Dashboard'
                  tab!
                </Typography>
              </Grid>
            </InfoCard>
          </Grid>
          <Grid item xs={6}>
            <InfoCard>
              <Grid container alignItems="center" justifyContent="center">
                <img src={book} alt="book-icon" />
                <Typography>
                  &nbsp; To learn about the metrics, navigate to the 'Learning'
                  tab!
                </Typography>
              </Grid>
            </InfoCard>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default HomePage;
