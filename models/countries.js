const mongoose = require('mongoose');
// require('../db/db')

var db = mongoose.connection;

// var collection = db.collection('quiz')

// collection.find().toArray(function(err, kittens) {
//     // here ...
// });

var CountrySchema = mongoose.Schema({
    code: {
        type: String,
    },
    description: {
        type: String,
    },
    population:{
        type:String
    },
    size:{
        type:String
    },
    capital:{
        type:String
    }
})
var Countries = module.exports = mongoose.model('Countries', CountrySchema)