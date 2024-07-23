const express = require('express');
const router = express.Router();
const mainServices = require('../services/mainServices');

router.get('/', mainServices.returnInfos);

module.exports = router;