var user = [
	"",
	""
];
var page = {};
var pages = [];
var actionFuctions = {
	"universal": {
		"add": function(pageName) {
			var fields = [];
			var properties = page.properties;
			for (var i = 0; i < properties.length; i++) {
				fields.push([properties[i][0]]);
			}
			var buttons = [
				"Add"
			];
			var title = "Add " + actionFuctions.universal.pluralize(1, pageName);
			showForm(title, "", fields, buttons);
		},
		"edit": function(pageName) {
			var fields = [];
			var properties = page.properties;
			var selectedItems = [];
			for (var i = 0; i < page.selectedItems.length; i++) {
				var index = page.selectedItems[i];
				selectedItems.push(page.items[index]);
			}
			for (var i = 0; i < properties.length; i++) {
				var name = properties[i][0];
				var value = selectedItems[0][i + 1];
				var placeholder;
				for (var j = 1; j < selectedItems.length; j++) {
					if (selectedItems[j][i + 1] != value) {
						value = undefined;
						placeholder = "Mixed";
						break;
					}
				}
				fields.push([name, value, placeholder]);
			}
			var numItems = page.selectedItems.length;
			numItems += " " + actionFuctions.universal.pluralize(numItems, pageName);
			var desc = "Editing " + numItems;
			var buttons = [
				"Update",
				"Remove"
			];
			showForm("Edit", desc, fields, buttons);
		},
		"pluralize": function(num, page) {
			var index = -1;
			for (var i = 0; i < pages.length; i++) {
				if (pages[i][0] == page) {
					index = i;
					break;
				}
			}
			if (num == 1) {
				return pages[index][1];
			} else {
				return pages[index][2];
			}
		}
	},
	"people": {
		"Add Person": function() {
			actionFuctions.universal.add("people");
		},
		"Edit": function() {
			actionFuctions.universal.edit("people");
		},
		"Alert": function() {

		}
	},
	"inventory": {
		"Add Item": function() {
			actionFuctions.universal.add("inventory");
		},
		"Edit": function() {
			actionFuctions.universal.edit("inventory");
		}
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
			loadPage(pages[0][0], true);
		}
	}
}

function setUpBefore() {
	notificationMenu = document.getElementById('notification-menu')
	accountMenu = document.getElementById('account-menu');
	currentUser = document.getElementById('current-user');
	logOutButton = document.getElementById('log-out-button');
	searchForm = document.getElementById('toolbar-search-form');
	actionButtons = document.getElementById('action-buttons');
	content = document.getElementById('content');

	notificationMenu.addEventListener('click', function() {
		toggleClass(notificationMenu, 'selected');
	});
	currentUser.addEventListener('click', function() {
		toggleClass(accountMenu, 'selected');
	});
	logOutButton.addEventListener('click', logOut);

	searchForm.onsubmit = search;
}

function setUpAfter() {
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
	page.selectedItems = [];
	for (var i = 1; i < tableCheckboxes.length; i++) {
		checked[i - 1] = tableCheckboxes[i].checked ? true : false;
		if (tableCheckboxes[i].checked) {
			var tr = tableCheckboxes[i].parentNode.parentNode;
			var index = tr.getAttribute('data-initial-index');
			page.selectedItems.push(index);
		}
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
				var info = pageJSON.info;
				page.actions = info[0];
				page.properties = info[1];
				page.name = pageName;
			}
			var actions = page.actions;
			var properties = page.properties;
			var data = pageJSON.data;
			var items = page.items = data[0];
			var itemsInDB = page.itemsinDB = data[1];
			page.selectedItems = [];

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
				tableHeadData = tableHeader.getElementsByTagName('div');
				if (sorting.indexOf(1) != -1) {
					toggleClass(tableHeadData[sorting.indexOf(1)], "sorting-by", true);
				} else if (sorting.indexOf(0) != -1){
					toggleClass(tableHeadData[sorting.indexOf(0)], "sorting-by", true);
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
				tr.setAttribute('data-initial-index', i);
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

function xhr(rsrc, method, params, body) {
	if (Array.isArray(params)) {
		params = generateQueryString(params);
	}
	var req = new XMLHttpRequest();
	req.open(method, rsrc + params, true);
	req.send(body);
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

function hideOverlay(overlay) {
	overlay.parentNode.removeChild(overlay);
}

function showForm(title, desc, fields, buttons) {
	var overlay = showOverlay(document.body, true);
	var formTemplate = document.getElementById('form-template');
	var form = document.importNode(formTemplate.content, true).children[0];
	var formTitle = form.querySelector('.form-title');
	formTitle.innerHTML = title;
	var formDesc = form.querySelector('.form-desc');
	formDesc.innerHTML = desc;
	var formFields = form.querySelector('.form-fields');
	for (var i = 0; i < fields.length; i++) {
		var tr = document.createElement('tr');
		var fieldNameTD = document.createElement('td');
		var fieldTD = document.createElement('td');
		var fieldLabel = document.createElement('label');
		var field = document.createElement('input');
		var id = "formfield-" + fields[i][0].toLowerCase();
		fieldLabel.setAttribute('for', id);
		fieldLabel.innerHTML = fields[i][0];
		field.id = id;
		field.name = fields[i][0].toLowerCase();
		if (fields[i][1] != undefined) {
			field.value = fields[i][1];
		}
		if (fields[i][2] != undefined) {
			field.setAttribute('placeholder', fields[i][2]);
		}
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
		button.addEventListener('click', function() {
			var body = {};
			body.page = page.name;
			body.action = button.innerHTML;
			body.form = {};
			var inputs = form.getElementsByTagName('input');
			for (var i = 0; i < inputs.length; i++) {
				body.form[inputs[i].name] = inputs[i].value;
			}
			var req = xhr("/api/submitform", "POST", "", JSON.stringify(body));
		});
		formButtons.appendChild(button);
	}
	form.onsubmit = function() {
		return false;
	}
	var formCloseButton = form.querySelector(".form-close-button");
	formCloseButton.addEventListener('click', function() {
		hideOverlay(overlay);
	});
	overlay.appendChild(form);
	var top = (window.innerHeight * 0.2) | 0;
	var left = (window.innerWidth * 0.5 - form.clientWidth * 0.5) | 0;
	form.style.top = top + "px";
	form.style.left = left + "px";
}
