import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShipment, userShipments } from "../../rkt/ShipmentSlice";
import { useAxios } from "../../API/queries";
import ShipmentTable from "../../components/shipmentTable/shipmentTable";

function Dashboard() {
  const { getShipments } = useAxios();

  const dispatch = useDispatch();

  const fetchShipments = async () => {
    try {
      const response = await getShipments();
      dispatch(setShipment(response.data.data));
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
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
      <ShipmentTable />
    </div>
  );
}

export default Dashboard;
