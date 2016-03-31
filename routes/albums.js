var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function albums() {
  return knex('albums');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/new', function(req, res, next){
  res.render('new');
});

router.post('/', function(req, res, next) { console.log(req.body)
  albums().insert({ name: req.body.album_name, artist:req.body.artist_name, genre:req.body.genre, stars:req.body.stars, explicit:req.body.explicit }).then(function () {
    res.redirect('/albums');
  });
});

module.exports = router;
