import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShipment, userShipments } from "../../rkt/ShipmentSlice";
import { useAxios } from "../../API/queries";

function Dashboard() {
  const { getShipments } = useAxios();
  const shipments = useSelector(userShipments);

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
    </div>
  );
}

export default Dashboard;
