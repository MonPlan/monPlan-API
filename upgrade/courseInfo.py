# this generates all base ratings for every units
# to use you will need pymongo
import re
import os
import json
from google.cloud import datastore

# Load JSON File
input_file = open("courseInfo.json", "r")
data = json.loads(input_file.read())

client = datastore.Client(project='monplan-api-dev')


for item in range(0, len(data)):
    #generate ID
    kind = 'courseInfo'
    uniqueID = client.key(kind)
    currentItem = datastore.Entity(uniqueID,exclude_from_indexes=('currentOffer','courseDescrip','modeLoc'))

    # setup variables
    currentItem['courseCode'] = data[item]["courseCode"]
    currentItem['courseName'] = data[item]["Title"]
    currentItem['abrevTitle'] = data[item]["abbrevTitle"]
    currentItem['courseAward'] = data[item]["award"]
    currentItem['courseDescrip'] = data[item]["descrip"]
    currentItem['creditPoints'] = data[item]["credit"]
    currentItem['courseDuration'] = data[item]["duration"]
    currentItem['courseLenWorkload'] = data[item]["wkloadLeng"]
    currentItem['courseType'] = data[item]["type"]
    currentItem['mangFac'] = data[item]["manFac"]
    currentItem['modeLoc'] = data[item]["modLoc"]
    currentItem['currentOffer'] = data[item]["offer"]
    currentItem['AusAccred'] = data[item]["accredAus"]
    currentItem['IntAccred'] = data[item]["accredInt"]
    currentItem['altExit'] = data[item]["aExit"]

    # Final Object Populations
    #output = {'key': uniqueID, "courseCode": courseCode, "courseName": courseName, "abrevTitle": abrevTitle, "courseAward": courseAward, "courseDescrip": courseDescrip, 'creditPoints': creditPoints, "courseDuration": courseDuration, "courseLenWorkload":courseLenWorkload, "courseType": courseType, "mangFac": mangFac, "modeLoc": modeLoc, "currentOffer": currentOffer, "AusAccred": AusAccred, 'IntAccred': IntAccred, "altExit": altExit}
    #currentItem.update(output)

    # Update to Google Cloud Datastore
    client.put(currentItem)

    # Print Progress
    percentageComp = round(item/len(data)*100,2)
    print(str(percentageComp)+"% Completed.")
