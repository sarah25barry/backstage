/*
 * Copyright 2021 The Backstage Authors
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

import {
  ExploreTool,
  exploreToolsConfigRef,
} from '@backstage/plugin-explore-react';
import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import { ToolCard } from '../ToolCard';
import {
  Content,
  ContentHeader,
  EmptyState,
  ItemCardGrid,
  Progress,
  SupportButton,
  WarningPanel,
} from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';

const Body = (props: { exploreTools?: Array<ExploreTool> }) => {
  const exploreToolsConfigApi = useApi(exploreToolsConfigRef);
  const {
    value: tools,
    loading,
    error,
  } = useAsync(async () => {
    if (props?.exploreTools) return props?.exploreTools;
    return await exploreToolsConfigApi.getTools();
  }, [exploreToolsConfigApi]);

  if (loading) {
    return <Progress />;
  }

  if (error) {
    return <WarningPanel title="Failed to load tools" />;
  }

  if (!tools?.length) {
    return (
      <EmptyState
        missing="info"
        title="No tools to display"
        description="You haven't added any tools yet."
      />
    );
  }

  return (
    <ItemCardGrid>
      {tools?.map((tool, index) => (
        <ToolCard key={index} card={tool} />
      ))}
    </ItemCardGrid>
  );
};

export const ToolExplorerContent = (props: {
  title?: string;
  exploreTools?: Array<ExploreTool>;
}) => (
  <Content noPadding>
    <ContentHeader title={props.title ?? 'Tools'}>
      <SupportButton>Discover the tools in your ecosystem.</SupportButton>
    </ContentHeader>
    <Body exploreTools={props?.exploreTools} />
  </Content>
);
