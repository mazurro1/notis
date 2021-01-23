import React, { useState, useRef, useEffect } from "react"
import ButtonIcon from "../ButtonIcon"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import { CSSTransition } from "react-transition-group"
import InputIcon from "../InputIcon"
import { fetchAddWorkerToCompany } from "../../state/actions"
import { useDispatch, useSelector } from "react-redux"
import WorkerItem from "./WorkerItem"
import { MdEmail, MdClose, MdEdit,  } from "react-icons/md"
import { FaUserPlus, FaArrowLeft } from "react-icons/fa"
import OwnerWorker from "./OwnerWorker"
import ReactTooltip from "react-tooltip"
import {
  getCategories,
  categoryItemsMenu,
  sortItemsInArray,
} from "../../common/Functions"

const WorkerContent = styled.div`
  display: ${props => (props.isCompanyEditProfil ? "block" : "block")};
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
  background-color: ${props =>
    props.siteProps.blind || props.siteProps.dark
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(255, 255, 255, 0.8)"};
  padding: 10px 10px 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  overflow: hidden;
  min-height: 105px;
  min-width: 130px;
  padding-bottom: ${props =>
    props.editConstTimeWorker
      ? "340px"
      : props.userEditItem
      ? `${props.selectHeight + 260}px`
      : props.isAdmin
      ? "50px"
      : "10px"};
  transition-property: padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
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
  position: ${props => (props.noRelative ? "" : "relative")};
  width: 90%;
  background-color: ${props =>
    props.noBg
      ? "transparent"
      : Colors(props.siteProps).companyItemBackground};
  border-radius: 5px;
  padding: 5px;
  font-size: 0.9rem;
  transition-property: height;
  transition-duration: 0.3s;
  transition-timing-function: ease;
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
  background-color: ${props => Colors(props.siteProps).secondColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  margin: 5px;
  margin-left: 0;
  cursor: pointer;
  font-size: 1rem;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props => Colors(props.siteProps).secondDarkColor};
  }
`

const DeleteUserIconStyle = styled.div`
  display: inline-block;
  padding: 5px;
  padding-bottom: 0px;
  border-radius: 5px;
  background-color: ${props => Colors(props.siteProps).dangerColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  margin: 5px;
  cursor: pointer;
  margin-left: 0px;
  font-size: 1rem;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props => Colors(props.siteProps).dangerColorDark};
  }
`

const WorkerCircle = styled.div`
  background-color: ${props =>
    props.isCompanyEditProfil
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).primaryColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  border-radius: 50%;
  height: 50px;
  width: 50px;
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
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  width: 90%;
  padding: 10px;
  border-radius: 5px;
`

const ButtonSentPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 5px;
`

const ButtonAddWorker = styled.button`
  border: none;
  background-color: transparent;
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

const ButtonContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`

const ButtonDeleteStyle = styled.div`
  padding: 2.5px;
`

const PositionRelative = styled.div`
  position: relative;
  background-color: ${props =>
    props.noBg ? "" : Colors(props.siteProps).companyItemBackground};
  color: ${props => Colors(props.siteProps).textNormalBlack};
  border-radius: 5px;
  padding-bottom: 10px;
  overflow: hidden;
  border-width: 2px;
  border-style: solid;
  border-color: ${props =>
    props.active
      ? Colors(props.siteProps).secondColor
      : "transparent"};
  opacity: ${props => !props.active && props.disabledEditButtons ? "0.5": "1"};

  transition-property: color, background-color, border-color, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const ButtonEditPositionEdit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  margin-right: 10px;
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
  company,
  editMode,
  siteProps,
  isAdmin,
  ownerData,
  companyServices,
  RightColumnItem,
  editedWorkers,
  setEditedWorkers,
  handleResetAllEditedComponents,
  disabledEditButtons,
}) => {
  const [isaddUser, setIsAdduser] = useState(false)
  const [emailInput, setEmailInput] = useState("")

  const [allCategories, setAllCategories] = useState([])
  const [allCategoriesWithItems, setAllCategoriesWithItems] = useState([])
  const user = useSelector(state => state.user)

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [])

  useEffect(() => {
    setEditedWorkers(false)
  }, [editMode])

  useEffect(() => {
    const categories = getCategories([...companyServices], "serviceCategory")
    const items = categoryItemsMenu(categories, [...companyServices])
    const sortedItems = sortItemsInArray([...items], "category")
    const newCategories = companyServices.map(itemValue => {
      const newItem = {
        value: itemValue._id,
        label: itemValue.serviceName,
      }
      return newItem
    })
    setAllCategories(newCategories)
    setAllCategoriesWithItems(sortedItems)
  }, [company])

  useEffect(() => {
    const categories = getCategories([...companyServices], "serviceCategory")
    const items = categoryItemsMenu(categories, [...companyServices])
    const sortedItems = sortItemsInArray([...items], "category")
    const newCategories = companyServices.map(itemValue => {
      const newItem = {
        value: itemValue._id,
        label: itemValue.serviceName,
      }
      return newItem
    })
    setAllCategories(newCategories)
    setAllCategoriesWithItems(sortedItems)
  }, [editedWorkers, editMode])

  const dispatch = useDispatch()

  const handleSentInvation = e => {
    e.preventDefault()
    setIsAdduser(prevState => !prevState)
    dispatch(fetchAddWorkerToCompany(companyId, emailInput, user.token))
  }

  const handleEditWorkers = () => {
    handleResetAllEditedComponents()
    setEditedWorkers(prevState => !prevState)
  }

  const handleEditWorkersReset = () => {
    setEditedWorkers(false)
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

  const handleClickContent = e => {
    e.stopPropagation()
  }

  const mapWorkers = workers.map((item, index) => {
    return (
      <WorkerItem
        index={index}
        key={index}
        item={item}
        {...companyEditProfilProps}
        companyId={companyId}
        user={user}
        allCategories={allCategories}
        company={company}
        editMode={editMode}
        siteProps={siteProps}
        isAdmin={isAdmin}
        allCategoriesWithItems={allCategoriesWithItems}
        WorkerItemStyle={WorkerItemStyle}
        WorkerCircle={WorkerCircle}
        WorkerName={WorkerName}
        WorkerSpecjalization={WorkerSpecjalization}
        EditUserStyle={EditUserStyle}
        EditIconStyle={EditIconStyle}
        EditUserBackground={EditUserBackground}
        DeleteUserIconStyle={DeleteUserIconStyle}
        EditUserBackgroundContent={EditUserBackgroundContent}
        ButtonContent={ButtonContent}
        ButtonDeleteStyle={ButtonDeleteStyle}
        editedWorkers={editedWorkers}
      />
    )
  })

  return (
    <PositionRelative
      siteProps={siteProps}
      active={editedWorkers}
      disabledEditButtons={disabledEditButtons}
    >
      <RightColumnItem
        isCompanyEditProfil={editedWorkers}
        siteProps={siteProps}
      >
        <TitleRightColumn
          isCompanyEditProfil={editedWorkers}
          siteProps={siteProps}
        >
          NASI PRACOWNICY
        </TitleRightColumn>
        <WorkerContent isCompanyEditProfil={editedWorkers}>
          <OwnerWorker
            companyId={companyId}
            {...companyEditProfilProps}
            WorkerItemStyle={WorkerItemStyle}
            WorkerCircle={WorkerCircle}
            WorkerName={WorkerName}
            WorkerSpecjalization={WorkerSpecjalization}
            EditUserStyle={EditUserStyle}
            EditIconStyle={EditIconStyle}
            EditUserBackground={EditUserBackground}
            EditUserBackgroundContent={EditUserBackgroundContent}
            allCategories={allCategories}
            siteProps={siteProps}
            ButtonContent={ButtonContent}
            ButtonDeleteStyle={ButtonDeleteStyle}
            owner={owner}
            handleClickContent={handleClickContent}
            company={company}
            ownerData={ownerData}
            isAdmin={isAdmin}
            setAllCategories={setAllCategories}
            allCategoriesWithItems={allCategoriesWithItems}
            editedWorkers={editedWorkers}
            ownerSpecialization={ownerSpecialization}
            user={user}
            editMode={editMode}
          />
          {mapWorkers}
        </WorkerContent>
        {editedWorkers && isAdmin ? (
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

        {editedWorkers && (
          <>
            <ReactTooltip id="constTimeWork" effect="float" multiline={true}>
              <span>Ustaw czas pracy pracownika</span>
            </ReactTooltip>
            <ReactTooltip id="timeWork" effect="float" multiline={true}>
              <span>Ustaw czas pracy pracownika w innych dniach itp itd</span>
            </ReactTooltip>

            <ReactTooltip id="sentAgainEmail" effect="float" multiline={true}>
              <span>Wyślij ponownie email weryfikacyjny</span>
            </ReactTooltip>
            <ReactTooltip id="timeWorkUser" effect="float" multiline={true}>
              <span>Edytuj godziny pracy pracownika</span>
            </ReactTooltip>
            <ReactTooltip id="editUser" effect="float" multiline={true}>
              <span>Edytuj stanowisko pracownika</span>
            </ReactTooltip>
            <ReactTooltip id="deleteUser" effect="float" multiline={true}>
              <span>Usuń pracownika</span>
            </ReactTooltip>
          </>
        )}
      </RightColumnItem>
      {isCompanyEditProfil &&
        (!editedWorkers ? (
          <ButtonEditPositionEdit>
            <div data-tip data-for="disabledButton">
              <ButtonIcon
                title="Edytuj pracowników"
                uppercase
                fontIconSize="25"
                fontSize="14"
                icon={<MdEdit />}
                secondColors
                onClick={handleEditWorkers}
                disabled={disabledEditButtons}
              />
            </div>
          </ButtonEditPositionEdit>
        ) : (
          <ButtonEditPositionEdit>
            <ButtonIcon
              title="Anuluj"
              uppercase
              fontIconSize="25"
              fontSize="14"
              icon={<FaArrowLeft />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleEditWorkersReset}
            />
          </ButtonEditPositionEdit>
        ))}
      {isAdmin && (
        <CSSTransition
          in={isaddUser}
          timeout={400}
          classNames="popup"
          unmountOnExit
        >
          <PositionAddWorkers
          // onClick={handleOnClickBg}
          >
            <ContentAddWorkers
              onClick={handleClickContentAddWorkers}
              siteProps={siteProps}
            >
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
                  <ButtonIcon
                    title="Anuluj"
                    uppercase
                    fontIconSize="20"
                    fontSize="14"
                    icon={<FaArrowLeft />}
                    customColorButton={Colors(siteProps).dangerColorDark}
                    customColorIcon={Colors(siteProps).dangerColor}
                    onClick={handleOnClickBg}
                  />
                </ButtonSentPosition>
                <ButtonSentPosition>
                  <ButtonAddWorker type="submit">
                    <ButtonIcon
                      title="Wyślij zaproszenie"
                      uppercase
                      fontIconSize="20"
                      fontSize="14"
                      icon={<MdEmail />}
                      customColorButton={Colors(siteProps).successColorDark}
                      customColorIcon={Colors(siteProps).successColor}
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
      )}
    </PositionRelative>
  )
}
export default OurWorkersContent
