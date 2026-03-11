import React, { useState ,useContext} from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({ setshowLogin }) => {
     const {url,settoken}=useContext(StoreContext)  
  const [currState, setcurrState] = useState("Sign up")
  const [data, setdata] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler=(e)=>{
     const name=e.target.name;
     const value=e.target.value;
     setdata(data=>({...data,[name]:value}));
  }

  //  useEffect(() => {
  //    console.log(data)
  //  }, [data])
   
   const onLogin=async(e)=>{
   e.preventDefault()


     let newurl=url;
     if (currState === "Login"){
      newurl+='/api/user/login'
     }else{
      newurl+='/api/user/register'
     }

     const response=await axios.post(newurl,data);

     if(response.data.success){
       settoken(response.data.token);
       localStorage.setItem("token",response.data.token)
       setshowLogin(false)
     }else{
      alert(response.data.message)
     }
   } 

  return (
    <div className='login-popup'>

    
  
      <form onSubmit={onLogin} className="login-popup-container">

        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            width={20}
            src={assets.cross_icon}
            alt=""
            onClick={() => setshowLogin(false)}
          />
        </div>

        <div className="login-popup-input">
          {currState === "Sign up" && (
            <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder="Your name" required />
          )}
          <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder="Your email" required />
          <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder="Your password" required />
        </div>

        <button type='submit'>
          {currState === "Sign up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to terms and conditions</p>
        </div>

        {currState === "Login" ? (
          <p>Create new account? <span onClick={() => setcurrState("Sign up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setcurrState("Login")}>Login here</span></p>
        )}

      </form>
    </div>
  )
}

export default LoginPopup
 