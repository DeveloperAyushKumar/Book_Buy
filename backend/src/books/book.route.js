import express from 'express'
import {deleteABook, getABook, getAllBooks, postABook, updateABook} from './book.controller.js';
import verifyAdminToken from '../middleware/verifyAdminToken.js';
const router=express.Router();

// post a book
router.post("/create-book",verifyAdminToken, postABook)
// get a book
router.get("/:id", getABook)
// update a book
router.put("/edit/:id", updateABook)
// delete a book
router.delete("/:id", deleteABook)
// get all the books
router.get("/",getAllBooks)
// module.exports=router
export default router
