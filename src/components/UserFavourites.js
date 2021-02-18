import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { resetUserFavourites } from "../state/actions"
import UserFavouritesItem from "./UserFavouritesItem"

const UserFavourites = ({ siteProps, favouritesCompanys, user }) => {
  const [selectedCompanyFavourites, setSelectedCompanyFavourites] = useState([])
  const userResetFavourites = useSelector(state => state.userResetFavourites)
  const dispatch = useDispatch()

  useEffect(() => {
    setSelectedCompanyFavourites(favouritesCompanys)
    dispatch(resetUserFavourites())
  }, [userResetFavourites, user]) // eslint-disable-line react-hooks/exhaustive-deps

  const mapFavourites = selectedCompanyFavourites.map((item, index) => {
    return (
      <UserFavouritesItem
        siteProps={siteProps}
        favourite={item}
        key={index}
        index={index}
        user={user}
        userResetFavourites={userResetFavourites}
      />
    )
  })

  return <div>{mapFavourites}</div>
}
export default UserFavourites
