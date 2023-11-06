import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../rkt/userSlice";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const useAxios = () => {
  const user = useSelector(selectUser);
  const token = user?.authorisation?.token;

  const authAxios = axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });

  const register = async (userData) => {
    const response = await authAxios.post(`/guest/register`, userData);
    return response;
  };

  const login = async (userData) => {
    const response = await authAxios.post(`/guest/login`, userData);
    return response;
  };

  const logoutAPI = async () => {
    const response = await authAxios.post(`/logout`);
    return response;
  };

  const deleteShipmentAPI = async (shipmentData) => {
    const response = await authAxios.post(`/shipment/delete`, shipmentData);
    return response;
  };

  const getShipments = async () => {
    const response = await authAxios.get(`/shipment/get`);
    return response;
  };

  const addShipmentAPI = async (shipmentData, param) => {
    const response = await authAxios.post(
      `/shipment/add_edit/${param}`,
      shipmentData
    );
    return response;
  };

  return {
    register,
    login,
    deleteShipmentAPI,
    getShipments,
    addShipmentAPI,
    logoutAPI,
  };
};

