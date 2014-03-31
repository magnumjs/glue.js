//http://jsbin.com/sefuviku/1/edit

// Model
function note(message){
  this.message=message;
}
// Factory
function factory(Cls) {
    return new (Function.prototype.bind.apply(Cls, arguments));
}

// Model data
var notes=[{message:'milk'},{message:'forks'}];

// add data to Model
function DataModel(model, data){
  var models=[];
$.each(data,function(key, val){
  var vals = $.map(val,function(v){
 return v;
});
  vals.unshift(model);
  models.push(factory.apply(this,vals));
});
  return models;
}
var models = DataModel(note, notes);
console.log(models[1] instanceof note);
