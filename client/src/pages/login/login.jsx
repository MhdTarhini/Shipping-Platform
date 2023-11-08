import React, { useEffect, useState } from "react";
import "./index.css";
import Input from "../../components/input/input";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../API/queries";
import Loading from "../../components/loading/loading";
import { validateUserData } from "../../components/validateUserData/validateUserData";
import { useDispatch } from "react-redux";
import { setUser } from "../../rkt/userSlice";
import LoadingLogo from "../../components/loadingLogo/loadingLogo";

function Login() {
  const { login } = useAxios();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginData = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleLoginUser = async () => {
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
        const response = await login(userData);
        dispatch(setUser(response.data));
        if (response.data.status === "success") {
          navigate("/v1");
        }
      } catch (error) {
        setError(true);
        setErrorMessage({
          email: error.response.data.errors?.email,
          password: error.response.data.errors?.password,
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
    <div>
      {showLogo ? (
        <LoadingLogo />
      ) : (
        <div className="login-page flex row">
          <img src="top-side.png" alt="" srcset="" className="top-login" />
          <div className="right-side-login flex column ">
            <div className="right-side-container flex column">
              <div className="welcome-title flex">
                <img src="/icons/flesh-icon.svg" alt="welcome" srcset="" />
                Welcome
              </div>
              <div className="input-field flex column">
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
                      onchange={handleLoginData}
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
                      onchange={handleLoginData}
                      name={"password"}
                    />
                  </div>
                  {error && (
                    <div className="error">{errorMessage.password}</div>
                  )}
                </div>
              </div>
              <div className="forget-password">forgot password ?</div>
              <div
                className="login-btn flex"
                onClick={() => {
                  setIsLoading(true);
                  handleLoginUser();
                }}>
                {isLoading ? <Loading /> : "Login"}
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
      )}
    </div>
  );
}

export default Login;
