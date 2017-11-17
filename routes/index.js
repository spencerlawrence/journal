var mongodb = require('mongodb');
var express = require('express');
var router = express.Router();
var request = require('request');
var MongoClient = mongodb.MongoClient;
var dbUrl = 'mongodb://localhost:27017/diary';
var collection

MongoClient.connect(dbUrl, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', dbUrl);
    collection = db.collection('diary');
  }
});

router.get('/diary', function(req, res, next) {
  console.log("In Get Route");
  collection.find().toArray(function(err, result) {
    if(err) {
      console.log(err);
    } else if (result.length) {
      console.log("Query Worked");
      console.log(result);
      res.send(result);
    } else {
      console.log("No Documents found");
    }
  });
});

router.post('/diary', function(req, res, next) {
    console.log("In Post Route");
    console.log(req.body);
    collection.insert(req.body, function (err, result) {
      console.log("test!");
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted documents into the "entries" collection. The documents inserted with "_id" are:', result);
        res.end('{"success" : "Updated Successfully", "status" : 200}');
      }
    });
});

router.delete('/diary', function(req, res, next) {
        console.log("In Delete Route");
        collection.remove(function(err) {
                if(err) return console.error(err);
                else res.sendStatus(200);
        });
});

module.exports = router;

var diary = [
  {
    date: '',
    entry: ''
  }
];
