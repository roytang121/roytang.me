var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("counter=" + res.counter);
  res.render('index', {
    title: "roytang.me",
    counter: res.counter
  });
});

module.exports = router;
