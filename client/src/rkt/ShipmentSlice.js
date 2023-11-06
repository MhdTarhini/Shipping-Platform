import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shipments: [],
};

export const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {
    setShipment: (state, action) => {
      state.shipments = action.payload;
    },
    addShipment: (state, action) => {
      state.shipments.unshift(action.payload);
    },
    editShipment: (state, action) => {
      const { id, newShipment } = action.payload;
      const index = state.shipments.findIndex((shipment) => shipment.id === id);
      if (index !== -1) {
        state.shipments[index] = {
          ...state.shipments[index],
          ...newShipment,
        };
      }
    },
    deleteShipment: (state, action) => {
      state.shipments = state.shipments.filter(
        (shipment) => shipment.id !== action.payload
      );
    },
  },
});

export const { setShipment, addShipment, editShipment, deleteShipment } =
  shipmentSlice.actions;

export const userShipments = (state) => state.shipment.shipments;

export default shipmentSlice.reducer;
