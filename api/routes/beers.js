module.exports = (function () {
    'use strict';
    var router = require('express').Router();
    const baseBeerUrl = "/api/beers/"

    const mongoose = require('mongoose');

    //todo take one of those :-)
    //const dbHost = "mongodb://127.0.0.1:27017"
    //const dbHost = "mongodb://mongodb:27017";
    const dbHost = "mongodb://192.168.99.100:27017"

    mongoose.connect(dbHost);
    // create mongoose schema
    const beerSchema = new mongoose.Schema({
        name: String,
        taste: String
    });

    const Beer = mongoose.model("Beer", beerSchema);

    /**
     * Get a list of beers
     */
    router.get(baseBeerUrl, (req, res) => {
        Beer.find({}, (err, beers) => {
            if (err) res.status(500).send(error);
            res.status(200).json(beers);
        });
    });

    /**
     * Get a beer
     */
    router.get(baseBeerUrl + ':id', (req, res) => {
        console.log("test " + (typeof req.params));
        Beer.findById(req.params.id, (err, beer) => {
            if (err) res.status(500).send(error)
            res.status(200).json(beer);
        });
    });

    /**
     * Create a beer
     */
    router.post(baseBeerUrl, (req, res) => {
        let requestBeer = req.body;
        
        if(requestBeer.name == undefined || requestBeer.name == "") { 
            res.status(400).json({message: "name not set"});
            return;
        }   
        
        let newBeer = new Beer({
            name: requestBeer.name,
            taste: requestBeer.taste
        });
        newBeer.save(error => {
            if (error) res.status(500).send(error);

            res.status(201).json({
                message: ''
            });
        })
    });

    /**
     * Update a beer
     */
    router.put(baseBeerUrl + ':id', (req, res) => {

    });

    /**
     * Delete a beer
     */
    router.delete(baseBeerUrl + ':id', (req, res) => {
        res.json({ "foo": "beer deleted" });
    });

    return router;
})();
