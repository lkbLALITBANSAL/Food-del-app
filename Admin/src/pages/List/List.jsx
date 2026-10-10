import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = () => {
  const url = import.meta.env.VITE_API_URL || "http://localhost:4000"

  const [list, setlist] = useState([])

  const fetchlist = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)

      if (response.data.success) {
        setlist(response.data.data)
      } else {
        toast.error(response.data.message || "Unable to fetch food list")
      }
    } catch (error) {
      toast.error("Error fetching food list")
    }
  }

  useEffect(() => {
    fetchlist()
  }, [])

  const removeFood = async (foodId) => {
    const token = localStorage.getItem("adminToken")

    if (!token) {
      toast.error("Please login as admin first")
      return
    }

    try {
      const response = await axios.post(
        `${url}/api/food/remove`,
        { id: foodId },
        {
          headers: { token }
        }
      )

      if (response.data.success) {
        toast.success(response.data.message || "Food removed successfully")
        await fetchlist()
      } else {
        toast.error(response.data.message || "Unable to remove food")
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminInfo")
        toast.error("Admin session expired or unauthorized. Please login again.")
      } else {
        toast.error(error.response?.data?.message || "Error removing food")
      }
    }
  }

  return (
    <div className='list add flex-col'>
      <p>All food items</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b>Action</b>
        </div>

        {list.map((item) => (
          <div key={item._id} className='list-table-format'>
            <p className='fit-img'>
              <img
                width={50}
                src={`${url}/images/${item.image}`}
                alt={item.name}
              />
            </p>

            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>{item.category}</p>

            <button
              type="button"
              onClick={() => removeFood(item._id)}
              className="cursor"
              aria-label={`Remove ${item.name}`}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List