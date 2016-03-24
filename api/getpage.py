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
#Putting into the server (concret)
def add(db, fN, lN, rID, p, a, c, s, z, ph, e):
    cursor = conn.cursor()
    cursor.execute("INSERT INTO"+db+"(`created`, `firstName`, `lastName`, `radioID`, `position`, `address`, `city`, `state`, `zip`, `phone`, `email`) VALUES (NOW(),"+fN+","+lN+","+rID+","+p+","+a+","+c+","+s+","+z+","+ph+","+e+")")
    conn.commit()
    conn.close()

#Taking out from the server (concret)
def get(db):
    cursor = con.cursor()
    return cursor.execute("SELECT * FROM"+db)
    conn.close()

def delete(db, column, value):
    cursor = con.cursor()
    cursor.execute("DELETE FROM "+db+" WHERE "+column+" IS "+value)
    conn.commit()
    conn.close()

def addColumn(db, newName, dataType):
    cursor = con.cursor()
    cursor.execute("ALTER TABLE "+db+" ADD COLUMN "+newName+" "+dataType)
    conn.commit()
    conn.close()


with open("../page.json") as rsrc:
	content = rsrc.read()
print(content, end="")
