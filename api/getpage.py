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
try:
    with connection.cursor() as cursor:
        cursor.execute(INSERT INTO `people` (`created`, `firstName`, `lastName`, `radioID`, `position`, `address`, `city`, `state`, `zip`, `phone`, `email`) VALUES (NOW(), 'Nicholas', 'Gustafson', '1234', 'Hitler', '001 Hollywood Rd', 'Columbia', 'SC', 29212, '8033157023', 'nichgus7@gmail.com'))
        connection.commit()
finally:
    connection.close()


# This would be done dynamically using the qstr and SQL database
with open("../page.json") as rsrc:
	content = rsrc.read()
print(content, end="")
