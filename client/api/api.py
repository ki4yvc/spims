#!/home/dekann/Python-3.5.1/python
import sys
import os
import cgi
import re
import mimetypes

# This is just an example, if you decide to use python, CGI is apparently discouraged, look into WSGI instead
path = os.environ["REQUEST_URI"]
qstr = ""

pageVars = {
	"cname": "Whitmire Rescue Squad",
	"cid": "00000000",
	"uid": "00000000",
	"uname": "David Andrews Jr.",
	"themecolor100": "#009fff",
	"themecolor75": "#0077bf",
	"themecolor50": "#005080"
}

if "?" in path:
	qstr = path.split("?")[1]
	path = path.split("?")[0]
if path == "/": path = "/index.html"

def printContentType():
	mime = mimetypes.guess_type(path)[0]
	if mime == None:
		pass
	print("Content-type:", mime, end="\n\n")

def fillPage(match):
	var = match.group(0)[2:-1]
	return pageVars[var]

printContentType()
with open(".." + path) as page:
	pagestr = page.read()
pagestr = re.sub(r"\\\(.*?\)", fillPage, pagestr)

print(pagestr)
