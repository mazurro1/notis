import React, { useState, useEffect, useRef } from "react"
import {
  MdEdit,
  MdDelete,
  MdVerifiedUser,
  MdError,
  MdEmail,
  MdClose,
  MdDone,
  MdTimelapse,
} from "react-icons/md"
import SelectCustom from "../SelectCustom"
import ConstTimeWorkTime from "./ConstTimeWorkTime"
import {
  FaUser,
  FaArrowLeft,
  FaCalendarAlt,
  FaCalendarWeek,
} from "react-icons/fa"
import { CSSTransition } from "react-transition-group"
import {
  fetchDeleteUserFromCompany,
  fetchAddAgainWorkerToCompany,
  changeEditWorkerHours,
  changeEditedWorkerHours,
} from "../../state/actions"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import InputIcon from "../InputIcon"
import ButtonIcon from "../ButtonIcon"
import ReactTooltip from "react-tooltip"
import {Permissions} from '../../common/Permissions'

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
    props.active
      ? Colors(props.colorBlind).successColor
      : props.email
      ? Colors(props.colorBlind).secondColor
      : Colors(props.colorBlind).dangerColor};
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    color: ${props =>
      props.email ? Colors(props.colorBlind).secondDarkColor : ""};
  }
`

const InputStyles = styled.div`
  input {
    padding: 5px 10px;
  }
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
  color: ${props => Colors(props.colorBlind).textNormalBlack};
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

const SelectStyle = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
`

const HolidayDays = styled.div`
  position: absolute;
  bottom: 5px;
  left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  background-color: ${props => Colors(props.colorBlind).companyItemBackground};
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  user-select: none;
`

const HolidayDaysIcon = styled.div`
  position: relative;
  left: -2px;
  font-size: 1.25rem;
  color: ${props => Colors(props.colorBlind).textNormalWhite};
  border-radius: 50%;
  padding: 5px;
  background-color: ${props =>
    props.isCompanyEditProfil
      ? Colors(props.colorBlind).secondColor
      : Colors(props.colorBlind).primaryColor};
  height: 30px;
  transform: scale(1.2);
`

const HolidayDaysDay = styled.div`
  padding: 5px 10px;
  font-size: 1rem;
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
  ButtonDeleteStyle,
  ButtonContent,
  companyId,
  user,
  index,
  handleAddEditWorker,
  allCategoriesWithItems,
  editedWorkers,
  allCategories,
  setAllCategories,
  company,
  editMode,
  colorBlind,
  editedWorkersHours,
  selectEditedWorkersHours,
  isAdmin,
}) => {
  const [constTimeWorker, setConstTimeWorker] = useState(false)
  const [chooseTimeWorker, setChooseTimeWorker] = useState(false)
  const [userEditItem, setUserEditItem] = useState(false)
  const [userConfirmDelete, setUserConfirmDelete] = useState(false)
  const [inputSpecialization, setInputSpeciailization] = useState(
    item.specialization
  )
  const [editConstTimeWorker, setEditConstTimeWorker] = useState(false)
  const [workerServicesCategory, setWorkerServicesCategory] = useState([])
  const [workerPermissionsCategory, setWorkerPermissionsCategory] = useState([])
  const [selectHeight, setSelectHeight] = useState(0)
  const [resetServicesCategory, setResetServicesCategory] = useState(false)
  const [toSaveWorkerHours, setToSaveWorkerHours] = useState([])
  const selectRef = useRef(null)

  useEffect(() => {
    ReactTooltip.rebuild()
  })

  useEffect(() => {
    setUserEditItem(false)
    setUserConfirmDelete(false)
    setChooseTimeWorker(false)
  }, [editMode])

 useEffect(() => {
   if (!!item.servicesCategory) {
     if (item.servicesCategory.length > 0) {
       const valuePadding =
         [...Permissions, ...allCategoriesWithItems].length * 23 + 15
       setSelectHeight(valuePadding)
     }
   }
 }, [item, setSelectHeight, allCategoriesWithItems.length, Permissions])

  useEffect(() => {
    if (!!selectRef.current) {
      setSelectHeight(selectRef.current.clientHeight)
    }
  }, [selectRef, workerServicesCategory, item])

  useEffect(() => {    
    if (!!item.permissions){
      const mapWorkerPermissions = item.permissions.map(itemPerm => {
        const findPermission = Permissions.find(
          itemVal => itemVal.value === itemPerm
        )
        return findPermission
      })
      setWorkerPermissionsCategory(mapWorkerPermissions)
    }
  }, [item.permissions])

  useEffect(() => {
    if (allCategoriesWithItems.length > 0 || !!resetServicesCategory) {
      const newCategories = allCategoriesWithItems.map(itemValue => {
        const newItem = {
          value: itemValue.oldCategory,
          label: itemValue.category,
        }
        return newItem
      })

      //take all categories
      const allCategories = []
      allCategoriesWithItems.forEach(itemValue => {
        if (itemValue.items.length > 0) {
          allCategories.push(itemValue.category)
        }
      })

      //actualizate when category was deleted
      let allWorkerServicesCategory = [...workerServicesCategory]
      const actualServicesCategory = !!editedWorkers
        ? editedWorkers.servicesCategory
        : !!item.servicesCategory
        ? item.servicesCategory
        : []

      if (allWorkerServicesCategory.length === 0) {
        const workerServicesCategoryMaped = actualServicesCategory.map(
          itemValue => {
            return {
              label: itemValue,
              value: itemValue,
            }
          }
        )
        allWorkerServicesCategory = [...workerServicesCategoryMaped]
      }

      //change label when category was actualizated
      const newWorkerServicesCategory = [...allWorkerServicesCategory]
      if (newWorkerServicesCategory.length > 0 || !!actualServicesCategory) {
        newWorkerServicesCategory.forEach((itemValue, index) => {
          newCategories.forEach(itemCategory => {
            if (itemCategory.value === itemValue.value) {
              newWorkerServicesCategory[index].label = itemCategory.label
            }
          })
        })

        //filter categories worker
        const filteredArrayAllCategories = newWorkerServicesCategory.filter(
          itemValue => {
            const isCategoryInWorkerArr = allCategories.some(
              category => category === itemValue.label
            )
            return isCategoryInWorkerArr
          }
        )
        //actualizate selected category user
        setWorkerServicesCategory(filteredArrayAllCategories)
      }
      setAllCategories(newCategories)
    }
  }, [allCategoriesWithItems, item])
  // }, [allCategoriesWithItems, item, setAllCategories])

  const dispatch = useDispatch()

  const handleUserConfirmDelete = () => {
    setUserConfirmDelete(prevState => !prevState)
  }

  const handleChooseTimeWorker = () => {
    setChooseTimeWorker(prevState => !prevState)
  }

  const handleUserItemEdit = () => {
    setUserEditItem(prevState => !prevState)
  }

  const handleClickContent = e => {
    e.stopPropagation()
  }

  const handleDeleteUser = () => {
    dispatch(fetchDeleteUserFromCompany(companyId, item.user.email, user.token))
    handleAddEditWorker(
      "delete",
      item._id,
      inputSpecialization,
      null,
      null,
    )
  }

  const handleSentAgainEmailVeryfication = () => {
    dispatch(
      fetchAddAgainWorkerToCompany(companyId, item.user.email, user.token)
    )
  }

  const handleInputOnChange = e => {
    setInputSpeciailization(e.target.value)
  }

  const handleSaveSpecialization = () => {
    setUserEditItem(false)

    const inputSpecializationValue =
      inputSpecialization !== item.specialization
        ? inputSpecialization
        : item.specialization

    const workerServicesCategoryToSent = workerServicesCategory.map(
      itemValue => itemValue.label
    )

    const workerServicesCategoryValue = workerServicesCategoryToSent
    const mapWorkerPermissionsIds = workerPermissionsCategory.map(
      item => item.value
    )

    handleAddEditWorker(
      "save",
      item._id,
      inputSpecializationValue,
      workerServicesCategoryValue,
      mapWorkerPermissionsIds
    )
  }

  const handleEditSpecializationReset = () => {
    let actualServicesCategory = workerServicesCategory
    if (!!editedWorkers) {
      actualServicesCategory = editedWorkers.servicesCategory.map(itemValue => {
        return {
          label: itemValue,
          value: itemValue,
        }
      })
    }
    setInputSpeciailization(item.specialization)
    setUserEditItem(false)
    const mapLebelValueToCategory = actualServicesCategory.map(
      itemValue => itemValue.label
    )
    handleAddEditWorker(
      "delete",
      item._id,
      inputSpecialization,
      mapLebelValueToCategory,
      null
    )
     const mapWorkerPermissions = item.permissions.map(itemPerm => {
       const findPermission = Permissions.find(
         itemVal => itemVal.value === itemPerm
       )
       return findPermission
     })
     setWorkerPermissionsCategory(mapWorkerPermissions)
    setWorkerServicesCategory(actualServicesCategory)
    setResetServicesCategory(true)
  }

  const handleChangeSelect = value => {
    const valueToSave = !!value ? value : []
    setWorkerServicesCategory(valueToSave)
  }

  const handleChangeSelectPermissions = value => {
    const valueToSave = !!value ? value : []
    setWorkerPermissionsCategory(valueToSave)
  }

  const handleUserTimeWork = () => {
    const itemsToSent = {
      ...item,
      company: company,
    }
    dispatch(changeEditWorkerHours(true, itemsToSent))
  }

  const handleResetDay = (itemWorkerId, dayOfTheWeek) => {
    const newEditedWorkersHours = [...editedWorkersHours]
    const indexEditedWorker = editedWorkersHours.findIndex(
      itemValue => itemValue.indexWorker === itemWorkerId
    )
    if (indexEditedWorker >= 0) {
      const filterEditedDays = newEditedWorkersHours[
        indexEditedWorker
      ].constantWorkingHours.filter(
        itemValue => itemValue.dayOfTheWeek !== dayOfTheWeek
      )
      if (
        filterEditedDays.length > 0 ||
        newEditedWorkersHours[indexEditedWorker].noConstantWorkingHours.length >
          0
      ) {
        newEditedWorkersHours[
          indexEditedWorker
        ].constantWorkingHours = filterEditedDays
        dispatch(changeEditedWorkerHours(newEditedWorkersHours))
      } else {
        const deleteWorkerInEditedWorkerHours = editedWorkersHours.filter(
          itemValue => itemValue.indexWorker !== itemWorkerId
        )
        dispatch(changeEditedWorkerHours(deleteWorkerInEditedWorkerHours))
      }
    }
  }

  const handleCancelConstTimeWork = itemWorkerId => {
    const filterToSaveWorkers = toSaveWorkerHours.filter(
      itemValue => itemValue.indexWorker !== itemWorkerId
    )
    const filterEditedWorkers = editedWorkersHours.filter(
      itemValue => itemValue.indexWorker !== itemWorkerId
    )
    dispatch(changeEditedWorkerHours(filterEditedWorkers))
    setToSaveWorkerHours(filterToSaveWorkers)
    setConstTimeWorker(false)
    setChooseTimeWorker(true)
    setEditConstTimeWorker(false)
  }

  const handleSaveConstTimeWork = itemWorkerId => {
    const newEditedWorkersHoursSave = [...editedWorkersHours]
    const filterNewEditedWorkers = toSaveWorkerHours.find(
      itemValue => itemValue.indexWorker === itemWorkerId
    )

    const indexEditedWorkers = editedWorkersHours.findIndex(
      itemValue => itemValue.indexWorker === itemWorkerId
    )
    if (!!filterNewEditedWorkers) {
      if (indexEditedWorkers >= 0) {
        newEditedWorkersHoursSave[indexEditedWorkers] = filterNewEditedWorkers
        dispatch(changeEditedWorkerHours(newEditedWorkersHoursSave))
      } else {
        const allEditedWorkers = [...editedWorkersHours, filterNewEditedWorkers]
        dispatch(changeEditedWorkerHours(allEditedWorkers))
      }
    }
    setConstTimeWorker(false)
    setChooseTimeWorker(true)
    setEditConstTimeWorker(false)
  }

  const handleSaveConstTimeWorkItem = item => {
    const newToSaveWorkerHours = [...toSaveWorkerHours]
    const selectedIndexWorker = toSaveWorkerHours.find(
      itemToSaveWorker => itemToSaveWorker.indexWorker === item.indexWorker
    )
    const selectedWorkerIndex = toSaveWorkerHours.findIndex(
      itemToSaveWorker => itemToSaveWorker.indexWorker === item.indexWorker
    )
    if (!!selectedIndexWorker) {
      const indexInArray = selectedIndexWorker.constantWorkingHours.findIndex(
        workingHour => workingHour.dayOfTheWeek === item.dayToSave.dayOfTheWeek
      )
      if (indexInArray >= 0) {
        newToSaveWorkerHours[selectedWorkerIndex].constantWorkingHours[
          indexInArray
        ] = item.dayToSave
      } else {
        newToSaveWorkerHours[selectedWorkerIndex].constantWorkingHours.push(
          item.dayToSave
        )
      }
      setToSaveWorkerHours(newToSaveWorkerHours)
    } else {
      const newWorker = {
        indexWorker: item.indexWorker,
        constantWorkingHours: [item.dayToSave],
        noConstantWorkingHours: {
          deletedEventsIds: [],
          newEvents: [],
        },
      }
      const allWorkers = [...newToSaveWorkerHours, newWorker]
      setToSaveWorkerHours(allWorkers)
    }
  }

  const handleCloseConstTimeWorkItem = (indexWorker, dayOfTheWeek) => {
    const newToSaveWorkerHours = [...toSaveWorkerHours]
    const indexWorkerInArray = toSaveWorkerHours.findIndex(
      itemValue => itemValue.indexWorker === indexWorker
    )
    if (indexWorkerInArray >= 0) {
      const filterArray = newToSaveWorkerHours[
        indexWorkerInArray
      ].constantWorkingHours.filter(
        itemValue => itemValue.dayOfTheWeek !== dayOfTheWeek
      )
      newToSaveWorkerHours[
        indexWorkerInArray
      ].constantWorkingHours = filterArray
    }
    setToSaveWorkerHours(newToSaveWorkerHours)
  }

  const handleConstTimeWork = () => {
    setChooseTimeWorker(false)
    setConstTimeWorker(true)
    setEditConstTimeWorker(true)
  }

  const actualYear = new Date().getFullYear()

  // const filterNoConstDateToCountHolidays = item.noConstantWorkingHours.filter(
  //   itemHour => {
  //     const yearInDate = new Date(itemHour.start).getFullYear()
  //     if (actualYear === yearInDate && itemHour.holidays) {
  //       return true
  //     } else {
  //       return false
  //     }
  //   }
  // ).length

  // const holidayDaysInYear = isAdmin && (
  //   <HolidayDays
  //     colorBlind={colorBlind}
  //     data-tip
  //     data-for="holidays"
  //     data-place="top"
  //   >
  //     <HolidayDaysIcon
  //       colorBlind={colorBlind}
  //       isCompanyEditProfil={isCompanyEditProfil}
  //     >
  //       <MdToday />
  //     </HolidayDaysIcon>
  //     <HolidayDaysDay>{filterNoConstDateToCountHolidays} dni</HolidayDaysDay>
  //   </HolidayDays>
  // )

  return (
    <WorkerItemStyle
      userEditItem={userEditItem}
      selectHeight={selectHeight}
      colorBlind={colorBlind}
      editConstTimeWorker={editConstTimeWorker}
      // isAdmin={isAdmin}
    >
      <WorkerCircle
        isCompanyEditProfil={isCompanyEditProfil}
        colorBlind={colorBlind}
      >
        <FaUser />
      </WorkerCircle>
      <WorkerName>{`${item.user.name} ${item.user.surname}`}</WorkerName>
      <WorkerSpecjalization>{inputSpecialization}</WorkerSpecjalization>
      {/* {holidayDaysInYear} */}
      {isCompanyEditProfil && (
        <>
          <EditUserStyle>
            <EditIconStyle
              onClick={handleChooseTimeWorker}
              // onClick={handleUserTimeWork}
              data-tip
              data-for="timeWorkUser"
              data-place="left"
              colorBlind={colorBlind}
            >
              <MdTimelapse />
            </EditIconStyle>
            <EditIconStyle
              onClick={handleUserItemEdit}
              data-tip
              data-for="editUser"
              data-place="left"
              colorBlind={colorBlind}
            >
              <MdEdit />
            </EditIconStyle>
            {isAdmin && <DeleteUserIconStyle
              onClick={handleUserConfirmDelete}
              data-tip
              data-for="deleteUser"
              data-place="left"
              colorBlind={colorBlind}
            >
              <MdDelete />
            </DeleteUserIconStyle>}
          </EditUserStyle>
          <ActiveWorkerStyle>
            <IconVeryfiedUser
              active={item.active}
              data-tip
              data-for="alertActive"
              colorBlind={colorBlind}
            >
              {item.active ? <MdVerifiedUser /> : <MdError />}
            </IconVeryfiedUser>
            {!item.active && (
              <IconVeryfiedUser
                email
                onClick={handleSentAgainEmailVeryfication}
                data-tip
                data-for="sentAgainEmail"
                colorBlind={colorBlind}
              >
                <MdEmail />
              </IconVeryfiedUser>
            )}
            <ReactTooltip id="alertActive" effect="float" multiline={true}>
              {item.active ? (
                <span>Użytkownik potwierdzony</span>
              ) : (
                <span>Użytkownik nie potwierdzony</span>
              )}
            </ReactTooltip>
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
              <EditUserBackgroundContent
                onClick={handleClickContent}
                colorBlind={colorBlind}
              >
                Stanowisko
                <InputStyles>
                  <InputIcon
                    placeholder="Stanowisko"
                    value={inputSpecialization}
                    secondColor
                    onChange={handleInputOnChange}
                  />
                </InputStyles>
                {allCategories.length > 0 && (
                  <>
                    <SelectStyle ref={selectRef}>
                      Wykonywane usługi
                      <SelectCustom
                        widthAuto
                        defaultMenuIsOpen={false}
                        secondColor
                        options={allCategories}
                        handleChange={handleChangeSelect}
                        value={workerServicesCategory}
                        placeholder="Usługi..."
                        isMulti
                        closeMenuOnSelect={false}
                        menuIsOpen
                        isClearable={false}
                      />
                    </SelectStyle>
                  </>
                )}
                {isAdmin && <SelectStyle>
                  Uprawnienia do
                  <SelectCustom
                    widthAuto
                    defaultMenuIsOpen={false}
                    secondColor
                    options={Permissions}
                    handleChange={handleChangeSelectPermissions}
                    value={workerPermissionsCategory}
                    placeholder="Uprawnienia..."
                    isMulti
                    closeMenuOnSelect={false}
                    menuIsOpen
                    isClearable={false}
                  />
                </SelectStyle>}
                <ButtonContentEdit>
                  <ButtonStyles>
                    <ButtonIcon
                      title="Cofnij"
                      uppercase
                      fontIconSize="16"
                      fontSize="14"
                      icon={<FaArrowLeft />}
                      onClick={handleEditSpecializationReset}
                      customColorButton={Colors(colorBlind).dangerColorDark}
                      customColorIcon={Colors(colorBlind).dangerColor}
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
                      customColorButton={Colors(colorBlind).successColorDark}
                      customColorIcon={Colors(colorBlind).successColor}
                      // disabled={!disabledButtonAccept}
                    />
                  </ButtonStyles>
                </ButtonContentEdit>
                <DeleteIconPosition>
                  <DeleteIconStyle
                    onClick={handleEditSpecializationReset}
                    colorBlind={colorBlind}
                  >
                    <MdClose />
                  </DeleteIconStyle>
                </DeleteIconPosition>
              </EditUserBackgroundContent>
            </EditUserBackground>
          </CSSTransition>
          {isAdmin && <CSSTransition
            in={userConfirmDelete}
            timeout={400}
            classNames="popup"
            unmountOnExit
          >
            <EditUserBackground>
              <EditUserBackgroundContent
                onClick={handleClickContent}
                noBg
                colorBlind={colorBlind}
              >
                <ButtonContent>
                  <ButtonDeleteStyle>
                    <ButtonIcon
                      title="Anuluj"
                      uppercase
                      fontIconSize="16"
                      fontSize="14"
                      icon={<FaArrowLeft />}
                      onClick={handleUserConfirmDelete}
                      customColorButton={Colors(colorBlind).successColorDark}
                      customColorIcon={Colors(colorBlind).successColor}
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
                      customColorButton={Colors(colorBlind).dangerColorDark}
                      customColorIcon={Colors(colorBlind).dangerColor}
                    />
                  </ButtonDeleteStyle>
                </ButtonContent>
              </EditUserBackgroundContent>
            </EditUserBackground>
          </CSSTransition>}
          <CSSTransition
            in={chooseTimeWorker}
            timeout={400}
            classNames="popup"
            unmountOnExit
          >
            <EditUserBackground>
              <EditUserBackgroundContent
                onClick={handleClickContent}
                noBg
                colorBlind={colorBlind}
              >
                <ButtonContent>
                  <ButtonDeleteStyle
                    data-tip
                    data-for="constTimeWork"
                    data-place="top"
                  >
                    <ButtonIcon
                      title="Stały czas pracy"
                      uppercase
                      fontIconSize="16"
                      fontSize="14"
                      icon={<FaCalendarWeek />}
                      onClick={handleConstTimeWork}
                      secondColors
                    />
                  </ButtonDeleteStyle>
                  <ButtonDeleteStyle
                    data-tip
                    data-for="timeWork"
                    data-place="top"
                  >
                    <ButtonIcon
                      title="Zmienny czas pracy"
                      uppercase
                      fontIconSize="16"
                      fontSize="14"
                      icon={<FaCalendarAlt />}
                      onClick={handleUserTimeWork}
                      secondColors
                    />
                  </ButtonDeleteStyle>
                  <ButtonDeleteStyle>
                    <ButtonIcon
                      title="Wróć"
                      uppercase
                      fontIconSize="16"
                      fontSize="14"
                      icon={<FaArrowLeft />}
                      onClick={handleChooseTimeWorker}
                      customColorButton={Colors(colorBlind).dangerColorDark}
                      customColorIcon={Colors(colorBlind).dangerColor}
                    />
                  </ButtonDeleteStyle>
                </ButtonContent>
              </EditUserBackgroundContent>
            </EditUserBackground>
          </CSSTransition>
          <ConstTimeWorkTime
            constTimeWorker={constTimeWorker}
            handleClickContent={handleClickContent}
            colorBlind={colorBlind}
            EditUserBackground={EditUserBackground}
            EditUserBackgroundContent={EditUserBackgroundContent}
            ButtonContent={ButtonContent}
            ButtonDeleteStyle={ButtonDeleteStyle}
            handleCancelConstTimeWork={handleCancelConstTimeWork}
            itemWorker={item}
            handleSaveConstTimeWorkItem={handleSaveConstTimeWorkItem}
            handleCloseConstTimeWorkItem={handleCloseConstTimeWorkItem}
            handleSaveConstTimeWork={handleSaveConstTimeWork}
            editedWorkersHours={editedWorkersHours}
            selectEditedWorkersHours={selectEditedWorkersHours}
            handleResetDay={handleResetDay}
          />
        </>
      )}
    </WorkerItemStyle>
  )
}
export default WorkerItem
