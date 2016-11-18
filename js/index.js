function getUserLink(username) {
	return "#/" + username;
}

function getRepoLink(username, repo) {
	return getUserLink(username) + "/" + repo;
}

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
	var generalInfoCallback = function(data) {
		if (data.data) {
			var info = data.data;

			$("#userView_image").attr("src", info.avatar_url);

			var a = $("<a></a>")
				.attr("href", info.html_url)
				.html(username);

			$("#userView_title")
				.html("GitHub statistics for ")
				.append(a);

			var infos = [
				{"title": "Name", "value": info.name},
				{"title": "Location", "value": info.location},
				{"title": "User ID", "value": info.id},
				{"title": "Following", "value": info.following},
				{"title": "Followers", "value": info.followers}
			];

			var $basicInfo = $("#userView_basicInfo");

			var p;
			infos.forEach(function(item) {
				if (item.value !== null) {
					p = $("<p></p>")
						.html(item.title + ": " + item.value);
					$basicInfo.append(p);
				}
			});
		}
	};

	apiRequest("https://api.github.com/users/" + username, "generalInfo", generalInfoCallback);

	var reposListCallback = function(data) {
		if (data.data) {
			var repos = data.data;

			var $reposList = $("#userView_repos");

			var li, a;
			repos.forEach(function(repo) {
				a = $("<a></a>")
					.attr("href", getRepoLink(username, repo.name))
					.html(repo.name);

				li = $("<li></li>")
					.append(a);

				$reposList.append(li);
			});
		}
	};

	apiRequest("https://api.github.com/users/" + username + "/repos", "reposList", reposListCallback);
}

function repoView(username, repo) {

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
