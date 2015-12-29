var pages = [];

window.onload = function() {
	getPages();
	loadPage(pages[0]);
	setElements();
	addEventListeners();
}

function getPages() {
	// Do XHR to get list of available pages
	pages = ["people", "inventory", "equipment"];
}

function setElements() {
	accountMenu = document.getElementById('account-menu');
	currentUser = document.getElementById('current-user');
	logOutButton = document.getElementById('log-out-button');
	content = document.getElementById('content');
	if (pages.indexOf("people") > -1) {
		peopleTableHeaderData = document.getElementById('people-table').children[0].getElementsByTagName('td');
	}
}

function addEventListeners() {
	currentUser.addEventListener('click', function() {
		toggleClass(accountMenu, 'selected');
	});
	logOutButton.addEventListener('click', logOut);
	if (pages.indexOf("people") > -1) {
		for (var i = 0; i < peopleTableHeaderData.length; i++) {
			peopleTableHeaderData[i].addEventListener('click', sortTableBy);
		}
	}
}

function logOut() {
	// Log out
}

function loadPage(pageName) {
	// Do XHR to load page data, include Customer ID and login cookie
	// The rest assumes that it successfully loaded people
	var pageData = {
		"actions": ["Add Person"],
		"table": {
			"columns": ["Name", "ID", "*Role", "Address", "Phone", "Email"],
			"data": [
				{
					"name": "Greene, Adam, D",
					"id": "00000000",
					"role": "Admin",
					"address": "1600 Pennsylvania Ave NW, Washington, DC 20500",
					"phone": "(202) 456-1111",
					"email": "greene.adam.d@gmail.com"
				},
				{
					"name": "Gagnon, Kevin, M",
					"id": "00000001",
					"role": "User",
					"address": "1400 Old Tamah Rd, Irmo, SC 29063",
					"phone": "(803) 476-3300",
					"email": "kevinmgagnon@icloud.com"
				}
			]
		}
	};
	toggleClass(content, pageName);
	var table = document.createElement('table');
	var colorColumns = []
	var thead = document.createElement('thead');
	for (var i = 0; i < pageData.table.columns.length; i++) {
		var td = document.createElement('td');
		if (pageData.table.columns[i].substring(0, 1) == "*") {
			pageData.table.columns[i] = pageData.table.columns[i].substring(1);
			colorColumns.push(i);
		}
		td.innerHTML = pageData.table.columns[i];
		thead.appendChild(td);
	}
	toggleClass(thead.children[0], "sorting-by");
	table.appendChild(thead);
	var tbody = document.createElement('tbody');
	for (var i = 0; i < pageData.table.data.length; i++) {
		var tr = document.createElement('tr');
		for (var j = 0; j < pageData.table.columns.length; j++) {
			var td = document.createElement('td');
			td.innerHTML = pageData.table.data[i][pageData.table.columns[j].toLowerCase()];
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	for (var i = 0; i < tbody.children.length; i++) {
		for (var j = 0; j < colorColumns.length; j++) {
			console.log(tbody.children[i].children[colorColumns[j]]);
			colorData = tbody.children[i].children[colorColumns[j]];
			colorData.innerHTML = "<span>" + colorData.innerHTML + "</span>";
			toggleClass(colorData.children[0], "colordata");
			toggleClass(colorData.children[0], thead.children[colorColumns[j]].innerHTML.toLowerCase());
			toggleClass(colorData.children[0], colorData.children[0].innerHTML.toLowerCase());
		}
	}
	table.appendChild(tbody);
	content.appendChild(table);
}

function sortTableBy() {
	if (this.className != "sorting-by") {
		for (var i = 0; i < peopleTableHeaderData.length; i++) {
			if (peopleTableHeaderData[i].className == "sorting-by") {
				peopleTableHeaderData[i].className = "";
				break;
			}
		}
		this.className = "sorting-by";
		// Do sorting
	}
}

function toggleClass(element, className) {
	var index = element.className.indexOf(className);
	if (element.className == "") {
		element.className = className;
	} else if (index > -1) {
		var newClassName = element.className.substring(0, index) + element.className.substring(index + className.length);
		element.className = newClassName.replace(/\s+/g, " ").trim();
	} else {
		element.className += " " + className;
	}
}

function search() {
	return false;
}
