const express = require('express')
const router = express.Router()
const controller = require('../controllers/position')

router.get('/:categoryId', controller.getByCategoryId)
router.delete('/:id', controller.remove)
router.post('/', controller.create)
router.patch('/:id', controller.update)

module.exports = router
