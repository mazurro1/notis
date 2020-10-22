import React, { useState } from "react"
import ButtonIcon from "../ButtonIcon"
import styled from "styled-components"
import { MdEdit } from "react-icons/md"
import { FaUser, FaUserPlus } from "react-icons/fa"
import { MdEmail, MdClose } from "react-icons/md"
import { Colors } from "../../common/Colors"
import { CSSTransition } from "react-transition-group"
import InputIcon from "../InputIcon"
import { fetchAddWorkerToCompany } from "../../state/actions"
import { useDispatch, useSelector } from "react-redux"
import WorkerItem from "./WorkerItem"

const WorkerContent = styled.div`
  display: ${props => (props.isCompanyEditProfil ? "block" : "flex")};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`

const WorkerItemStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px 10px 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  overflow: hidden;
  min-height: 105px;
  min-width: 130px;
`

const EditUserBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const EditUserBackgroundContent = styled.div`
  position: relative;
  width: 90%;
  background-color: ${props => (props.noBg ? "transparent" : "white")};
  border-radius: 5px;
  padding: 5px;
  font-size: 0.9rem;
`

const EditUserStyle = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
`

const EditIconStyle = styled.div`
  display: inline-block;
  padding: 5px;
  padding-bottom: 0px;
  border-radius: 5px;
  background-color: ${Colors.secondColor};
  color: white;
  margin: 5px;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: #ed6c0c;
  }
`

const DeleteUserIconStyle = styled.div`
  display: inline-block;
  padding: 5px;
  padding-bottom: 0px;
  border-radius: 5px;
  background-color: #f44336;
  color: white;
  margin: 5px;
  cursor: pointer;
  margin-left: 0px;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: #c62828;
  }
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
  font-size: 1rem;
`
const WorkerSpecjalization = styled.div`
  font-size: 0.8rem;
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
  ownerSpecialization = "",
  companyId = "",
  handleAddEditWorker,
}) => {
  const [isaddUser, setIsAdduser] = useState(false)
  const [emailInput, setEmailInput] = useState("")
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleSentInvation = e => {
    e.preventDefault()
    setIsAdduser(prevState => !prevState)
    dispatch(fetchAddWorkerToCompany(companyId, emailInput, user.token))
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
      <WorkerItem
        index={index}
        key={index}
        item={item}
        {...companyEditProfilProps}
        WorkerItemStyle={WorkerItemStyle}
        WorkerCircle={WorkerCircle}
        WorkerName={WorkerName}
        WorkerSpecjalization={WorkerSpecjalization}
        EditUserStyle={EditUserStyle}
        EditIconStyle={EditIconStyle}
        EditUserBackground={EditUserBackground}
        DeleteUserIconStyle={DeleteUserIconStyle}
        EditUserBackgroundContent={EditUserBackgroundContent}
        companyId={companyId}
        userToken={user.token}
        handleAddEditWorker={handleAddEditWorker}
      />
    )
  })

  return (
    <>
      <TitleRightColumn {...companyEditProfilProps}>
        NASI PRACOWNICY
      </TitleRightColumn>
      <WorkerContent isCompanyEditProfil={isCompanyEditProfil}>
        <WorkerItemStyle>
          <WorkerCircle isCompanyEditProfil={isCompanyEditProfil}>
            <FaUser />
          </WorkerCircle>
          <WorkerName>{`${owner.name} ${owner.surname}`}</WorkerName>
          <WorkerSpecjalization>{ownerSpecialization}</WorkerSpecjalization>
          <EditUserStyle>
            <EditIconStyle>
              <MdEdit />
            </EditIconStyle>
          </EditUserStyle>
        </WorkerItemStyle>
        {mapWorkers}
      </WorkerContent>
      {isCompanyEditProfil ? (
        <ButtonEditPosition>
          <ButtonIcon
            title="Dodaj użytkownika"
            uppercase
            fontIconSize="25"
            fontSize="14"
            icon={<FaUserPlus />}
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
                    fontIconSize="20"
                    fontSize="14"
                    icon={<MdEmail />}
                    customColorButton="#2e7d32"
                    customColorIcon="#43a047"
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
