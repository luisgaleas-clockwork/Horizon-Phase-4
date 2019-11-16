const router = require('express').Router();
let Product = require('../models/product.model');
// const ObjectId = require('mongodb').ObjectId;

// Get all product
// GET: /
// ========================================
router.get('/', (req, res) => {
    Product.find({})
        .then(dbUser => res.json(dbUser))
        .catch(err => res.send(err))
})

module.exports = router;