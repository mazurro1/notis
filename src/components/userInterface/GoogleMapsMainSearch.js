import React, { useEffect, useState, useRef } from "react"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import GoogleMapsMainSearchItem from "./GoogleMapsMainSearchItem"
import { fetchCompanyMarker } from "@state/actions"

const containerStyle = {
  width: "100%",
  height: "600px",
}

const mapsOptionsDarkMode = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
]

const mapsOptions = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
]

const GoogleMapsMainSearch = ({
  siteProps,
  mapGeolocation,
  localization,
  mapMarks = [],
  user,
  industries,
  filters,
  sorts,
}) => {
  const [latMap, setLatMap] = useState("")
  const [longMap, setLongMap] = useState("")
  const [zoomMap, setZoomMap] = useState(6)
  const mapRef = useRef(null)

  useEffect(() => {
    if (!!mapGeolocation) {
      setLatMap(mapGeolocation.lat)
      setLongMap(mapGeolocation.long)
      if (!!localization) {
        setZoomMap(13)
      } else {
        setZoomMap(6)
      }

      if (!!mapRef) {
        if (!!mapRef.current) {
          if (!!localization) {
            mapRef.current.state.map.zoom = 13
          } else {
            mapRef.current.state.map.zoom = 6
          }
        }
      }
    }
  }, [mapGeolocation, localization, industries, filters, sorts])

  const mapListLocations = mapMarks.map((itemLocation, index) => {
    return (
      <GoogleMapsMainSearchItem
        itemLocation={itemLocation}
        key={index}
        siteProps={siteProps}
        user={user}
        fetchCompanyMarker={fetchCompanyMarker}
      />
    )
  })
  return (
    <LoadScript googleMapsApiKey="AIzaSyBCdsxiQpKdPUp8FG4z9dEUfAn9R5eroSc">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: latMap,
          lng: longMap,
        }}
        zoom={zoomMap}
        options={{
          styles:
            !!siteProps.blind || !!siteProps.dark
              ? mapsOptionsDarkMode
              : mapsOptions,
          streetViewControl: false,
        }}
        ref={mapRef}
        disableDefaultUI
      >
        {mapListLocations}
      </GoogleMap>
    </LoadScript>
  )
}
export default React.memo(GoogleMapsMainSearch)
