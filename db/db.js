const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Admin:admin@cluster0-qycbe.mongodb.net/ProjectGUS?retryWrites=true', { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded')
    } else {
        console.log('Error in DB connection : ' + err)
    }



});
