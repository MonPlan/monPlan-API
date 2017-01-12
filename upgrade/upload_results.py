# this generates all base ratings for every units
# to use you will need pymongo
import re
import os
import json
from pymongo import MongoClient

client = MongoClient('mongodb://'+ipaddress, 45956)
db = client['unitsDatabase']
collection = db['units']

input_file = open("setuData.json", "r")

data = json.loads(input_file.read())

for item in range(0, len(data)):
    unitCode = data[item]["UnitCode"]

    output =  {"UnitCode": unitCode,"UnitName": UnitName,"Faculty": Faculty,"LocationAndTime": LocationAndTime,"CreditPoints": CreditPoints,"EFTSL": EFTSL,"Preqs": Preqs,"Proh": Proh,"SCABand": SCABand,"Sypnosis": Sypnosis, "enjoyRating": 3, "learnRating": 3}

    collection.insert_one(output)
    percentageComp = round(item/len(data)*100,2)
    print(str(percentageComp)+"% Completed.")
