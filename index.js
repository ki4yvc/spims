var user = [
	"",
	""
];
var pageInfo = {};
var pages = [];
var actionFuctions = {
	"people": {
		"Add Person": function() {
			var fields = [];
			var properties = pageInfo[1];
			for (var i = 0; i < properties.length; i++) {
				fields.push(properties[i][0]);
			}
			var buttons = [
				"Add"
			];
			showForm("Add Person", fields, buttons);
		},
		"Edit": function() {

		},
		"Alert": function() {

		}
	},
	"inventory": {

	}
};

window.onload = function() {
	setUpBefore();
	getPages();
}

function getPages() {
	var params = [
		["user", user[0]],
		["password", user[1]]
	];
	var req = xhr("api/getpages", "GET", params);
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			pages = JSON.parse(req.responseText);
			loadPage(pages[0], true);
		}
	}
}

function setUpBefore() {
	notificationMenu = document.getElementById('notification-menu')
	accountMenu = document.getElementById('account-menu');
	currentUser = document.getElementById('current-user');
	logOutButton = document.getElementById('log-out-button');
	actionButtons = document.getElementById('action-buttons');
	content = document.getElementById('content');

	notificationMenu.addEventListener('click', function() {
		toggleClass(notificationMenu, 'selected');
	});
	currentUser.addEventListener('click', function() {
		toggleClass(accountMenu, 'selected');
	});
	logOutButton.addEventListener('click', logOut);
}

function setUpAfter() {
	tableHeadData = tableHeader.getElementsByTagName('div');
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
	if (tableHeader.contains(this)) {
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

function loadPage(pageName, getPageInfo, searchQuery, sortingBy, pageNumber, resultsPerPage) {
	var overlay = showOverlay(content, false);
	var params = [
		["user", user[0]],
		["password", user[1]],
		["page", pageName],
		["info", getPageInfo],
		["search", searchQuery],
		["sorting", sortingBy],
		["pagenum", pageNumber],
		["rpp", resultsPerPage]
	];
	var req = xhr("api/getpage", "GET", params)
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			var pageJSON = JSON.parse(req.responseText);
			content.className = pageName;
			if (getPageInfo) {
				pageInfo = pageJSON.info;
			}
			var info = pageInfo;
			var actions = info[0];
			var properties = info[1];
			var data = pageJSON.data;
			var items = data[0];
			var itemsInDB = data[1];

			table = document.createElement('table');

			if (getPageInfo) {
				// Makes table head
				var sorting = [];
				tableHeader = document.createElement('div');
				toggleClass(tableHeader, "table-header", true);
				var dummyTableHeader = document.createElement('tr');
				toggleClass(dummyTableHeader, "dummy-table-header", true);
				for (var i = 0; i < properties.length; i++) {
					var property = properties[i];
					if (property[1]) {
						var div = document.createElement('div');
						var td = document.createElement('td');
						var name = property[0];
						var attributes = property[2];
						if (existsAndHas(attributes, "unsortable")) {
							sorting[i] = -1;
							toggleClass(div, "unsortable", true);
							toggleClass(td, "unsortable", true);
						} else if (existsAndHas(attributes, "sortingby")){
							sorting[i] = 1;
						} else {
							sorting[i] = 0;
						}
						div.innerHTML = name;
						td.innerHTML = name;
						tableHeader.appendChild(div);
						dummyTableHeader.appendChild(td);
					}
				}
				if (sorting.indexOf(1) != -1) {
					toggleClass(tableHeader.children[sorting.indexOf(1)], "sorting-by", true);
				} else if (sorting.indexOf(0) != -1){
					toggleClass(tableHeader.children[sorting.indexOf(0)], "sorting-by", true);
				}
				content.appendChild(tableHeader);
				table.appendChild(dummyTableHeader);
				if (typeof tableContainer == undefined) {
					content.removeChild(tableContainer);
				}
				tableContainer = document.createElement('div');
				tableContainer.appendChild(table);
				toggleClass(tableContainer, "table-container", true);
				content.appendChild(tableContainer);

				// Makes action buttons
				actionButtons.innerHTML = "";
				for (var i = 0; i < actions.length; i++) {
					var name = actions[i][0];
					var attributes = actions[i][1];
					var button = document.createElement('button');
					button.innerHTML = name;
					if (existsAndHas(attributes, "selection")) {
						toggleClass(button, "selection", true);
						button.disabled = true;
						button.title = "Please select at least one entry";
					}
					if (existsAndHas(attributes, "disabled")) {
						toggleClass(button, "disabled", true);
						button.disabled = true;
						button.title = "This action is currently unavailable";
					}
					button.addEventListener('click', actionFuctions[pageName][name]);
					actionButtons.appendChild(button);
				}
			}

			// Makes table body
			for (var i = 0; i < items.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < properties.length; j++) {
					if (properties[i][1]) {
						var td = document.createElement('td');
						td.innerHTML = items[i][j + 1];
						tr.appendChild(td);
					}
				}
				table.appendChild(tr);
			}

			// Makes checkboxes
			for (var i = 0; i < actions.length; i++) {
				var attributes = actions[i][1];
				if (existsAndHas(attributes, "selection")) {
					var checkbox = document.createElement('input');
					checkbox.type = "checkbox";
					var td = document.createElement('td');
					toggleClass(td, "checkcol", true);
					td.appendChild(checkbox);
					var trows = table.getElementsByTagName('tr');
					for (var j = 0; j < trows.length; j++) {
						var clone = td.cloneNode(true);
						if (j == 0) {
							toggleClass(clone, "unsortable", true);
						}
						trows[j].insertBefore(clone, trows[j].firstChild);
					}
					if (getPageInfo) {
						var div = document.createElement('div');
						toggleClass(div, "checkcol", true);
						div.appendChild(checkbox.cloneNode());
						toggleClass(div, "unsortable", true);
						tableHeader.insertBefore(div, tableHeader.firstChild);
					}
					break;
				}
			}

			// Makes page number selector
			// var totalItems = pageJSON.data.totalitems;
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
			// content.appendChild(pageNumberContainer);

			hideOverlay(overlay);
			setUpAfter();
			resizeTable();
		}
	}
}

function resizeTable() {
	for (var i = 0; i < tableHeadData.length; i++) {
		var width = table.children[1].children[i].clientWidth;
		tableHeadData[i].style.width = width + "px";
	}
	tableHeader.style.width = table.clientWidth + "px";
}

function scrollTableHead() {
	tableHeader.style.left = "-" + tableContainer.scrollLeft + "px";
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

function hideOverlay(overlay) {
	overlay.parentNode.removeChild(overlay);
}

function toggleClass(element, className, assert) {
	var index = element.className.indexOf(className);
	if (element.className == "" && assert != false) {
		element.className = className;
	} else if (element.className == className && assert != true) {
		element.removeAttribute("class");
	} else if (index != -1 && assert != true) {
		var newClassName = element.className.substring(0, index) + element.className.substring(index + className.length);
		element.className = newClassName.replace(/\s+/g, " ").trim();
	} else if (assert != false) {
		element.className += " " + className;
	}
}

function existsAndHas (array, element) {
	if (array) {
		return array.indexOf(element) != -1;
	}
	return false;
}

function titleToDash(title) {
	var dashed = title.toLowerCase().replace(/\s/, "-");
	return dashed;
}

function generateQueryString(params) {
	var qstr = "?";
	for (var i = 0; i < params.length; i++) {
		if (i > 0) qstr += "&";
		qstr += params[i][0] + "=" + params[i][1];
	}
	return qstr;
}

function search() {
	return false;
}

function logOut() {
	// Log out
}

function xhr(rsrc, method, params, payload) {
	if (Array.isArray(params)) {
		params = generateQueryString(params);
	}
	var req = new XMLHttpRequest();
	req.open(method, rsrc + params, true);
	req.send(payload);
	return req;
}

function showOverlay(parent, dark) {
	var overlay = document.createElement('div');
	toggleClass(overlay, "overlay", true);
	if (dark) {
		toggleClass(overlay, "dark", true);
	}
	parent.appendChild(overlay);
	return overlay;
}

function showForm(title, fields, buttons) {
	var overlay = showOverlay(document.body, true);
	var formTemplate = document.getElementById('form-template');
	var form = document.importNode(formTemplate.content, true);
	var formTitle = form.querySelector('.form-title');
	formTitle.innerHTML = title;
	var formFields = form.querySelector('.form-fields');
	for (var i = 0; i < fields.length; i++) {
		var tr = document.createElement('tr');
		var fieldNameTD = document.createElement('td');
		var fieldTD = document.createElement('td');
		var fieldLabel = document.createElement('label');
		var field = document.createElement('input');
		var id = "formfield-" + fields[i].toLowerCase();
		fieldLabel.setAttribute('for', id);
		fieldLabel.innerHTML = fields[i];
		field.id = id;
		fieldNameTD.appendChild(fieldLabel);
		fieldTD.appendChild(field);
		tr.appendChild(fieldNameTD);
		tr.appendChild(fieldTD);
		formFields.appendChild(tr);
	}
	var formButtons = form.querySelector('.form-buttons');
	for (var i = 0; i < buttons.length; i++) {
		var button = document.createElement('button');
		button.innerHTML = buttons[i];
		formButtons.appendChild(button);
	}
	overlay.appendChild(form);
}
