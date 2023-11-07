import React, { useEffect, useState } from "react";
import Input from "../../components/input/input";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../API/queries";
import Loading from "../../components/loading/loading";
import { validateUserData } from "../../components/validateUserData/validateUserData";
import LoadingLogo from "../../components/loadingLogo/loadingLogo";

function Register() {
  const { register } = useAxios();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  const navigate = useNavigate();

  const handleRegisterData = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrorMessage({
      ...errorMessage,
      [name]: "",
    });
  };

  const registerUserData = async () => {
    const { isValid, errors } = validateUserData(userData);
    if (!isValid) {
      setError(true);
      setErrorMessage(errors);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } else {
      setError(false);
      try {
        const response = await register(userData);
        if (response.data.status === "success") {
          setIsLoading(false);
          navigate("/");
        }
      } catch (error) {
        setIsLoading(false);
        setError(true);
        setErrorMessage({
          name: error.response.data.errors?.name,
          email: error.response.data.errors?.email,
          password: error.response.data.errors?.password,
          address: error.response.data.errors?.address,
        });
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowLogo(false);
    }, 3000);
  }, []);

  return (
    <>
      {showLogo ? (
        <LoadingLogo />
      ) : (
        <div className="register-page flex row">
          <div className="left-side-register">
            <img
              src="register-image.png"
              alt=""
              srcset=""
              className="left-side-image"
            />
          </div>
          <div className="right-side-register flex column">
            <img
              src="logo-register.png"
              alt=""
              srcset=""
              className="logo-register"
            />
            <div className="right-side-container-register flex column">
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
                Register Here
              </div>
              <div className="input-field flex column">
                <div>
                  <div className="name-input flex input">
                    <svg
                      width="35px"
                      height="35px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g id="User / User_Card_ID">
                        <path
                          id="Vector"
                          d="M6 18C6.06366 18 6.12926 18 6.19691 18H12M6 18C5.01173 17.9992 4.49334 17.9868 4.0918 17.7822C3.71547 17.5905 3.40973 17.2837 3.21799 16.9074C3 16.4796 3 15.9203 3 14.8002V9.2002C3 8.08009 3 7.51962 3.21799 7.0918C3.40973 6.71547 3.71547 6.40973 4.0918 6.21799C4.51962 6 5.08009 6 6.2002 6H17.8002C18.9203 6 19.4796 6 19.9074 6.21799C20.2837 6.40973 20.5905 6.71547 20.7822 7.0918C21 7.5192 21 8.07899 21 9.19691V14.8031C21 15.921 21 16.48 20.7822 16.9074C20.5905 17.2837 20.2837 17.5905 19.9074 17.7822C19.48 18 18.921 18 17.8031 18H12M6 18C6.00004 16.8954 7.34317 16 9 16C10.6569 16 12 16.8954 12 18M6 18C6 18 6 17.9999 6 18ZM18 14H14M18 11H15M9 13C7.89543 13 7 12.1046 7 11C7 9.89543 7.89543 9 9 9C10.1046 9 11 9.89543 11 11C11 12.1046 10.1046 13 9 13Z"
                          stroke="#000000"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </svg>
                    <Input
                      placeholder={"name"}
                      type={"text"}
                      onchange={handleRegisterData}
                      name={"name"}
                    />
                  </div>
                  {error && <div className="error">{errorMessage.name}</div>}
                </div>
                <div>
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
                      placeholder={"mail@example.com"}
                      type={"text"}
                      onchange={handleRegisterData}
                      name={"email"}
                    />
                  </div>
                  {error && <div className="error">{errorMessage.email}</div>}
                </div>

                <div>
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
                      placeholder={"password"}
                      type={"password"}
                      onchange={handleRegisterData}
                      name={"password"}
                    />
                  </div>
                  {error && (
                    <div className="error">{errorMessage.password}</div>
                  )}
                </div>
                <div>
                  <div className="address-input flex input">
                    <svg
                      fill="#000000"
                      width="35px"
                      height="35px"
                      viewBox="0 0 32 32"
                      style={{
                        fillRule: "evenodd",
                        clipRule: "evenodd",
                        strokeLinejoin: "round",
                        strokeMiterlimit: 1.5,
                      }}
                      version="1.1">
                      <g id="Layer1">
                        <path d="M16,2c-6.071,0 -11,4.929 -11,11c0,2.778 1.654,6.081 3.699,9.019c2.939,4.224 6.613,7.707 6.613,7.707c0.386,0.365 0.99,0.365 1.376,-0c0,-0 3.674,-3.483 6.613,-7.707c2.045,-2.938 3.699,-6.241 3.699,-9.019c0,-6.071 -4.929,-11 -11,-11Zm0,5.5c-3.036,0 -5.5,2.464 -5.5,5.5c0,3.036 2.464,5.5 5.5,5.5c3.036,-0 5.5,-2.464 5.5,-5.5c0,-3.036 -2.464,-5.5 -5.5,-5.5Zm0,2c1.932,0 3.5,1.568 3.5,3.5c0,1.932 -1.568,3.5 -3.5,3.5c-1.932,-0 -3.5,-1.568 -3.5,-3.5c0,-1.932 1.568,-3.5 3.5,-3.5Z" />
                      </g>
                    </svg>
                    <Input
                      placeholder={"address"}
                      type={"text"}
                      onchange={handleRegisterData}
                      name={"address"}
                    />
                  </div>
                  {error && <div className="error">{errorMessage.address}</div>}
                </div>
              </div>
              <div
                className={`register-btn flex `}
                onClick={() => {
                  setIsLoading(true);
                  registerUserData();
                }}>
                {isLoading ? <Loading /> : "Register"}
              </div>
              <div className="go-login flex">
                already have an account ?
                <div
                  className="register-register-btn"
                  onClick={() => {
                    navigate("/");
                  }}>
                  Login
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
