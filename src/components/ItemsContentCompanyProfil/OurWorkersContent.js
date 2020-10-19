import React, { useState } from "react"
import ButtonIcon from "../ButtonIcon"
import { MdEdit } from "react-icons/md"
import styled from "styled-components"
import { FaUser, FaUserPlus } from "react-icons/fa"
import { MdEmail, MdClose } from "react-icons/md"
import { Colors } from "../../common/Colors"
import { CSSTransition } from "react-transition-group"
import InputIcon from "../InputIcon"
import { fetchAddWorkerToCompany } from "../../state/actions"
import { useDispatch, useSelector } from "react-redux"

const WorkerContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`

const WorkerItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px 10px 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`

const WorkerCircle = styled.div`
  background-color: ${props =>
    props.isCompanyEditProfil ? Colors.secondColor : Colors.buttonIconColor};
  border-radius: 50%;
  height: 50px;
  width: 50px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
`

const WorkerName = styled.div`
  font-size: 0.9rem;
`

const PositionAddWorkers = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ContentAddWorkers = styled.div`
  position: relative;
  width: 90%;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
`

const ButtonSentPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const ButtonAddWorker = styled.button`
  border: none;
  &:active,
  &:focus {
    outline: none;
  }
`

const CloseAddWorkers = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 0px 5px;
  padding-top: 5px;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const OurWorkersContent = ({
  TitleRightColumn,
  ButtonEditPosition,
  companyEditProfilProps = {},
  isCompanyEditProfil = false,
  workers = [],
  owner = { name: "", surname: "" },
  companyId = "",
}) => {
  const [isaddUser, setIsAdduser] = useState(false)
  const [emailInput, setEmailInput] = useState("")
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleSentInvation = e => {
    e.preventDefault()
    setIsAdduser(prevState => !prevState)
    dispatch(fetchAddWorkerToCompany(companyId, emailInput, user.token))
    console.log("sent")
  }

  const handleEdit = () => {
    setIsAdduser(prevState => !prevState)
    setEmailInput("")
  }

  const handleOnClickBg = () => {
    setIsAdduser(prevState => !prevState)
  }

  const handleChange = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleClickContentAddWorkers = e => {
    e.stopPropagation()
  }

  const mapWorkers = workers.map((item, index) => {
    return (
      <WorkerItemStyle key={index}>
        <WorkerCircle isCompanyEditProfil={isCompanyEditProfil}>
          <FaUser />
        </WorkerCircle>
        <WorkerName>{`${item.user.name} ${item.user.surname}`}</WorkerName>
      </WorkerItemStyle>
    )
  })

  return (
    <>
      <TitleRightColumn {...companyEditProfilProps}>
        NASI PRACOWNICY
      </TitleRightColumn>
      <WorkerItemStyle>
        <WorkerCircle isCompanyEditProfil={isCompanyEditProfil}>
          <FaUser />
        </WorkerCircle>
        <WorkerName>{`${owner.name} ${owner.surname}`}</WorkerName>
        <WorkerName>{"(właściciel)"}</WorkerName>
      </WorkerItemStyle>
      <WorkerContent>{mapWorkers}</WorkerContent>
      {isCompanyEditProfil ? (
        <ButtonEditPosition>
          <ButtonIcon
            title="Dodaj użytkownika"
            uppercase
            fontIconSize="25"
            fontSize="14"
            icon={<MdEdit />}
            secondColors
            onClick={handleEdit}
          />
        </ButtonEditPosition>
      ) : null}
      <CSSTransition
        in={isaddUser}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <PositionAddWorkers onClick={handleOnClickBg}>
          <ContentAddWorkers onClick={handleClickContentAddWorkers}>
            <form onSubmit={handleSentInvation}>
              <InputIcon
                icon={<FaUserPlus />}
                placeholder="Wpisz adres email"
                value={emailInput}
                type="email"
                secondColor
                onChange={e => handleChange(e, setEmailInput)}
                required
              />
              <ButtonSentPosition>
                <ButtonAddWorker type="submit">
                  <ButtonIcon
                    title="Wyślij zaproszenie"
                    uppercase
                    fontIconSize="25"
                    fontSize="14"
                    icon={<MdEmail />}
                    secondColors
                    disabled={!!!emailInput}
                  />
                </ButtonAddWorker>
              </ButtonSentPosition>
            </form>
            <CloseAddWorkers onClick={handleOnClickBg}>
              <MdClose />
            </CloseAddWorkers>
          </ContentAddWorkers>
        </PositionAddWorkers>
      </CSSTransition>
    </>
  )
}
export default OurWorkersContent
