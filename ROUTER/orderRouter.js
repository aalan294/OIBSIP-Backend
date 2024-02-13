const express = require('express')
const router = express.Router()

router.route('/orders')
    .post(require('../CONTROLLERS/orderController').newOrder)
    .get(require('../CONTROLLERS/orderController').getAllOrders)
router.route('/orders/:id')
    .get(require('../CONTROLLERS/orderController').getOrders)
router.route('/orders')
    .put(require('../CONTROLLERS/orderController').updateStatus)

router.route('/card/:id')
    .get(require('../CONTROLLERS/orderController').getSingle)


router.route('/pending/:id')
    .get(require('../CONTROLLERS/orderController').pendingOrders)


router.route('/recieved')
    .get(require('../CONTROLLERS/orderController').getRecieved)
router.route('/kitchen')
    .get(require('../CONTROLLERS/orderController').getKitchen)
router.route('/deliver')
    .get(require('../CONTROLLERS/orderController').getDelivery)

module.exports = router