import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const register = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/guest/register`, userData);
  return response;
};

export const login = (userData) =>
  axios.post(`${API_BASE_URL}/guest/login`, userData);
  
  export const deleteShipment = (shipmentData) =>
    axios.post(`${API_BASE_URL}/shipment/delete`, shipmentData);

  export const getshipments = (shipmentData) =>
    axios.get(`${API_BASE_URL}/shipment/get_shipments`, shipmentData);