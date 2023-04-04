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
import { Box, Grid, ListItem, Typography } from '@material-ui/core';
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
                metrics used by software teams to evaluate their performance.
              </Typography>
              &nbsp;
              <Typography>
                The Dashboard tab provides insights into a team's performance
                (CH Robinson's DevOps team in this demonstration), and evaulates
                their performance. Teams are catergorized into elite, high,
                medium, or low performning criteria.
              </Typography>
              &nbsp;
              <Typography>
                The Learning tab provides information regarding DORA Metrics, as
                well as information on what each metric entails, how they are
                calculated, and the criteria for each respective metric.
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
          <Grid item xs={12}>
            <InfoCard title="FAQs">
              <Typography style={{ fontWeight: 600 }}>
                Where does the data for the metrics come from?
              </Typography>
              <Typography variant="body1">
                Using REST, data from a provided period of time is pulled from
                an organisation on GitHub and on Azure DevOps Pipelines using
                repository names (GitHub), or definiton IDs (Azure DevOps).
                Responses are disected and performance evaluation is completed,
                displaying distinct data through coherent charts.
              </Typography>
              &nbsp;
              <Typography style={{ fontWeight: 600 }}>
                Where does the criteria for each metric come from?
              </Typography>
              <Typography>
                Criteria for each of the metrics is set out in the book
                'Accelerate', written by Gene Kim, Jez Humble and Dr. Nicole
                Forsgren. This criteria can be viewed within the 'Learning' tab
                of the plugin.
              </Typography>
              &nbsp;
              <Typography style={{ fontWeight: 600 }}>
                How do I add more repositories to be evaulated?
              </Typography>
              <Typography>
                To add extra repositories to the evaulation, you need two key
                pieces of data:
                <ListItem>Repository Name - GitHub</ListItem>
                <ListItem>Definiton ID - Azure DevOps</ListItem>
                These two pieces of data need to be added to the definitionIds
                dictionary within the data.py file (located in the '/Tools'
                subfolder), with the repository name as the key and the
                definition ID as the value.
              </Typography>
              &nbsp;
              <Typography style={{ fontWeight: 600 }}>
                Can I add more metrics to the dashboard?
              </Typography>
              <Typography>
                While this plugin focuses on the four DORA metrics currently,
                new metrics can be added to suit a team's needs following the
                structure set out in the '/Metrics' subfolder of the plugin's
                directory.
              </Typography>
              <Typography variant="body2">
                Note: Additional data may need to be pulled from GitHub or Azure
                DevOps pipelines within the Python script.
              </Typography>
            </InfoCard>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default HomePage;
