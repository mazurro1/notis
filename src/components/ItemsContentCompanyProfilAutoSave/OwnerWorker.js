/*eslint-disable eqeqeq*/
import React, { useState, useEffect } from "react"
import {
  FaUser,
  FaCalendarAlt,
  FaCalendarWeek,
  FaArrowLeft,
} from "react-icons/fa"
import SelectCreated from "../SelectCreated"
import ReactTooltip from "react-tooltip"
import { MdEdit, MdDone, MdTimelapse } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { Colors } from "../../common/Colors"
import ButtonIcon from "../ButtonIcon"
import InputIcon from "../InputIcon"
import styled from "styled-components"
import {
  changeEditWorkerHours,
  fetchSaveWorkerProps,
  resetWorkersPropsVisible,
} from "../../state/actions"
import ConstTimeWorkTime from "./ConstTimeWorkTime"
import { Site } from "../../common/Site"
import Popup from "../Popup"

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

const SelectStyle = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
`

const InputStyles = styled.div`
  input {
    /* padding: 5px 10px; */
  }
`

const OwnerWorker = ({
  ButtonDeleteStyle,
  ButtonContent,
  siteProps,
  allCategories,
  EditIconStyle,
  EditUserStyle,
  WorkerSpecjalization,
  WorkerName,
  WorkerCircle,
  WorkerItemStyle,
  isCompanyEditProfil,
  owner,
  handleClickContent,
  company,
  ownerData,
  editedWorkers = false,
  item,
  ownerSpecialization,
  companyId,
  user,
  editMode,
  handleClickActiveWorker,
  activeWorkerUserId,
  BackGroundImageCustomUrl,
  premiumActive,
  isAdmin,
}) => {
  const [ownerServicesCategory, setOwnerServicesCategory] = useState([])
  const [inputSpecializationOwner, setInputSpecializationOwner] = useState(
    ownerSpecialization
  )
  const [editConstTimeWorker, setEditConstTimeWorker] = useState(false)
  const [toSaveWorkerHours, setToSaveWorkerHours] = useState([])
  const [chooseTimeOwner, setChooseTimeOwner] = useState(false)
  const [constTimeOwner, setConstTimeOwner] = useState(false)
  const [ownerEdit, setOwnerEdit] = useState(false)
  const resetWorkerProps = useSelector(state => state.resetWorkerProps)
  const dispatch = useDispatch()

  useEffect(() => {
    const servicesWorker = ownerData.servicesCategory.map(serv => {
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
    setOwnerServicesCategory(servicesWorker)
    setToSaveWorkerHours([])
    setInputSpecializationOwner(ownerData.specialization)
    setOwnerEdit(false)
    dispatch(resetWorkersPropsVisible())
    setConstTimeOwner(false)
    setChooseTimeOwner(false)
    setEditConstTimeWorker(false)
  }, [item, resetWorkerProps]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const servicesWorker = ownerData.servicesCategory.map(serv => {
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
    setOwnerServicesCategory(servicesWorker)
    setToSaveWorkerHours([])
    setInputSpecializationOwner(ownerData.specialization)
    setOwnerEdit(false)
    dispatch(resetWorkersPropsVisible())
    setConstTimeOwner(false)
    setEditConstTimeWorker(false)
    setChooseTimeOwner(false)
  }, [editedWorkers, editMode]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChooseTimeOwner = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setChooseTimeOwner(prevState => !prevState)
  }

  const handleUserTimeWork = () => {
    const itemsToSent = {
      ...ownerData,
      company: company,
      user: owner,
    }
    dispatch(changeEditWorkerHours(true, itemsToSent))
  }

  const handleClickOwnerEdit = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    if (!!isAdmin) {
      setOwnerEdit(prevState => !prevState)
    }
  }

  const handleResetDay = (itemWorkerId, dayOfTheWeek) => {}

  const handleSaveConstTimeWork = itemWorkerId => {
    const selectWorker = toSaveWorkerHours.find(
      hour => hour.indexWorker === itemWorkerId
    )
    dispatch(fetchSaveWorkerProps(user.token, companyId, null, selectWorker))
  }

  const handleCloseConstTimeWorkItem = (indexWorker, dayOfTheWeek) => {
    const newToSaveWorkerHours = [...toSaveWorkerHours]
    const indexWorkerInArray = toSaveWorkerHours.findIndex(
      item => item.indexWorker === indexWorker
    )
    if (indexWorkerInArray >= 0) {
      const filterArray = newToSaveWorkerHours[
        indexWorkerInArray
      ].constantWorkingHours.filter(item => item.dayOfTheWeek !== dayOfTheWeek)
      newToSaveWorkerHours[
        indexWorkerInArray
      ].constantWorkingHours = filterArray
    }
    setToSaveWorkerHours(newToSaveWorkerHours)
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

  const handleCancelConstTimeWork = itemWorkerId => {
    const filterToSaveWorkers = toSaveWorkerHours.filter(
      item => item.indexWorker !== itemWorkerId
    )
    setToSaveWorkerHours(filterToSaveWorkers)
    setConstTimeOwner(false)
    setChooseTimeOwner(true)
    setEditConstTimeWorker(false)
  }

  const handleConstTimeWork = () => {
    setChooseTimeOwner(false)
    setConstTimeOwner(true)
    setEditConstTimeWorker(true)
  }

  const handleChangeSelectOwner = value => {
    const valueToSave = !!value ? value : []
    setOwnerServicesCategory(valueToSave)
  }

  const handleSaveSpecialization = () => {
    const workerServicesCategoryToSent = ownerServicesCategory.map(
      itemValue => itemValue.value
    )

    const dataToSave = {
      workerId: "owner",
      inputSpecializationValue: inputSpecializationOwner,
      workerServicesCategoryValue: workerServicesCategoryToSent,
      mapWorkerPermissionsIds: [],
    }

    dispatch(fetchSaveWorkerProps(user.token, companyId, dataToSave))
  }

  const handleResetOwnerSpecialization = () => {
    const servicesWorker = ownerData.servicesCategory.map(serv => {
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
    setOwnerServicesCategory(servicesWorker)
    setToSaveWorkerHours([])
    setInputSpecializationOwner(ownerData.specialization)
    setOwnerEdit(false)
  }

  const handleInputOnChange = e => {
    setInputSpecializationOwner(e.target.value)
  }

  const itemOwner = {
    ...ownerData,
    user: owner,
    _id: "owner",
  }

  const oldItemWorker = {
    servicesCategory: ownerData.servicesCategory,
    specialization: ownerData.specialization,
  }

  const workerServicesCategoryToValid = ownerServicesCategory.map(
    itemValue => itemValue.value
  )

  const newItemWorker = {
    servicesCategory: workerServicesCategoryToValid,
    specialization: inputSpecializationOwner,
  }

  const isEq = JSON.stringify(oldItemWorker) == JSON.stringify(newItemWorker)

  const disabledButtonSaveWorkerProps = isEq

  return (
    <WorkerItemStyle
      userEditItem={ownerEdit}
      selectHeight={200}
      siteProps={siteProps}
      editConstTimeWorker={editConstTimeWorker}
      onClick={() =>
        handleClickActiveWorker({
          user: owner._id,
          services: ownerData.servicesCategory,
        })
      }
      active={
        !!activeWorkerUserId ? activeWorkerUserId.user === owner._id : false
      }
    >
      {!!owner.imageUrl ? (
        <BackGroundImageCustomUrl
          url={
            owner.imageUrl.includes("https://")
              ? owner.imageUrl
              : `${Site.awsUrl}/${owner.imageUrl}`
          }
          editedWorkers={editedWorkers}
        />
      ) : (
        <WorkerCircle isCompanyEditProfil={editedWorkers} siteProps={siteProps}>
          <FaUser />
        </WorkerCircle>
      )}
      <WorkerName>{`${owner.name} ${owner.surname}`}</WorkerName>
      <WorkerSpecjalization>{inputSpecializationOwner}</WorkerSpecjalization>
      {editedWorkers && !!isAdmin && (
        <>
          <EditUserStyle>
            {premiumActive && (
              <EditIconStyle
                onClick={handleChooseTimeOwner}
                data-tip
                data-for={`timeWorkUserOwner`}
                data-place="left"
                siteProps={siteProps}
              >
                <MdTimelapse />
              </EditIconStyle>
            )}
            <EditIconStyle
              data-tip
              data-for={`editOwner`}
              data-place="left"
              onClick={handleClickOwnerEdit}
              siteProps={siteProps}
            >
              <MdEdit />
            </EditIconStyle>
          </EditUserStyle>
          <Popup
            popupEnable={ownerEdit}
            position="absolute"
            title="Edycja administratora"
            borderRadius
            closeTitle={false}
            smallTitle
            secondColors
          >
            <InputStyles>
              <InputIcon
                placeholder="Stanowisko"
                value={inputSpecializationOwner}
                secondColor
                onChange={handleInputOnChange}
              />
            </InputStyles>
            {allCategories.length > 0 && (
              <>
                <SelectStyle>
                  Wykonywane usługi
                  <SelectCreated
                    widthAuto
                    defaultMenuIsOpen={false}
                    options={allCategories}
                    handleChange={handleChangeSelectOwner}
                    value={ownerServicesCategory}
                    placeholder="Usługi"
                    isMulti
                    closeMenuOnSelect={false}
                    menuIsOpen
                    isClearable={false}
                    darkSelect
                    onlyText
                    maxMenuHeight={120}
                    top
                  />
                </SelectStyle>
              </>
            )}
            <ButtonContentEdit>
              <ButtonStyles>
                <ButtonIcon
                  title="Anuluj"
                  uppercase
                  fontIconSize="16"
                  fontSize="14"
                  icon={<FaArrowLeft />}
                  onClick={handleResetOwnerSpecialization}
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
                  disabled={disabledButtonSaveWorkerProps}
                />
              </ButtonStyles>
            </ButtonContentEdit>
          </Popup>
          <Popup
            popupEnable={chooseTimeOwner}
            position="absolute"
            borderRadius
            noContent
          >
            <ButtonContent>
              <ButtonDeleteStyle
                data-tip
                data-for={`constTimeWorkOwner`}
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
                data-for={`timeWorkOwner`}
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
                  onClick={handleChooseTimeOwner}
                  customColorButton={Colors(siteProps).dangerColorDark}
                  customColorIcon={Colors(siteProps).dangerColor}
                />
              </ButtonDeleteStyle>
              <ReactTooltip
                id={`constTimeWorkOwner`}
                effect="float"
                multiline={true}
              >
                <span>Ustaw czas pracy</span>
              </ReactTooltip>
              <ReactTooltip
                id={`timeWorkOwner`}
                effect="float"
                multiline={true}
              >
                <span>Ustaw czas pracy w innych dniach itp itd</span>
              </ReactTooltip>
            </ButtonContent>
          </Popup>
          <ConstTimeWorkTime
            constTimeWorker={constTimeOwner}
            handleClickContent={handleClickContent}
            siteProps={siteProps}
            ButtonContent={ButtonContent}
            ButtonDeleteStyle={ButtonDeleteStyle}
            handleCancelConstTimeWork={handleCancelConstTimeWork}
            itemWorker={itemOwner}
            handleSaveConstTimeWorkItem={handleSaveConstTimeWorkItem}
            handleCloseConstTimeWorkItem={handleCloseConstTimeWorkItem}
            handleSaveConstTimeWork={handleSaveConstTimeWork}
            handleResetDay={handleResetDay}
            toSaveWorkerHours={toSaveWorkerHours}
          />

          <ReactTooltip
            id={`timeWorkUserOwner`}
            effect="float"
            multiline={true}
          >
            <span>Edytuj godziny pracy</span>
          </ReactTooltip>
          <ReactTooltip id={`editOwner`} effect="float" multiline={true}>
            <span>Edytuj stanowisko</span>
          </ReactTooltip>
        </>
      )}
    </WorkerItemStyle>
  )
}
export default OwnerWorker
