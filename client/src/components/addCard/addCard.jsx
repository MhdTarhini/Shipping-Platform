import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCircleXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "./index.css";
import Input from "../input/input";
import { useAxios } from "../../API/queries";

function AddCard({ setshipments, shipmentDetails, closeEdit, openEdit }) {
  const { addShipment } = useAxios();

  const [input, setInput] = useState({
    waybill: "",
    name: "",
    phone: "",
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

  const [is_displayed, setDisplay] = useState(false);

  const handleAddBtn = () => {
    setDisplay(true);
  };
  const handleClick = async (e) => {
    if (is_displayed === true) {
      try {
        const response = await addShipment(
          input,
          openEdit ? shipmentDetails.id : "add"
        );
        const newShipment = await response.data.data;
        if (!openEdit) {
          setshipments((shipments) => [newShipment, ...shipments]);
        }
        setInput({
          waybill: "",
          name: "",
          phone: "",
          address: "",
        });
      } catch (e) {
        console.log(e);
      }
    }
    setDisplay(false);
    closeEdit();
  };

  useEffect(() => {
    if (openEdit) setDisplay(true);
    if (shipmentDetails) {
      setInput(shipmentDetails);
    }
  });

  return (
    <div>
      {!is_displayed && (
        <button className="add-btn" onClick={handleAddBtn}>
          <FontAwesomeIcon icon={faAdd} />
        </button>
      )}
      {is_displayed && (
        <div className="contact-card flex column">
          <FontAwesomeIcon
            icon={faCircleXmark}
            onClick={() => {
              setDisplay(false);
              if (openEdit) {
                closeEdit();
              }
            }}
          />
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
              value={shipmentDetails.name}
            />
          </div>
          <div className="flex column gap">
            <h4>Phone:</h4>
            <Input
              type={"text"}
              name={"phone"}
              value={shipmentDetails.phone}
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
                value={shipmentDetails.address.latitude}
              />
              longitude
              <Input
                type={"text"}
                name={"longitude"}
                onchange={handleValueChange}
                value={shipmentDetails.address.longitude}
              />
            </span>
          </div>
          <div className="controls flex d-row rh-flex-end g-4">
            <button onClick={handleClick}>
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
      )}
    </div>
  );
}

export default AddCard;
