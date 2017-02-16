# this generates all base ratings for every units
# to use you will need pymongo
import re
import os
import json
from google.cloud import datastore

client = datastore.Client(project='monplan-api-dev')

def handleSETU(unitCode):
    setuData = open("setuData.json", "r")
    inputData = json.loads(setuData.read())
    for items in inputData:
        if(items['UnitCode'] == unitCode):
            return items
            return True
    return {'enjoyScore': 3, 'enjoyResponse': 0, 'learnScore': 3, 'learnResponse': 0} #if no data on code return base rating of 3, and response of 0

def generateLocationAndTimeObject(array):
    tempArray = []
    for i in range(0, len(array)):
        #array i: [['Peninsula'], ['First semester 2017 (Day)']]
        location = array[i][0][0]
        time = array[i][1]
        newObj = {"location": location, "time": time}
        tempArray.append(newObj)
    return tempArray



input_file = open("units.json", "r")
data = json.loads(input_file.read())

array = []
for item in range(0, len(data)):
    currentItem = {}
    currentItem['unitCode'] = data[item]["UnitCode"]
    currentItem['unitName'] = data[item]["UnitName"]
    locationAndTime = (data[item]["LocationAndTime"])
    if(locationAndTime == "Not Offered in 2017"):
        uploadData =  [{"location":  "Not Offered in 2017", "time": []}]
    else:
        uploadData = generateLocationAndTimeObject(locationAndTime)
    currentItem['locationAndTime'] = uploadData


    currentItem['creditPoints'] = data[item]["CreditPoints"]
    currentItem['faculty'] = data[item]["Faculty"]
    currentItem['eftsl'] = data[item]["EFTSL"]
    currentItem['preqs'] = data[item]["Preqs"]
    currentItem['proh'] = data[item]["Proh"]
    currentItem['scaBand'] = data[item]["SCABand"]
    currentItem['sypnosis'] = data[item]["Sypnosis"]
    setuScore = handleSETU(data[item]["UnitCode"])

    currentItem['enjoyScore'] = setuScore['enjoyScore']
    currentItem['enjoyResponse'] = setuScore['enjoyResponse']
    currentItem['learnScore'] = setuScore['learnScore']
    currentItem['learnResponse'] = setuScore['learnResponse']

    array.append(currentItem)

    percentageComp = round(item/len(data)*100,2)
    print(str(percentageComp)+"% Completed.")

print("Writing to JSON")
with open("unitsNew.json", "w") as json_file:
        json_file.write(json.dumps(array, indent=4, sort_keys=True))
