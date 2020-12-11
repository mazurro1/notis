import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserReserwations } from "../state/actions"
import UserHistoryCategory from "./UserHistoryCategory"
import styled from "styled-components"

const NoReserwationsStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  text-align: center;
  font-size: 1.2rem;
`

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
        userToken={user.token}
      />
    )
  })

  return (
    <>
      {mapCategory.length > 0 ? (
        mapCategory
      ) : (
        <NoReserwationsStyle>Brak rezerwacji</NoReserwationsStyle>
      )}
    </>
  )
}
export default UserHistory
