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
import { Grid } from '@material-ui/core';

import { Header, Page, Content, HeaderLabel } from '@backstage/core-components';
import SimpleTabs from './Tabs';

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
      <Grid container spacing={2} direction="column">
        <SimpleTabs />
      </Grid>
    </Content>
  </Page>
);

export default Dashboard;
