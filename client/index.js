var userID = "";
var userPassword = "";
var userName = "";
var userPosition = "";
var pages = [];

var accountMenu;
var currentUser;
var logOutButton;
var content;

window.onload = function() {
	setElements();
	logIn("00378522", "aGreene5764"); // Would use whatever the user input
}

function setElements() {
	accountMenu = document.getElementById('account-menu');
	currentUser = document.getElementById('current-user');
	logOutButton = document.getElementById('log-out-button');
	content = document.getElementById('content');
}

function logIn(userID, userPassword) {
	// Do XHR here to see if userID and userPassword match
	// The rest of this concept assumes that it does
	this.userID = userID;
	this.userPassword = userPassword;
	userName = "Adam Greene"; // or whatever the XHR returns
	userPosition = "Admin"; // or whatever the XHR returns
	// It also returns the HTML for the available pages
	pages = [["people", "<div id='people-page' class='page'></div>"],
			["inventory", "<div id='inventory-page' class='page'></div>"]];
	setUp();
}

function logOut() {
	// Log out
}

function setUp() {
	currentUser.className = currentUser.className + " " +
			userPosition.toLowerCase();
	currentUser.innerHTML = userName;
	currentUser.title = "User is " + userPosition;

	addEventListeners();
}

function addEventListeners() {
	currentUser.addEventListener('click', function() {
		toggleClass(accountMenu, 'selected');
	});
	logOutButton.addEventListener('click', logOut);
}

function toggleClass(element, className) {
	var index = element.className.indexOf(className);
	if (index > -1) {
		var newClassName = element.className.substring(0, index) +
				element.className.substring(index + className.length);
		element.className = newClassName.replace(/\s+/g, " ").trim();
	} else {
		element.className += " " + className;
	}
}

function search() {
	return false;
}
