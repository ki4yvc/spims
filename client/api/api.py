#!C:/Users/adgreene/AppData/Local/Programs/Python/Python35-32/python.exe
import sys
import os
import cgi
import re
import mimetypes

# This is just an example, if you decide to use python, CGI is apparently discouraged, look into WSGI instead
path = os.environ["REQUEST_URI"]
qstr = ""
if "?" in path:
	qstr = path.split("?")[1]
	path = path.split("?")[0]
path = "/index.html" if path == "/" else path

def printContentType():
	mime = mimetypes.guess_type(path)[0]
	if mime == None:
		pass
	print("Content-type:", mime, end="\n\n")

printContentType()
with open(".." + path, encoding = "utf8") as page:
	pagestr = page.read()

if path == "/index.html":
	print(pagestr.format("Whitmire Rescue Squad", cid = "00000000", uid = "00000000", uname = "Adam Greene"))
else:
	print(pagestr)
