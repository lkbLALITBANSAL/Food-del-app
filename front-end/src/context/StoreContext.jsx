import axios from "axios";
import { createContext } from "react";
// import { food_list } from "../assets/assets"; 
import { useState } from "react";
import { useEffect } from "react";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

  const [carditem, setcarditem] = useState({})
  const [token, settoken] = useState("")

  //from backend fetch in this list
  const [food_list, setfood_list] = useState([]); 

  const url="http://localhost:4000"

  const addtocart= async(itemId)=>{
    console.log("ADD TO CART:", itemId);

    if(!carditem[itemId]){
      setcarditem((prev)=>({...prev,[itemId]:1}))
    }else{
      setcarditem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }

    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
    }
  }

  const Removefromcart= async (itemId)=>{
    setcarditem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  }

  // useEffect(() => {
  //   console.log(carditem)
  // }, [carditem])


  const getTotalAmount=()=>{
    let totalAmount=0;
    for(const item in carditem){
      if(carditem[item]>0){
        let itemInfo=food_list.find((product)=>product._id===item);
        totalAmount+=itemInfo.price*(carditem[item])
      }
    }   
    return totalAmount; 
  }    
        
//fetch foodlist from backend 
  const fetchfood_list= async() => {
    const response=await axios.get(url+"/api/food/list")
    setfood_list(response.data.data)
  }

const loadCartData = async (token) => {
  const response = await axios.post(
    url + "/api/cart/get",
    {},
    { headers: { token } }
  );

  if (response.data.success) {
    setcarditem(response.data.cartData);
  }
};


 useEffect(() => {
 
   async function load_data(){
      await fetchfood_list();
 
      //this is diff fn, don't remove login while load page 
       if(localStorage.getItem("token")){
    settoken(localStorage.getItem("token"))

    await loadCartData(localStorage.getItem("token"))
  }
   }

   load_data();
 }, [])
 
  
  
  const contextValue = {
    food_list,
    carditem,
    setcarditem,
    addtocart,
    Removefromcart,
    getTotalAmount,
    url,
    token,
    settoken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
