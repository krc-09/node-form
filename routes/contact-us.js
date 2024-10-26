const express = require('express');
const productsController = require('../controllers/contact');

const router = express.Router();




router.get('/contactus',productsController.Getcontact);

router.post('/contactus',productsController.Postcontact);


module.exports = router;