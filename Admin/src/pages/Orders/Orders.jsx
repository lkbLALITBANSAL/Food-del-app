import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = ({ url }) => {
  const [orders, setorders] = useState([])

  const fetchAllOrders = async () => {
    const token = localStorage.getItem("adminToken")

    if (!token) {
      toast.error("Please login as admin first")
      return
    }

    try {
      const response = await axios.get(
        `${url}/api/order/list`,
        {
          headers: { token }
        }
      )

      if (response.data.success) {
        setorders(response.data.data)
      } else {
        toast.error(response.data.message || "Unable to fetch orders")
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminInfo")
        toast.error("Admin session expired or unauthorized. Please login again.")
      } else {
        toast.error("Error fetching orders")
      }
    }
  }

  const statusHandler = async (e, orderId) => {
    const token = localStorage.getItem("adminToken")

    if (!token) {
      toast.error("Please login as admin first")
      return
    }

    try {
      const response = await axios.post(
        `${url}/api/order/status`,
        {
          orderId,
          status: e.target.value
        },
        {
          headers: { token }
        }
      )

      if (response.data.success) {
        toast.success("Order status updated")
        await fetchAllOrders()
      } else {
        toast.error(response.data.message || "Status update failed")
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminInfo")
        toast.error("Admin session expired or unauthorized. Please login again.")
      } else {
        toast.error("Server error updating order status")
      }
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='order add'>
      <h3>Order list</h3>

      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => (
                  <React.Fragment key={`${order._id}-${index}`}>
                    {index > 0 ? ", " : ""}
                    {item.name} x {item.quantity}
                  </React.Fragment>
                ))}
              </p>

              <p className="order-item-name">
                {order.address.firstname} {order.address.lastname}
              </p>

              <div className="order-item-address">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>

              <p className="order-item-phone">{order.address.phone}</p>
            </div>

            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>

            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
            >
              <option value="food processing">food processing</option>
              <option value="out for Delivery">out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders