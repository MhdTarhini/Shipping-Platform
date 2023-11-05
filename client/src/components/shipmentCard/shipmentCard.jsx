import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faLocationPin,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

function ShipmentCard({
  id,
  waybill,
  name,
  phone,
  address,
  setShipmentID,
  setShipmentDetails,
}) {
  const handleContactDetails = () => {
    const contact_obj = {
      waybill: waybill,
      name: name,
      phone: phone,
      address: address,
    };
    setShipmentDetails(contact_obj);
  };
  return (
    <div className="contact-card flex column">
      <div className="flex gap-4">
        <h4>Name:</h4>
        <span>{name}</span>
      </div>
      <div className="flex gap-4">
        <h4>Phone:</h4>
        <span>{phone}</span>
      </div>
      <div className="flex gap-4">
        <h4>Address:</h4>
        <span>{address}</span>
      </div>
      <div className="controls flex gap-4">
        <button onClick={handleContactDetails}>
          <FontAwesomeIcon icon={faLocationPin} /> Locate
        </button>
        <button className="card-btn">
          <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
        <button onClick={() => setShipmentID(id)} className="card-btn">
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>
    </div>
  );
}

export default ShipmentCard;
