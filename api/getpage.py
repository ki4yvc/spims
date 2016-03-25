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
def add(dbase, fN, lN, rID, p, a, c, s, z, ph, e):
    cursor = conn.cursor()
    cursor.execute("INSERT INTO"+dbase+"(`created`, `firstName`, `lastName`, `radioID`, `position`, `address`, `city`, `state`, `zip`, `phone`, `email`) VALUES (NOW(),"+fN+","+lN+","+rID+","+p+","+a+","+c+","+s+","+z+","+ph+","+e+")")
    conn.commit()
    conn.close()

#Taking out from the server (concret)
def get(dbase):
    cursor = con.cursor()
    return cursor.execute("SELECT * FROM"+dbase)
    conn.close()

def delete(dbase, column, value):
    cursor = con.cursor()
    cursor.execute("DELETE FROM "+dbase+" WHERE "+column+" IS "+value)
    conn.commit()
    conn.close()

def addColumn(dbase, newName, dataType):
    cursor = con.cursor()
    cursor.execute("ALTER TABLE "+dbase+" ADD COLUMN "+newName+" "+dataType)
    conn.commit()
    conn.close()


with open("../page.json") as rsrc:
	content = rsrc.read()
print(content, end="")
