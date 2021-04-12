import React, { useEffect } from "react"
import "../../style.css"
import styled from "styled-components"
import ButtonIcon from "../components/ButtonIcon"
import { MdWork } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import {
  changeLoginVisible,
  changeCreateCompanyVisible,
} from "../state/actions"
import { HiEmojiHappy } from "react-icons/hi"
import { Colors } from "../common/Colors"
import sal from "sal.js"
import ReactTooltip from "react-tooltip"

const MarginTop = styled.div`
  margin-top: 30px;
`

const TextWarning = styled.div`
  margin-top: 60px;
  font-size: 1.6rem;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: "Poppins-Bold", sans-serif;

  span {
    color: ${props => Colors(props.siteProps).primaryColor};
    font-size: 6rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`

const YourCompany = () => {
  const user = useSelector(state => state.user)
  const loginVisible = useSelector(state => state.loginVisible)
  const createCompanyVisible = useSelector(state => state.createCompanyVisible)
  const siteProps = useSelector(state => state.siteProps)

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
  console.log(user)
  const selectButton = !!user ? (
    !!!user.company ? (
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
            icon={<MdWork />}
            secondColors
            onClick={handleCreateCompany}
            disabled={!!!user.phoneVerified}
          />
        </div>
      </>
    ) : (
      <TextWarning siteProps={siteProps}>
        Posiadasz już konto firmowe
        <span>
          <HiEmojiHappy />
        </span>
      </TextWarning>
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
