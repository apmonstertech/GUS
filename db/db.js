const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ProjectGUS', { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded')
        // mongoose.connection.db.listCollections().toArray(function (err, names) {
        //     console.log(names[1]); // [{ name: 'dbname.myCollection' }]
        //     na = names
        //     module.exports.Collection = names;
        // });
    } else {
        console.log('Error in DB connection : ' + err)
    }
});

// var db = mongoose.connection;

// var collections = mongoose.connections[0].collections;
// var names = [];