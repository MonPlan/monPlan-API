# this generates all base ratings for every units
# to use you will need pymongo
import re
import os
import json
from pymongo import MongoClient


db = client['unitsDatabase']
collection = db['courseInfo']


input_file = open("courseInfo.json", "r")
data = json.loads(input_file.read())

for item in range(0, len(data)):
    courseCode = data[item]["courseCode"]
    courseName = data[item]["Title"]
    abrevTitle = data[item]["abbrevTitle"]
    courseAward = data[item]["award"]
    courseDescrip = data[item]["descrip"]
    creditPoints = data[item]["credit"]
    courseDuration = data[item]["duration"]
    courseLenWorkload = data[item]["wkloadLeng"]
    courseType = data[item]["type"]
    mangFac = data[item]["manFac"]
    modeLoc = data[item]["modLoc"]
    currentOffer = data[item]["offer"]
    AusAccred = data[item]["accredAus"]
    IntAccred = data[item]["accredInt"]
    altExit = data[item]["aExit"]


    output = {"courseCode": courseCode, "courseName": courseName, "abrevTitle": abrevTitle, "courseAward": courseAward, "courseDescrip": courseDescrip, 'creditPoints': creditPoints, "courseDuration": courseDuration, "courseLenWorkload":courseLenWorkload, "courseType": courseType, "mangFac": mangFac, "modeLoc": modeLoc, "currentOffer": currentOffer, "AusAccred": AusAccred, 'IntAccred': IntAccred, "altExit": altExit}
    collection.insert_one(output)
    percentageComp = round(item/len(data)*100,2)
    print(str(percentageComp)+"% Completed.")
