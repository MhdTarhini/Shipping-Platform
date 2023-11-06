import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShipment, userShipments } from "../../rkt/ShipmentSlice";
import { useAxios } from "../../API/queries";
import ShipmentTable from "../../components/shipmentTable/shipmentTable";
import Button from "../../components/button/button";
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

  console.log(shipmentsDetails);

  return (
    <div className="dashboard-page flex column">
      <h1 className="page-title-dashboard">Dashboard</h1>
      <div className="top-dashboard flex">
        <div class="like-dislike-container light-card flex column gap-4 text-align-center">
          <div className="welcome-word">Welcome !</div>
          <div className="flex user-card-detail">
            <img
              src="user-default.png"
              alt=""
              srcset=""
              className="user-image-card"
            />
            <div className="user-details flex column ">
              <div className="user-name">{user.user.name}</div>
              <div className="user-email">{user.user.email}</div>
              <div className="user-address">{user.user.address}</div>
            </div>
          </div>
        </div>
        <div className="like-dislike-container text-align-start light-card">
          <div className="shipment-number card-title">
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
                <FontAwesomeIcon icon={faBan} style={{ color: "#ff0505" }} />
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
          <img src="plus-icon.svg" alt="" srcset="" />
          NEW
        </div>
        <div
          className="add-shipment like-dislike-container blue-card"
          onClick={() => {
            navigate("view");
          }}>
          <img src="map-icon.svg" alt="" srcset="" />
          Map
        </div>
      </div>
      <ShipmentTable />
      <CardForm openModal={openModal} closeModal={closeModal} />
    </div>
  );
}

export default Dashboard;
