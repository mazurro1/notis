import React from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import styled from "styled-components"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

const BorderMaps = styled.div`
  position: relative;
  top: -2px;
  border-radius: 5px;
  overflow: hidden;
`

const MapsComponent = ({
  company,
  companyLat = "52.231918",
  companyLong = "21.006781",
}) => {
  const position = [companyLat, companyLong]
  return (
    <BorderMaps>
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={false}
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{`${company.name.toUpperCase()} - ${company.city}, ${
            company.district
          }, ul. ${company.adress}`}</Popup>
        </Marker>
      </MapContainer>
    </BorderMaps>
  )
}
export default MapsComponent
