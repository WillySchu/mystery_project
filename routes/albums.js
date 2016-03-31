var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function albums() {
  return knex('albums');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  albums().select().then(function (records) {
    res.render('index', {allAlbums: records});
  });
});

router.get('/new', function(req, res, next){
  res.render('new');
});

router.get('/:id', function(req, res, next){
  albums().where({id: req.params.id}).first().then(function(record){
    res.render('show', {theAlbum: record});
  });
});

router.get('/:id/edit', function(req, res, next){
  albums().where({id: req.params.id}).first().then(function(record){
    res.render('edit', {theAlbum: record});
  });
});

router.post('/', function(req, res, next) {
  var explicit = req.body.explicit;
  if(!explicit){
    explicit = false;
  }
  albums().insert({ name: req.body.album_name, artist:req.body.artist_name, genre:req.body.genre, stars:req.body.stars, explicit: explicit }).then(function () {
    res.redirect('/albums');
  });
});



module.exports = router;
