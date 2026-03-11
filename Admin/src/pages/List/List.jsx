import React from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect,useState } from 'react'

const List = () => {
 
  const url="http://localhost:4000"
  const [list, setlist] = useState([])

  const fetchlist= async ()=>{
    const response=await axios.get(`${url}/api/food/list`);
    if(response.data.success){
    setlist(response.data.data)
    }else{
      toast.error("Error");
    }
  }

  useEffect(() => {
   fetchlist();
  }, [])
  
  const removeFood=async (foodId)=>{
    const response=await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchlist();
    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error("eror")
    }
  }

  return (
    <div className='list add flex-col'>
       <p>Add all foodlist</p>

       <div className="list-table">
        <div className="list-table-format  title">
             <b>Image</b>
             <b>name</b>
             <b>price</b>
             <b>category</b>
             <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
           <div key={index} className='list-table-format'>
            <p className='fit-img'> <img width={50} src={`${url}/images/`+item.image} alt="" /></p>  
            <p>{item.name}</p>
             <p>${item.price}</p>
             <p>{item.category}</p>
              <p onClick={()=>{removeFood(item._id)}} className='cursor'>X</p>
           </div> 
          )
        })}
       </div>
    </div>
  )
}

export default List
