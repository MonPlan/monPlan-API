# this generates all base ratings for every units
# to use you will need pymongo
import re
import os
import json
from pymongo import MongoClient

client = MongoClient('mongodb://'+ipaddress, port)
db = client['unitsDatabase']
collection = db['units']

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

    output =  {"UnitCode": unitCode,"UnitName": UnitName,"Faculty": Faculty,"LocationAndTime": LocationAndTime,"CreditPoints": CreditPoints,"EFTSL": EFTSL,"Preqs": Preqs,"Proh": Proh,"SCABand": SCABand,"Sypnosis": Sypnosis, "enjoyRating": 3, "learnRating": 3}

    collection.insert_one(output)
    percentageComp = round(item/len(data)*100,2)
    print(str(percentageComp)+"% Completed.")
