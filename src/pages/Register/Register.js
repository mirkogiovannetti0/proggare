import Logo from "components/Logo/Logo";
import {useState} from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ReactComponent as RegisterImg1 } from "assets/images/register-img-1.svg";
import { ReactComponent as RegisterBooksImg } from "assets/images/register-books-img.svg";
import axios from "axios";

const LabelInput = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  InputComponent,
  wrapperClassName,
  hint,
}) => {
  return (
    <div className={wrapperClassName}>
      <label className="fs-13px dark-blue mb-5px block">
        {label}
      </label>
      {InputComponent ? (
        <InputComponent />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="form-input graphik-light"
          value={value}
          onChange={onChange}
          id={label}
        />
      )}
      <p className="fs-13px gray mb-5px block">{hint}</p>
    </div>
  );
};

function Register() {
  const [first_name,setFirstName] = useState('');
  const [last_name,setLastName] = useState('');
  const [company_name,setCompanyName] = useState('');
  const [phone_number,setPhoneNumber] = useState('');
  const [work_email,setWorkEmail] = useState('');
  const [password,setPassword] = useState('');
  const [message,setMessage] = useState('');

  const registerAccount = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("first_name",first_name);
    data.append("last_name",last_name);
    data.append("company_name",company_name);
    data.append("phone_number",phone_number);
    data.append("work_email",work_email);
    data.append("password",password);
    axios({
      method: "post",
      url: "http://matteodicastro.it/progare-api/public/register",
      data: data,
      headers: {
        "Accept":"application/json",
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        if(response.status == 201){
          setMessage(response.data.message);
          setWorkEmail("");
          setCompanyName("");
          setPhoneNumber("");
          setFirstName("");
          setLastName("");
          setPassword("");
        }
      })
      .catch(function (error) {
        var keys = Object.keys(error.response.data.errors);
        console.log(error.response.data.errors);
        keys.forEach((key)=>{
          error.response.data.errors[key].forEach((err)=>{
            setMessage(err);
          })
        })
      });

  };
  return (
    <div className="register-wrapper">
      <div className="py-40px">
        <div className="container-wrapper">
          <div className="text-center mb-20px">
            <Link to="/" className="navbar-left">
              <Logo />
            </Link>
          </div>

          <div className="mb-55px">
            <div className="register-form-wrapper ">
              <div className="register-image-1">
                <RegisterImg1 />
              </div>
              <div className="register-books-img">
                <RegisterBooksImg />
              </div>

              <p className="text-center dark-blue fs-24px graphik-medium mb-20px">
                Start Your Free Trial
              </p>

              <ul className="free-trial-box mb-40px">
                <li className="fs-14px dark-blue graphik-light">
                  15-day trial
                </li>
                <li className="fs-14px dark-blue graphik-light">
                  No credit card required
                </li>
              </ul>
              <p>

              {message}
              </p>

              <form className="register-form mb-25px" onSubmit={registerAccount}>
                <LabelInput
                  label="First name"
                  placeholder="Help"
                  value={first_name}
                  onChange={(e)=>setFirstName(e.target.value)}
                  />
                <LabelInput
                  label="Last name"
                  placeholder="Scout"
                  value={last_name}
                  onChange={(e)=>setLastName(e.target.value)}
                  />
                <LabelInput
                  label="Company name"
                  placeholder="Scout's club"
                  value={company_name}
                  onChange={(e)=>setCompanyName(e.target.value)}
                  />
                <LabelInput
                  label="Work email"
                  placeholder="scout@company.com"
                  value={work_email}
                  onChange={(e)=>setWorkEmail(e.target.value)}
                />
                <LabelInput
                  label="Password"
                  placeholder="Password"
                  type="password"
                  hint="At least 8 characters "
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  wrapperClassName="mb-10px"
                />
                <LabelInput
                  label="Phone number (optional)"
                  wrapperClassName="mb-10px"
                  InputComponent={() => (
                    <PhoneInput
                      country={"us"}
                      value={phone_number}
                      onChange={(e)=>setPhoneNumber(e)}
                      containerClass="containerClass"
                    />
                  )}
                />

                <button className="register-btn pointer fs-14px white graphik-regular">
                  Get Your Account
                </button>
              </form>

              <p className="register-terms fs-12px weight-3 light-blue text-center mb-10px">
                By clicking this button, you agree to our{" "}
                <a href="#" className="fs-12px weight-3 light-blue text-center">
                  Terms
                </a>
                ,{" "}
                <a href="#" className="fs-12px weight-3 light-blue text-center">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="fs-12px weight-3 light-blue text-center">
                  Security Policy
                </a>
                .
              </p>
            </div>
          </div>

          <div className="register-form-footer">
            <p className="text-center fs-13px dark-blue graphik-regular mb-15px">
              Trusted by more than 12,000 businesses
            </p>

            <div className="register-form-brands mb-20px">
              <img
                src="https://dhmmnd775wlnp.cloudfront.net/a0804b3cf5/images/logos/signup/litmus.png"
                alt=""
              />
              <img
                src="https://dhmmnd775wlnp.cloudfront.net/a0804b3cf5/images/logos/signup/zapier.png"
                alt=""
              />
              <img
                src="https://dhmmnd775wlnp.cloudfront.net/a0804b3cf5/images/logos/signup/superhuman.png"
                alt=""
              />
              <img
                src="https://dhmmnd775wlnp.cloudfront.net/a0804b3cf5/images/logos/signup/spindrift.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
