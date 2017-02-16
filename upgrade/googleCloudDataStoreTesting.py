import re
import os
import json
from google.cloud import datastore

input_file = open("courseInfo.json", "r")

client = datastore.Client(project='monplan-dev')

kind = 'courseInfo'
uniqueID = client.key(kind)
currentItem = datastore.Entity(key=uniqueID)
currentItem['descrip'] = 'Test'

client.put(currentItem)
