var pages = [];

window.onload = function() {
	getPages();
	setUpBefore();
	loadPage(pages[0]);
}

function getPages() {
	// Do XHR to get list of available pages
	pages = ["people", "inventory", "equipment"];
}

function setUpBefore() {
	accountMenu = document.getElementById('account-menu');
	currentUser = document.getElementById('current-user');
	logOutButton = document.getElementById('log-out-button');
	actionButtons = document.getElementById('action-buttons');
	content = document.getElementById('content');

	currentUser.addEventListener('click', function() {
		toggleClass(accountMenu, 'selected');
	});
	logOutButton.addEventListener('click', logOut);
}

function setUpAfter() {
	tableHead = content.getElementsByClassName('table-header')[0];
	tableHeadData = tableHead.getElementsByTagName('div');
	tableContainer = content.getElementsByClassName('table-container')[0];
	table = content.getElementsByTagName('table')[0];
	tableCheckboxes = content.querySelectorAll('input[type="checkbox"]');
	tableCheckboxes = Array.prototype.slice.call(tableCheckboxes);
	tableCheckboxes.splice(1, 1);

	for (var i = 0; i < tableHeadData.length; i++) {
		if (!existsAndHas(tableHeadData[i].className, "unsortable")) {
			tableHeadData[i].addEventListener('click', sortTableBy);
		}
	}
	for (var i = 0; i < tableCheckboxes.length; i++) {
		tableCheckboxes[i].addEventListener('change', selectRow);
	}

	window.onresize = resizeTable;
	tableContainer.onscroll = scrollTableHead;
}

function selectRow() {
	var checked = [];
	if (tableHead.contains(this)) {
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
	var selections = actionButtons.querySelectorAll('.selection:not(.disabled)');
	for (var i = 0; i < selections.length; i++) {
		if (checked.indexOf(true) == -1) {
			selections[i].disabled = true;
			selections[i].title = "Please select at least one entry";
		} else {
			selections[i].disabled = false;
			selections[i].removeAttribute('title');
		}
	}
}

function loadPage(pageName, searchQuery, sortingBy = "", pageNumber = 1, resultsPerPage = 50) {
	showLoadingOverlay();
	// Do XHR to load page data, include Customer ID and login cookie
	// The rest assumes that it successfully loaded people
	var pageData = {
		"actions": [
			{
				"name": "Add Person",
			},
			{
				"name": "Remove Person",
				"attributes": ["selection"]
			},
			{
				"name": "Edit",
				"attributes": ["selection"]
			},
			{
				"name": "Alert",
				"attributes": ["selection", "disabled"]
			}
		],
		"table": {
			"columns": [
				{
					"name": "Name",
					"attributes": ["sortingby"]
				},
				{
					"name": "Radio ID"
				},
				{
					"name": "Role",
					"attributes": ["colorcolumn"]
				},
				{
					"name": "Address",
					"attributes": ["unsortable"]
				},
				{
					"name": "Phone"
				},
				{
					"name": "Email"
				}
			],
			"data": [
				{
					"name": "Greene, Adam, D",
					"radio id": "1624",
					"role": "Admin",
					"address": "1600 Pennsylvania Ave NW, Washington, DC 20500",
					"phone": "(202) 456-1111",
					"email": "greene.adam.d@gmail.com"
				},
				{
					"name": "Gagnon, Kevin, M",
					"radio id": "1625",
					"role": "Secretary",
					"address": "14 East 51st Street, New York, NY 10022",
					"phone": "(212) 753-2261",
					"email": "kevinmgagnon@icloud.com"
				},
				{
					"name": "Lindler, Barry, P",
					"radio id": "7975",
					"role": "Captain",
					"address": "1400 Old Tamah Road, Irmo, SC 29063",
					"phone": "(803) 476-3300",
					"email": "blindler@lexrich5.org"
				}
			],
			"totalitems": 3
		}
	};
	var totalItems = pageData.table.totalitems;
	content.className = pageName;
	var table = document.createElement('table');

	// Makes table body
	var dummyTableHead = document.createElement('tr');
	for (var i = 0; i < pageData.table.columns.length; i++) {
		var td = document.createElement('td');
		td.innerHTML = pageData.table.columns[i].name;
		dummyTableHead.appendChild(td);
	}
	table.appendChild(dummyTableHead);
	for (var i = 0; i < pageData.table.data.length; i++) {
		var tr = document.createElement('tr');
		for (var j = 0; j < pageData.table.columns.length; j++) {
			var td = document.createElement('td');
			td.innerHTML = pageData.table.data[i][pageData.table.columns[j].name.toLowerCase()];
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}

	// Makes table head
	var colorColumns = [];
	var sorting = [];
	var thead = document.createElement('div');
	toggleClass(thead, "table-header", true);
	for (var i = 0; i < pageData.table.columns.length; i++) {
		var div = document.createElement('div');
		var column = pageData.table.columns[i];
		if (existsAndHas(column.attributes, "colorcolumn")) {
			colorColumns.push(i);
		}
		if (existsAndHas(column.attributes, "unsortable")) {
			sorting[i] = -1;
			toggleClass(div, "unsortable", true);
		} else if (existsAndHas(column.attributes, "sortingby")){
			sorting[i] = 1;
		} else {
			sorting[i] = 0;
		}
		div.innerHTML = pageData.table.columns[i].name;
		thead.appendChild(div);
	}
	if (sorting.indexOf(1) != -1) {
		toggleClass(thead.children[sorting.indexOf(1)], "sorting-by", true);
	} else if (sorting.indexOf(0) != -1){
		toggleClass(thead.children[sorting.indexOf(0)], "sorting-by", true);
	}

	// Sets color data
	for (var i = 1; i < table.children.length; i++) {
		for (var j = 0; j < colorColumns.length; j++) {
			var colordata = table.children[i].children[colorColumns[j]];
			colordata.innerHTML = "<span>" + colordata.innerHTML + "</span>";
			var span = colordata.children[0];
			toggleClass(span, "colordata", true);
			toggleClass(span, thead.children[colorColumns[j]].innerHTML.toLowerCase(), true);
			toggleClass(span, span.innerHTML.toLowerCase(), true);
		}
	}

	// Makes checkboxes
	for (var i = 0; i < pageData.actions.length; i++) {
		if (existsAndHas(pageData.actions[i].attributes, "selection")) {
			var checkbox = document.createElement('input');
			checkbox.type = "checkbox";
			var td = document.createElement('td');
			td.appendChild(checkbox);
			var trows = table.getElementsByTagName('tr');
			for (var j = 0; j < trows.length; j++) {
				trows[j].insertBefore(td.cloneNode(true), trows[j].firstChild);
			}
			var div = document.createElement('div');
			div.appendChild(checkbox.cloneNode());
			toggleClass(div, "unsortable", true);
			thead.insertBefore(div, thead.firstChild);
			break;
		}
	}

	// Makes page number selector
	// var pageNumberContainer = document.createElement('div');
	// pageNumberContainer.id = "page-number-container"
	// var currentPageNumber = document.createElement('input');
	// currentPageNumber.value = pageNumber;
	// var previousButton = document.createElement('span');
	// var nextButton = document.createElement('span');
	// pageNumberContainer.appendChild(previousButton);
	// pageNumberContainer.appendChild(currentPageNumber);
	// var numPages = Math.ceil(totalItems / resultsPerPage);
	// pageNumberContainer.appendChild(document.createTextNode("/ " + numPages));
	// pageNumberContainer.appendChild(nextButton);

	// Append elements
	content.innerHTML = "";
	content.appendChild(thead);
	var tableContainer = document.createElement('div');
	toggleClass(tableContainer, "table-container", true);
	tableContainer.appendChild(table);
	content.appendChild(tableContainer);
	// content.appendChild(pageNumberContainer);

	// Makes action buttons
	for (var i = 0; i < pageData.actions.length; i++) {
		var button = document.createElement('button');
		button.innerHTML = pageData.actions[i].name;
		if (existsAndHas(pageData.actions[i].attributes, "selection")) {
			toggleClass(button, "selection", true);
			button.disabled = true;
			button.title = "Please select at least one entry";
		}
		if (existsAndHas(pageData.actions[i].attributes, "disabled")) {
			toggleClass(button, "disabled", true);
			button.disabled = true;
			button.title = "This action is currently unavailable";
		}
		actionButtons.appendChild(button);
	}

	setUpAfter();
	resizeTable();
}

function resizeTable() {
	for (var i = 0; i < tableHeadData.length; i++) {
		var width = table.children[1].children[i].clientWidth;
		tableHeadData[i].style.width = width + "px";
	}
	tableHead.style.width = table.clientWidth + "px";
}

function scrollTableHead() {
	tableHead.style.left = "-" + tableContainer.scrollLeft + "px";
}

function sortTableBy() {
	if (!existsAndHas(this.className, "sorting-by")) {
		for (var i = 0; i < tableHeadData.length; i++) {
			if (tableHeadData[i].className == "sorting-by") {
				toggleClass(tableHeadData[i], "sorting-by", false)
				break;
			}
		}
		toggleClass(this, "sorting-by", true);
		// If short, do local sorting, else loadPage()
	}
}

function showLoadingOverlay() {
	var contentLoadingOverlay = document.createElement('div');
	contentLoadingOverlay.id = "content-loading-overlay";
	content.appendChild(contentLoadingOverlay);
}

function hideLoadingOverlay() {
	var contentLoadingOverlay = document.getElementById('content-loading-overlay');
	if (contentLoadingOverlay) {
		content.removeChild(contentLoadingOverlay);
	}
}

function toggleClass(element, className, on) {
	var index = element.className.indexOf(className);
	if (element.className == "" && on != false) {
		element.className = className;
	} else if (element.className == className && on != true) {
		element.removeAttribute("class");
	} else if (index != -1 && on != true) {
		var newClassName = element.className.substring(0, index) + element.className.substring(index + className.length);
		element.className = newClassName.replace(/\s+/g, " ").trim();
	} else if (on != false) {
		element.className += " " + className;
	}
}

function existsAndHas (array, element) {
	if (array) {
		return array.indexOf(element) != -1;
	}
	return false;
}

function search() {
	return false;
}

function logOut() {
	// Log out
}
