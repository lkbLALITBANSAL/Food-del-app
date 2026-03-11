import React from 'react' 
import './placeOrder.css'
import { useContext,useState,useEffect } from 'react'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios'
import {useNavigate } from "react-router-dom"

const PlaceOrder = () => {
  const { getTotalAmount,token ,food_list,carditem,url } = useContext(StoreContext)

const [data, setdata] = useState({
  firstname:"",
  lastname:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:"",
})

const onChangeHandler=(e)=>{
  const name=e.target.name;
  const value=e.target.value;
  setdata(data=>({...data,[name]:value}));
}

// useEffect(() => {
//   console.log(data)
// }, [data])

 
const placeorder=async(e)=>{
  e.preventDefault();
  let orderitems=[];
  food_list.map((item)=>{
    if(carditem[item._id]>0){
      let iteminfo=item;
      iteminfo["quantity"]=carditem[item._id];
      orderitems.push(iteminfo)
    }
  })
  //  console.log(orderitems);
  let orderData={
    address:data,
    items:orderitems,
    amount:getTotalAmount()+2
  }

    let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url);
    }else{
      alert("error")
    }
}


const navigate=useNavigate();
//dont open cart page if user is not login , or total card amount is 0
useEffect(() => {
    if(!token){
       navigate('/cart');
    }
    else if(getTotalAmount()===0){
      navigate('/cart');
    }
}, [token])


  return (
    <form onSubmit={placeorder} className="place-order">

      <div className="place-order-left">
       <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstname' value={data.firstname} onChange={onChangeHandler} type="text" placeholder='First name'/>
          <input required name='lastname' value={data.lastname} onChange={onChangeHandler} type="text" placeholder='Last name'/>
        </div>
        <input required name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='enter email'/>
        <input required name='street' value={data.street} onChange={onChangeHandler} type="text" placeholder='street' />
            <div className="multi-fields">
          <input required name='city' value={data.city} onChange={onChangeHandler} type="text" placeholder='City'/>
          <input required name='state' value={data.state} onChange={onChangeHandler} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
          <input required name='zipcode' value={data.zipcode} onChange={onChangeHandler} type="text" placeholder='Zip code'/>
          <input required name='country' value={data.country} onChange={onChangeHandler} type="text" placeholder='country'/>
        </div>
        <input required name='phone' value={data.phone} onChange={onChangeHandler} type="text" placeholder='phone'/>
      </div>

      <div className="place-order-right">
        <div  className="cart-total">
          <h2>Cart total</h2>
          <div>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalAmount()}</p>
            </div>
<hr/>
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>{getTotalAmount()===0 ?0:2}</p>
            </div>
<hr/>
            <div className="cart-total-details">
              <p>Total</p>
              <p>{getTotalAmount()===0?0:getTotalAmount()+2}</p>
            </div>
        </div>
         <button type='submit'>Proceed to Payment</button>
            </div>
      </div>
    </form>
  )
}

export default PlaceOrder