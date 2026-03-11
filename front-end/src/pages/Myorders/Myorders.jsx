import React from 'react'
import './Myorders.css'
import { useContext,useEffect,useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Myorders = () => {

    const {url,token}=useContext(StoreContext)
    const [data, setdata] = useState([])

    const fetchOrders=async ()=>{
        const response =await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setdata(response.data.data);
        console.log(response.data.data)
    }

    useEffect(() => {
      if(token){
        fetchOrders();
      }
    }, [token])
    
  return (
    <div className='my-orders'>
      <h2>My orders</h2>
      <div className="container">
        {
            data.map((order,index)=>{
                return (
                    <div key={index} className='my-orders-order'>
                   <p>
                    {order.items.map((item,index)=>{
                         if(index===order.items.length-1){
                            return item.name +"x"+ item.quantity  
                    }else{
                        return item.name +"x"+item.quantity+","
                    }
                    })}
                   </p>
                   <p>${order.amount}.00</p>
                   <p>Items:{order.items.length}</p>
                   <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                    {/* we can check order status via fetch order call in track order  */}
                   <button onClick={fetchOrders}>Track order</button>
                    </div>
                )
            })
        }
      </div>
    </div>
  )
}

export default Myorders
