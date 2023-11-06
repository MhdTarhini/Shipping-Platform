import React, { useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";
import "./index.css";
import "leaflet/dist/leaflet.css";
import CardList from "../../components/cardList/cardList";
import L from "leaflet";

function ChangeLocation({ lat, long }) {
  const map = useMap();
  map.flyTo([lat, long], 14);
  return null;
}

function ViewMap() {
  const [shipmentDetails, setShipmentDetails] = useState({
    waybill: "",
    name: "",
    phone: "",
    address: "",
  });

  var markerIcon = new L.icon({
    iconUrl:
      "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/home-circle-blue-512.png",
    iconSize: [38, 38],
  });

  return (
    <div>
      <div className="main flex">
        <div className="aside flex column">
          <CardList setShipmentDetails={setShipmentDetails} />
        </div>
        <div className="map-container">
          <MapContainer center={[51.5, -0.9]} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {shipmentDetails.address.latitude &&
              shipmentDetails.address.longitude && (
                <>
                  <ChangeLocation
                    lat={parseFloat(shipmentDetails.address.latitude)}
                    long={parseFloat(shipmentDetails.address.longitude)}
                  />
                  <Marker
                    position={[
                      parseFloat(shipmentDetails.address.latitude),
                      parseFloat(shipmentDetails.address.longitude),
                    ]}
                    icon={markerIcon}>
                    <Popup>
                      <p>waybill: {shipmentDetails.waybill}</p>
                      <p>name : {shipmentDetails.name}</p>
                      <p>phone : {shipmentDetails.phone}</p>
                    </Popup>
                  </Marker>
                </>
              )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default ViewMap;
