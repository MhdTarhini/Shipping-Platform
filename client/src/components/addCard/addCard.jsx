import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./index.css";
import Input from "../input/input";
import { useAxios } from "../../API/queries";

function AddCard({ shipments, setshipments }) {
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
    console.log("1");
    if (is_displayed === true) {
      console.log("2");
      try {
        const response = await addShipment(input, "add");
        setshipments((shipments) => [...shipments, response.data]);
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
  };

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
            }}
          />
          <div className="flex column gap">
            <h4>waybill:</h4>
            <input defaultValue="************" type="text" readOnly />
          </div>
          <div className="flex column gap">
            <h4>Name:</h4>
            <Input type={"text"} name={"name"} onchange={handleValueChange} />
          </div>
          <div className="flex column gap">
            <h4>Phone:</h4>
            <Input type={"text"} name={"phone"} onchange={handleValueChange} />
          </div>
          <div className="flex column gap">
            <h4>address:</h4>
            <span>
              Latitude
              <Input
                type={"text"}
                name={"latitude"}
                onchange={handleValueChange}
              />
              longitude
              <Input
                type={"text"}
                name={"longitude"}
                onchange={handleValueChange}
              />
            </span>
          </div>
          <div className="controls flex d-row rh-flex-end g-4">
            <button onClick={handleClick}>
              <FontAwesomeIcon icon={faAdd} /> Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCard;
