#!/usr/bin/python3
import api
import json

reqData = api.getRequestData()
body = json.loads(reqData["body"])
api.printHeaders(None, "json", True)
response = {"success": None, "message": None}

# Do validation and all that jazz
# The rest assumes everything worked

response["success"] = True
action = body["action"]
verbed = ""
if action == "Add": verbed = "added"
elif action == "Update": verbed = "updated"
elif action == "Remove": verbed = "removed"
response["message"] = "Item(s) " + verbed + " successfully"
print(json.dumps(response))
