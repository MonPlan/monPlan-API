# this generates all base ratings for every units
# to use you will need pymongo
import re
import os
import json
from pymongo import MongoClient

address = ""
port =

client = MongoClient(address, port)
db = client['unitsDatabase']
collection = db['rules']

input_file = open("rules.json", "r")
data = json.loads(input_file.read())


for item in range(0, len(data)):
    unitCode = data[item]["UNIT_CD"]
    print(unitCode)
    verNm = data[item]["VERSION_NUMBER"]
    shrtTitle = data[item]["SHORT_TITLE"]
    unitLvl = data[item]["UNIT_LEVEL"]
    status = data[item]["UNIT_STATUS"]
    dateStart = data[item]["START_DT"]
    dateEnd = data[item]["END_DT"]
    dateExpire = data[item]["EXPIRY_DT"]
    rule = data[item]["RULE_TEXT"]
    ruleTypeCode = data[item]["S_RULE_CALL_CD"]

    output = {"unitCode": unitCode, "verNm": verNm, "shrtTitle": shrtTitle, "unitLvl": unitLvl, "status": status, "rule": rule, "ruleTypeCode": ruleTypeCode, "dateStart": dateStart, "dateEnd": dateEnd, "dateExpire": dateExpire   }

    collection.insert_one(output)
    percentageComp = round(item/len(data)*100,2)
    print(str(percentageComp)+"% Completed.")
