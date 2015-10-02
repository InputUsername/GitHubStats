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

	var generalInfoCallback = function(data) {
		if (data.data) {
			var info = data.data;

			$("#userView_image").attr("src", info.avatar_url);

			var title = "GitHub statistics for "
				+ "<a href=\"" + info.html_url + "\">"
				+ username
				+ "</a>";
			$("#userView_title").html(title);

			var basicInfo = "Name: " + info.name + " | "
				+ "Location: " + info.location + " | "
				+ "User ID: " + info.id;
			$("#userView_basicInfo").html(basicInfo);
		}
	};

	apiRequest("https://api.github.com/users/" + username, generalInfoCallback);

	/*
	var reposListCallback = function(data) {
		if (data.data) {
			var repos = data.data;

			// No jQuery because lazy + 1337 h4xx
			var $reposList = document.getElementById("userView_repos");

			var li;
			repos.forEach(function(repo) {
				li = document.createElement("li");
				li.innerHTML = repo.name;
				$reposList.appendChild(li);
			});
		}
	};
	*/
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
