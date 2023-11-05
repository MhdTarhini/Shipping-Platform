import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faLocationDot,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { useState } from "react";
import AddCard from "../addCard/addCard";

function ShipmentCard({
  id,
  waybill,
  name,
  phone,
  address,
  setShipmentId,
  setShipmentDetails,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const handleContactDetails = () => {
    const contact_obj = {
      waybill: waybill,
      name: name,
      phone: phone,
      address: address,
    };
    setShipmentDetails(contact_obj);
  };

  const closeEdit = () => {
    setOpenEdit(false);
  };
  return (
    <>
      {openEdit ? (
        <AddCard
          shipmentDetails={{ id, waybill, name, phone, address }}
          closeEdit={closeEdit}
          openEdit={openEdit}
        />
      ) : (
        <div
          className="shipment-card flex column"
          onClick={handleContactDetails}>
          <div className="flex gap-4">
            <span># {waybill}</span>
          </div>
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
            <span>{address?.latitude}</span>,<span>{address?.longitude}</span>
          </div>
          {/* <div className="controls flex gap-4">
            <button onClick={handleContactDetails}>
              <FontAwesomeIcon icon={faLocationDot} /> Locate
            </button>
            <button
              className="card-btn"
              onClick={() => {
                setOpenEdit(true);
              }}>
              <FontAwesomeIcon icon={faEdit} />
              Edit
            </button>
            <button onClick={() => setShipmentId(id)} className="card-btn">
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div> */}
        </div>
      )}
    </>
  );
}

export default ShipmentCard;
