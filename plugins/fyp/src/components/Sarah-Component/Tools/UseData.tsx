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
import { freq, passed, failed, repo_ltfc, mttr } from './data';

export const getDeploymentFrequency = () => {
  const avg = freq.reduce((a, b) => a + b) / freq.length;
  return avg;
};

export const getDFPerformance = () => {
  const average = getDeploymentFrequency();
  if (average < 3) {
    return 'Low';
  } else if (average > 3 && average < 7) {
    return 'Medium';
  } else if (average > 7 && average < 10) {
    return 'High';
  }
  return 'Elite';
};

export const getChangeFail = () => {
  const ttlDeployments = passed + failed;
  const rate = failed / ttlDeployments;
  return rate;
};

export const getCFRPerformance = () => {
  const rate = getChangeFail();
  if (rate > 0.45) {
    return 'Low';
  } else if (rate < 0.45 && rate > 0.15) {
    return 'Medium - High';
  } else if (rate < 0.15) {
    return 'Elite';
  }
  return 'Error';
};

export const getLeadTimeForChanges = () => {
  const lead_time = repo_ltfc.reduce((a, b) => a + b) / repo_ltfc.length;
  return lead_time;
};

export const getMeanTimeToRecover = () => {
  const mean_mttr = mttr.reduce((a, b) => a + b) / mttr.length;
  return mean_mttr;
};

export const getMTTRPerformance = () => {
  const get_mttr = getMeanTimeToRecover();
  if (get_mttr <= 1) {
    return 'Elite';
  } else if (get_mttr > 1 && get_mttr < 24) {
    return 'High - Medium';
  } else if (get_mttr > 24 && get_mttr <= 672) {
    return 'Low';
  }
  return 'Error';
};

export const getLTFCPerformance = () => {
  const lead_time = getLeadTimeForChanges();
  if (lead_time <= 1) {
    return 'Elite';
  } else if (lead_time > 1 && lead_time <= 7) {
    return 'High';
  } else if (lead_time > 7 && lead_time <= 28) {
    return 'Medium';
  } else if (lead_time > 28 && lead_time < 182) {
    return 'Low';
  }
  return 'Error';
};

export const getDFColor = () => {
  const rate = getDFPerformance();
  if (rate === 'Low') {
    return '#AE1F1F';
  } else if (rate === 'Medium') {
    return '#ad661f';
  } else if (rate === 'High') {
    return '#ffcc00';
  } else if (rate === 'Elite') {
    return '#26961C';
  }
  return '#1f8aad';
};

export const getLTFCColor = () => {
  const rate = getLTFCPerformance();
  if (rate === 'Low') {
    return '#AE1F1F';
  } else if (rate === 'Medium') {
    return '#ad661f';
  } else if (rate === 'High') {
    return '#ffcc00';
  } else if (rate === 'Elite') {
    return '#26961C';
  }
  return '#1f8aad';
};

export const getMTTRColor = () => {
  const rate = getMTTRPerformance();
  if (rate === 'Low') {
    return '#AE1F1F';
  } else if (rate === 'High - Medium') {
    return '#ffcc00';
  } else if (rate === 'Elite') {
    return '#26961C';
  }
  return '#1f8aad';
};
