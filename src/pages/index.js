import React from "react"
import "../../style.css"
import { useDispatch, useSelector } from "react-redux"
import PlacesItem from "../components/PlacesItem"

const Home = () => {
  const placesData = useSelector(state => state.placesData)
  const filters = useSelector(state => state.filters)

  const mapPlacesData = placesData.map(item => {
    return <PlacesItem item={item} key={item.id} filters={filters} />
  })
  return <div>{mapPlacesData}</div>
}
export default Home
