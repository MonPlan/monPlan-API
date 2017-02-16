# this generates all base ratings for every units
# to use you will need pymongo
import re
import os
import json
from google.cloud import datastore

client = datastore.Client(project='monplan-api-dev')

input_file = open("rules.json", "r")
data = json.loads(input_file.read())


for item in range(0, len(data)):
    kind = 'rules'
    uniqueID = client.key(kind)
    currentItem = datastore.Entity(uniqueID,exclude_from_indexes=('Sypnosis',))

    unitCode = data[item]["UNIT_CD"]
    print(unitCode)
    currentItem["unitCode"] = unitCode
    currentItem["VERSION_NUMBER"] = data[item]["VERSION_NUMBER"]
    currentItem["SHORT_TITLE"] = data[item]["SHORT_TITLE"]
    currentItem["UNIT_LEVEL"] = data[item]["UNIT_LEVEL"]
    currentItem["UNIT_STATUS"] = data[item]["UNIT_STATUS"]
    currentItem["START_DT"] = data[item]["START_DT"]
    currentItem["END_DT"] = data[item]["END_DT"]
    currentItem["EXPIRY_DT"] = data[item]["EXPIRY_DT"]
    currentItem["RULE_TEXT"] = data[item]["RULE_TEXT"]
    currentItem["S_RULE_CALL_CD"] = data[item]["S_RULE_CALL_CD"]
    client.put(currentItem)

    percentageComp = round(item/len(data)*100,2)
    print(str(percentageComp)+"% Completed.")
