import React from "react";
import "./index.css";
import { useSelector } from "react-redux";
import { userShipments } from "../../rkt/ShipmentSlice";
function ShipmentTable() {
  const userShipment = useSelector(userShipments);
  return (
    <div className="shipments-table">
      <div className="table-row table-header">
        <div className="table-cell">Waybill</div>
        <div className="table-cell">Name</div>
        <div className="table-cell">Phone</div>
        <div className="table-cell">Address</div>
        <div className="table-cell">Actions</div>
      </div>
      {/* {userShipment.data.map(())} */}
      <div className="table-row">
        <div className="table-cell">123456</div>
        <div className="table-cell">John Doe</div>
        <div className="table-cell">555-123-4567</div>
        <div className="table-cell">123 Main St</div>
        <div className="table-cell">
          <button className="edit-button">Edit</button>
          <button className="delete-button">Delete</button>
          <button className="view-button">View</button>
        </div>
      </div>
    </div>
  );
}

export default ShipmentTable;
