import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShipment } from "../../rkt/ShipmentSlice";
import { useAxios } from "../../API/queries";
import ShipmentTable from "../../components/shipmentTable/shipmentTable";
import CardForm from "../../components/cardForm/cardForm";
import { selectUser } from "../../rkt/userSlice";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCircleCheck,
  faTruckRampBox,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LoadingLogo from "../../components/loadingLogo/loadingLogo";
import Message from "../../components/Message/message";

function Dashboard() {
  const { getShipments } = useAxios();
  const user = useSelector(selectUser);
  const [openModal, setOpenModal] = useState(false);
  const [shipmentsDetails, setShipmentsDetails] = useState({
    shipmentsNumber: "",
    completedShipments: "",
    inProcessShipments: "",
    canceledShipments: "",
  });
  const [showLogo, setShowLogo] = useState(true);
  const [showMessageNew, setShowMessageNew] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchShipments = async () => {
    try {
      const response = await getShipments();
      const userShipmets = await response.data;
      dispatch(setShipment(userShipmets.data));
      setShipmentsDetails({
        shipmentsNumber: userShipmets.shipments_number,
        completedShipments: userShipmets.completed_shipment,
        inProcessShipments: userShipmets.inProcess_shipment,
        canceledShipments: userShipmets.canceled_shipment,
      });
      setTimeout(() => {
        setShowLogo(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  return (
    <div className="dashboard-page flex column">
      {showLogo ? (
        <LoadingLogo />
      ) : (
        <>
          <div className="top-color"></div>
          <div className="dashboard-items flex column">
            <h1 className="page-title-dashboard">Dashboard</h1>
            <div className="top-dashboard flex">
              <div className="like-dislike-container light-card flex column gap-10 text-align-center">
                <div className="welcome-word">Welcome !</div>
                <div className="flex user-card-detail">
                  <img
                    src="user-default.png"
                    alt=""
                    srcSet=""
                    className="user-image-card"
                  />
                  <div className="user-details flex column ">
                    <div className="user-name">
                      Name :{" "}
                      <span className="user-info-style">{user?.user.name}</span>
                    </div>
                    <div className="user-email">
                      Email :{" "}
                      <span className="user-info-style">
                        {user?.user.email}
                      </span>
                    </div>
                    <div className="user-address">
                      Address :{" "}
                      <span className="user-info-style">
                        {user?.user.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="like-dislike-container text-align-start light-card">
                <div className="card-title">
                  {shipmentsDetails.shipmentsNumber} Total Shipments
                </div>
                <div className="other-details flex">
                  <div className="items-center flex gap-4 column">
                    <div className="icon-details flex gap-4 ">
                      {shipmentsDetails.completedShipments}
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        style={{ color: "#7deb0f" }}
                      />
                    </div>
                    <div>completed</div>
                  </div>
                  <div className="items-center flex gap-4 column">
                    <div className="icon-details flex gap-4 ">
                      {shipmentsDetails.inProcessShipments}
                      <FontAwesomeIcon
                        icon={faTruckRampBox}
                        style={{ color: "#0052e0" }}
                      />
                    </div>
                    <div>In Process</div>
                  </div>
                  <div className="items-center flex gap-4 column">
                    <div className="icon-details flex gap-4">
                      {shipmentsDetails.canceledShipments}
                      <FontAwesomeIcon
                        icon={faBan}
                        style={{ color: "#ff0505" }}
                      />
                    </div>
                    <div>Canceled</div>
                  </div>
                </div>
              </div>
              <div
                className="add-shipment like-dislike-container green-card"
                onClick={() => {
                  setOpenModal(true);
                }}>
                <img src="/icons/plus-icon.svg" alt="" srcSet="" />
                NEW
              </div>
              <div
                className="add-shipment like-dislike-container blue-card"
                onClick={() => {
                  navigate("view");
                }}>
                <img src="/icons/map-icon.svg" alt="" srcSet="" />
                Map
              </div>
            </div>
            <ShipmentTable />
          </div>
          {showMessageNew && (
            <Message text={"New Shipment has been created"} type={"success"} />
          )}
          <CardForm
            openModal={openModal}
            closeModal={closeModal}
            setShowMessageNew={setShowMessageNew}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
