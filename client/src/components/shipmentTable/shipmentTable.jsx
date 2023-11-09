import React, { useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteShipment, userShipments } from "../../rkt/ShipmentSlice";
import { useAxios } from "../../API/queries";
import CardForm from "../cardForm/cardForm";
import Button from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Alert from "../alert/alert";
import Message from "../Message/message";

function ShipmentTable() {
  const userShipment = useSelector(userShipments);
  const [shipmentId, setShipmentId] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [shipmentDetails, setShipmentDetails] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isCofirmed, setIsConfirmed] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [displayShipment, setDisplayedShipment] = useState(userShipment);
  const [showMessageEdit, setShowMessageEdit] = useState(false);

  const { deleteShipmentAPI, searchShipmentsAPI } = useAxios();
  const dispatch = useDispatch();

  const closeModal = () => {
    setOpenModal(false);
  };

  const STATUS = {
    1: "In Process",
    2: "Completed",
    3: "Canceled",
  };

  const handleDelete = async () => {
    try {
      await deleteShipmentAPI({ id: shipmentId });
      dispatch(deleteShipment(shipmentId));
      setIsConfirmed(false);
      setOpenDeleteAlert(false);
    } catch (error) {
      console.log(error);
      setIsConfirmed(false);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await searchShipmentsAPI(searchInput);
      const filteredShipments = await response.data.data;
      setDisplayedShipment(filteredShipments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isCofirmed) handleDelete();
  }, [isCofirmed]);

  useEffect(() => {
    if (searchInput.length == 0) setDisplayedShipment(userShipment);
  }, [searchInput]);

  useEffect(() => {
    setDisplayedShipment(userShipment);
  }, [userShipment]);

  return (
    <div className="table-section">
      {isCofirmed && (
        <Message text={"Your shipment has been deleted"} type={"success"} />
      )}

      {showMessageEdit && (
        <Message text={"Your shipment has been Edited"} type={"success"} />
      )}
      <div className="search-input">
        <div className="group">
          <svg
            className="icon-search"
            aria-hidden="true"
            viewBox="0 0 24 24"
            onClick={() => {
              handleSearch();
            }}>
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            placeholder="Search"
            type="search"
            className="input-search-field"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="table">
        <table className="shipments-table">
          <thead>
            <tr className="table-row table-header">
              <th className="table-cell">Waybill</th>
              <th className="table-cell">Name</th>
              <th className="table-cell">Phone</th>
              <th className="table-cell">Address</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayShipment.length !== 0 ? (
              displayShipment.map((shipment) => (
                <tr className="table-row" key={shipment.waybill}>
                  <td className="table-cell">{shipment.waybill}</td>
                  <td className="table-cell">{shipment.name}</td>
                  <td className="table-cell">{shipment.phone_number}</td>
                  <td className="table-cell">
                    {shipment.address.latitude},{shipment.address.longitude}
                  </td>
                  <td className="table-cell status-cell">
                    {STATUS[shipment.status_id]}
                  </td>
                  <td className="table-cell flex gap-10 action-section">
                    {shipment.status_id === 2 ? (
                      <td className="table-cell icon-section">
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          style={{
                            color: "#7deb0f",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                        Completed
                      </td>
                    ) : shipment.status_id === 3 ? (
                      <td className="icon-section">
                        <FontAwesomeIcon
                          icon={faBan}
                          style={{
                            color: "#ff0505",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                        Canceled
                      </td>
                    ) : (
                      <td className="table-cell flex gap-10">
                        <Button
                          style={"green"}
                          name={"Edit"}
                          onClick={() => {
                            setOpenModal(true);
                            setOpenEdit(true);
                            setShipmentDetails(shipment);
                          }}></Button>
                        <Button
                          style={"red"}
                          name={"Delete"}
                          onClick={() => {
                            setShipmentId(shipment.id);
                            setOpenDeleteAlert(true);
                          }}></Button>
                      </td>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty">
                  No shipments data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <CardForm
        openModal={openModal}
        closeModal={closeModal}
        shipmentDetails={shipmentDetails}
        openEdit={openEdit}
        setShowMessageEdit={setShowMessageEdit}
      />
      {openDeleteAlert && (
        <Alert
          actionName={"Delete"}
          setIsConfirmed={setIsConfirmed}
          alertContent={
            "Are you sure you want to delete your shipment? Your shipment data will be deleted."
          }
          setOpenDeleteAlert={setOpenDeleteAlert}
        />
      )}
    </div>
  );
}

export default ShipmentTable;
