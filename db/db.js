const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Admin:admin@cluster0-qycbe.mongodb.net/ProjectGUS?retryWrites=true', { useNewUrlParser: true }, (err) => {
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

    //mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-qycbe.mongodb.net:27017,cluster0-shard-00-01-qycbe.mongodb.net:27017,cluster0-shard-00-02-qycbe.mongodb.net:27017 --ssl --username Admin --password admin --authenticationDatabase admin --db ProjectGUS --collection quizzes --type csv --out E:\GUSProject\GUS\pytaniaUTF-8Przecinki.csv --fields question,ans1,ans2,ans3,ans4,ansRight

});
