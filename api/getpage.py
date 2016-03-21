#!/usr/bin/python3
import api

reqData = api.getRequestData()
qstr = reqData["qstr"]
api.printHeaders(None, "json", True)

# Connect to the database.
import pymysql
conn = pymysql.connect(
    db='spims',
    user='root',
    passwd='spimsMySQL2015',
    host='localhost')
c = conn.cursor()


# This would be done dynamically using the qstr and SQL database
with open("../page.json") as rsrc:
	content = rsrc.read()
print(content, end="")
