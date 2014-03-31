// template parse & inlcude JS & SPECS!!
// http://plnkr.co/edit/YQAIesJYiAjCrvm8aniW?p=preview

// two way ui data binding and real model updates of actual instance & SPECS!!
// http://plnkr.co/edit/f8GzYt6ugUqM0pQabeih?p=preview

var includeJS = (function(self) {

  self.include = function(objectName, contextScope) {
    var to = contextScope || window;
    define(to, objectName);
  }
  
  var define=function (to, objectName){
      str = objectName.split(".");
    for (var i = 0; i < str.length; i++) {
      to = to[str[i]] = to[str[i]] || {};
    }
  };
  window.include = self.include;
  return self.include;

})(includeJS = includeJS || {});
