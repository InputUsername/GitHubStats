function normalView() {
	var showUser = function() {
		var usernameInput = $("#usernameInput").val();

		if (usernameInput !== "") {
			window.location.hash = "#/" + usernameInput;
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

			var infos = [
				(info.name !== null ? "Name: " + info.name : null),
				(info.location !== null ? "Location: " + info.location : null),
				(info.id !== null ? "User ID: " + info.id : null)
			];

			var $basicInfo = $("#userView_basicInfo");

			var p;
			infos.forEach(function(info) {
				if (info != null) {
					p = document.createElement("p");
					p.innerHTML = info;
					$basicInfo.append(p);
				}
			});
		}
	};

	apiRequest("https://api.github.com/users/" + username, "generalInfo", generalInfoCallback);

	var reposListCallback = function(data) {
		if (data.data) {
			var repos = data.data;

			// No jQuery because lazy + 1337 h4xx
			var $reposList = document.getElementById("userView_repos");

			var li, a;
			repos.forEach(function(repo) {
				li = document.createElement("li");
				a = document.createElement("a");
				a.href = "#/" + username + "/" + repo.name;
				a.innerHTML = repo.name;
				li.append(a);
				$reposList.append(li);
			});
		}
	};

	apiRequest("https://api.github.com/users/" + username + "/repos", "reposList", reposListCallback);
}

function repoView(username, repo) {
	$("#repoField").html(repo);
}

function main() {
	// Load correct view
	var currentView;

	var query = "";
	var hash = window.location.hash;

	if (hash.startsWith("#/")) {
		query = window.location.hash.substring(2);
	}
	else if (window.location.hash != "") {
		window.location.hash = "";
	}

	var parts = query.split("/");
	var username = parts[0];
	var repo = parts[1];

	$("#normalView, #userView, #repoView").hide();

	if (repo) {
		currentView = "repo";

		$("#repoView").show();
	}
	else if (username) {
		currentView = "user";

		$("#userView").show();
	}
	else {
		currentView = "normal";

		$("#normalView").show();
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

window.onhashchange = main;
