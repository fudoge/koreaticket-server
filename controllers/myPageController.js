const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const myPageServices = require('../services/myPageServices');
const authenticateJWT = require('../middlewares/authmiddleware');

router.use(authenticateJWT);

router.get('/history', myPageServices.getHistory);
router.get('/inquiries', myPageServices.getInquires);
router.get('/inquiries/:postId', myPageServices.getInquiryDetail);
router.post('/inquiries/:postId', body('comment').notEmpty(), myPageServices.postReply)
router.post('/inquires', myPageServices.postInquiry);

module.exports = router;