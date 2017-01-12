# this generates all base ratings for every units
# to use you will need pymongo
import re
import os
import json
from pymongo import MongoClient

client = MongoClient('', 45956)
db = client['unitsDatabase']
collection = db['units']

def handleSETU(unitCode):
    setuData = open("setuData.json", "r")
    inputData = json.loads(setuData.read())
    for items in inputData:
        if(items['UnitCode'] == unitCode):
            return items
            return True
    return {'enjoyScore': 3, 'enjoyResponse': 0, 'learnScore': 3, 'learnResponse': 0} #if no data on code return base rating of 3, and response of 0

input_file = open("units.json", "r")
data = json.loads(input_file.read())


for item in range(0, len(data)):
    unitCode = data[item]["UnitCode"]
    print(unitCode)
    UnitName = data[item]["UnitName"]
    LocationAndTime = data[item]["LocationAndTime"]
    CreditPoints = data[item]["CreditPoints"]
    Faculty = data[item]["Faculty"]
    EFTSL = data[item]["EFTSL"]
    Preqs = data[item]["Preqs"]
    Proh = data[item]["Proh"]
    SCABand = data[item]["SCABand"]
    Sypnosis = data[item]["Sypnosis"]
    setuScore = handleSETU(unitCode)

    enjoyScore = setuScore['enjoyScore']
    enjoyResponse = setuScore['enjoyResponse']
    learnScore = setuScore['learnScore']
    learnResponse = setuScore['learnResponse']


    output =  {"UnitCode": unitCode,"UnitName": UnitName,"Faculty": Faculty,"LocationAndTime": LocationAndTime,"CreditPoints": CreditPoints,"EFTSL": EFTSL,"Preqs": Preqs,"Proh": Proh,"SCABand": SCABand,"Sypnosis": Sypnosis, "enjoyRating": enjoyScore, "enjoyResponse": enjoyResponse, "learnRating": learnScore, "learnResponse": learnResponse}


    collection.insert_one(output)
    percentageComp = round(item/len(data)*100,2)
    print(str(percentageComp)+"% Completed.")
