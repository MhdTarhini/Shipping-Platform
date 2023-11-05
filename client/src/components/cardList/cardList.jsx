import { useEffect, useState } from "react";
import ShipmentCard from "../shipmentCard/shipmentCard";
import { deleteShipment } from "../../API/queries";

function ContactList({ shipment, setShipment, setShipmentDetails }) {
  const [shipmentId, setshipmentId] = useState(0);
  const handleDelete = async (shipmentId) => {
    const response = await deleteShipment(shipmentId);
    if (response.data.status) {
      const updatedShipmentsList = shipment.filter(
        (shipment) => shipment.id !== shipmentId
      );
      setShipment(updatedShipmentsList);
    }
  };

  useEffect(() => {
    if (shipmentId) handleDelete(shipmentId);
  }, [shipmentId]);

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
          setshipmentId={setshipmentId}
          setShipmentDetails={setShipmentDetails}
        />
      ))}
    </div>
  );
}

export default ContactList;
