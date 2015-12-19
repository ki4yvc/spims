var userID = "";
var userPassword = "";
var userName = "";
var userPosition = "";
var pages = [];

window.onload = function() {
	logIn("00378522", "aGreene5764"); // Would use whatever the user input
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

function logIn(userID, userPassword) {
	// Do XHR here to see if userID and userPassword match
	// The rest of this concept assumes that it does
	this.userID = userID;
	this.userPassword = userPassword;
	userName = "Adam Greene"; // or whatever the XHR returns
	userPosition = "Admin"; // or whatever the XHR returns
	// It also returns the available pages
	pages = ["people", "inventory", "equipment"];
	loadPage(pages[0]);
	setUp();
}

function logOut() {
	// Log out
}

function setUp() {
	setElements();
	currentUser.className = currentUser.className + " " +
			userPosition.toLowerCase();
	currentUser.innerHTML = userName;
	currentUser.title = "User is " + userPosition;
	addEventListeners();
}

function loadPage(pageName) {
	// Do XHR to load page data
	// The rest assumes that it successfully loaded people
	var peopleData = [{"name": "Greene, Adam, D","id": "00000000","position": "Admin","address": "1600 Pennsylvania Ave NW, Washington, DC 20500","phone": "(202) 456-1111","email": "greene.adam.d@gmail.com"}]
	var peopleTable = document.createElement('table');
	peopleTable.id = "people-table";
	var thead = document.createElement('thead');
	thead.innerHTML = "<td class='sorting-by'>Name</td><td>ID</td><td>Position</td><td>Address</td><td>Phone</td><td>Email</td>";
	peopleTable.appendChild(thead);
	var tbody = document.createElement('tbody');
	for (var i = 0; i < peopleData.length; i++) {
		var row = document.createElement('tr');
		var td = (document.createElement('td'));
		td.innerHTML = peopleData[i].name;
		row.appendChild(td);
		td = (document.createElement('td'));
		td.innerHTML = peopleData[i].id
		row.appendChild(td);
		td = (document.createElement('td'));
		td.innerHTML = "<span>" + peopleData[i].position + "</span>"
		td.children[0].className = "position-text " + peopleData[i].position.toLowerCase();
		row.appendChild(td);
		td = (document.createElement('td'));
		td.innerHTML = peopleData[i].address
		row.appendChild(td);
		td = (document.createElement('td'));
		td.innerHTML = peopleData[i].phone
		row.appendChild(td);
		td = (document.createElement('td'));
		td.innerHTML = peopleData[i].email
		row.appendChild(td);
		tbody.appendChild(row);
	}
	peopleTable.appendChild(tbody);
	content.appendChild(peopleTable);
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

function sortTableBy() {
	if (this.className != "sorting-by") {
		for (var i = 0; i < peopleTableHeaderData.length; i++) {
			if (peopleTableHeaderData[i].className == "sorting-by") {
				peopleTableHeaderData[i].className = "";
				break;
			}
		}
		this.className = "sorting-by";
	}
}

function toggleClass(element, className) {
	var index = element.className.indexOf(className);
	if (index > -1) {
		var newClassName = element.className.substring(0, index) + element.className.substring(index + className.length);
		element.className = newClassName.replace(/\s+/g, " ").trim();
	} else {
		element.className += " " + className;
	}
}

function search() {
	return false;
}
