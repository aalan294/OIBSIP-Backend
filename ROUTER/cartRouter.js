const express = require('express')
const router = express.Router()

router.route('/')
    .post(require('../CONTROLLERS/cartController').addCart)
router.route('/:id')
    .get(require('../CONTROLLERS/cartController').getAllCart)
    .delete(require('../CONTROLLERS/cartController').delCart)

module.exports = router