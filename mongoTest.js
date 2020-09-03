const MongoClient = require('mongodb').MongoClient;



// Connection URL
const url = 'mongodb://127.0.0.1:27017';
 
// Database Name
const dbName = 'example';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    if (err) {
        throw err;
        return;
    }
 
  const db = client.db(dbName);
  const collection = db.collection('enemies')

  collection.find({"type": {$regex: /s/}}).toArray((err, result) => {
    console.log(result)
  })


 
  client.close();
});