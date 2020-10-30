import React, { useState } from "react"
import {
  MdEdit,
  MdDelete,
  MdVerifiedUser,
  MdError,
  MdEmail,
  MdClose,
  MdDone,
} from "react-icons/md"

import { FaUser, FaArrowLeft } from "react-icons/fa"
import { CSSTransition } from "react-transition-group"
import {
  fetchDeleteUserFromCompany,
  fetchAddAgainWorkerToCompany,
} from "../../state/actions"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import ReactTooltip from "react-tooltip"
import InputIcon from "../InputIcon"
import ButtonIcon from "../ButtonIcon"

const ActiveWorkerStyle = styled.div`
  position: absolute;
  left: 0;
  top: 0;
`

const IconVeryfiedUser = styled.div`
  display: inline-block;
  margin: 5px;
  margin-right: 0;
  font-size: 1.6rem;
  cursor: ${props => (props.email ? "pointer" : "")};
  color: ${props =>
    props.active ? "#43a047" : props.email ? Colors.secondColor : "#f44336"};
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    color: ${props => (props.email ? "#ed6c0c" : "")};
  }
`

const InputStyles = styled.div`
  input {
    padding: 5px 10px;
  }
`

const ButtonDeleteStyle = styled.div`
  padding: 5px;
`

const ButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`

const ButtonContentEdit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
`

const ButtonStyles = styled.div`
  display: inline-block;
`
const DeleteIconPosition = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

const DeleteIconStyle = styled.div`
  color: black;
  padding: 5px;
  padding-bottom: 0;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const WorkerItem = ({
  item,
  isCompanyEditProfil,
  WorkerItemStyle,
  WorkerCircle,
  WorkerName,
  WorkerSpecjalization,
  EditUserStyle,
  EditIconStyle,
  EditUserBackground,
  DeleteUserIconStyle,
  EditUserBackgroundContent,
  companyId,
  userToken,
  index,
  handleAddEditWorker,
}) => {
  const [userEditItem, setUserEditItem] = useState(false)
  const [userConfirmDelete, setUserConfirmDelete] = useState(false)
  const [inputSpecialization, setInputSpeciailization] = useState(
    item.specialization
  )

  const dispatch = useDispatch()

  const handleUserConfirmDelete = () => {
    setUserConfirmDelete(prevState => !prevState)
  }

  const handleUserItemEdit = () => {
    setUserEditItem(prevState => !prevState)
  }

  const handleClickContent = e => {
    e.stopPropagation()
  }

  const handleDeleteUser = () => {
    dispatch(fetchDeleteUserFromCompany(companyId, item.user.email, userToken))
    handleAddEditWorker("delete", item.user._id, inputSpecialization)
  }

  const handleSentAgainEmailVeryfication = () => {
    dispatch(
      fetchAddAgainWorkerToCompany(companyId, item.user.email, userToken)
    )
  }

  const handleInputOnChange = e => {
    setInputSpeciailization(e.target.value)
  }

  const handleSaveSpecialization = () => {
    setUserEditItem(false)
    if (inputSpecialization !== item.specialization) {
      handleAddEditWorker("save", item.user._id, inputSpecialization)
    } else {
      handleAddEditWorker("delete", item.user._id, inputSpecialization)
    }
  }

  const handleEditSpecializationReset = () => {
    setInputSpeciailization(item.specialization)
    setUserEditItem(false)
    handleAddEditWorker("delete", item.user._id, inputSpecialization)
  }

  return (
    <WorkerItemStyle>
      <WorkerCircle isCompanyEditProfil={isCompanyEditProfil}>
        <FaUser />
      </WorkerCircle>
      <WorkerName>{`${item.user.name} ${item.user.surname}`}</WorkerName>
      <WorkerSpecjalization>{inputSpecialization}</WorkerSpecjalization>
      {isCompanyEditProfil && (
        <>
          <EditUserStyle>
            <EditIconStyle
              onClick={handleUserItemEdit}
              data-tip
              data-for={`editUser${index}`}
            >
              <MdEdit />
            </EditIconStyle>
            <DeleteUserIconStyle
              onClick={handleUserConfirmDelete}
              data-tip
              data-for={`deleteUser${index}`}
            >
              <MdDelete />
            </DeleteUserIconStyle>
          </EditUserStyle>
          <ActiveWorkerStyle>
            <IconVeryfiedUser
              active={item.active}
              data-tip
              data-for={`alertActive${index}`}
            >
              {item.active ? <MdVerifiedUser /> : <MdError />}
            </IconVeryfiedUser>
            {!item.active && (
              <IconVeryfiedUser
                email
                onClick={handleSentAgainEmailVeryfication}
                data-tip
                data-for={`sentAgainEmail${index}`}
              >
                <MdEmail />
              </IconVeryfiedUser>
            )}
          </ActiveWorkerStyle>
          <CSSTransition
            in={userEditItem}
            timeout={400}
            classNames="popup"
            unmountOnExit
          >
            <EditUserBackground
            // onClick={handleEditSpecializationReset}
            >
              <EditUserBackgroundContent onClick={handleClickContent}>
                <InputStyles>
                  <InputIcon
                    placeholder="Stanowisko"
                    value={inputSpecialization}
                    secondColor
                    onChange={handleInputOnChange}
                  />
                </InputStyles>
                <ButtonContentEdit>
                  <ButtonStyles>
                    <ButtonIcon
                      title="Cofnij"
                      uppercase
                      fontIconSize="16"
                      fontSize="14"
                      icon={<FaArrowLeft />}
                      onClick={handleEditSpecializationReset}
                      customColorButton="#c62828"
                      customColorIcon="#f44336"
                    />
                  </ButtonStyles>
                  <ButtonStyles>
                    <ButtonIcon
                      title="Akceptuj"
                      uppercase
                      fontIconSize="20"
                      fontSize="14"
                      icon={<MdDone />}
                      onClick={handleSaveSpecialization}
                      customColorButton="#2e7d32"
                      customColorIcon="#43a047"
                      disabled={inputSpecialization === item.specialization}
                    />
                  </ButtonStyles>
                </ButtonContentEdit>
                <DeleteIconPosition>
                  <DeleteIconStyle onClick={handleEditSpecializationReset}>
                    <MdClose />
                  </DeleteIconStyle>
                </DeleteIconPosition>
              </EditUserBackgroundContent>
            </EditUserBackground>
          </CSSTransition>
          <CSSTransition
            in={userConfirmDelete}
            timeout={400}
            classNames="popup"
            unmountOnExit
          >
            <EditUserBackground
            // onClick={handleUserConfirmDelete}
            >
              <EditUserBackgroundContent onClick={handleClickContent} noBg>
                <ButtonContent>
                  <ButtonDeleteStyle>
                    <ButtonIcon
                      title="Anuluj"
                      uppercase
                      fontIconSize="16"
                      fontSize="14"
                      icon={<FaArrowLeft />}
                      onClick={handleUserConfirmDelete}
                      customColorButton="#2e7d32"
                      customColorIcon="#43a047"
                    />
                  </ButtonDeleteStyle>
                  <ButtonDeleteStyle>
                    <ButtonIcon
                      title="Usuń"
                      uppercase
                      fontIconSize="18"
                      fontSize="14"
                      icon={<MdDelete />}
                      onClick={handleDeleteUser}
                      customColorButton="#c62828"
                      customColorIcon="#f44336"
                    />
                  </ButtonDeleteStyle>
                </ButtonContent>
              </EditUserBackgroundContent>
            </EditUserBackground>
          </CSSTransition>
        </>
      )}
      <ReactTooltip id={`alertActive${index}`} effect="float" multiline={true}>
        {item.active ? (
          <span>Użytkownik potwierdzony</span>
        ) : (
          <span>Użytkownik nie potwierdzony</span>
        )}
      </ReactTooltip>
      <ReactTooltip
        id={`sentAgainEmail${index}`}
        effect="float"
        multiline={true}
      >
        <span>Wyślij ponownie email weryfikacyjny</span>
      </ReactTooltip>
      <ReactTooltip id={`editUser${index}`} effect="float" multiline={true}>
        <span>Edytuj stanowisko pracownika</span>
      </ReactTooltip>
      <ReactTooltip id={`deleteUser${index}`} effect="float" multiline={true}>
        <span>Usuń pracownika</span>
      </ReactTooltip>
    </WorkerItemStyle>
  )
}
export default WorkerItem