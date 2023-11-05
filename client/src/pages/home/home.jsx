import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../rkt/userSlice";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Marker } from "react-leaflet";
import { Popup } from "react-leaflet";
import AddCard from "../../components/addCard/addCard";
import shipmentCard from "../../components/shipmentCard/shipmentCard";
import "./index.css";
import { useAxios } from "../../API/queries";
import "leaflet/dist/leaflet.css";
import CardList from "../../components/cardList/cardList";

function ChangeLocation({ lat, long }) {
  const map = useMap();
  map.flyTo([lat, long], 14);
  return null;
}

function Home() {
  const { getShipments } = useAxios();
  const user = useSelector(selectUser);
  const [shipmentDetails, setShipmentDetails] = useState({
    waybill: "",
    name: "",
    phone: "",
    address: "",
  });
  const [shipments, setshipments] = useState([]);

  const fetchshipments = async () => {
    const response = await getShipments();
    console.log(response);
    setshipments([...response.data.data]);
  };

  useEffect(() => {
    fetchshipments();
  }, []);

  return (
    <div>
      <div className="main flex d-row">
        <div className="aside flex column">
          <AddCard setshipments={setshipments} />
          <CardList
            shipments={shipments}
            setshipments={setshipments}
            setShipmentDetails={setShipmentDetails}
          />
        </div>
        <div className="map-container">
          <MapContainer center={[51.5, -0.9]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {shipmentDetails.address.latitude &&
              shipmentDetails.address.longtitude && (
                <>
                  <ChangeLocation
                    lat={parseFloat(shipmentDetails.address.latitude)}
                    long={parseFloat(shipmentDetails.address.longtitude)}
                  />
                  <Marker
                    position={[
                      parseFloat(shipmentDetails.address.latitude),
                      parseFloat(shipmentDetails.address.longtitude),
                    ]}>
                    <Popup>
                      <shipmentCard
                        waybill={shipmentDetails.country}
                        name={shipmentDetails.name}
                        phone={shipmentDetails.phone}
                        address={shipmentDetails.address}
                      />
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

export default Home;
