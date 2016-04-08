#!/usr/bin/python3
import api

reqData = api.getRequestData()
qstr = reqData["qstr"]
api.printHeaders(None, "json", True)

import pymysql

conn = pymysql.connect(
    db='spims',
    user='root',
    passwd='spimsMySQL2015',
    host='localhost')
cursor = conn.cursor()



conn.close()

with open("../page.json") as rsrc:
	content = rsrc.read()
print(content, end="")
