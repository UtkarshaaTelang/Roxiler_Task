const express = require('express');
// const { body } = require('express-validator');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const {authenticateToken,authorizeRoles} = require('../middleware/authMiddleware');


router.post('/register',register);
router.post('/login', login);
router.get('/admin/stores', authenticateToken, authorizeRoles(['admin']));
router.post('/rate-store', authenticateToken, authorizeRoles(['normal']));
router.get('/store/ratings', authenticateToken, authorizeRoles(['store_owner']));


module.exports = router;
