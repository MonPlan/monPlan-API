# this generates all base ratings for every units
# to use you will need pymongo
import re
import os
import json
from google.cloud import datastore

client = datastore.Client(project='monplan-api-dev')

input_file = open("courses.json", "r")

data = json.loads(input_file.read())

courseArr = []

def search(arr, target):
    for i in range(len(arr)):
        if arr[i]["courseCode"] == target["courseCode"]:
            return True
    return False

courseArr.append(data[0])

for item in range(1, len(data)):
    if(search(courseArr, data[item]) == False):
        courseArr.append(data[item])

for item in range(0, len(courseArr)):
    kind = 'courseMain'
    uniqueID = client.key(kind)
    currentItem = datastore.Entity(uniqueID)

    currentItem["courseCode"] = data[item]["courseCode"]
    currentItem["courseName"] = data[item]["courseName"]
    currentItem["managingFaculty"] = data[item]["managingFaculty"]
    print(data[item]["courseCode"])
    client.put(currentItem)
    percentageComp = round(item/len(data)*100,2)
    print(str(percentageComp)+"% Completed.")
