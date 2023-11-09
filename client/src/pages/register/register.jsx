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
              src="/assets/register-image.png"
              alt=""
              srcset=""
              className="left-side-image"
            />
          </div>
          <div className="right-side-register flex column">
            <img
              src="/assets/logo-register.png"
              alt=""
              srcset=""
              className="logo-register"
            />
            <div className="right-side-container-register flex column">
              <div className="welcome-title flex">
                <img src="/icons/flesh-icon.svg" alt="" srcset="" />
                Register Here
              </div>
              <div className="input-field flex column">
                <div>
                  <div className="name-input flex input">
                    <img src="/icons/name-icon.svg" alt="name-icon" srcset="" />
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
                    <img
                      src="/icons/email-icon.svg"
                      alt="email-icon"
                      srcset=""
                    />
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
                    <img
                      src="/icons/password-icon.svg"
                      alt="password-icon"
                      srcset=""
                    />
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
                    <img
                      src="/icons/address-icon.svg"
                      alt="address-icon"
                      srcset=""
                    />
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
                Already have an account ?
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
