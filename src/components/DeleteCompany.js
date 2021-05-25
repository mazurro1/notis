import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchSentCodeConfirmDelete,
  confirmDeleteCompany,
  fetchConfirmDelete,
  changeDeleteCompanyConfirm,
} from "../state/actions"
import ButtonIcon from "../components/ButtonIcon"
import { MdEmail, MdDelete, MdClose } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import PinField from "react-pin-field"
import { navigate } from "gatsby"

const ButtonsPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`

const MarginButtons = styled.div`
  margin: 5px;
`

const PanFieldStyle = styled(PinField)`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: none;
  outline: none;
  text-align: center;
  margin: 10px;
  margin-left: 0;
  background-color: #eeeeee;
  font-size: 1.4rem;
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:disabled {
    color: #bdbdbd;
  }
`

const TextCodeToDelete = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
`

const DeleteCompanyContent = ({ siteProps, user }) => {
  const [demoCompleted, setDemoCompleted] = useState(false)
  const [activeCode, setActiveCode] = useState("")
  const deleteCompanyConfirm = useSelector(state => state.deleteCompanyConfirm)
  const fieldOneRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSentCodeConfirmDelete(user.token, user.company._id))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(changeDeleteCompanyConfirm())
    navigate("/")
  }, [deleteCompanyConfirm]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSentAgain = () => {
    dispatch(fetchSentCodeConfirmDelete(user.token, user.company._id))
  }
  const handleGoBack = () => {
    dispatch(confirmDeleteCompany(false))
  }

  const handleReset = () => {
    fieldOneRef.current.forEach(input => (input.value = ""))
    setActiveCode("")
    setDemoCompleted(false)
  }

  const handleDeleteCompany = () => {
    dispatch(fetchConfirmDelete(user.token, user.company._id, activeCode))
  }

  return (
    <>
      <TextCodeToDelete siteProps={siteProps}>
        Wpisz kod do usunięcia działalności, który został wysłany na e-maila
        firmowego.
      </TextCodeToDelete>
      <TextCodeToDelete siteProps={siteProps}>
        Kod jest ważny przez 30minut.
      </TextCodeToDelete>
      <TextCodeToDelete siteProps={siteProps}>
        Usunięcie działalności spowoduje odwołanie wszystkich aktywnych wizyt,
        usunięcie wszystkich pracowników oraz wszystkich danych na temat Twojej
        firmy.
      </TextCodeToDelete>
      <PanFieldStyle
        ref={fieldOneRef}
        onComplete={code => {
          setActiveCode(code)
          setDemoCompleted(true)
        }}
        format={k => k.toUpperCase()}
        disabled={demoCompleted}
        length={10}
      />

      <ButtonsPosition>
        <MarginButtons>
          <ButtonIcon
            title="Resetuj kod"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdClose />}
            onClick={handleReset}
          />
        </MarginButtons>
        <MarginButtons>
          <ButtonIcon
            title="Wyślij kod jeszcze raz"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdEmail />}
            onClick={handleSentAgain}
          />
        </MarginButtons>
        <MarginButtons>
          <ButtonIcon
            title="Anuluj"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaArrowLeft />}
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
            onClick={handleGoBack}
          />
        </MarginButtons>
        <MarginButtons>
          <ButtonIcon
            title="Usuń firmę"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdDelete />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            disabled={!demoCompleted}
            onClick={handleDeleteCompany}
          />
        </MarginButtons>
      </ButtonsPosition>
    </>
  )
}
export default DeleteCompanyContent
