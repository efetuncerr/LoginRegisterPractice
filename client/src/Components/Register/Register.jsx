
import  {useState} from 'react'
import './Register.css'
import '../../App.css'
import video from '../../../LogoVideo/video2.mp4'
import {Link, useNavigate} from 'react-router-dom'
import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiOutlineSwapRight} from 'react-icons/ai'
import {MdMarkEmailRead} from 'react-icons/md'
import axios from 'axios'


const Register = () => {

const [email, setEmail]= useState('')
const [userName, setUserName]= useState('')
const [password, setPassword]= useState('')
const navigateTo = useNavigate()


//onClick eventi

const createUser = (e) => {
   e.preventDefault()
axios.post('http://localhost:3002/register', {
    Email: email,
    UserName: userName,
    Password: password
}).then(()=>{
    navigateTo('/')
    setEmail('')
    setUserName('')
    setPassword('')
})
}

  return (
    <div className='registerPage flex'>
<div className="container flex">
    <div className="videoDiv ">
        <video src={video} autoPlay muted loop></video>

        <div className="textDiv">
            <h2 className='title'> Create and Sell Extraordinary Products</h2>
            <p>Adopt the peace of nature!</p>
        </div>

        <div className="footerDiv flex">
            <span className='text'>Already have an account?</span>
            <Link to={'/'}>
            <button className='btn'> Login</button>
            </Link>
        </div>
    </div>

    <div className="formDiv flex">
        <div className="headerDiv">
            <h3>Logo</h3>
            <h3>Let us know you </h3>
        </div>
        <form  className='form grid' >

        <div className="inputDiv">
                <label htmlFor="email">Email</label>
                <div className="input flex">
                <MdMarkEmailRead className="icon"/>
                    <input  type="email" id='email' placeholder='Enter Email' onChange={(event) =>{
                        setEmail(event.target.value)
                    }} />
                </div>
            </div>

            <div className="inputDiv">
                <label htmlFor="username">Username</label>
                <div className="input flex">
                <FaUserShield className="icon"/>
                    <input  type="text" id='username' placeholder='Enter Username' onChange={(event) =>{
                        setUserName(event.target.value)
                    }} />
                </div>
            </div>

            <div className="inputDiv">
                <label htmlFor="password">Password</label>
                <div className="input flex">
                    <BsFillShieldLockFill className="icon"/>
                    <input type="password" id='password' placeholder='Enter Password' onChange={(event) =>{
                        setPassword(event.target.value)
                    }}  />
                </div>
            </div>

            <button type='submit' className='btn flex' onClick={createUser}>
                <span>Register</span>
                <AiOutlineSwapRight className="icon"/>
            </button>

            {/* <span className='forgotPassword'> Forgot your password? <a href="">Click Here</a></span> */}
        </form>
    </div>
</div>

    </div>
  )
}

export default Register