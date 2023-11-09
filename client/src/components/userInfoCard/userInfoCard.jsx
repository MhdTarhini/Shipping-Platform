import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../rkt/userSlice";
import "./index.css";

function UserInfoCard() {
  const user = useSelector(selectUser);
  return (
    <div className="like-dislike-container light-card flex column gap-10 text-align-center">
      <div className="welcome-word">Welcome !</div>
      <div className="flex user-card-detail">
        <img
          src="/assets/user-default.png"
          alt=""
          srcSet=""
          className="user-image-card"
        />
        <div className="user-details flex column ">
          <div className="user-name">
            Name : <span className="user-info-style">{user?.user.name}</span>
          </div>
          <div className="user-email">
            Email : <span className="user-info-style">{user?.user.email}</span>
          </div>
          <div className="user-address">
            Address :{" "}
            <span className="user-info-style">{user?.user.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfoCard;
