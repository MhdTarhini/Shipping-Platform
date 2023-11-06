import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShipment, userShipments } from "../../rkt/ShipmentSlice";
import { useAxios } from "../../API/queries";
import ShipmentTable from "../../components/shipmentTable/shipmentTable";
import Button from "../../components/button/button";
import CardForm from "../../components/cardForm/cardForm";

function Dashboard() {
  const { getShipments } = useAxios();
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const fetchShipments = async () => {
    try {
      const response = await getShipments();
      const userShipmets = await response.data.data;
      dispatch(setShipment(userShipmets));
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
    <div>
      <h1>Dashboard</h1>
      <div className="top-dashboard">
        <div className="user-card"></div>
        <div className="user-shipment-card"></div>
      </div>
      <Button
        name={"+ Create New Shipment"}
        style={"primary"}
        onClick={() => {
          setOpenModal(true);
        }}
      />
      <ShipmentTable />
      <CardForm openModal={openModal} closeModal={closeModal} />
    </div>
  );
}

export default Dashboard;
