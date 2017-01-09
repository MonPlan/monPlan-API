# this generates all base ratings for every units
# to use you will need pymongo
import re
import os
import json
from pymongo import MongoClient

client = MongoClient('mongodb://api.monplan.tech', 27017)
db = client['unitRating']
collection = db['units']

input_file = open("base.json", "r")

data = json.loads(input_file.read())
unitCodes = []
for item in range(0, len(data)):
    unitCodes.append(data[item]["UnitCode"])

for units in unitCodes:
    output = {"unitCode": units, "learnRating": 3, "enjoyRating": 3}
    result = collection.insert_one(output)
    result
    print(units)
