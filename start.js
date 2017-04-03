const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://admin:tarjuma@ds117919.mlab.com:17919/tarjuma');
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: '+ err);
  process.exit(-1); // eslint-disable-line no-process-exit
});


console.log("connected");


// var Music = require('./resource/music').model;

// var Pop = new Music({
//   category : 'a',
//   subcategory : 'sub-a'
// });

// Music.create(Pop, function(err, result){
// 	if(err){
// 		console.log(err)
// 	}
// 	else{
// 		console.log(result)
// 	}
// })

let musicEntityModel = require(__dirname +  '/resource/musicEntity')
 dbService.query(musicEntityModel , {'entityId': entityId}, {}, {});