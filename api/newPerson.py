import pymysql


conn = pymysql.connect(
    db='spims',
    user='root',
    passwd='spimsMySQL2015',
    host='localhost')
cursor = conn.cursor()

def insert(dbase, n, rID, p, a, ph, e):
    cursor.execute('INSERT INTO %s (`created`, `name`, `radioID`, `position`, `address`, `phone`, `email`) values (NOW(),%s,%s,%s,%s,%s,%s)' % (str(dbase), str(n), str(rID), str(p), str(a), str(ph), str(e)))
    conn.commit()
