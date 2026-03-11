import React from 'react'
import './Orders.css'
import axios from "axios"
import { toast } from 'react-toastify'
import { useEffect,useState } from 'react'

const Orders = ({url}) => {

  const [orders, setorders] = useState([]);

  const fetchAllOrders=async ()=>{
   const response=await axios.get(url+"/api/order/list")
   if(response.data.success){
    setorders(response.data.data);
    console.log(response.data.data);
   }else{
toast.error("error");
   }
  }

  //order status update
 const statusHandler = async (e, orderId) => {
  try {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: e.target.value,
    });

    if (response.data.success) {
      toast.success("Order status updated");
      fetchAllOrders();
    } else {
      toast.error("Status update failed");
    }
  } catch (error) {
    toast.error("Server error");
  }
};

  useEffect(() => {
    fetchAllOrders();
  }, [])
  
  return (
    <div className='order add'>
      <h3>order list</h3>
      <div className="order-list">
        { orders.map((order,index)=>{
          return (
          <div key={index} className="order-item">
               <div>
                <p className='order-item-food'>
               {order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return item.name +" x "+item.quantity;
                  }else{
                    return item.name+ " x "+item.quantity+",";
                  }
                })}
                </p>
               <p className="order-item-name">
                {order.address.firstname+ " "+order.address.lastname}
               </p>
               <div className="order-item-address">
                <p>{order.address.street+","}</p>
               <p>{order.address.city+"," + order.address.state +"," + order.address.country+","+order.address.zipcode}</p>
               </div>
               <p className="order-item-phone">{order.address.phone}</p>
               </div>
    <p>Items:{order.items.length}</p>
    <p>${order.amount}</p>
    <select onChange={(e)=>{statusHandler(e,order._id)}} value={order.status}>
      <option value="food processing">food processing</option>
      <option value="out for Delivery">out for Delivery</option>
      <option value="Delivered">Delivered</option>
    </select>
          </div>
       ) })}
      </div>
    </div>
  )
}

export default Orders
