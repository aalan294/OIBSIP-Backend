const express = require('express')
const router = express.Router()

router.route('/register')
    .post(require('../CONTROLLERS/AuthController').register)
router.route('/login')
    .post(require('../CONTROLLERS/AuthController').login)
router.route('/verify')
    .post(require('../CONTROLLERS/AuthController').otpVerify)
router.route('/resendOTP')
    .post(require('../CONTROLLERS/AuthController').resend)


module.exports = router