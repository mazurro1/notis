import React from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import styled from "styled-components"
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from "leaflet"
import L from "leaflet"

if (typeof window !== "undefined" && !!L) {
  delete L.Icon.Default.prototype._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  })
}

const BorderMaps = styled.div`
  position: relative;
  top: -2px;
  border-radius: 5px;
  overflow: hidden;

  .leaflet-control {
    z-index: 0 !important;
  }

  .leaflet-top,
  .leaflet-bottom {
    z-index: 400 !important;
  }
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
        <Marker
          position={position}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>{`${company.name.toUpperCase()} - ${company.city}, ${
            company.district
          }, ul. ${company.adress}`}</Popup>
        </Marker>
      </MapContainer>
    </BorderMaps>
  )
}
export default MapsComponent
