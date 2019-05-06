"use strict";
function initPushwoosh() {
    var pushNotification = cordova.require("com.pushwoosh.plugins.pushwoosh.PushNotification");
 
 	if ( device.platform == 'android' || device.platform == 'Android' ) {	// For Android device
	    //set push notifications handler
	    document.addEventListener('push-notification', function(event) {
	        var title = event.notification.title;
	        var userData = event.notification.userdata;
	                                 
	        if(typeof(userData) != "undefined") {
	            console.warn('user data: ' + JSON.stringify(userData));
	        }
	        navigator.notification.alert(title, null, 'BSS Industrial');
	    });
	 
	    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_NUMBER", pw_appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
	    pushNotification.onDeviceReady({ projectid: "163565344793", pw_appid : "20C30-E9FF1" });
	 
	    //register for pushes
	    pushNotification.registerDevice(
	        function(status) {
	            var pushToken = status;
	            console.warn('push token: ' + pushToken);
	        },
	        function(status) {
	            console.warn(JSON.stringify(['failed to register ', status]));
	        }
	    );
	} else {									// For iOS device

	    //set push notification callback before we initialize the plugin
	    document.addEventListener('push-notification', function(event) {
            //get the notification payload
            var notification = event.notification;

            //display alert to the user for example
            navigator.notification.alert(notification.aps.alert, null, 'BSS Industrial');
           
            //clear the app badge
            pushNotification.setApplicationIconBadgeNumber(0);
        });
	 
	    //initialize the plugin
	    pushNotification.onDeviceReady({pw_appid:"20C30-E9FF1"});
	     
	    //register for pushes
	    pushNotification.registerDevice(
	        function(status) {
	            var deviceToken = status['deviceToken'];
	            console.warn('registerDevice: ' + deviceToken);
	        },
	        function(status) {
	            console.warn('failed to register : ' + JSON.stringify(status));
	            navigator.notification.alert(JSON.stringify(['failed to register ', status]), null, 'BSS Industrial');
	        }
	    );
	     
	    //reset badges on app start
	    pushNotification.setApplicationIconBadgeNumber(0);
	}

}
