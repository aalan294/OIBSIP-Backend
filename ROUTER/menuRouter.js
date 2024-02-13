const express = require('express')
const router = express.Router()

router.route('/')
    .post(require('../CONTROLLERS/menuController').addMenu)
    .get(require('../CONTROLLERS/menuController').getAllMenu)

module.exports = router