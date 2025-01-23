import Book from "./book.model.js"
// post a book
const postABook=async(req,res)=>{
    console.log(req)
 try {
    const newBook=await new Book({...req.body})
    await newBook.save();
    res.status(200).send({ 
        message: "Book posted Sucessfully",
        book:newBook,
        
    } )


    
 } catch (error) {
    res.status(500).send({
        message:"Failed to create book",
       error
    })
    
 }
}
// post a book
const getABook=async(req,res)=>{
    // console.log(req)
 try {
    const  {id}=req.params
    const book=await  Book.findById(id)
    if(!book){
        res.status(404).send({ 
            message: "Book not found",            
        } )

    }
    res.status(200).send(
        book
        
     )


    
 } catch (error) {
    res.status(500).send({
        message:"Failed to find book",
       error
    })
    
 }
}// post a book
const updateABook=async(req,res)=>{
    // console.log(req)
    
 try {
    const {id}=req.params
    const updatedBook=await Book.findByIdAndUpdate(id,{...req.body},{new:true})
    if(!updateABook){
        res.status(500).send({ 
            message: "Book cannot be updated",
        } )
    }
    res.status(200).send({ 
        message: "Book updated Sucessfully",
        book:updatedBook,
        
    } )


    
 } catch (error) {
    res.status(500).send({
        message:"Failed to update book",
       error
    })
    
 }
}// post a book
const getAllBooks=async(req,res)=>{
    // console.log(req)
 try {
    const books=await Book.find()
    res.status(200).send(
      books
        
    )


    
 } catch (error) {
    res.status(500).send({
        message:"Failed to get books",
       error
    })
    
 }
}// post a book
const deleteABook=async(req,res)=>{
    // console.log(req)
 try {
    const {id}=req.params
    const book=await Book.findByIdAndDelete(id)
    // await newBook.save();
    if(!book){
        res.status(404).send({ 
            message: "Book does not exist",
            book:newBook,
            
        } )
    }
    res.status(200).send({ 
        message: "Book deleted Sucessfully",
        book:newBook,
        
    } )


    
 } catch (error) {
    res.status(500).send({
        message:"Failed to delete book",
       error
    })
    
 }
}
export { 
    postABook,
    getABook,
    getAllBooks,
    updateABook,
    deleteABook
}