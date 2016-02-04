#!python
import sys
import os
import mimetypes

def getRequestData():
	path = os.environ["REQUEST_URI"]
	qstr = ""
	if "?" in path:
		qstr = path.split("?")[1]
		path = path.split("?")[0]
	body = sys.stdin.read()
	return {"path": path, "qstr": qstr, "body": body}

def printHeaders(path = "", mime = None, nocache = False):
	if mime == None:
		mime = mimetypes.guess_type(path[1:])[0]
		if mime == None:
			mime = "text/plain"
	print("Content-Type: ", mime, "; charset=utf-8", sep="")
	if nocache:
		print("Cache-Control: no-store")
	print()
