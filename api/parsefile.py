#!python
import api
import re

def parsePage(match):
	key = match.group(0)[2:-1]
	if key.startswith("themecolor:"):
		key = key.split(":")
		return darkenLighten(pageVars[key[0]], float(key[1]))
	else:
		return pageVars[key]

def darkenLighten(rgb, percent):
	rgb = re.findall("\d+", rgb)
	newRGB = "rgb("
	for i in range(3):
		color = int(int(rgb[i]) * (1 + percent))
		color = 255 if color > 255 else 0 if color < 0 else color
		newRGB += str(color) + ", "
	return newRGB[:-2] + ")"

reqData = api.getRequestData()
path = reqData["path"]
if path == "/": path = "/index.html"
api.printHeaders(path)

# This would be loaded from the SQL database
pageVars = {
	"cname": "Whitmire Rescue Squad",
	"cid": "00000000", # Would be taken from the request body
	"uid": "00000000", # Would be taken from the request body
	"uname": "Adam Greene",
	"themecolor": "rgb(0, 159, 255)"
}

with open(".." + path) as rsrc:
	content = rsrc.read()
content = re.sub(r"\\\(.*?\)", parsePage, content)
print(content, end="")
