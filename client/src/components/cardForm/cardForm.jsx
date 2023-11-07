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
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

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
    if (!openEdit && !validateForm()) {
      setError(true);
    } else {
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
        closeModal();
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (shipmentDetails) {
      setInput(shipmentDetails);
    }
  }, [shipmentDetails]);

  const validateForm = () => {
    console.log("heree");
    const newErrors = {};
    let isValid = true;

    if (!input.name) {
      newErrors.name = "Name is required";
      isValid = true;
    }

    if (!input.phone) {
      newErrors.phone = "Phone is required";
      isValid = false;
    } else if (isNaN(input.phone)) {
      newErrors.phone = "Phone must be a number";
      isValid = false;
    }
    if (!input.address.latitude) {
      newErrors.latitude = "Latitude is required";
      isValid = false;
    } else if (isNaN(input.address.latitude)) {
      newErrors.latitude = "Latitude must be a number";
      isValid = false;
    }

    if (!input.address.longitude) {
      newErrors.longitude = "Longitude is required";
      isValid = false;
    } else if (isNaN(input.address.longitude)) {
      newErrors.longitude = "Longitude must be a number";
      isValid = false;
    }

    setErrorMessage(newErrors);
    return isValid;
  };

  return (
    <>
      <Modal
        isOpen={openModal}
        onRequestClose={() => {
          closeModal();
          setError(false);
        }}
        ariaHideApp={false}
        className="card-form-modal"
        style={{ overlay: { background: "rgb(0 0 0 / 30%)" } }}>
        <p id="heading">{openEdit ? "Edit Shipment" : "New Shipment"}</p>
        <div className="card-form">
          <div className="flex column gap">
            <h4>waybill:</h4>
            <input
              type="text"
              readOnly
              value={openEdit ? shipmentDetails.waybill : "************"}
              className="waybill-input"
            />
          </div>
          <div className="flex column gap">
            <h4>Name:</h4>
            <Input
              type={"text"}
              name={"name"}
              onchange={handleValueChange}
              placeholder={shipmentDetails?.name || "name"}
            />
            {error && <div className="error-message">{errorMessage.name}</div>}
          </div>
          <div className="flex column gap">
            <h4>Phone:</h4>
            <Input
              type={"text"}
              name={"phone"}
              placeholder={shipmentDetails?.phone_number || "+1 (555) 000-000"}
              onchange={handleValueChange}
            />
            {error && <div className="error-message">{errorMessage.phone}</div>}
          </div>
          <div className="flex column gap">
            <h4>address:</h4>
            <span>
              Latitude
              <Input
                type={"text"}
                name={"latitude"}
                onchange={handleValueChange}
                placeholder={shipmentDetails?.address?.latitude || "latitude"}
              />
              {error && (
                <div className="error-message">{errorMessage.latitude}</div>
              )}
              longitude
              <Input
                type={"text"}
                name={"longitude"}
                onchange={handleValueChange}
                placeholder={shipmentDetails?.address?.longitude || "longitude"}
              />
              {error && (
                <div className="error-message">{errorMessage.longitude}</div>
              )}
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
