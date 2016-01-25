#!C:/Users/adgreene/AppData/Local/Programs/Python/Python35-32/python.exe
import sys
import os
import cgi
import re
import mimetypes

# This is just an example, if you decide to use python, CGI is apparently discouraged, look into WSGI instead
path = os.environ["REQUEST_URI"]
qstr = ""

pageVars = {}

if "?" in path:
	qstr = path.split("?")[1]
	path = path.split("?")[0]
if path == "/": path = "/index.html"
elif path == "/api/getpage": path = "/page.json"

def printContentType():
	mime = mimetypes.guess_type(path)[0]
	if mime == None:
		pass
	print("Content-type:", mime, end="\n\n")

def darkenLighten(rgb, percent):
	rgb = re.findall("\d+", rgb)
	newRGB = "rgb("
	for i in range(3):
		color = int(int(rgb[i]) * (1 + percent))
		color = 255 if color > 255 else 0 if color < 0 else color
		newRGB += str(color) + ", "
	return newRGB[:-2] + ")"

def getPageVars():
	global pageVars
	pageVars = {
		"cname": "Whitmire Rescue Squad",
		"cid": "00000000",
		"uid": "00000000",
		"uname": "Adam Greene",
		"themecolor": "rgb(0, 159, 255)"
	}

def fillPage(match):
	key = match.group(0)[2:-1]
	if ":" in key:
		key = key.split(":")
		return darkenLighten(pageVars[key[0]], float(key[1]))
	else:
		return pageVars[key]

printContentType()
with open(".." + path) as page:
	pagestr = page.read()
getPageVars()
pagestr = re.sub(r"\\\(.*?\)", fillPage, pagestr)
print(pagestr)
