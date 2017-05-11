module.exports = (function() {
    'use strict';
    var router = require('express').Router();

    router.get('/', function(req, res) {
        res.json({'foo':'beers'});
    });

    router.delete('/', function(req, res) {
        res.json({"foo": "beer deleted"});
    });

    return router;
})();
