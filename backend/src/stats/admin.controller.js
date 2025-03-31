
import Order from '../orders/order.model.js';
import Book from '../books/book.model.js';
const getStats =async(req, res)=>{
    try {
        //total orders 
        const totalOrders =await Order.countDocuments();

        // total sales
        const totalSales = await Order.aggregate([
            {
                $group:{
                    _id:null,
                    totalSales:{$sum:"$totalPrice"}
                }
            }
        ])
        // trending books statistics 
        const trendingBooksCount = await Book.aggregate([
            {$match:{treding:true}},
            {$count:"trendingBooksCount"}
        ])
        const trendingBooks = trendingBooksCount.length > 0 ? trendingBooksCount[0].trendingBooksCount : 0;
        const totalBooks =await Book.countDocuments();
        const monthlySales = await Order.aggregate([
            {
                $group:{
                    _id:{$month:"$createdAt"},
                    totalSales:{$sum:"$totalPrice"},
                    totalOrders:{$sum:1}
                }
            }
        ])
        res.stauts(200).json({
            totalOrders,
            totalSales:totalSales.length > 0 ? totalSales[0].totalSales : 0,
            trendingBooks,
            totalBooks,
            monthlySales
        })

        
    }
    catch(error) {
        console.error("Error fetching admin stats ",error)
        res.stauts(500).json({message:"Error fetching admin stats"})
    }

}
export {getStats}