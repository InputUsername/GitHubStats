var userCallbacks = {};
var scriptElements = {};

// Perform an API request
function apiRequest(url, id, callback) {
    if (id.match(/[^A-Za-z_]/)) {
        return;
    }

    if (userCallbacks[id] || scriptElements[id]) {
        return;
    }

    if (!url.endsWith("?callback=")) {
        url += "?callback=userCallbacks." + id;
    }

    scriptElements[id] = document.createElement("script");
    scriptElements[id].id = "gh_" + id;
    scriptElements[id].src = url;
    document.body.appendChild(scriptElements[id]);

    userCallbacks[id] = function(data) {
        callback(data);

        if (userCallbacks[id]) {
            delete userCallbacks[id];
        }
        if (scriptElements[id]) {
            var scriptElem = document.getElementById("gh_" + id);
            document.body.removeChild(scriptElem);
        }
    };
}
