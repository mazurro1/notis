import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchUserReserwations,
  fetchUserReserwationsAll,
} from "../state/actions"
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
  const [hiddenCanceledReserwation, setHiddenCanceledReserwation] = useState(
    true
  )
  const dispatch = useDispatch()
  useEffect(() => {
    if (!!hiddenCanceledReserwation) {
      dispatch(fetchUserReserwations(user.token))
    } else {
      dispatch(fetchUserReserwationsAll(user.token))
    }
  }, [hiddenCanceledReserwation])

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
        setHiddenCanceledReserwation={setHiddenCanceledReserwation}
        hiddenCanceledReserwation={hiddenCanceledReserwation}
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
