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
import React from 'react';
import {
  Typography,
  Grid,
  List,
  ListItem,
  Button,
  Box,
} from '@material-ui/core';
import BarChart from '@material-ui/icons/BarChart';
import School from '@material-ui/icons/School';

import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import DeploymentFrequency from './DeploymentFrequency';
import ChangeFailureRate from './ChangeFailureRate';

export const Dashboard = () => (
  <Page themeId="tool">
    <Header
      title="DORA Metrics Dashboard"
      subtitle="Dashboard for quantifying software development team's performance measured using DORA metrics."
    >
      <HeaderLabel label="Owner" value="Sarah Barry" />
      <HeaderLabel label="Student Number" value="119482126" />
    </Header>
    <Content>
      <ContentHeader title="DORA Metrics: Overview">
        <SupportButton>
          If you'd like to report a problem on GitHub or join Spotify's Discord,
          check out these links.
        </SupportButton>
      </ContentHeader>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <InfoCard title="What are DORA Metrics?">
            <Typography variant="body1">
              DevOps and Research Assessment (DORA) metrics are a set of
              criteria developed by Gene Kim, Jez Humble and Dr. Nicole
              Forsgren, who founded the DORA startup. The derived metrics can be
              used by software teams to evaluate their peformance by comparing
              the results of the metrics for themselves with the benchmarks
              established by the DORA team. Each benchmark categorizes software
              teams into elite, high, medium and low performing teams.
            </Typography>
            <Typography>
              The metrics are:
              <List>
                <ListItem>Deployment Frequency</ListItem>
                <ListItem>Lead Time for Changes</ListItem>
                <ListItem>Mean Time to Recovery</ListItem>
                <ListItem>Change Failure Rate</ListItem>
              </List>
            </Typography>
            <Typography>
              Adopting these metrics and tracking performance can highlight
              areas which need improvement and aid in decision making.
            </Typography>
          </InfoCard>
        </Grid>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InfoCard>
                <DeploymentFrequency />
              </InfoCard>
            </Grid>
            <Grid item xs={6}>
              <InfoCard>
                <Typography>Lead Time for Changes</Typography>
              </InfoCard>
            </Grid>
            <Grid item xs={6}>
              <InfoCard>
                <Typography>Mean Time to Recovery</Typography>
              </InfoCard>
            </Grid>
            <Grid item xs={6}>
              <InfoCard>
                <ChangeFailureRate />
              </InfoCard>
            </Grid>
          </Grid>
        </Box>
        <Grid item>
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" endIcon={<BarChart />}>
              GO TO DASHBOARD
            </Button>
            <Button variant="contained" endIcon={<School />}>
              GO TO LEARNING
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Content>
  </Page>
);

export default Dashboard;
