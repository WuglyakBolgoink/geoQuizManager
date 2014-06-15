var appGQM,
    debug = true,
    uploadURL = encodeURI("http://ae.subsession.net/projects/mobi/upload.php");

/**
 * Log-Manager.
 */
var Log = {
    /**
     * Print JSON-Object in console.
     * @param msg {string} JSON-Object
     */
    printObject: function(msg, obj) {
        if (debug) {
            console.log("DEBUG: " + msg);
            console.log(JSON.stringify(obj, "", 4));
        }
    },
    /**
     * Print text message  in console.
     * @param msg {string}
     */
    print: function(msg) {
        if (debug) {
            console.log("DEBUG: " + msg);
        }
    }
};

function loadTemplate(path) {
    var page = null;

    $.ajax({
        dataType: "text",
        url: "./js/app/templates/" + path,
        async: false,
        success: function success(data) {
            page = data;
        },
        error: function(error) {
            Log.printObject(error);
            page = null;
        }
    });

    return page;
}

function onDeviceReady() {
    Log.print("start app");
    appGQM = new Router();
    Log.print("start BB history");
    Backbone.history.start();
}//onDeviceReady

function checkIfDeviceOnline() {
    var networkState = navigator.network.connection.type;
    return (!(networkState == Connection.NONE || networkState == Connection.UNKNOWN));
}

document.addEventListener('deviceready', onDeviceReady, false);
/**
 * disable left-click-event on android device!
 */
document.addEventListener("backbutton", function() {
    Log.print("click on backButton");
    return false;
}, false);
