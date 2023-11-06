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
        <div class="like-dislike-container light-card flex gap-4 text-align-center">
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
        <div className="like-dislike-container text-align-start light-card">
          <div className="shipment-number card-title">
            {shipmentsDetails.shipmentsNumber} Total Shipments
          </div>
          <div className="other-details flex gap-4">
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
          <svg
            width="80px"
            height="80px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
              fill="#1C274C"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
              fill="#1C274C"
            />
          </svg>
          NEW
        </div>
        <div
          className="add-shipment like-dislike-container blue-card"
          onClick={() => {
            navigate("view");
          }}>
          <svg
            width="80px"
            height="80px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z"
              stroke="#000000"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Map
        </div>
      </div>
      <ShipmentTable />
      <CardForm openModal={openModal} closeModal={closeModal} />
    </div>
  );
}

export default Dashboard;
