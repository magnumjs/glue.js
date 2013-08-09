var TodosDetails = function() {
  var TodosDetails = function(data) {
		$.extend(this, data);
	};

	TodosDetails.get = function(id) {
		return $.get('/todos-details').then(
				function(response) {
					return new TodosDetails(response);
				});
	};

	return TodosDetails;
};
