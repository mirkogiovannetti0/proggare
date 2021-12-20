import {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import Logo from "components/Logo/Logo";
import { Link, useNavigate,Navigate} from "react-router-dom";
import "./Login.css";
import messagePreviewImg from "assets/images/messages-preview.png";
import { ReactComponent as GoogleIcon } from "assets/images/google-icon.svg";
import Checkbox from "components/Checkbox/Checkbox";
import axios from 'axios';


function Login({token,setToken}) {
  const [work_email,setWorkEmail] = useState('');
  const [message,setMessage] = useState('');
  const [password,setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState();

  let navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setToken(localStorage.getItem('token'));
    }
    if(localStorage.getItem('user')){
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  },[]);

  const loginAccount = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("work_email",work_email);
    data.append("password",password);
    axios({
      method: "post",
      url: "http://matteodicastro.it/progare-api/public/login",
      data: data,
      headers: {
        "Accept":"application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        if(response.status == 200){
          setMessage(response.data.message);
          setWorkEmail("");
          setPassword("");
          setToken(response.data.token);
          setUser(response.data.user);
          localStorage.setItem('token',response.data.token);
          localStorage.setItem('user',JSON.stringify(response.data.user));
          if(response.data.user.roles[0].role == "Admin"){
            navigate('/admin/users');
          }
        }else{
          throw new Error("Something Went Wrong");
    }
      })
      .catch(function (error) {
      if(error){
          var keys = Object.keys(error.response.data.errors);
          console.log(error.response.data.errors);
          keys.forEach((key)=>{
            error.response.data.errors[key].forEach((err)=>{
              setMessage(err);
            })
          })
          }
      });
  };
  const handleChange = () => {
    setChecked(!checked);
  };
  if(token == ""){
  return (
    <div className="py-40px">
      <div className="container-wrapper">
        <div className="text-center mb-40px">
          <Link to="/" className="navbar-left">
            <Logo />
          </Link>
        </div>

        <div className="mb-30px">
          <div className="login-container ">
            <div className="login left">
              <p className="text-center fs-18px dark-blue weight-4 graphik-light mb-20px">
                Messages for Beacon
              </p>

              <Link to="/" className="mb-10px">
                <img src={messagePreviewImg} alt="" />
              </Link>

              <div className="text-center">
                <button className="light-blue pointer">Learn More</button>
              </div>
            </div>
            <div className="login right">
              <p className="login-title text-center fs-24px weight-5 graphik-medium dark-blue ">
                Log in
              </p>

              <p className="text-green">

              {message}
              </p>
              <form className="login-form" onSubmit={loginAccount}>

                <input
                  type="text"
                  className="form-input graphik-light"
                  placeholder="Email Address"
                  value={work_email}
                  onChange={(e)=>setWorkEmail(e.target.value)}
                />

                <div className="mb-10px">
                  <input
                    type="password"
                    className="form-input graphik-light "
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-15px">
                  <Checkbox
                    label="Remember me for 30 days"
                    value={checked}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="mb-10px white text-center graphik-regular fs-14px pointer">
                  Log in
                </button>
                <p className="light-blue fs-12px weight-4 text-center mb-10px">
                  or
                </p>
                <button className="google-login dark-blue mb-20px fs-14px graphik-regular pointer">
                  <GoogleIcon />
                  Sign in with Google
                </button>

                <a
                  href="#"
                  className="dark-blue fs-13px text-center block pointer graphik-light"
                >
                  Forgot your password?
                </a>
              </form>
            </div>
          </div>
        </div>

        <p className="fs-14px text-center light-blue graphik-light">
          Looking for a better way to talk with customers?{" "}
          <a href="#" className="blue graphik-light">
            Try Help Scout
          </a>
        </p>
      </div>
    </div>
  );
  }else if(user && user.roles[0].role == "Admin"){
    return <Navigate to="/admin/users" />
  }else{
  return (
    <div className="py-40px">
      <div className="container-wrapper">
        <div className="text-center mb-40px">
          <Link to="/" className="navbar-left">
            <Logo />
          </Link>
        </div>

        <div className="mb-30px">
          <div className="login-container ">
            <div className="login left">
              <p className="text-center fs-18px dark-blue weight-4 graphik-light mb-20px">
                Messages for Beacon
              </p>

              <Link to="/" className="mb-10px">
                <img src={messagePreviewImg} alt="" />
              </Link>

              <div className="text-center">
                <button className="light-blue pointer">Learn More</button>
              </div>
            </div>
            <div className="login right">
              <p className="login-title text-center fs-24px weight-5 graphik-medium dark-blue ">
                Log in
              </p>

              <p className="text-green">

              {message}
              </p>
              <form className="login-form" onSubmit={loginAccount}>

                <input
                  type="text"
                  className="form-input graphik-light"
                  placeholder="Email Address"
                  value={work_email}
                  onChange={(e)=>setWorkEmail(e.target.value)}
                />

                <div className="mb-10px">
                  <input
                    type="password"
                    className="form-input graphik-light "
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-15px">
                  <Checkbox
                    label="Remember me for 30 days"
                    value={checked}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="mb-10px white text-center graphik-regular fs-14px pointer">
                  Log in
                </button>
                <p className="light-blue fs-12px weight-4 text-center mb-10px">
                  or
                </p>
                <button className="google-login dark-blue mb-20px fs-14px graphik-regular pointer">
                  <GoogleIcon />
                  Sign in with Google
                </button>

                <a
                  href="#"
                  className="dark-blue fs-13px text-center block pointer graphik-light"
                >
                  Forgot your password?
                </a>
              </form>
            </div>
          </div>
        </div>

        <p className="fs-14px text-center light-blue graphik-light">
          Looking for a better way to talk with customers?{" "}
          <a href="#" className="blue graphik-light">
            Try Help Scout
          </a>
        </p>
      </div>
    </div>
  );
    }
}

export default Login;
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
