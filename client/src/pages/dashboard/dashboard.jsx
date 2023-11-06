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
  const [shipmentsDetails, setShipmentsDetails] = useState({
    shipmentsNumber: "",
    completedShipments: "",
    completedShipments: "",
    canceled_shipments: "",
  });

  const dispatch = useDispatch();

  const fetchShipments = async () => {
    try {
      const response = await getShipments();
      const userShipmets = await response.data;
      dispatch(setShipment(userShipmets.data));
      setShipmentsDetails({
        shipmentsNumber: userShipmets.shipments_number,
        completedShipments: userShipmets.completed_shipment,
        inProcess_shipments: userShipmets.inProcess_shipment,
        canceled_shipments: userShipmets.canceled_shipment,
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
