'use strict';

//////////////////////////////////
//GlueJS
//////////////////////////////////

/**
 * @ngdoc function
 * @name mag.glue
 * @function
 *
 * @description
 * Wraps a data model into a parameter
 *
 */
 
 
 var $service = (function($) {
  
	// shortcuts to available services
	
	// load a preconfigured namespace for a service model -> to combine a service response to a model object

	var cachedScriptPromises = {};
	_cachedGet = function( name ) {
		if ( !cachedScriptPromises[ name ] ) {
			cachedScriptPromises[ name ] = $.Deferred(function( defer ) {
				window[name]().get().then( defer.resolve, defer.reject );
			}).promise();
		}
		return cachedScriptPromises[ name ];
	};
	
	var	service=function(serviceNamesArray,callback,errorHandler){
		var newList=[];
		// if cache is configured
		for(var i=0;i<serviceNamesArray.length;i++){
			newList[i]=	_cachedGet (serviceNamesArray[i]);
		}
		$.when.apply($, newList)
		.done(function(){
				callback.apply(this,arguments);
			}
		})
		.fail(function(a){
			$controller.log('SITE FAILURE');
		});
	};
	
	
	return {
		serve:service
	};
	
}(jQuery));
