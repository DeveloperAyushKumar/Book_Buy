import Order from "./order.model.js";
const createAOrder  =async(req , res)=>
{
    console.log(req.body)
    try {
        const newOrderInstance=await new Order(req.body);
        const savedOrder=await newOrderInstance.save();
        res.status(200).json(savedOrder);
        
    } catch (error) {
        console.error("Error while creating order",error);
        res.status(500).json({message:"Failed to create order"})
        
    }
}
const getOrdersByEmail =async(req,res)=>{
    try {
        const {email}=req.params;
        const orders =await Order.find({email}).sort({createdAt:-1});
        if(!orders){
            res.status(404).json({message:"No orders found"})
        }
        res.status(200).json(orders);


    }
    catch(error){
        console.error("Error while fetching orders",error);
        res.status(500).json({message:"Failed to fetch orders"})
    }
}
export {createAOrder,getOrdersByEmail} 