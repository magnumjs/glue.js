// http://jsbin.com/golicolu/2/edit

function model(){
  this.searchUpdated = $.Callbacks( 'stopOnFalse memory unique' );
}
model.prototype.find=function(item){
   this.searchUpdated.fire({ item : item });
};
function view(model, elements){
  this.model=model;
  this.elements=elements;
    var _view=this;
  
  this.addButtonClicked = $.Callbacks();
  
  this.rebuildList=function(searchCriteriaObject){
    console.log(searchCriteriaObject);
    this.elements.addButton.after("Searched for: "+searchCriteriaObject.item)
  };
  this.model.searchUpdated.add(function (searchCriteriaObject) {
        _view.rebuildList(searchCriteriaObject);
    });
      this.elements.addButton.click(function () {
        _view.addButtonClicked.fire();
    });
}
function controller(model, view){
  this.model=model;
   view.addButtonClicked.add(function () {
        this.searchItem();
    }.bind(this));
}

controller.prototype = {
    searchItem : function () {
            this.model.find('things');
        }
    };

var model = new model();
var view = new view(model, {addButton : $('button')});
var control = new controller(model, view);
