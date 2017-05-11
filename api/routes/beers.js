module.exports = (function () {
    'use strict';
    var router = require('express').Router();

    const mongoose = require('mongoose');

    //const dbHost = "mongodb://database/bfh.html.api";
    const dbHost = "mongodb://127.0.0.1:27017"

    mongoose.connect(dbHost);
    // create mongoose schema
    const beerSchema = new mongoose.Schema({
         name: String,
         taste: String
    });

    const Beer = mongoose.model("Beer", beerSchema);

    router.get('/', function (req, res) {
        Beer.find({}, (err, beers) => {
            if(err) res.status(500).send(error);

            res.status(200).json(beers);
        });
    });

    router.get('/api/beers/:id', function(req, res) {
        console.log("id" + req.param.id);
        Beer.findById(req.param.id, (err, beer) => {
             if (err) res.status(500).send(error)
             
             res.status(200).json(beer);
    
        });
    });

    router.post('/', function (req, res) {
        
        var b = new Beer({
            name: "Anker",
            taste: "Gruusig"
        })

        b.save(error => {
            if (error) res.status(500).send(error);

            res.status(201).json({
                message: 'User created successfully'
            });
        })
        
    });

    router.delete('/', function (req, res) {
        res.json({ "foo": "beer deleted" });
    });

    return router;
})();
