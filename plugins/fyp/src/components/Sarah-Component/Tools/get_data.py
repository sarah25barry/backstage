import os
import base64
import re
import requests

from data import *
from datetime import *


# Set up envars and lists needed later 
ADO_API_KEY_ENV_VAR = "ADO_API_KEY"
ado_pat = os.environ[ADO_API_KEY_ENV_VAR]
GH_TOKEN_ENV_VAR = "GH_TOKEN"
gh_token = os.environ[GH_TOKEN_ENV_VAR]

# base64 encode the ADO pat 
auth = str(base64.b64encode(bytes(':' + ado_pat, 'ascii')), 'ascii')

weekly = []
starts = []
total = []
data = []
mean_lead_time_for_changes = []
mean_time_for_recover = []

w1 = d1.strftime("%Y-%m-%d")
w2 =  d10.strftime("%Y-%m-%d")
w2_with_time = '2023-03-05 23:59:59.99999'
w2_time = datetime.strptime(w2_with_time, '%Y-%m-%d %H:%M:%S.%f')


class Client:
    def __init__(self):
        self.base_url = 'https://dev.azure.com/CHR-IT/Navisphere/_apis/build/builds?definitions='
        self.ado_headers = {
            'Accept' : 'application/json',
            'Authorization' : 'Basic ' + str(base64.b64encode(bytes(':' + ado_pat, 'ascii')), 'ascii')
        }
        self.gh_base_url = 'https://api.github.com/repos/ch-robinson-internal/'
        self.gh_headers = {'Authorization': 'token ' + gh_token}


    '''
    Prints out summary of the metrics collected and sends the data to the Typescript file relying on the data
    
    '''
    def plots(self, x_starts, y_weeks, fails, ltfc, mean_time_for_recover):
        total_deployments = 0
        total_patches = len(fails)
        start_dates = x_starts[-5:]
        weeks_frequency = y_weeks[-5:]
        for week in weeks_frequency:
            total_deployments += week
        deployment_frequency = total_deployments/len(dates)
        lead_time = sum(ltfc) // len(ltfc)
        mttr = sum(mean_time_for_recover) / len(mean_time_for_recover)
        change_fail_rate = total_patches / total_deployments
        # Write Deployment Frequency to a file 
        f = open("data.tsx", "w")
        f.write(f"export const freq = {weeks_frequency};\n")
        f.write("export const deployment_data = [['Week', 'Deployments'], ")
        for start in range (len(start_dates)):
            f.write("[")
            f.write(f"'{start_dates[start]}'")
            f.write(",")
            f.write(f"{weeks_frequency[start]}")
            f.write("]")
            f.write(",")
        f.write("];\n")
        # Write Change Fail Rate data to file
        f.write(f"export const passed = {total_deployments - total_patches};\n")
        f.write(f"export const failed = {total_patches};\n")
        f.write(f"export const changefail = [['Outcome', 'Volume'],['Passed', {total_deployments - total_patches}], ['Failed', {total_patches}]];\n")
        # Write Lead Time for Changes data to file
        f.write(f"export const repo_ltfc = {ltfc};\n")
        f.write(f"export const ltfc_data =  [['Repo Name', 'LTFC'],")
        for repo in range (len(ltfc)):
            f.write(f"['Repo {repo+1}', {ltfc[repo]}],")
        f.write("];\n")
        # Write Mean Time to Recovery data to file 
        f.write(f"export const mttr = {mean_time_for_recover};\n")
        f.write(f"export const mttr_data = [['Repo Name', 'MTTR'],")
        for repo in range (len(mean_time_for_recover)):
            f.write(f"['Repo {repo+1}', {mean_time_for_recover[repo]}],")
        f.write("];\n")
        f.close()
        
        # Print summary of the data to the terminal
        print(f'Start dates: {start_dates}\nWeekly frequency: {weeks_frequency}\nTotal Deployments for period: {total_deployments}\nPatches needed: {total_patches}\nDeployment Frequency: {deployment_frequency}\nChange Failure Rate: {change_fail_rate}%\nLead Time for Changes per Repository:{ltfc}\nLead Time for Changes: {lead_time} day(s)\nMean Time to Recover per Repository: {mean_time_for_recover}\nMean Time to Recover: {mttr} hour(s)')

    
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
    Gets the mean lead time for changes from the repo by repo ltfc
    '''
    def plot_ltfc(self, ltfc):
        mean_ltfc = sum(ltfc) // len(ltfc)
        mean_lead_time_for_changes.append(mean_ltfc)
        return mean_lead_time_for_changes
    
    '''
    Uses REST to connect to GitHub to get commit details for a given repository
    Used to calculate Lead time for Changes
    '''
    def compare_gh(self, repo, definitionId):
        keys, vals = list(definitionIds.keys()), list(definitionIds.values())
        repository = keys[vals.index(definitionId)]
        splits = "ch-robinson-internal."
        repository = repository.split(splits)[1]
        ltfc  = []
        for pr in repo:
            log = requests.get(url=f'{self.gh_base_url}{repository}/pulls/{pr[1]}/commits', 
            headers=self.gh_headers)
            # change single quotes to double quotes so regex works
            new_login = str(log.content).replace("\'", "\"")
            # find the dates + time of each commit
            commits = re.findall(r',"date":"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z"', new_login)
            distinct_list = []
            [distinct_list.append(date) for date in commits if date not in distinct_list]
            # get dates on their own 
            data_list = []
            for date in distinct_list:
                date_time = date.split('"date":"')[1]
                dates = date_time.split('T')[0]
                data_list.append(dates)
            # split into year, month, day lists
            year, month, day = [], [], []
            for item in data_list:
                yr = item.split("-")[0]
                mnth = item.split("-")[1]
                dy = item.split("-")[2]
                year.append(yr)
                month.append(mnth)
                day.append(dy)
            # remove leading zeros in days and months
            for d in day:
                dy = re.match(r'0\d', d)
                if dy:
                    rmv_zero = dy[0].replace("0", "")
                    idx = day.index(d)
                    day[idx] = rmv_zero
            for m in month:
                mn = re.match(r'0\d', m)
                if mn:
                    rmv_zero = mn[0].replace("0", "")
                    idx = month.index(m)
                    month[idx] = rmv_zero
            # convert years to ints
            y = [eval(i) for i in year]
            m = [eval(i) for i in month]
            d = [eval(i) for i in day]
            new_m, new_d = [], []
            # gets oldest year
            yr  = ([i for i, x in enumerate(y) if x == min(y)])
            # removes months if they are not from the oldest year
            for i in yr:
                new_m.append(m[i])
            # gets oldest month
            mn  = ([i for i, x in enumerate(m) if x == min(m)])
            # removes days if they are not from the oldest month
            for i in mn:
                new_d.append(d[i])
            # gets oldest day
            dy  = (min(new_d))
            day_index = d.index(dy)
            # convert to date time object
            newDate =  datetime(y[day_index], m[day_index], d[day_index])
            pr_date = datetime.strptime(pr[0], '%Y-%m-%d')
            diff = abs((newDate - pr_date).days)
            if diff == 0:
                diff = 1
            ltfc.append(diff)
        self.plot_ltfc(ltfc)


    '''
    Extract pull request information from regex match
    Important data to gather:
    Merge Number - the number which corresponds to the PR merge number on github
    Finish Date - the date (and time) that the pull request was merged, the second time stamp needed to calculate Lead Time for Changes
    '''
    def get_pr_data(self, pull_request, definitionId):
        repo = []
        new_repos = str(repo_name).replace("\'", "\"")
        split1 = '{"ch-robinson-internal.'
        split2 = '":'
        repository_name = re.findall(r'{"ch-robinson-internal.\S+": \d+}', new_repos)
        for repository in repository_name:
            repository = repository.split(split1)[1]
            repository = repository.split(split2)[0]
            repo.append(repository)
        time_split = '"finishTime":"'
        for pr in pull_request:
            split_date = re.findall(r'"finishTime":"\d{4}-\d{2}-\d{2}', str(pr))
            for date in split_date:
                finish_date = date.split(time_split)
                split_date = re.findall(r'pull request #\d*', str(pr))
                for pull_number in split_date:
                    pr_number = pull_number.split("pull request #")
                repo.append([finish_date[1], pr_number[1]])
        self.compare_gh(repo, definitionId)

    '''
    Gets the mean time for recovery for each repository 
    '''
    def get_mttr(self, deployments):
        deploys = re.findall(r'"Merge pull request #\d+ from ch-robinson-internal/\S+","ci.triggerRepository":"ch-robinson-internal/\S+"},"id":\d+,"buildNumber":"\d+.\d+.\d+","status":"completed","result":"\S+","queueTime":"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+Z","startTime":"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+Z","finishTime":"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+Z"', str(deployments.content))
        temp = []
        for deployment in deploys:
            repo_name = re.findall(r'ci.triggerRepository":"ch-robinson-internal/\S+"}', deployment)[0]
            remove_start = 'ci.triggerRepository":"ch-robinson-internal/'
            remove_end = '"}'
            repo_name = repo_name.split(remove_start)[1]
            repo_name = repo_name.split(remove_end)[0]
            temp.append(repo_name)
            pr_num = re.findall(r"#\d+ ", deployment)[0]
            remove_hash = "#"
            pr_num = pr_num.split(remove_hash)[1]
            temp.append(pr_num)
            result = re.findall(r'result":"\S+","queueTime"', deployment)[0]
            remove_res = 'result":"'
            remove_queue = '","queueTime"'
            result = result.split(remove_res)[1]
            result = result.split(remove_queue)[0]
            temp.append(result)
            time = re.findall(r'finishTime":"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+', deployment)[0]
            remove_finish = 'finishTime":"'
            time = time.split(remove_finish)[1]
            temp.append(time)
        itemised_list = list()
        reversed_list = list()
        item_length = 4

        for item_deploy in range(0, len(temp), item_length):
            itemised_list.append(temp[item_deploy:item_deploy+item_length])
        for sublist in itemised_list:
            reversed_list.insert(0,sublist)
        for sublist in reversed_list:
            if "failed" in sublist:
                start_time = sublist[3]
                start_time = start_time.replace("T", " ")
                remove_float = "."
                start_time = start_time.split(remove_float)[0]
                datetime_starttime = datetime.strptime(start_time, '%Y-%m-%d %H:%M:%S')
                deploy = reversed_list.index(sublist)
                try:
                    while "succeeded" not in reversed_list[deploy]:
                        deploy += 1
                    end_time = reversed_list[deploy][3]
                    end_time = end_time.replace("T", " ")
                    end_time = end_time.split(remove_float)[0]
                    datetime_endtime = datetime.strptime(end_time, '%Y-%m-%d %H:%M:%S')
                    time_to_recover = (datetime_endtime - datetime_starttime).total_seconds()
                    hours_to_recover = time_to_recover / 3600
                    mean_time_for_recover.append(hours_to_recover) 
                except:
                    end_time = w2_time
                    time_to_recover = (datetime_endtime - datetime_starttime).total_seconds()
                    hours_to_recover = time_to_recover / 3600
                    mean_time_for_recover.append(hours_to_recover)


    '''
    Get request to Microsoft's Azure Pipelines. Gets all master/main builds associated with a definitionId for a given period of time, 
    denoted by the mindate and maxdate (one week). Uses regex to find how many builds exist and appends the total number of builds for 
    a given pipeline to a .txt file called deploymentFrequency.txt.
    '''
    def get_deployments(self, definitionId, mindate, maxdate):
        responses = requests.get(url=f'{self.base_url}{definitionId}&branchName=refs/heads/main&minTime={mindate}T00:00:00&maxTime={maxdate}T23:59:59&resultFilter=succeeded&api-version=7.0', headers=self.ado_headers)
        builds = re.findall(r'"buildNumber":"\d+.\d+.\d+"', str(responses.content))
        keys, vals = list(definitionIds.keys()), list(definitionIds.values())
        repository = keys[vals.index(definitionId)]
        f = open("deploymentFrequency.txt", "a+")
        f.write(f'Total successful deployments for pipeline {repository} in week {mindate} to {maxdate}: {len(builds)} \n')
        f.close()
        self.get_frequency(mindate)
        

    '''
    Same as previous method, but doesn't get called on a per week basis - only uses the start date and end date
    entire thing
    '''
    def get_statistics(self, definitionId, mindate, maxdate):
        responses = requests.get(url=f'{self.base_url}{definitionId}&branchName=refs/heads/main&minTime={mindate}T00:00:00&maxTime={maxdate}T23:59:59&resultFilter=succeeded&api-version=7.0', headers=self.ado_headers)
        all_responses = requests.get(url=f'{self.base_url}{definitionId}&branchName=refs/heads/main&minTime={mindate}T00:00:00&maxTime={maxdate}T23:59:59&api-version=7.0', headers=self.ado_headers)
        fails = re.findall(r'"buildNumber":"\d+.\d+.[^0]{1}\d*"', str(responses.content))
        pull_requests = re.findall(r'"ci.message":"Merge pull request #\d+ from ch-robinson-internal/\S+","ci.triggerRepository":"ch-robinson-internal/\S+"},"id":\d+,"buildNumber":"\d+.\d+.\d+","status":"completed","result":"succeeded","queueTime":"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d*Z","startTime":"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d*Z","finishTime":"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d*Z"', str(responses.content))        
        f = open("changeFailureRate.txt", "a+")
        if len(fails) != 0:
            f.write(str(f'{fails} \n'))
        f.close()
        self.get_change_fail_rate()
        self.get_pr_data(pull_requests, definitionId)
        self.get_mttr(all_responses)


'''
Calls the class and envokes it's methods
'''
main = Client()
for id in definitionIds:
    for key in dates:
        main.get_deployments(definitionIds[id], dates[key][0], dates[key][1])
    repo_name = definitionIds
    main.get_statistics(definitionIds[id], w1, w2)
main.plots(starts, weekly, total, mean_lead_time_for_changes, mean_time_for_recover)
