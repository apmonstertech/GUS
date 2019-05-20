const mongoose = require('mongoose');
var db = mongoose.connection;
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