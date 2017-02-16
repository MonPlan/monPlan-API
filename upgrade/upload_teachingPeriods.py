# this generates all base ratings for every units
# to use you will need pymongo
import re
import os
import json
from google.cloud import datastore

client = datastore.Client(project='monplan-api-dev')

input_file = open("teachingperiods.json", "r")
data = json.loads(input_file.read())


for item in range(1, len(data)):
    #generate ID
    kind = 'periods'
    uniqueID = client.key(kind)
    currentItem = datastore.Entity(uniqueID)

    currentItem['code'] = data[item]["code"]
    currentItem['name'] = data[item]["name"]
    currentItem['startDate'] = data[item]["startDate"]
    currentItem['endDate'] = data[item]["endDate"]


    client.put(currentItem)

    percentageComp = round(item/len(data)*100,2)
    print(str(percentageComp)+"% Completed.")

print("Finished.")
