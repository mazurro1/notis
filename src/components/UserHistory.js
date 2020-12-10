import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserReserwations } from "../state/actions"
import UserHistoryCategory from "./UserHistoryCategory"

const UserHistory = ({ colorBlind, user }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserReserwations(user.token))
  }, [])

  const userHistoryReserwations = useSelector(
    state => state.userHistoryReserwations
  )

  const mapCategory = userHistoryReserwations.map((item, index) => {
    return (
      <UserHistoryCategory
        colorBlind={colorBlind}
        title={item.category}
        reserwations={item.items}
        key={index}
      />
    )
  })

  return <>{mapCategory}</>
}
export default UserHistory
