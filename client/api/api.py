#!C:/Users/adgreene/AppData/Local/Programs/Python/Python35-32/python.exe
import sys
import os
import cgi

mimes = {"html": "text/html", "css": "text/css", "js": "application/javascript", "json": "application/json"}
path = sys.argv

def printContentType(mime):
	print("Content-type:", mimes[mime], end="\n\n")

printContentType("html")

# testing
print(sys.argv)
print("<br>")
print(os.environ['REQUEST_METHOD'])
print("<br>")
print(os.environ["QUERY_STRING"])
if os.environ["QUERY_STRING"] == "hbdk":
	print("HAPPY BIRTHDAY KEVIN")
print("<br>")
for line in sys.stdin:
	print(line)

# This is just an example, if you decide to use python, CGI is apparently discouraged, look into WSGI instead
