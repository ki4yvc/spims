var user = "";
var password = "";
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
	notificationMenu = document.getElementById('notification-menu')
	accountMenu = document.getElementById('account-menu');
	currentUser = document.getElementById('current-user');
	logOutButton = document.getElementById('log-out-button');
	activeButtons = document.getElementById('active-buttons');
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
	tableHeadData = tableHead.getElementsByTagName('div');
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
	var selections = activeButtons.querySelectorAll('.selection:not(.disabled)');
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

function loadPage(pageName, searchQuery, sortingBy, pageNumber, resultsPerPage) {
	showLoadingOverlay();
	// Do XHR to load page data, include Customer ID and login cookie
	// The rest assumes that it successfully loaded people
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var pageData = JSON.parse(xhr.responseText);
			content.className = pageName;
			table = document.createElement('table');

			// Makes table body
			var dummyTableHead = document.createElement('tr');
			for (var i = 0; i < pageData.info.columns.length; i++) {
				var td = document.createElement('td');
				if (existsAndHas(pageData.info.columns[i].attributes, "unsortable")) {
					toggleClass(td, "unsortable", true);
				}
				td.innerHTML = pageData.info.columns[i].name;
				dummyTableHead.appendChild(td);
			}
			table.appendChild(dummyTableHead);
			for (var i = 0; i < pageData.data.table.length; i++) {
				var tr = document.createElement('tr');
				for (var j = 0; j < pageData.info.columns.length; j++) {
					var td = document.createElement('td');
					td.innerHTML = pageData.data.table[i][pageData.info.columns[j].name.toLowerCase()];
					tr.appendChild(td);
				}
				table.appendChild(tr);
			}

			if (typeof tableContainer == undefined) {
				content.removeChild(tableContainer);
			}

			if (pageInfo) {
				// Makes table head
				colorColumns = [];
				var sorting = [];
				tableHead = document.createElement('div');
				toggleClass(tableHead, "table-header", true);
				for (var i = 0; i < pageData.info.columns.length; i++) {
					var div = document.createElement('div');
					var column = pageData.info.columns[i];
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
					div.innerHTML = pageData.info.columns[i].name;
					tableHead.appendChild(div);
				}
				if (sorting.indexOf(1) != -1) {
					toggleClass(tableHead.children[sorting.indexOf(1)], "sorting-by", true);
				} else if (sorting.indexOf(0) != -1){
					toggleClass(tableHead.children[sorting.indexOf(0)], "sorting-by", true);
				}
				content.appendChild(tableHead);

				tableContainer = document.createElement('div');
				tableContainer.appendChild(table);
				toggleClass(tableContainer, "table-container", true);
				content.appendChild(tableContainer);
			}

			// Sets color data
			for (var i = 1; i < table.children.length; i++) {
				for (var j = 0; j < colorColumns.length; j++) {
					var colordata = table.children[i].children[colorColumns[j]];
					colordata.innerHTML = "<span>" + colordata.innerHTML + "</span>";
					var span = colordata.children[0];
					toggleClass(span, "colordata", true);
					toggleClass(span, titleToDash(pageData.info.columns[colorColumns[j]].name), true);
					toggleClass(span, span.innerHTML.toLowerCase(), true);
				}
			}

			// Makes checkboxes
			for (var i = 0; i < pageData.info.buttons.actives.length; i++) {
				if (existsAndHas(pageData.info.buttons.actives[i].attributes, "selection")) {
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
					if (pageInfo) {
						var div = document.createElement('div');
						toggleClass(div, "checkcol", true);
						div.appendChild(checkbox.cloneNode());
						toggleClass(div, "unsortable", true);
						tableHead.insertBefore(div, tableHead.firstChild);
					}
					break;
				}
			}

			// Makes page number selector
			// var totalItems = pageData.data.totalitems;
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

			if (pageInfo) {
				// Makes active buttons
				activeButtons.innerHTML = "";
				for (var i = 0; i < pageData.info.buttons.actives.length; i++) {
					var button = document.createElement('button');
					button.innerHTML = pageData.info.buttons.actives[i].name;
					if (existsAndHas(pageData.info.buttons.actives[i].attributes, "selection")) {
						toggleClass(button, "selection", true);
						button.disabled = true;
						button.title = "Please select at least one entry";
					}
					if (existsAndHas(pageData.info.buttons.actives[i].attributes, "disabled")) {
						toggleClass(button, "disabled", true);
						button.disabled = true;
						button.title = "This action is currently unavailable";
					}
					activeButtons.appendChild(button);
				}
			}
			hideLoadingOverlay();
			setUpAfter();
			resizeTable();
		}
	}
	var pageInfo = content.className == pageName ? false : true
	var params = "user=" + user + "&password=" + password + "&page=" + pageName +
		"&pageinfo=" + pageInfo + "&search=" + searchQuery +
		"&sorting=" + sortingBy + "&pagenum=" + pageNumber +
		"&rpp=" + resultsPerPage + "&nocache=" + new Date().getTime();
	xhr.open("GET", "page.json?" + params, true);
	xhr.send();
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

function titleToDash(title) {
	var dashed = title.toLowerCase().replace(/\s/, "-");
	return dashed;
}

function search() {
	return false;
}

function logOut() {
	// Log out
}
