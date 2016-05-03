/*
Author: Michael Glazer
Homepage: https://github.com/magnumjs/glue.js
License MIT
(c) 2016
*/


//Example:

/*
  request({
    url: 'https://api.github.com/users/defunkt'
  }).then(function(data) {
    console.log(data)
  })
*/

 // promises

  /*
  var d = mag.deferred()
  d.promise.then(function() {
    console.log('success', arguments)
  }, function() {
    console.log('failure', arguments)
  })
  d.reject({
    things: false
  })
  d.resolve({
    things: []
  })
  */
var glue = glue || {}

glue.deferred = function() {
  var Deferred = {}
  Deferred.promise = new Promise(function(resolve, reject) {
    Deferred.resolve = resolve
    Deferred.reject = reject
  })
  return Deferred
}

glue.when = function(arrayOfPromises, callback) {
  Promise.all(arrayOfPromises).then(callback)
}

//TODO: add jsonp support

glue.request = function(options) {
  var deferred = glue.deferred();
  if (options.initialValue) {
    deferred.promise.initialValue = options.initialValue
  }
  //Uid:
  var key = JSON.stringify(options)
    //Cache:
  if (options.cache) {
    var cache = mag.cache(key)
    if (cache) {
      deferred.resolve(cache)
      return deferred.promise
    }
  }

  //In queue:
  if (glue.request.queue[key]) {
    return glue.request.queue[key]
  }
  //Add to queue
  glue.request.queue[key] = deferred.promise;


  var client = new XMLHttpRequest();
  var method = (options.method || 'GET').toUpperCase();
  var data = method === "GET" || !options.data ? "" : options.data

  client.onload = function(e) {
    var ct = client.getResponseHeader("content-type") || "";
    var data = e.target.responseText;
    if (ct.indexOf('json') > -1) {
      data = JSON.parse(data)
    }
    if (options.cache) {
      glue.cache(key, data, options.cacheTime, options.cacheType)
    }
    delete glue.request.queue[key];
    deferred.resolve(data)
  }

  client.onerror = function(e) {
    deferred.reject(e)
  };

  client.open(method, options.url);
  //Headers:
  if(options.headers){
    for(var i=0;i<options.headers.length;i++){
    	var header = options.headers[i]
      for(var k in header){
    	  client.setRequestHeader(k, header[k]);
      }
    }
  }
  
  client.send(data);

  return deferred.promise
}
glue.request.queue = {}

glue.cache = function(key, data, cacheTime, storageType) {
   var stype = window[storageType || 'sessionStorage']

  if (arguments.length == 1) {

    if (glue.cache.data[key]) {
      return glue.cache.data[key].data;
    } else {
      // check storage
      var item = stype.getItem(key)
      if (item) {
        glue.cache.data[key] = JSON.parse(item)
        return glue.cache.data[key].data
      }
      else return 0;
    }
  }

  if (glue.cache.data[key] && glue.cache.data[key].id) clearTimeout(glue.cache.data[key].id)

  var intervalID = setTimeout(function(key) {
    stype.removeItem(key);
    delete glue.cache.data[key]
  }.bind({}, key), cacheTime || 1000 * 60 * 10); //10 minutes

  glue.cache.data[key] = {
    id: intervalID,
    data: data
  }

  stype.setItem(key, JSON.stringify(glue.cache.data[key]))
}
glue.cache.data = {}

/*
var p1 = mag.request({
  url: 'https://api.myjson.com/bins/demo',
  cache: 1
})

p1.then(function(d) {
  console.log(d.name, 1)
})

var p2 = mag.request({
  url: 'https://api.myjson.com/bins/demo',
  cache: 1
})

p2.then(function(d) {
  console.log(d.name, 2)
})

console.log(p1, p2, p1 === p2)
*/
