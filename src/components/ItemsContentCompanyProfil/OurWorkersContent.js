import React, { useState, useRef, useEffect } from "react"
import ButtonIcon from "../ButtonIcon"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import { CSSTransition } from "react-transition-group"
import InputIcon from "../InputIcon"
import { fetchAddWorkerToCompany } from "../../state/actions"
import { useDispatch, useSelector } from "react-redux"
import WorkerItem from "./WorkerItem"
import { MdEmail, MdClose } from "react-icons/md"
import { FaUserPlus } from "react-icons/fa"
import OwnerWorker from "./OwnerWorker"
import ReactTooltip from "react-tooltip"

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
    props.colorBlind.blind || props.colorBlind.dark
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
      : Colors(props.colorBlind).companyItemBackground};
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
  background-color: ${props => Colors(props.colorBlind).secondColor};
  color: ${props => Colors(props.colorBlind).textNormalWhite};
  margin: 5px;
  margin-left: 0;
  cursor: pointer;
  font-size: 1rem;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props => Colors(props.colorBlind).secondDarkColor};
  }
`

const DeleteUserIconStyle = styled.div`
  display: inline-block;
  padding: 5px;
  padding-bottom: 0px;
  border-radius: 5px;
  background-color: ${props => Colors(props.colorBlind).dangerColor};
  color: ${props => Colors(props.colorBlind).textNormalWhite};
  margin: 5px;
  cursor: pointer;
  margin-left: 0px;
  font-size: 1rem;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props => Colors(props.colorBlind).dangerColorDark};
  }
`

const WorkerCircle = styled.div`
  background-color: ${props =>
    props.isCompanyEditProfil
      ? Colors(props.colorBlind).secondColor
      : Colors(props.colorBlind).primaryColor};
  color: ${props => Colors(props.colorBlind).textNormalWhite};
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
  background-color: ${props => Colors(props.colorBlind).companyItemBackground};
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
  handleSaveOwnerSpecialization,
  allCategoriesWithItems,
  editedWorkers,
  ownerSerwiceCategory = [],
  newOwnerServicesCategory,
  company,
  editMode,
  colorBlind,
  editedWorkersHours,
  isAdmin,
  ownerData,
}) => {
  const [isaddUser, setIsAdduser] = useState(false)
  const [emailInput, setEmailInput] = useState("")
  const [ownerServicesCategory, setOwnerServicesCategory] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [inputSpecializationOwner, setInputSpecializationOwner] = useState(
    ownerSpecialization
  )
  const [selectHeight, setSelectHeight] = useState(0)
  const [ownerEdit, setOwnerEdit] = useState(false)
  const user = useSelector(state => state.user)
  const selectRef = useRef(null)
  useEffect(() => {
    setOwnerEdit(false)
  }, [editMode])

  useEffect(() => {
    const selectActualRenderOwnerCategory = !!newOwnerServicesCategory
      ? newOwnerServicesCategory
      : ownerSerwiceCategory
    const mapServiceCategoryOwner = selectActualRenderOwnerCategory.map(
      item => {
        return {
          label: item,
          value: item,
        }
      }
    )
    setOwnerServicesCategory(mapServiceCategoryOwner)
  }, [ownerSerwiceCategory, newOwnerServicesCategory])

  useEffect(() => {
    if (!!ownerServicesCategory) {
      if (ownerServicesCategory.length > 0) {
        const valuePadding = allCategoriesWithItems.length * 23 + 15
        setSelectHeight(valuePadding)
      }
    }
  }, [ownerServicesCategory, setSelectHeight, Permissions])

  useEffect(() => {
    if (!!selectRef.current) {
      setSelectHeight(selectRef.current.clientHeight)
    }
  }, [selectRef, ownerServicesCategory])

  useEffect(() => {
    ReactTooltip.rebuild()
  })

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

  const handleClickContent = e => {
    e.stopPropagation()
  }

  const handleClickOwnerEdit = () => {
    setOwnerEdit(prevState => !prevState)
  }

  const handleResetOwnerSpecialization = () => {
    setOwnerEdit(false)
    // const mapServiceCategoryOwner = ownerSerwiceCategory.map(item => {
    //   return {
    //     label: item,
    //     value: item,
    //   }
    // })
    // setOwnerServicesCategory(mapServiceCategoryOwner)
    handleSaveOwnerSpecialization(null, null)
    setInputSpecializationOwner(ownerSpecialization)
  }

  const handleInputOnChange = e => {
    setInputSpecializationOwner(e.target.value)
  }

  const handleSaveSpecialization = () => {
    let toSaveOwnerServiceCategory = ownerServicesCategory
    if (!!ownerServicesCategory) {
      toSaveOwnerServiceCategory = ownerServicesCategory.map(item => item.label)
    }
    handleSaveOwnerSpecialization(
      inputSpecializationOwner,
      toSaveOwnerServiceCategory
    )
    setOwnerEdit(false)
  }

  const handleChangeSelectOwner = value => {
    const valueToSave = !!value ? value : []
    setOwnerServicesCategory(valueToSave)
  }

  const mapWorkers = workers.map((item, index) => {
    const selectEditedWorker = [...editedWorkers].find(edited => {
      return edited.indexWorker === item._id
    })
    const selectEditedWorkersHours = editedWorkersHours.find(
      itemHours => itemHours.indexWorker === item._id
    )

    const finallEditedWorker = !!selectEditedWorker ? selectEditedWorker : null

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
        user={user}
        handleAddEditWorker={handleAddEditWorker}
        allCategoriesWithItems={allCategoriesWithItems}
        editedWorkers={finallEditedWorker}
        allCategories={allCategories}
        setAllCategories={setAllCategories}
        company={company}
        editMode={editMode}
        colorBlind={colorBlind}
        editedWorkersHours={editedWorkersHours}
        selectEditedWorkersHours={selectEditedWorkersHours}
        isAdmin={isAdmin}
        ButtonContent={ButtonContent}
        ButtonDeleteStyle={ButtonDeleteStyle}
      />
    )
  })

  const selectEditedOwnerHours = editedWorkersHours.find(
    itemHours => itemHours.indexWorker === owner._id
  )

  return (
    <>
      <TitleRightColumn {...companyEditProfilProps} colorBlind={colorBlind}>
        NASI PRACOWNICY
      </TitleRightColumn>
      <WorkerContent isCompanyEditProfil={isCompanyEditProfil}>
        <OwnerWorker
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
          colorBlind={colorBlind}
          ButtonContent={ButtonContent}
          ButtonDeleteStyle={ButtonDeleteStyle}
          owner={owner}
          ownerEdit={ownerEdit}
          selectHeight={selectHeight}
          inputSpecializationOwner={inputSpecializationOwner}
          handleClickOwnerEdit={handleClickOwnerEdit}
          handleResetOwnerSpecialization={handleResetOwnerSpecialization}
          handleClickContent={handleClickContent}
          handleInputOnChange={handleInputOnChange}
          handleChangeSelectOwner={handleChangeSelectOwner}
          ownerServicesCategory={ownerServicesCategory}
          handleSaveSpecialization={handleSaveSpecialization}
          company={company}
          ownerData={ownerData}
          selectEditedWorkersHours={selectEditedOwnerHours}
          editedWorkersHours={editedWorkersHours}
          isAdmin={isAdmin}
          setAllCategories={setAllCategories}
          allCategoriesWithItems={allCategoriesWithItems}
        />
        {mapWorkers}
      </WorkerContent>
      {isCompanyEditProfil && isAdmin ? (
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
              colorBlind={colorBlind}
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
                    icon={<MdEmail />}
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
                      customColorButton={Colors(colorBlind).successColorDark}
                      customColorIcon={Colors(colorBlind).successColor}
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
      {isCompanyEditProfil && (
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
    </>
  )
}
export default OurWorkersContent
