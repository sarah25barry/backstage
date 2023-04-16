# DORA Metrics Dashboard

## Introduction

This plugin was created as part of the final year project 'Exploring DORA Metrics through the use of a Backstage plugin".

### Key Features

The plugin contains three tabs, each with their own functionalities:

#### 1. Overview

The overview tab provides a landing page for the plugin, explaining what the plugin's purpose is, as well as how to navigate throughout the plugin. There is also an FAQs information card containing answers to the most asked questions.

#### 2. Dashboard

The dashboard tab contains four distrinct graphs, each depicting a different DORA metric, namely:

- Deployment Frequency
- Lead Time for Changes
- Mean Time to Recover
- Change Failure Rate

Clear and concise graphs are created, giving fast feedback, while a performance evaluation is also given in words. The graphs are colour-coded, coordinating with the performance evaluation. The logic for the colour coding is as follows:

| Performance Evaluation | Colour |
| :--------------------: | :----: |
|         Elite          | Green  |
|          High          | Yellow |
|         Medium         | Orange |
|          Low           |  Red   |

#### 3. Learning

The learning tab contains information on the metrics as a whole, as well as providing information on each of the individual metrics. Three pieces of information are provided:

1. What the metric is.
2. How the metric is calculated.
3. The criteria for how the metric is evaluated.

## Using the Plugin Locally

You can access the plugin by running `yarn start` in the root directory, and then navigating to [/fyp](http://localhost:3000/fyp) for local development.

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.

## Running the Dashboard

There are a number of items needed to run the dashboard.

As the plugin is meant to be used with GitHub and Azure DevOps (ADO) Pipelines, a Python dictionary of repositories is needed, with the repository name as the key (used for GitHub access) and the definiton ID (used for ADO Pipelines access).

The definition ID can be found in the URL of a given pipeline's run.

![URL of where to find the definition ID](url.png)

To connect to [GitHub](https://docs.github.com/en/rest?apiVersion=2022-11-28) and [Azure Pipelines](https://learn.microsoft.com/en-us/rest/api/azure/devops/build/?view=azure-devops-rest-7.0)'s APIs you will need personal access tokens (PATs) for authentication. Details on how to create and use them can be found here:

- [GitHub](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Azure DevOps](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows)
