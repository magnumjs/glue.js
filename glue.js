//////////////////////////////////
//GlueJS
//////////////////////////////////

/*!
 * MagnumJS - Core Control Factory v0.11.1
 * https://github.com/magnumjs
 *
 * Includes Staples.js & Glue.JS
 * https://github.com/magnumjs/mag.js
 *
 * Copyright 2013 Michael GLazer 
 * Released under the MIT license
 * https://github.com/magnumjs/mag.js/blob/master/LICENSE
 *
 * Date: 2013-08-10T13:48Z
 */
 
 'use strict';
mag.service = function (serviceNamesArray, callback, errorHandler) {

    var cachedScriptPromises = {};
    _cachedGet = function (name) {
        if (!cachedScriptPromises[name]) {
            cachedScriptPromises[name] = $.Deferred(function (defer) {
                window[name]().then(defer.resolve, defer.reject);
            }).promise();
        }
        return cachedScriptPromises[name];
    };


    var newList = [];
    // if cache is configured
    for (var i = 0; i < serviceNamesArray.length; i++) {
        newList[i] = _cachedGet(serviceNamesArray[i]);
    }
    $.when.apply($, newList)
      .done(function () {
                callback.apply(this, arguments);
    })
    .fail(function (a) {
        errorHandler.apply(this, arguments);
    });


};
