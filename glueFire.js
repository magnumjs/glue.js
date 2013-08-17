/**
* @name MAg GlueJS implementation for Firebase
*/


$(function(){
  var Projects={};
  Projects.getAll=function(callback){
    $.get('https://magnumjs-projects.firebaseio.com/projects.json').done(function(d){
      callback(d);
    });
  };
  
  Projects.delete=function(id,callback){
    $.ajax({url:'https://magnumjs-projects.firebaseio.com/projects/'+id+'.json',
            type:'DELETE'}).done(function(d){
  callback(d);
});
  };
  Projects.edit=function(id,name,desc,website,callback){
       var data={name:name,description:desc,website:website};
    $.ajax({url:'https://magnumjs-projects.firebaseio.com/projects/'+id+'.json',
            data:JSON.stringify(data),
            type:'PATCH'}).done(function(d){
  callback(d);
});
  };
  
  Projects.addNew=function(name, desc, website,callback){
    var data={name:name,description:desc,website:website};
$.post('https://magnumjs-projects.firebaseio.com/projects.json',JSON.stringify(data)).done(function(d){
 callback(d);
  });
    
  };


  Projects.getByName = function(name,callback){
  $.get('https://magnumjs-projects.firebaseio.com/projects/'+name+'.json')
  .done(function(d){
    callback(d);
  });
  };

  
  Projects.delete('-J17vqyfibzLGNqcLRHj',function(d){
    console.log(d);
  });
  
  
/*   Projects.addNew('jQuery','write less, do more','http://www.jquery.com',function(d){
    console.log(d);
  }); */
  
   Projects.getAll(function(projects){
    for(var id in projects){
     console.log(projects[id]); 
        Projects.edit(id,projects[id].name+' and',projects[id].description,projects[id].website,function(d){
        console.log(d);
             });  
          }  
  });
 
});
