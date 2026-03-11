import React from 'react' 
import './Add.css'
import { assets } from '../../assets/assets'
import { useState,useEffect } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = () => {
  const [image, setimage] = useState(false)
  const url="http://localhost:4000"
  const [data, setdata] = useState({
    name:"",
    description:"",
    price:"",
    category:"salary"
  })

  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setdata(data=>({...data,[name]:value}))
  }

// useEffect(() => {
//   console.log(data)
// }, [data])

  const onSubmitHandler=async (e)=>{
     e.preventDefault();
     const formdata=new FormData();
     formdata.append("name",data.name);
     formdata.append("description",data.description);
     formdata.append("price",Number(data.price));
     formdata.append("category",data.category);
     formdata.append("image",image);
     const response=await axios.post(`${url}/api/food/add`,formdata)

     if(response.data.success){
       setdata({
            name:"",
    description:"",
    price:"",
    category:"salary"
       })
       setimage(false);
       toast.success(response.data.message)
     }
  }
  return (
    <div className='add'>
      <form  className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
             <p>Upload image</p>
             <label htmlFor="image">
              <img width={100} src={image?URL.createObjectURL(image):assets.upload_img} alt="" />
             </label>
             <input onChange={(e)=>{setimage(e.target.files[0])}} type="file" id='image' hidden required/>
        </div>
        <div className="add-product-name flex-col">
           <p>Product name</p>
           <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type name'/>
        </div>
        <div className="add-product-discussion flex-col">
           <p>Product description</p>
           <textarea onChange={onChangeHandler} name='description'  value={data.description} rows={6} placeholder='write content here'></textarea>
        </div>
        <div className="category-price">
          <div className="add-category flx-col">
              <p>Product category</p>
              <select onChange={onChangeHandler} name="category" >
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
          <input onChange={onChangeHandler} name='price' value={data.price} type="Number" placeholder='$20'/>
          </div>
        </div>
        <button type='submit' className='add-button'>Add</button>
      </form>
      
    </div>
  )
}

export default Add
