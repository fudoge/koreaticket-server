const express = require('express');
const matchServices = require('../services/matchServices');
const authenticateJWT = require('../middlewares/authmiddleware');

const router = express.Router();

router.get('/', matchServices.getMatches);
router.get('/:matchId', authenticateJWT, matchServices.getMatchDetail);
router.get('/:matchId/book', authenticateJWT, matchServices.getBookingPage);
router.post('/:matchId/book', authenticateJWT, matchServices.bookTicket);

module.exports = router;