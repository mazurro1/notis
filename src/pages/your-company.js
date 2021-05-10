import React, { useEffect } from "react"
import "../../style.css"
import styled from "styled-components"
import ButtonIcon from "../components/ButtonIcon"
import { MdStoreMallDirectory } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import {
  changeLoginVisible,
  changeCreateCompanyVisible,
} from "../state/actions"
import sal from "sal.js"
import ReactTooltip from "react-tooltip"

const MarginTop = styled.div`
  margin-top: 30px;
`

const YourCompany = () => {
  const user = useSelector(state => state.user)
  const loginVisible = useSelector(state => state.loginVisible)
  const createCompanyVisible = useSelector(state => state.createCompanyVisible)

  const dispatch = useDispatch()

  useEffect(() => {
    sal({
      threshold: 0.1,
      once: true,
    })
  }, [])

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [user])

  const handleToLogin = () => {
    dispatch(changeLoginVisible(!loginVisible))
  }

  const handleCreateCompany = () => {
    dispatch(changeCreateCompanyVisible(!createCompanyVisible))
  }

  const selectButton = !!user ? (
    <>
      {!!!user.phoneVerified && (
        <ReactTooltip id="blockCreateCompany" effect="float" multiline={true}>
          <span>Zweryfikuj numer telefonu aby stworzyć konto firmowe.</span>
        </ReactTooltip>
      )}
      <div data-tip data-for="blockCreateCompany" data-place="bottom">
        <ButtonIcon
          title="Stwórz konto firmowe"
          uppercase
          fontIconSize="25"
          fontSize="20"
          icon={<MdStoreMallDirectory />}
          secondColors
          onClick={handleCreateCompany}
          disabled={!!!user.phoneVerified}
        />
      </div>
    </>
  ) : (
    <ButtonIcon
      title="Zaloguj się aby stworzyć konto firmowe"
      uppercase
      fontIconSize="25"
      fontSize="20"
      icon={<MdStoreMallDirectory />}
      secondColors
      onClick={handleToLogin}
    />
  )

  return (
    <MarginTop
      data-sal="fade"
      data-sal-duration="800"
      data-sal-easing="ease-out-bounce"
    >
      {selectButton}
    </MarginTop>
  )
}
export default YourCompany
