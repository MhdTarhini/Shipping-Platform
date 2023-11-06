import ShipmentCard from "../shipmentCard/shipmentCard";
import "./index.css";
import { userShipments } from "../../rkt/ShipmentSlice";
import { useSelector } from "react-redux";

function CardList({ setShipmentDetails }) {
  const userShipment = useSelector(userShipments);
  return (
    <div className="card-list flex column">
      {userShipment.map((shipment) => (
        <ShipmentCard
          shipment={shipment}
          key={shipment.id}
          id={shipment.id}
          name={shipment.name}
          phone={shipment.phone_number}
          address={shipment.address}
          waybill={shipment.waybill}
          setShipmentDetails={setShipmentDetails}
        />
      ))}
    </div>
  );
}

export default CardList;
