course_codes = ["3971","4520","4530","A2000","A2001","A2003","A2004","A2005","B2000","B2001","B2003","B2004","B2006","B2007","B2008","B2009","B2012","B2013","B2014","B2016","B2017","B2018","B2019","B2020","B2021","B2022","B2023","B2024","B2025","B6002","B6003","B6004","B6005","B6009","B6011","B6012","B6013","B6014","B6015","C2000","C2001","C2002","C2003","C3001","D3001","D3002","D3003","D3004","D3005","D3006","D3007","D3008","D3009","E3001","E3002","E3003","E3004","E3005","E3006","E3007","E3009","E6001","F2001","F2003","F2004","F2005","F2006","F2007","F3001","F6001","F6002","L3002","L3003","L3004","L3005","L3006","L3007","L3009","M2001","M2002","M2003","M2006","M3001","M3002","M3004","M3005","M3006","M6018","P2001","P3001","P3002","P6001","S2000","S2003","S2004","S2005","S2006","S2007","S3001","S3002","S6001","S6002"]

import requests
import csv
import json
import os
import math

# this generates all base ratings for every units
# to use you will need pymongo
import re
import os
import json
from pymongo import MongoClient

db = client['unitsDatabase']
collection = db['courses']

error = []
for filename in os.listdir("."):
        if filename.endswith('.json') is True: #converts all the file except for the Python File
            try:
                input_file = open(filename, "r")
                data = json.loads(input_file.read())

                courseAOS = data["courseAOS"]
                courseCode = filename.strip('.json')
                print(courseCode)
                courseName = data["courseName"]
                courseType = data["courseType"]
                faculty = data["faculty"]
                teachingPeriods = data["teachingPeriods"]

                output =  {"courseCode": courseCode, "courseName": courseName, "courseType": courseType, "courseAOS": courseAOS, "faculty": faculty,"teachingPeriods":teachingPeriods  }
                collection.insert_one(output)
            except json.decoder.JSONDecodeError:
                error.append(filename)

print("=========")
print("Error Files")
print("=========")
for i in error:
    print(i)

print("=========")
