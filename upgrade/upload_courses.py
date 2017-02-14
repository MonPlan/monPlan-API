# this generates all base ratings for every units
# to use you will need pymongo
import re
import os
import json
from google.cloud import datastore

client = datastore.Client(project='monplan-api-dev')

input_file = open("courses.json", "r")

data = json.loads(input_file.read())

for item in range(0, len(data)):
    for i in range(0,len((data[item]["courseAOS"]))):
        #generate ID
        kind = 'courses'
        uniqueID = client.key(kind)
        currentItem = datastore.Entity(uniqueID)
        currentItem["aosCode"]=str(data[item]["courseAOS"][i]["code"])
        currentItem["aosName"]=str(data[item]["courseAOS"][i]["aosName"])
        currentItem["courseCode"] = data[item]["courseCode"]
        print(data[item]["courseCode"])
        currentItem["courseName"] = data[item]["courseName"]
        currentItem["managingFaculty"] = data[item]["managingFaculty"]

        client.put(currentItem)

    percentageComp = round(item/len(data)*100,2)
    print(str(percentageComp)+"% Completed.")
