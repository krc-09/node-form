


const express = require('express');
const productsController = require('../controllers/success');

const router = express.Router();

router.get('/success',productsController.success);
module.exports = router;