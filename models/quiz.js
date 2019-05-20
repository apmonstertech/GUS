const mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var db = mongoose.connection;
var QuizSchema = mongoose.Schema({
    question: {
        type: String,
    },
    ans1: {
        type: String,
    },
    ans2: {
        type: String
    },
    ans3: {
        type: String,
    },
    ans4: {
        type: String
    },
    ansRight: {
        type: String
    }
})
QuizSchema.plugin(random);
var Quiz = module.exports = mongoose.model('Quiz', QuizSchema)

// Quiz.findOne({ ans1: '10' }, function (error, question) {
//     console.log(question);
// });

// var q = Quiz.find().limit(2);
// q.exec(function (err, posts) {
//     // will be of length 10
//     console.log(posts)
// });

// Quiz.findRandom().limit(10).exec(function (err, songs) {
//     console.log(songs);
// });

//DZIAŁA NIE RUSZAĆ !!!
// Quiz.count().exec(function (err, count) {

//     // Get a random entry
//     var random = Math.floor(Math.random() * count)
//     console.log(count)
//     // Again query all users but only fetch one offset by our random #
//     Quiz.find().skip(random).exec(
//         function (err, result) {
//             // Tada! random user
//             console.log(result)
//         })
// })
