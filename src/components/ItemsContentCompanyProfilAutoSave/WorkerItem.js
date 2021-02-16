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
import SelectCreated from "../SelectCreated"
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
  fetchSaveWorkerProps,
  resetWorkersPropsVisible,
} from "../../state/actions"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import InputIcon from "../InputIcon"
import ButtonIcon from "../ButtonIcon"
import ReactTooltip from "react-tooltip"
import { Permissions } from "../../common/Permissions"
import { Site } from "../../common/Site"

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
      ? Colors(props.siteProps).successColor
      : props.email
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).dangerColor};
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    color: ${props =>
      props.email ? Colors(props.siteProps).secondDarkColor : ""};
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
  color: ${props => Colors(props.siteProps).textNormalBlack};
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

const WorkerItem = ({
  item,
  isCompanyEditProfil,
  companyId,
  user,
  allCategoriesWithItems,
  allCategories,
  company,
  editMode,
  siteProps,
  isAdmin,
  editedWorkers = false,

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
  handleClickActiveWorker,
  activeWorkerUserId,
  BackGroundImageCustomUrl,
}) => {
  const [resetConstDays, setResetConstDays] = useState(false)
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
  const [toSaveWorkerHours, setToSaveWorkerHours] = useState([])

  const resetWorkerProps = useSelector(state => state.resetWorkerProps)

  const selectRef = useRef(null)

  useEffect(() => {
    const servicesWorker = item.servicesCategory.map(serv => {
      const findService = company.services.find(
        companyServ => companyServ._id === serv
      )
      if (!!findService) {
        return {
          value: findService._id,
          label: findService.serviceName,
        }
      } else {
        return {
          value: serv,
          label: serv,
        }
      }
    })
    setWorkerServicesCategory(servicesWorker)
    setToSaveWorkerHours([])
    setInputSpeciailization(item.specialization)
    setUserEditItem(false)
  }, [item])

  useEffect(() => {
    if (!!resetWorkerProps) {
      const servicesWorker = item.servicesCategory.map(serv => {
        const findService = company.services.find(
          companyServ => companyServ._id === serv
        )
        if (!!findService) {
          return {
            value: findService._id,
            label: findService.serviceName,
          }
        } else {
          return {
            value: serv,
            label: serv,
          }
        }
      })
      if (!!item.permissions) {
        const mapWorkerPermissions = item.permissions.map(itemPerm => {
          const findPermission = Permissions.find(
            itemVal => itemVal.value === itemPerm
          )
          return findPermission
        })
        setWorkerPermissionsCategory(mapWorkerPermissions)
      }
      setWorkerServicesCategory(servicesWorker)
      setToSaveWorkerHours([])
      setInputSpeciailization(item.specialization)
      setUserEditItem(false)
      setConstTimeWorker(false)
      setEditConstTimeWorker(false)
      dispatch(resetWorkersPropsVisible())
    }
  }, [resetWorkerProps])

  useEffect(() => {
    const servicesWorker = item.servicesCategory.map(serv => {
      const findService = company.services.find(
        companyServ => companyServ._id === serv
      )
      if (!!findService) {
        return {
          value: findService._id,
          label: findService.serviceName,
        }
      } else {
        return {
          value: serv,
          label: serv,
        }
      }
    })
    if (!!item.permissions) {
      const mapWorkerPermissions = item.permissions.map(itemPerm => {
        const findPermission = Permissions.find(
          itemVal => itemVal.value === itemPerm
        )
        return findPermission
      })
      setWorkerPermissionsCategory(mapWorkerPermissions)
    }
    setWorkerServicesCategory(servicesWorker)
    setToSaveWorkerHours([])
    setInputSpeciailization(item.specialization)
    setUserEditItem(false)
    setResetConstDays(true)
    setConstTimeWorker(false)
    setEditConstTimeWorker(false)
    setChooseTimeWorker(true)
    setToSaveWorkerHours([])
  }, [editedWorkers, editMode])

  useEffect(() => {
    ReactTooltip.rebuild()
  })

  useEffect(() => {
    setUserEditItem(false)
    setUserConfirmDelete(false)
    setChooseTimeWorker(false)
  }, [editMode, editedWorkers])

  useEffect(() => {
    if (!!item.permissions) {
      const mapWorkerPermissions = item.permissions.map(itemPerm => {
        const findPermission = Permissions.find(
          itemVal => itemVal.value === itemPerm
        )
        return findPermission
      })
      setWorkerPermissionsCategory(mapWorkerPermissions)
    }
  }, [item.permissions])

  const dispatch = useDispatch()

  const handleUserConfirmDelete = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setUserConfirmDelete(prevState => !prevState)
  }

  const handleChooseTimeWorker = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setChooseTimeWorker(prevState => !prevState)
  }
  const handleUserItemEdit = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setUserEditItem(prevState => !prevState)
  }

  const handleClickContent = e => {
    e.stopPropagation()
  }

  const handleDeleteUser = () => {
    dispatch(fetchDeleteUserFromCompany(companyId, item.user.email, user.token))
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
    // setUserEditItem(false)

    const inputSpecializationValue =
      inputSpecialization !== item.specialization
        ? inputSpecialization
        : item.specialization

    const workerServicesCategoryToSent = workerServicesCategory.map(
      itemValue => itemValue.value
    )

    const workerServicesCategoryValue = workerServicesCategoryToSent
    const mapWorkerPermissionsIds = workerPermissionsCategory.map(
      item => item.value
    )

    const dataToSave = {
      workerId: item._id,
      inputSpecializationValue: inputSpecializationValue,
      workerServicesCategoryValue: workerServicesCategoryValue,
      mapWorkerPermissionsIds: mapWorkerPermissionsIds,
    }

    dispatch(fetchSaveWorkerProps(user.token, companyId, dataToSave))
  }

  const handleEditSpecializationReset = () => {
    const servicesWorker = item.servicesCategory.map(serv => {
      const findService = company.services.find(
        companyServ => companyServ._id === serv
      )
      if (!!findService) {
        return {
          value: findService._id,
          label: findService.serviceName,
        }
      } else {
        return {
          value: serv,
          label: serv,
        }
      }
    })
    if (!!item.permissions) {
      const mapWorkerPermissions = item.permissions.map(itemPerm => {
        const findPermission = Permissions.find(
          itemVal => itemVal.value === itemPerm
        )
        return findPermission
      })
      setWorkerPermissionsCategory(mapWorkerPermissions)
    }
    setWorkerServicesCategory(servicesWorker)
    setToSaveWorkerHours([])
    setInputSpeciailization(item.specialization)
    setUserEditItem(false)
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

  const handleCancelConstTimeWork = () => {
    setResetConstDays(true)
    setConstTimeWorker(false)
    setEditConstTimeWorker(false)
    setChooseTimeWorker(true)
    setToSaveWorkerHours([])
  }

  const handleSaveConstTimeWork = itemWorkerId => {
    const selectWorker = toSaveWorkerHours.find(
      hour => hour.indexWorker === itemWorkerId
    )
    dispatch(fetchSaveWorkerProps(user.token, companyId, null, selectWorker))
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

  return (
    <WorkerItemStyle
      userEditItem={userEditItem}
      selectHeight={selectHeight + 300}
      siteProps={siteProps}
      editConstTimeWorker={editConstTimeWorker}
      onClick={() =>
        handleClickActiveWorker({
          user: item.user._id,
          services: item.servicesCategory,
        })
      }
      active={
        !!activeWorkerUserId ? activeWorkerUserId.user === item.user._id : false
      }
    >
      {!!item.user.imageUrl ? (
        <BackGroundImageCustomUrl
          url={`${Site.awsUrl}/${item.user.imageUrl}`}
        />
      ) : (
        <WorkerCircle isCompanyEditProfil={editedWorkers} siteProps={siteProps}>
          <FaUser />
        </WorkerCircle>
      )}
      <WorkerName>{`${item.user.name} ${item.user.surname}`}</WorkerName>
      <WorkerSpecjalization>{inputSpecialization}</WorkerSpecjalization>
      {editedWorkers && (
        <>
          <EditUserStyle>
            <EditIconStyle
              onClick={handleChooseTimeWorker}
              // onClick={handleUserTimeWork}
              data-tip
              data-for="timeWorkUser"
              data-place="left"
              siteProps={siteProps}
            >
              <MdTimelapse />
            </EditIconStyle>
            <EditIconStyle
              onClick={handleUserItemEdit}
              data-tip
              data-for="editUser"
              data-place="left"
              siteProps={siteProps}
            >
              <MdEdit />
            </EditIconStyle>
            {isAdmin && (
              <DeleteUserIconStyle
                onClick={handleUserConfirmDelete}
                data-tip
                data-for="deleteUser"
                data-place="left"
                siteProps={siteProps}
              >
                <MdDelete />
              </DeleteUserIconStyle>
            )}
          </EditUserStyle>
          <ActiveWorkerStyle>
            <IconVeryfiedUser
              active={item.active}
              data-tip
              data-for="alertActive"
              siteProps={siteProps}
            >
              {item.active ? <MdVerifiedUser /> : <MdError />}
            </IconVeryfiedUser>
            {!item.active && (
              <IconVeryfiedUser
                email
                onClick={handleSentAgainEmailVeryfication}
                data-tip
                data-for="sentAgainEmail"
                siteProps={siteProps}
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
                siteProps={siteProps}
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
                      <SelectCreated
                        widthAuto
                        defaultMenuIsOpen={false}
                        options={allCategories}
                        handleChange={handleChangeSelect}
                        value={workerServicesCategory}
                        placeholder="Usługi"
                        isMulti
                        closeMenuOnSelect={false}
                        menuIsOpen
                        isClearable={false}
                        darkSelect
                        onlyText
                        maxMenuHeight={250}
                      />
                    </SelectStyle>
                  </>
                )}
                {isAdmin && (
                  <SelectStyle>
                    Uprawnienia do
                    <SelectCreated
                      widthAuto
                      defaultMenuIsOpen={false}
                      options={Permissions}
                      handleChange={handleChangeSelectPermissions}
                      value={workerPermissionsCategory}
                      placeholder="Uprawnienia"
                      isMulti
                      closeMenuOnSelect={false}
                      menuIsOpen
                      maxMenuHeight={250}
                      onlyText
                      darkSelect
                    />
                  </SelectStyle>
                )}
                <ButtonContentEdit>
                  <ButtonStyles>
                    <ButtonIcon
                      title="Anuluj"
                      uppercase
                      fontIconSize="16"
                      fontSize="14"
                      icon={<FaArrowLeft />}
                      onClick={handleEditSpecializationReset}
                      customColorButton={Colors(siteProps).dangerColorDark}
                      customColorIcon={Colors(siteProps).dangerColor}
                    />
                  </ButtonStyles>
                  <ButtonStyles>
                    <ButtonIcon
                      title="Zapisz"
                      uppercase
                      fontIconSize="20"
                      fontSize="14"
                      icon={<MdDone />}
                      onClick={handleSaveSpecialization}
                      customColorButton={Colors(siteProps).successColorDark}
                      customColorIcon={Colors(siteProps).successColor}
                      // disabled={!disabledButtonAccept}
                    />
                  </ButtonStyles>
                </ButtonContentEdit>
                <DeleteIconPosition>
                  <DeleteIconStyle
                    onClick={handleEditSpecializationReset}
                    siteProps={siteProps}
                  >
                    <MdClose />
                  </DeleteIconStyle>
                </DeleteIconPosition>
              </EditUserBackgroundContent>
            </EditUserBackground>
          </CSSTransition>
          {isAdmin && (
            <CSSTransition
              in={userConfirmDelete}
              timeout={400}
              classNames="popup"
              unmountOnExit
            >
              <EditUserBackground>
                <EditUserBackgroundContent
                  onClick={handleClickContent}
                  noBg
                  siteProps={siteProps}
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
                        customColorButton={Colors(siteProps).successColorDark}
                        customColorIcon={Colors(siteProps).successColor}
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
                        customColorButton={Colors(siteProps).dangerColorDark}
                        customColorIcon={Colors(siteProps).dangerColor}
                      />
                    </ButtonDeleteStyle>
                  </ButtonContent>
                </EditUserBackgroundContent>
              </EditUserBackground>
            </CSSTransition>
          )}
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
                siteProps={siteProps}
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
                      customColorButton={Colors(siteProps).dangerColorDark}
                      customColorIcon={Colors(siteProps).dangerColor}
                    />
                  </ButtonDeleteStyle>
                </ButtonContent>
              </EditUserBackgroundContent>
            </EditUserBackground>
          </CSSTransition>
          <ConstTimeWorkTime
            constTimeWorker={constTimeWorker}
            handleClickContent={handleClickContent}
            siteProps={siteProps}
            EditUserBackground={EditUserBackground}
            EditUserBackgroundContent={EditUserBackgroundContent}
            ButtonContent={ButtonContent}
            ButtonDeleteStyle={ButtonDeleteStyle}
            handleCancelConstTimeWork={handleCancelConstTimeWork}
            itemWorker={item}
            handleSaveConstTimeWorkItem={handleSaveConstTimeWorkItem}
            handleCloseConstTimeWorkItem={handleCloseConstTimeWorkItem}
            handleSaveConstTimeWork={handleSaveConstTimeWork}
            resetConstDays={resetConstDays}
            editedWorkers={editedWorkers}
          />
        </>
      )}
    </WorkerItemStyle>
  )
}
export default WorkerItem
