function normalView() {
	var showUser = function() {
		var usernameInput = $("#usernameInput").val();

		if (usernameInput !== "") {
			window.location.hash = "#/" + usernameInput;
			window.location.reload();
		}
	};

	// "Show stats"
	$("#getStats").on("click", function() {
		showUser();
	});
}

function userView(username) {
	$("#userViewTitle").html("GitHub statistics for " + username);

	var reposListCallback = function(data) {
		
	};
}

function repoView(username, repo) {
	$("#repoField").html(repo);
}

function main() {
	// Load correct view
	var query = window.location.hash.substring(2);

	var currentView;

	var parts = query.split("/");
	var username = parts[0];
	var repo = parts[1];

	if (repo) {
		currentView = "repo";

		$("#normalView").hide();
		$("#userView").hide();
	}
	else if (username) {
		currentView = "user";

		$("#normalView").hide();
		$("#repoView").hide();
	}
	else {
		currentView = "normal";

		$("#userView").hide();
		$("#repoView").hide();
	}

	if (currentView === "normal") {
		normalView();
	}
	else if (currentView === "user") {
		userView(username);
	}
	else if (currentView === "repo") {
		repoView(username, repo);
	}
};

$(document).ready(function() {
	main();
});
