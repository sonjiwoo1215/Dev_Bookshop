const express = require('express'); // express 모듈
const router = express.Router();
const conn = require('../mariadb'); // db 모듈
const {join, login, passwordResetRequest, passwordReset} = require('../controller/UserController');

router.use(express.json());

router.post('/join', join);
router.post('/login', login);
router.post('/reset', passwordResetRequest);
router.put('/reset', passwordReset);

module.exports = router