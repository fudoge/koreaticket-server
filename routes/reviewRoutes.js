const express = require('express');
const { body } = require('express-validator');
const storage = require('../utils/storage');
const router = express.Router();
const upload = multer({ storage: storage });

const reviewBoardService = require('../services/reviewBoardService');
const authenticateJWT = require('../middlewares/authmiddleware');
const bodyValidation = require('../middlewares/bodyValidationMiddleware');

router.get('/', reviewBoardService.loadPosts);
router.get('/:postId', reviewBoardService.loadPostDetail);
router.post('/write', authenticateJWT,
    upload.fields([{ name: 'images', maxCount: 10 }, { name: title }, { name: content }]),
    body('title').notEmpty(), body('content').notEmpty(),
    reviewBoardService.createPost);
router.delete('/:postId', authenticateJWT, reviewBoardService.deletePost);

router.post('/:postId', authenticateJWT, body('message').notEmpty(), bodyValidation, reviewBoardService.createComment);
router.delete('/:postId/:commentId', authenticateJWT, reviewBoardService.deleteComment);

module.exports = router;