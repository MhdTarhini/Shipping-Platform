import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import ShipmentCard from "../shipmentCard/shipmentCard";
import { deleteShipment } from "../../API/queries";

function ContactList({ shipment, setShipment, setShipmentDetails }) {
  const [shipment_id, setShipmentID] = useState(0);
  const handleDelete = async (shipment_id) => {
    const response = await deleteShipment(shipment_id);
    if (response.data.status) {
      const updatedShipmentsList = shipment.filter(
        (shipment) => shipment.id !== shipment_id
      );
      setShipment(updatedShipmentsList);
    }
  };

  useEffect(() => {
    if (shipment_id) handleDelete(shipment_id);
  }, [shipment_id]);

  return (
    <div>
      {shipment.map((shipment) => (
        <ShipmentCard
          shipment={shipment}
          key={shipment.id}
          id={shipment.id}
          name={shipment.name}
          phone={shipment.phone_number}
          address={shipment.address}
          waybill={shipment.waybill}
          setShipmentID={setShipmentID}
          setShipmentDetails={setShipmentDetails}
        />
      ))}
    </div>
  );
}

export default ContactList;
