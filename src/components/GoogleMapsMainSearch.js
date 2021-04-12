import React, { useEffect, useState, useRef } from "react"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import GoogleMapsMainSearchItem from "./GoogleMapsMainSearchItem"
import { useDispatch, useSelector } from "react-redux"
import { fetchCompanyMarker } from "../state/actions"

const containerStyle = {
  width: "100%",
  height: "600px",
}

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
}) => {
  const [latMap, setLatMap] = useState("")
  const [longMap, setLongMap] = useState("")
  const [zoomMap, setZoomMap] = useState(6)
  const companyMarker = useSelector(state => state.companyMarker)
  const mapRef = useRef(null)
  const dispatch = useDispatch()

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
  }, [mapGeolocation, localization])

  const handleFetchCompanyMarker = (companyId, lat, long) => {
    dispatch(fetchCompanyMarker(companyId))
    if (!!mapRef) {
      if (!!mapRef.current) {
        mapRef.current.state.map.zoom = 13
        //     console.log(mapRef.current)
        //     // const latLng = mapRef.current.LatLng(lat, long)
        //     // console.log(latLng)
        //     mapRef.current.panTo(Number(lat), Number(long))
      }
    }
    setLatMap(Number(lat))
    setLongMap(Number(long))
    if (zoomMap < 10) {
      setZoomMap(13)
    }
  }
  console.log(companyMarker)
  const mapListLocations = mapMarks.map((itemLocation, index) => {
    return (
      <GoogleMapsMainSearchItem
        itemLocation={itemLocation}
        key={index}
        siteProps={siteProps}
        handleFetchCompanyMarker={handleFetchCompanyMarker}
        companyMarker={companyMarker}
        user={user}
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
        options={{ styles: mapsOptions, streetViewControl: false }}
        ref={mapRef}
        yesIWantToUseGoogleMapApiInternals
        disableDefaultUI
      >
        {mapListLocations}
      </GoogleMap>
    </LoadScript>
  )
}
export default GoogleMapsMainSearch
