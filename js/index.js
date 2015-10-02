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
		// "Show stats"
		$("#getStats").click(function() {
			var usernameInput = $("#usernameInput").val();

			if (usernameInput !== "") {
				window.location.hash = "#/" + usernameInput;
				window.location.reload();
			}
		});
	}
	else if (currentView === "user") {
		$("#userViewTitle").html("GitHub statistics for " + username);
	}
	else if (currentView === "repo") {
		$("#repoField").html(repo);
	}

};

$(document).ready(function() {
	main();
});
