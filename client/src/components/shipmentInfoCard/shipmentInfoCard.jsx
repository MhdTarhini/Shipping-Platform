import React from "react";
import { useSelector } from "react-redux";
import { userShipments } from "../../rkt/ShipmentSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCircleCheck,
  faTruckRampBox,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

function ShipmentInfoCard() {
  const shipmentsDetails = useSelector(userShipments);
  return (
    <div className="like-dislike-container text-align-start light-card">
      <div className="card-title">
        {shipmentsDetails.shipments_number} Total Shipments
      </div>
      <div className="other-details flex">
        <div className="items-center flex gap-4 column">
          <div className="icon-details flex gap-4 ">
            {shipmentsDetails.completed_shipment}
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "#7deb0f" }}
            />
          </div>
          <div>completed</div>
        </div>
        <div className="items-center flex gap-4 column">
          <div className="icon-details flex gap-4 ">
            {shipmentsDetails.inProcess_shipment}
            <FontAwesomeIcon
              icon={faTruckRampBox}
              style={{ color: "#0052e0" }}
            />
          </div>
          <div>In Process</div>
        </div>
        <div className="items-center flex gap-4 column">
          <div className="icon-details flex gap-4">
            {shipmentsDetails.canceled_shipment}
            <FontAwesomeIcon icon={faBan} style={{ color: "#ff0505" }} />
          </div>
          <div>Canceled</div>
        </div>
      </div>
    </div>
  );
}

export default ShipmentInfoCard;
