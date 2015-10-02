// The callback function that will be called when the API data has been loaded through the script element
var userCallback = null;

// The script element that will be added to the DOM to load GitHub API data
var scriptElement = null;

// Wrapper function, removes script element from DOM and calls user callback
// This function will be used for JSONP
function callbackWrapper(data) {
    // Call user callback and set it to null again
    if (userCallback != null) {
        userCallback(data);
        userCallback = null;
    }

    // Remove script element
    if (scriptElement != null) {
        document.body.removeChild(scriptElement);
        scriptElement = null;
    }
}

// Perform an API request
function apiRequest(url, callback) {
    if (scriptElement != null || userCallback != null) {
        return;
    }

    userCallback = callback;

    scriptElement = document.createElement("script");
    scriptElement.src = url;
    document.body.appendChild(scriptElement);
}
