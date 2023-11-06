import React, { useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteShipment, userShipments } from "../../rkt/ShipmentSlice";
import { useAxios } from "../../API/queries";
import CardForm from "../cardForm/cardForm";
import Button from "../button/button";

function ShipmentTable() {
  const userShipment = useSelector(userShipments);
  const [shipmentId, setShipmentId] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [shipmentDetails, setShipmentDetails] = useState([]);
  const { deleteShipmentAPI } = useAxios();

  const dispatch = useDispatch();

  const handleDelete = async (shipmentId) => {
    try {
      const response = await deleteShipmentAPI({ id: shipmentId });
      if (response.data.status === "success") {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (shipmentId) handleDelete(shipmentId);
  }, [shipmentId]);

  const closeModal = () => {
    setOpenModal(false);
  };

  console.log(userShipment);

  return (
    <>
      <div className="shipments-table">
        <div className="table-row table-header">
          <div className="table-cell">Waybill</div>
          <div className="table-cell">Name</div>
          <div className="table-cell">Phone</div>
          <div className="table-cell">Address</div>
          <div className="table-cell">Actions</div>
        </div>
        {userShipment.length != 0 ? (
          userShipment.map((shipment) => {
            return (
              <div className="table-row" key={shipment.waybill}>
                <div className="table-cell">{shipment.waybill}</div>
                <div className="table-cell">{shipment.name}</div>
                <div className="table-cell">{shipment.phone_number}</div>
                <div className="table-cell">
                  {shipment.address.latitude},{shipment.address.longitude}
                </div>
                <div className="table-cell">
                  <button
                    className="edit-button btn-form"
                    onClick={() => {
                      setOpenModal(true);
                      setOpenEdit(true);
                      setShipmentDetails(shipment);
                    }}>
                    Edit
                  </button>
                  <Button
                    color={"red"}
                    name={"delete"}
                    onClick={() => {
                      setShipmentId(shipment.id);
                      dispatch(deleteShipment(shipment.id));
                    }}>
                    Delete
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty">There no shipment data</div>
        )}
      </div>
      <CardForm
        openModal={openModal}
        closeModal={closeModal}
        shipmentDetails={shipmentDetails}
        openEdit={openEdit}
      />
    </>
  );
}

export default ShipmentTable;
