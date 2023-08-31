import "./Login.css";
import "../../App.css";
import video from "../../../LogoVideo/video2.mp4";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  // useState
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigateTo = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");
  const [statusHolder, setstatusHolder] = useState("message");

  //onClick eventi
  const loginUser = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3002/login", {
        LoginUserName: loginUserName,
        LoginPassword: loginPassword,
      })
      .then((response) => {
        if (response.data.message) {
          navigateTo("/"); //giriş bilgileri eşleşmediyse tekrar logine yönlendir
          setLoginStatus(`Hatalı Kullanıcı adı veya şifre `);
        } else {
          navigateTo("/dashboard");
        }
      });

 
  };

  //useEffect for message
  useEffect(() => {
    if (loginStatus !== "") {
      setstatusHolder("showMessage"); //show message
      setTimeout(() => {
        setstatusHolder("message"); // hide after 3s
      }, 3000);
   
    }
  }, [loginStatus]);

  //   clear form on submit

  const onSubmitForm = () => {
    setLoginUserName("");
    setLoginPassword("");
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv ">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className="title"> Create and Sell Extraordinary Products</h2>
            <p>Adopt the peace of nature!</p>
          </div>

          <div className="footerDiv flex">
            <span className="text"> Dont have an account?</span>
            <Link to={"/register"}>
              <button className="btn"> Sign up</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <h3>Logo</h3>
            <h3>Welcome</h3>
          </div>
          <form className="form grid" onClick={onSubmitForm}>
            <span className={statusHolder}>{loginStatus}</span>
            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  onChange={(event) => {
                    setLoginUserName(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <button type="submit" className="btn flex" onClick={loginUser}>
              <span>Login</span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className="forgotPassword">
              {" "}
              Forgot your password? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
