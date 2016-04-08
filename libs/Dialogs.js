/*
*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*
*/

'use strict';

var React = require('react-native');
var {
    NativeModules,
    Platform,
} = React;

var RCTDialogs= NativeModules.Dialogs;

/**
* Provides access to notifications on the device.
*/
var Dialogs = {

    /**
    * Open a native alert dialog, with a customizable title and button text.
    *
    * @param {String} message              Message to print in the body of the alert
    * @param {Function} completeCallback   The callback that is called when user clicks on a button.
    * @param {String} title                Title of the alert dialog (default: Alert)
    * @param {String} buttonLabel          Label of the close button (default: OK)
    */
    alert: function(message, completeCallback, title, buttonLabel) {
        var _title = (title || "Alert");
        var _buttonLabel = (buttonLabel || "OK");
        completeCallback = completeCallback || function() {};
        RCTDialogs.alert([message, _title, _buttonLabel], completeCallback);
    },

    /**
    * Open a native confirm dialog, with a customizable title and button text.
    * The result that the user selects is returned to the result callback.
    *
    * @param {String} message              Message to print in the body of the alert
    * @param {Function} resultCallback     The callback that is called when user clicks on a button.
    * @param {String} title                Title of the alert dialog (default: Confirm)
    * @param {Array} buttonLabels          Array of the labels of the buttons (default: ['OK', 'Cancel'])
    */
    confirm: function(message, resultCallback, title, buttonLabels) {
        var _title = (title || "Confirm");
        var _buttonLabels = (buttonLabels || ["OK", "Cancel"]);
        resultCallback = resultCallback || function() {};

        // Strings are deprecated!
        if (typeof _buttonLabels === 'string') {
            console.log("Notification.confirm(string, function, string, string) is deprecated.  Use Notification.confirm(string, function, string, array).");
        }

        if (typeof _buttonLabels === 'string') {
            _buttonLabels = _buttonLabels.split(","); // not crazy about changing the var type here
        }

        RCTDialogs.confirm([message, _title, _buttonLabels], resultCallback);
    },

    /**
    * Open a native prompt dialog, with a customizable title and button text.
    * The following results are returned to the result callback:
    *  buttonIndex     Index number of the button selected.
    *  input1          The text entered in the prompt dialog box.
    *
    * @param {String} message              Dialog message to display (default: "Prompt message")
    * @param {Function} resultCallback     The callback that is called when user clicks on a button.
    * @param {String} title                Title of the dialog (default: "Prompt")
    * @param {Array} buttonLabels          Array of strings for the button labels (default: ["OK","Cancel"])
    * @param {String} defaultText          Textbox input value (default: empty string)
    */
    prompt: function(message, resultCallback, title, buttonLabels, defaultText) {
        var _message = (message || "Prompt message");
        var _title = (title || "Prompt");
        var _buttonLabels = (buttonLabels || ["OK","Cancel"]);
        var _defaultText = (defaultText || "");
        resultCallback = resultCallback || function() {};
        RCTDialogs.prompt([_message, _title, _buttonLabels, _defaultText], resultCallback);
    },

    /**
    * Causes the device to beep.
    * On Android, the default notification ringtone is played "count" times.
    *
    * @param {Integer} count       The number of beeps.
    */
    beep: function(count) {
        var defaultedCount = count || 1;
        RCTDialogs._beep([defaultedCount]);
    }
};

if (Platform.OS === 'android') {
    Dialogs = Object.assign(Dialogs, {
        activityStart : function(title, message) {
            // If title and message not specified then mimic Android behavior of
            // using default strings.
            if (typeof title === "undefined" && typeof message == "undefined") {
                title = "Busy";
                message = 'Please wait...';
            }
            RCTDialogs.activityStart([ title, message ]);
        },

        /**
        * Close an activity dialog
        */
        activityStop : function() {
            RCTDialogs.activityStop([]);
        },

        /**
        * Display a progress dialog with progress bar that goes from 0 to 100.
        *
        * @param {String}
        *            title Title of the progress dialog.
        * @param {String}
        *            message Message to display in the dialog.
        */
        progressStart : function(title, message) {
            RCTDialogs.progressStart([ title, message ]);
        },

        /**
        * Close the progress dialog.
        */
        progressStop : function() {
            RCTDialogs.progressStop([]);
        },

        /**
        * Set the progress dialog value.
        *
        * @param {Number}
        *            value 0-100
        */
        progressValue : function(value) {
            RCTDialogs.progressValue([value]);
        }
    });
}

module.exports = Dialogs;
