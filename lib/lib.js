var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');

require('./describe');

var database = null;

/**
 * [connect connect to database mongodb]
 * @param  {string}   url [url connection]
 * @param  {Function} cb  [callback (err, result)]
 */
exports.connect = function (url, cb) {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    if (err) {
      cb(err, null);
    } else {
      //console.log("Connected correctly to server");
      assert.equal(null, err);
      database = db;
      cb(null, database);
    }
  });
}

/**
 * [function get list of collections]
 * @param  {Function} cb [callback(err, listCollections array)]
 */
exports.getCollections = function(cb) {
  database.listCollections().toArray(function(err, collections) {
    if (err) {
      cb(err, null);
    } else {
      //collections = [{"name": "coll1"}, {"name": "coll2"}]
      cb(null, collections)
    }
  });
}

exports.close = function() {
  if (database) {
    database.close();
  }
}

exports.describe = function(url) {
  return new Promise(function(resolve, reject) {
    exports.connect(url, () => {
      exports.getCollections((err, collections) => {
        var Describer = [];
        collections.forEach((collection, i) => {
          //console.log(collection);
          database.collection(collection.name).find({}).toArray(function(err, result) {
            if (err) {
              reject(err);
            } else {
              //console.log(result);
              //Recorrer el contenido de la coleccion para saber cual tiene mas keys
              var jsondesc = {},
                count = 0,
                keys = null;

              result.forEach((document_) => {
                if (Object.keys(document_).length > count) {
                  //console.log(Object.keys(document_));
                  keys = Object.keys(document_);
                  count = keys.length;
                  jsondesc = document_;
                }
              });

              //console.log(jsondesc);
              desc(jsondesc, function(described) {
                //console.log("Described:", described);
                Describer.push({
                  collection: collection.name,
                  keys: keys,
                  count: count,
                  describe: described
                });
              });
            }

            if (i == collections.length - 1) {
              resolve(Describer);
              //console.log("__________________________________________________\n", JSON.stringify(Describer, null, 4));
            }
          });
        });
        exports.close();
      });
    });
  });
}
