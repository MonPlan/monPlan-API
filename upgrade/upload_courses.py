# this generates all base ratings for every units
# to use you will need pymongo
import re
import os
import json
from pymongo import MongoClient

client = MongoClient('mongodb://', 45956)
db = client['unitsDatabase']
collection = db['courses']

input_file = open("courses.json", "r")

data = json.loads(input_file.read())

for item in range(0, len(data)):
    courseAOS = data[item]["courseAOS"]
    courseCode = data[item]["courseCode"]
    print(courseCode)
    courseName = data[item]["courseName"]
    managingFaculty = data[item]["managingFaculty"]

    output =  {"courseCode": courseCode, "courseName": courseName, "managingFaculty": managingFaculty, "courseAOS": courseAOS  }
    collection.insert_one(output)
    percentageComp = round(item/len(data)*100,2)
    print(str(percentageComp)+"% Completed.")
