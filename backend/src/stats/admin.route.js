import express from 'express'
import { getStats } from './admin.controller.js';

const router=express.Router();

router.get("/",getStats )
export default router


