import React from "react"
import "../../style.css"
import styled from "styled-components"
import ButtonIcon from "../components/ButtonIcon"
import { MdWork } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import {
  changeLoginVisible,
  changeCreateCompanyVisible,
} from "../state/actions"

const MarginTop = styled.div`
  margin-top: 30px;
`

const YourCompany = () => {
  const user = useSelector(state => state.user)
  const loginVisible = useSelector(state => state.loginVisible)
  const createCompanyVisible = useSelector(state => state.createCompanyVisible)

  const dispatch = useDispatch()

  const handleToLogin = () => {
    dispatch(changeLoginVisible(!loginVisible))
  }

  const handleCreateCompany = () => {
    dispatch(changeCreateCompanyVisible(!createCompanyVisible))
  }

  const selectButton = !!user ? (
    !!!user.company ? (
      <ButtonIcon
        title="Stwórz konto firmowe"
        uppercase
        fontIconSize="25"
        fontSize="20"
        icon={<MdWork />}
        secondColors
        onClick={handleCreateCompany}
      />
    ) : (
      "Masz już konto"
    )
  ) : (
    <ButtonIcon
      title="Zaloguj się aby stworzyć konto firmowe"
      uppercase
      fontIconSize="25"
      fontSize="20"
      icon={<MdWork />}
      secondColors
      onClick={handleToLogin}
    />
  )

  return <MarginTop>{selectButton}</MarginTop>
}
export default YourCompany
