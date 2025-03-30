import React from 'react'
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContext'
function Orders() {
  const {currentUser}=useAuth()
const auth=useAuth()
  console.log(auth)
  const {data:order=[],isLoading,isError} =useGetOrderByEmailQuery(currentUser.email)
  if(isLoading){ return <div>Loading...</div>
  }
  if(isError){ return <div>Error while fetching orders</div> }
  return (
    <div>
      <h1>Orders</h1>
      <div>
        {order.map((order) => (
          <div key={order._id}>
            <h3>Order Id: {order._id}</h3>
            <p>Order Date: {order.createdAt}</p>
            <p>Order Status: {order.status}</p>
            <div>
              {order.books.map((book) => (
                <div key={book._id}>
                  <h4>{book.title}</h4>
                  <p>Price: {book.price}</p>
                  <p>Quantity: {book.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders