#!/usr/bin/python3
import api

reqData = api.getRequestData()
qstr = reqData["qstr"]
api.printHeaders(None, "json", True)

# This would be done dynamically using the qstr and SQL database
with open("../pages.json") as rsrc:
	content = rsrc.read()
print(content, end="")
