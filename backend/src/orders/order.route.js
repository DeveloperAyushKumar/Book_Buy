import express from 'express'
import { createAOrder,getOrdersByEmail } from './order.controller.js'
const router = express.Router()
router.post('/', createAOrder)
router.get('/email/:email', getOrdersByEmail)
export default router