var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.sendFile("/ProjectGUS/public/lobby.html")
});


module.exports = router;