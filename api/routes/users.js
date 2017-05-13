'use strict';

var router = require('express').Router();

router.get('/api/users', (req, res) => {
    res.json({ 'foo': 'users' });
});

router.get("/api/users/:id", (req, res) => {
    console.log("user " + req.params.id);
    res.send(req.param);
});

module.exports = router;



