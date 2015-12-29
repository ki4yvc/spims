var pages = [];

window.onload = function() {
	getPages();
	setElementsBefore();
	loadPage(pages[0]);
	setElementsAfter();
	addEventListeners();
}

function getPages() {
	// Do XHR to get list of available pages
	pages = ["people", "inventory", "equipment"];
}

function setElementsBefore() {
	accountMenu = document.getElementById('account-menu');
	currentUser = document.getElementById('current-user');
	logOutButton = document.getElementById('log-out-button');
	actionButtons = document.getElementById('action-buttons');
	content = document.getElementById('content');
}

function setElementsAfter() {
	table = content.getElementsByTagName('table')[0];
	tableHeadData = table.children[0].children;
	tableCheckboxes = table.getElementsByTagName('input');
	for (var i = 0; i < tableCheckboxes.length; i++) {
		if (tableCheckboxes[i].type != "checkbox") {
			tableCheckboxes.splice(i, 1);
			i -= 1;
		}
	}
}

function addEventListeners() {
	currentUser.addEventListener('click', function() {
		toggleClass(accountMenu, 'selected');
	});
	logOutButton.addEventListener('click', logOut);
	for (var i = 0; i < tableHeadData.length; i++) {
		tableHeadData[i].addEventListener('click', sortTableBy);
	}
	for (var i = 0; i < tableCheckboxes.length; i++) {
		tableCheckboxes[i].addEventListener('change', selectRow);
	}
}

function selectRow() {
	var checked = [];
	if (this.parentNode.parentNode.parentNode.tagName.toLowerCase() == "thead") {
		for (var i = 0; i < tableCheckboxes.length; i++) {
			tableCheckboxes[i].checked = this.checked;
		}
	} else {
		if (this.checked == false) {
			tableCheckboxes[0].checked = false;
		}
	}
	for (var i = 1; i < tableCheckboxes.length; i++) {
		checked[i - 1] = tableCheckboxes[i].checked ? true : false;
	}
	tableCheckboxes[0].checked = checked.indexOf(false) == -1;
	var selections = actionButtons.getElementsByClassName('selection');
	for (var i = 0; i < selections.length; i++) {
		toggleClass(selections[i], "disabled", checked.indexOf(true) == -1);
	}
}

function logOut() {
	// Log out
}

function loadPage(pageName) {
	// Do XHR to load page data, include Customer ID and login cookie
	// The rest assumes that it successfully loaded people
	var pageData = {
		"actions": {
			"buttons": ["Add Person", "Remove Person", "Alert"],
			"selection": [1, 2]
		},
		"table": {
			"columns": ["Name", "ID", "*Role", "Address", "Phone", "Email"],
			"unsortables": [],
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
	content.className = pageName;
	var table = document.createElement('table');
	var colorColumns = []
	var thead = document.createElement('thead');
	for (var i = 0; i < pageData.table.columns.length; i++) {
		var td = document.createElement('td');
		if (pageData.table.columns[i].substring(0, 1) == "*") {
			pageData.table.columns[i] = pageData.table.columns[i].substring(1);
			colorColumns.push(i);
		}
		if (pageData.table.unsortables.indexOf(i) > -1) {
			toggleClass(td, "unsortable");
		}
		td.innerHTML = pageData.table.columns[i];
		thead.appendChild(td);
	}
	thead.innerHTML = "<tr>" + thead.innerHTML + "</tr>";
	toggleClass(thead.children[0].children[0], "sorting-by");
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
			colorData = tbody.children[i].children[colorColumns[j]];
			colorData.innerHTML = "<span>" + colorData.innerHTML + "</span>";
			toggleClass(colorData.children[0], "colordata");
			toggleClass(colorData.children[0], thead.children[0].children[colorColumns[j]].innerHTML.toLowerCase());
			toggleClass(colorData.children[0], colorData.children[0].innerHTML.toLowerCase());
		}
	}
	table.appendChild(tbody);
	if (pageData.actions.selection.length > 0) {
		var trows = table.getElementsByTagName('tr');
		for (var i = 0; i < trows.length; i++) {
			var checkbox = document.createElement('input');
			checkbox.type = "checkbox";
			var td = document.createElement('td');
			td.appendChild(checkbox);
			trows[i].insertBefore(td, trows[i].firstChild);
		}
		toggleClass(trows[0].children[0], "unsortable");
	}
	content.appendChild(table);
	for (var i = 0; i < pageData.actions.buttons.length; i++) {
		var button = document.createElement('button');
		button.innerHTML = pageData.actions.buttons[i];
		if (pageData.actions.selection.indexOf(i) > -1) {
			toggleClass(button, "selection");
			toggleClass(button, "disabled");
		}
		actionButtons.appendChild(button);
	}
}

function sortTableBy() {
	if (this.className != "sorting-by") {
		for (var i = 0; i < tableHeadData.length; i++) {
			if (tableHeadData[i].className == "sorting-by") {
				toggleClass(tableHeadData[i], "sorting-by")
				break;
			}
		}
		toggleClass(this, "sorting-by");
		// Do XHR
	}
}

function toggleClass(element, className, on) {
	var index = element.className.indexOf(className);
	if (element.className == "" && on != false) {
		element.className = className;
	} else if (element.className == className && on != true) {
		element.removeAttribute("class");
	} else if (index > -1 && on != true) {
		var newClassName = element.className.substring(0, index) + element.className.substring(index + className.length);
		element.className = newClassName.replace(/\s+/g, " ").trim();
	} else if (on != false) {
		element.className += " " + className;
	}
}

function search() {
	return false;
}
