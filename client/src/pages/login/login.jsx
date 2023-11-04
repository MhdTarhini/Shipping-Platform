import React, { useState } from "react";
import "./index.css";
import Input from "../../components/input/input";
import { register } from "../../API/queries";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLoginData = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleLoginUser = () => {};

  return (
    <div>
      <div className="login-page flex row">
        <img src="top-side.png" alt="" srcset="" className="top-login" />
        <div className="right-side-login flex column ">
          <div className="right-side-container flex column">
            <div className="welcome-title flex">
              {" "}
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Welcome
            </div>
            <div className="input-field flex column">
              <div className="email-input flex input">
                <svg
                  width="35px"
                  height="35px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <Input
                  label={"mail@example.com"}
                  type={"text"}
                  onchange={handleLoginData}
                  name={"email"}
                />
              </div>
              <div className="password-input flex input">
                <svg
                  width="35px"
                  height="35px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.584 6C15.8124 4.2341 14.0503 3 12 3C9.23858 3 7 5.23858 7 8V10.0288M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C16.8802 10 17.7202 10 18.362 10.327C18.9265 10.6146 19.3854 11.0735 19.673 11.638C20 12.2798 20 13.1198 20 14.8V16.2C20 17.8802 20 18.7202 19.673 19.362C19.3854 19.9265 18.9265 20.3854 18.362 20.673C17.7202 21 16.8802 21 15.2 21H8.8C7.11984 21 6.27976 21 5.63803 20.673C5.07354 20.3854 4.6146 19.9265 4.32698 19.362C4 18.7202 4 17.8802 4 16.2V14.8C4 13.1198 4 12.2798 4.32698 11.638C4.6146 11.0735 5.07354 10.6146 5.63803 10.327C5.99429 10.1455 6.41168 10.0647 7 10.0288Z"
                    stroke="#000000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <Input
                  label={"password"}
                  type={"password"}
                  onchange={handleLoginData}
                  name={"password"}
                />
              </div>
            </div>
            <div className="forget-password">forgot password ?</div>
            <div className="login-btn flex" onClick={handleLoginUser}>
              Login
            </div>
            <div className="go-register flex">
              Don't have an account ?
              <div
                className="login-register-btn"
                onClick={() => {
                  navigate("/register");
                }}>
                Register
              </div>
            </div>
          </div>
        </div>
        <div className="left-side-login">
          <img
            src="login-image.png"
            alt=""
            srcset=""
            className="left-side-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
