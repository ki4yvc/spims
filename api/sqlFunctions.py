
import pymysql

conn = pymysql.connect(
    db='spims',
    user='root',
    passwd='spimsMySQL2015',
    host='localhost')
cursor = conn.cursor()

def addColumn(dbase, newName, dataType):
    cursor.execute("ALTER TABLE %s ADD COLUMN %s %s" % (str(dbase), str(newName), str(dataType)))
    conn.commit()

def insert(dbase, n, rID, p, a, ph, e):
    cursor.execute('INSERT INTO %s (`created`, `name`, `radioID`, `position`, `address`, `phone`, `email`) values (NOW(),%s,%s,%s,%s,%s,%s)' % (str(dbase), str(n), str(rID), str(p), str(a), str(ph), str(e)))
    conn.commit()

def retrieve(dbase, rID):
    cursor.execute('SELECT * from %s where radioID = %s' % (str(dbase), str(rID)))
    return cursor.fethmany(size=1)

def retrieveAll(dbase):
    cursor.execute('SELECT * FROM %s' % (str(base)))
    return cursor.fetchmany(size=40)

def update(dbase, variable, value, rID):
    cursor.execute('UPDATE %s set %s = %s where `radioID` = %s' % (str(dbase), str(variable), str(value), str(rID)))
    conn.commit()

def updateRadioID(dbase, rID, a):
    cursor.execute('UPDATE %s set `radioID` = %s where `address` = %s' % (str(dbase), str(rID), str(a)))
    conn.commit()

def delete(dbase, rID):
    cursor.execute('DELETE from %s where `radioID` = %s' % (str(dbase), str(rID)))
    conn.commit()

conn.close()
