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
import { Typography, Grid, List, ListItem } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import DeploymentFrequency from './Test';

// import { ExampleFetchComponent } from '../ExampleFetchComponent';

export const ExampleComponent = () => (
  <Page themeId="tool">
    <Header
      title="DORA Metrics Dashboard"
      subtitle="Dashboard for quantifying software development team's performance measured using DORA metrics."
    >
      <HeaderLabel label="Owner" value="DevOps" />
    </Header>
    <Content>
      <ContentHeader title="DORA Metrics: Learning Centre">
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
        <Grid>
          <InfoCard>
            <DeploymentFrequency />
          </InfoCard>
        </Grid>
        <Grid item>
          <InfoCard>
            <Typography>Lead Time for Changes</Typography>
          </InfoCard>
        </Grid>
        <Grid item>
          <InfoCard>
            <Typography>Mean Time to Recovery</Typography>
          </InfoCard>
        </Grid>
        <Grid item>
          <InfoCard>
            <Typography>Change Failure Rate</Typography>
          </InfoCard>
        </Grid>
      </Grid>
    </Content>
  </Page>
);
