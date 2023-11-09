import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setShipment } from "../../rkt/ShipmentSlice";
import { useAxios } from "../../API/queries";
import ShipmentTable from "../../components/shipmentTable/shipmentTable";
import CardForm from "../../components/cardForm/cardForm";
import "./index.css";
import { useNavigate } from "react-router-dom";
import LoadingLogo from "../../components/loadingLogo/loadingLogo";
import Message from "../../components/Message/message";
import UserInfoCard from "../../components/userInfoCard/userInfoCard";
import ShipmentInfoCard from "../../components/shipmentInfoCard/shipmentInfoCard";
import TopDashboardButton from "../../components/topDashboardButton/topDashboardButton";

function Dashboard() {
  const { getShipments } = useAxios();
  const [openModal, setOpenModal] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [showMessageNew, setShowMessageNew] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchShipments = async () => {
    try {
      const response = await getShipments();
      const userShipmets = await response.data;
      dispatch(setShipment(userShipmets));
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
              <UserInfoCard />
              <ShipmentInfoCard />
              {/* ADD NEW SHIPMENT */}
              <TopDashboardButton
                text={"New"}
                onClick={() => {
                  setOpenModal(true);
                }}
                buttonIcon={"/icons/plus-icon.svg"}
                buttonColor={"green-card"}
              />
              {/* NAVIGATE TO MAP */}
              <TopDashboardButton
                text={"Map"}
                onClick={() => {
                  navigate("view");
                }}
                buttonIcon={"/icons/map-icon.svg"}
                buttonColor={"blue-card"}
              />
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
