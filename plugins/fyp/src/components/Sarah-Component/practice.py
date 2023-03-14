import requests
import base64
import re
import json
import csv
from data import *

pat = 'd5y2c5y727bq62kzqqu5c7xx6xo5a33p62f37x3sbvjnxtlinbdq'
auth = str(base64.b64encode(bytes(':' + pat, 'ascii')), 'ascii')
weekly = []
starts = []
total = []
data = []

class ADOClient:
    def __init__(self):
        self.base_url = 'https://dev.azure.com/CHR-IT/Navisphere/_apis/build/builds?definitions='
        self.headers = {
            'Accept' : 'application/json',
            'Authorization' : 'Basic ' + str(base64.b64encode(bytes(':' + pat, 'ascii')), 'ascii')
        }


    '''
    Prints out:
    start_dates - the list of start dates
    weekly_frequency - number of deployments from each week
    total_deployments - the total number of deployments from the given period
    total_patches - the number of patches which were deployed in the given period
    deployment_frequency - the total deployments divided by the number of weeks
    change_fail_rate - the number of patches needed (fails) divided by the number of deployments 
    '''
    def plots(self, x_starts, y_weeks, fails):
        total_deployments = 0
        total_patches = len(fails)
        start_dates = x_starts[-5:]
        weeks_frequency = y_weeks[-5:]
        for week in weeks_frequency:
            total_deployments += week
        deployment_frequency = total_deployments/len(dates)
        change_fail_rate = total_patches / total_deployments
        print(f'Start dates: {start_dates}\nWeekly frequency: {weeks_frequency}\nTotal Deployments for period: {total_deployments}\nPatches needed: {total_patches}\nDeployment Frequency: {deployment_frequency}\nChange Failure Rate: {change_fail_rate}')
        self.to_csv(start_dates, weeks_frequency)

    
    '''
    Generates two lists: 
    Starts - list of of the start dates for each week 
    Weekly - total number of deployments for each week
    '''
    def get_frequency(self, start_date):
        f = open("deploymentFrequency.txt", "r")
        text = start_date
        ttl = 0
        lines = f.readlines()
        for line in lines:
            if text in line:
                frq = re.findall("\d{4}-\d{2}-\d{2} to \d{4}-\d{2}-\d{2}: \d+", line)
                colon = ":"
                splt = " "
                for date in frq:
                    frequency = date.split(colon)[1]
                    dates = date.split(splt)[0]
                    number = int(frequency)
                    ttl += int(number)
        weekly.append(ttl)
        starts.append(dates)
        f.close()
        return starts, weekly
    

    '''
    Finds the number of patches which were deployed in order to fix fails
    '''
    def get_change_fail_rate(self):
        temp = []
        f = open("changeFailureRate.txt", "r")
        lines = f.readlines()
        for line in lines:
            temp.clear()
            freq = re.findall(r'"\d+.\d+.\d+"', line)
            for item in freq:
                temp.append(item)
        for item in temp:
            total.append(item)
        return total


    '''
    Get request to Microsoft's Azure Pipelines. Gets all master/main builds associated with a definitionId for a given period of time, 
    denoted by the mindate and maxdate (one week). Uses regex to find how many builds exist and appends the total number of builds for 
    a given pipeline to a .txt file called deploymentFrequency.txt.
    '''
    def get_deployments(self, definitionId, mindate, maxdate):
        responses = requests.get(url=f'{self.base_url}{definitionId}&branchName=refs/heads/development&minTime={mindate}T00:00:00&maxTime={maxdate}T23:59:59&resultFilter=succeeded&api-version=7.0', headers=self.headers)
        builds = re.findall(r'"buildNumber":"\d+.\d+.\d+"', str(responses.content))
        fails = re.findall(r'"buildNumber":"\d+.\d+.[^0]{1}\d*"', str(responses.content))
        f = open("changeFailureRate.txt", "a+")
        if len(fails) != 0:
            f.write(str(f'{fails} \n'))
        f.close()
        keys, vals = list(definitionIds.keys()), list(definitionIds.values())
        repository = keys[vals.index(definitionId)]
        f = open("deploymentFrequency.txt", "a+")
        f.write(f'Total successful deployments for pipeline {repository} in week {mindate} to {maxdate}: {len(builds)} \n')
        f.close()
        self.get_frequency(mindate)
        self.get_change_fail_rate()

    def to_csv(self, weeks, frequency):
        header = ['Start Date', 'Frequency']
        for item in weeks:
            temp = []
            temp.append(item)
            indx = weeks.index(item)
            temp.append(frequency[indx])
            data.append(temp)
        with open('dataset.csv', 'w', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(header)
            writer.writerows(data)


main = ADOClient()
for id in definitionIds:
    for key in dates:
        main.get_deployments(definitionIds[id], dates[key][0], dates[key][1])
main.plots(starts, weekly, total)