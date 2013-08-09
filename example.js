var TodosDetails=function(){
  TodosDetails = function(data) {
		$.extend(this, data);
	};

	TodosDetails.get = function(id) {
		return $.get('http://api.openkeyval.org/some-arbitrary-key').then(
				function(response) {
					return new TodosDetails(response);
				});
	};

	return TodosDetails;
};

var converter=function(d){
  return jQuery.parseJSON(d);
};
$.ajaxSetup({crossDomain:true,dataType:'jsonp',jsonpCallback: 'converter'});

mag.service(['TodosDetails'],function(d){
 $('div').text(d.items[0].sample);
});
  
