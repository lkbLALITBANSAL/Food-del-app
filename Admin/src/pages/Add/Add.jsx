import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = () => {
  const [image, setimage] = useState(false)
  const [loading, setLoading] = useState(false)

  const url = import.meta.env.VITE_API_URL || "http://localhost:4000"

  const [data, setdata] = useState({
    name: "",
    description: "",
    price: "",
    category: "snacks"
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setdata(prev => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("adminToken")

    if (!token) {
      toast.error("Please login as admin first")
      return
    }

    if (!image) {
      toast.error("Please select an image")
      return
    }

    try {
      setLoading(true)

      const formdata = new FormData()
      formdata.append("name", data.name)
      formdata.append("description", data.description)
      formdata.append("price", Number(data.price))
      formdata.append("category", data.category)
      formdata.append("image", image)

      const response = await axios.post(
        `${url}/api/food/add`,
        formdata,
        {
          headers: {
            token
          }
        }
      )

      if (response.data.success) {
        setdata({
          name: "",
          description: "",
          price: "",
          category: "snacks"
        })
        setimage(false)
        e.target.reset()
        toast.success(response.data.message || "Food added successfully")
      } else {
        toast.error(response.data.message || "Unable to add food")
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("adminToken")
        localStorage.removeItem("adminInfo")
        toast.error("Admin session expired or unauthorized. Please login again.")
      } else {
        toast.error(error.response?.data?.message || "Server error while adding food")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              width={100}
              src={image ? URL.createObjectURL(image) : assets.upload_img}
              alt="Food preview"
            />
          </label>
          <input
            onChange={(e) => setimage(e.target.files[0] || false)}
            type="file"
            id="image"
            accept="image/*"
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type name"
            required
          />
        </div>

        <div className="add-product-discussion flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            name="description"
            value={data.description}
            rows={6}
            placeholder="Write content here"
            required
          />
        </div>

        <div className="category-price">
          <div className="add-category flx-col">
            <p>Product category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
            >
              <option value="snacks">snacks</option>
              <option value="sweet">sweet</option>
              <option value="platter">platter</option>
              <option value="Ice-cream">Ice-cream</option>
              <option value="rice">rice</option>
              <option value="pizza">pizza</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              name="price"
              value={data.price}
              type="number"
              min="0"
              step="0.01"
              placeholder="$20"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="add-button"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  )
}

export default Add