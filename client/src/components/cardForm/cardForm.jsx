import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faPen } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "./index.css";
import Input from "../input/input";
import { useAxios } from "../../API/queries";
import { useDispatch } from "react-redux";
import { addShipment, editShipment } from "../../rkt/ShipmentSlice";
import Modal from "react-modal";

function CardForm({ shipmentDetails, closeModal, openModal, openEdit }) {
  const { addShipmentAPI } = useAxios();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    waybill: "",
    name: "",
    phone: "",
    status_id: "1",
    address: {
      latitude: "",
      longitude: "",
    },
  });

  const handleValueChange = (e) => {
    if (e.target.name === "latitude" || e.target.name === "longitude") {
      setInput({
        ...input,
        address: {
          ...input.address,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleClick = async (e) => {
    try {
      const response = await addShipmentAPI(
        input,
        openEdit ? shipmentDetails.id : "add"
      );
      const newShipment = await response.data.data;
      if (!openEdit) {
        dispatch(addShipment(newShipment));
      } else {
        const id = shipmentDetails.id;
        dispatch(editShipment({ id, newShipment }));
      }

      setInput({
        waybill: "",
        name: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.log(error);
    }
    closeModal();
  };

  useEffect(() => {
    if (shipmentDetails) {
      setInput(shipmentDetails);
    }
  }, [shipmentDetails]);

  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="card-form-modal"
        style={{ overlay: { background: "rgb(0 0 0 / 30%)" } }}>
        <p id="heading">{openEdit ? "Edit Shipment" : "New Shipment"}</p>
        <div>
          <div className="flex column gap">
            <h4>waybill:</h4>
            <input
              type="text"
              readOnly
              value={openEdit ? shipmentDetails.waybill : "************"}
            />
          </div>
          <div className="flex column gap">
            <h4>Name:</h4>
            <Input
              type={"text"}
              name={"name"}
              onchange={handleValueChange}
              placeholder={shipmentDetails?.name}
            />
          </div>
          <div className="flex column gap">
            <h4>Phone:</h4>
            <Input
              type={"text"}
              name={"phone"}
              placeholder={shipmentDetails?.phone_number}
              onchange={handleValueChange}
            />
          </div>
          <div className="flex column gap">
            <h4>address:</h4>
            <span>
              Latitude
              <Input
                type={"text"}
                name={"latitude"}
                onchange={handleValueChange}
                placeholder={shipmentDetails?.address?.latitude}
              />
              longitude
              <Input
                type={"text"}
                name={"longitude"}
                onchange={handleValueChange}
                placeholder={shipmentDetails?.address?.longitude}
              />
            </span>
          </div>
          <div className="controls flex d-row rh-flex-end g-4">
            <button onClick={handleClick} className="btn-form">
              {openEdit ? (
                <div>
                  <FontAwesomeIcon icon={faPen} /> Update
                </div>
              ) : (
                <div>
                  <FontAwesomeIcon icon={faAdd} /> Create
                </div>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CardForm;
