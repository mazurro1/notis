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

import { FaUser, FaArrowLeft } from "react-icons/fa"
import { CSSTransition } from "react-transition-group"
import {
  fetchDeleteUserFromCompany,
  fetchAddAgainWorkerToCompany,
  changeEditWorkerHours,
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

const ButtonDeleteStyle = styled.div`
  padding: 2.5px;
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

const SelectStyle = styled.div`
  margin-bottom: 120px;
  margin-top: 20px;
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
  allCategoriesWithItems,
  editedWorkers,
  allCategories,
  setAllCategories,
  company,
  editMode,
  colorBlind,
}) => {
  const [chooseTimeWorker, setChooseTimeWorker] = useState(false)
  const [userEditItem, setUserEditItem] = useState(false)
  const [userConfirmDelete, setUserConfirmDelete] = useState(false)
  const [inputSpecialization, setInputSpeciailization] = useState(
    item.specialization
  )
  const [workerServicesCategory, setWorkerServicesCategory] = useState([])
  const [selectHeight, setSelectHeight] = useState(0)
  const [resetServicesCategory, setResetServicesCategory] = useState(false)
  const selectRef = useRef(null)

  useEffect(() => {
    setUserEditItem(false)
    setUserConfirmDelete(false)
    setChooseTimeWorker(false)
  }, [editMode])

  useEffect(() => {
    if (!!item.servicesCategory) {
      if (item.servicesCategory.length > 0) {
        const valuePadding = allCategoriesWithItems.length * 23 + 15
        setSelectHeight(valuePadding)
      }
    }
  }, [item, setSelectHeight, allCategoriesWithItems.length])

  useEffect(() => {
    if (!!selectRef.current) {
      setSelectHeight(selectRef.current.clientHeight)
    }
  }, [selectRef, workerServicesCategory, item])

  useEffect(() => {
    if (allCategoriesWithItems.length > 0 || !!resetServicesCategory) {
      const newCategories = allCategoriesWithItems.map(item => {
        const newItem = {
          value: item.oldCategory,
          label: item.category,
        }
        return newItem
      })

      //take all categories
      const allCategories = []
      allCategoriesWithItems.forEach(item => {
        if (item.items.length > 0) {
          allCategories.push(item.category)
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
        const workerServicesCategoryMaped = actualServicesCategory.map(item => {
          return {
            label: item,
            value: item,
          }
        })
        allWorkerServicesCategory = [...workerServicesCategoryMaped]
      }

      //change label when category was actualizated
      const newWorkerServicesCategory = [...allWorkerServicesCategory]
      if (newWorkerServicesCategory.length > 0 || !!actualServicesCategory) {
        newWorkerServicesCategory.forEach((item, index) => {
          newCategories.forEach(itemCategory => {
            if (itemCategory.value === item.value) {
              newWorkerServicesCategory[index].label = itemCategory.label
            }
          })
        })

        //filter categories worker
        const filteredArrayAllCategories = newWorkerServicesCategory.filter(
          item => {
            const isCategoryInWorkerArr = allCategories.some(
              category => category === item.label
            )
            return isCategoryInWorkerArr
          }
        )
        //actualizate selected category user
        setWorkerServicesCategory(filteredArrayAllCategories)
      }
      setAllCategories(newCategories)
    }
  }, [allCategoriesWithItems, item, setAllCategories])

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

    // if (disabledButtonAccept) {
    const inputSpecializationValue =
      inputSpecialization !== item.specialization
        ? inputSpecialization
        : item.specialization

    const workerServicesCategoryToSent = workerServicesCategory.map(
      item => item.label
    )

    const workerServicesCategoryValue = workerServicesCategoryToSent

    handleAddEditWorker(
      "save",
      item.user._id,
      inputSpecializationValue,
      workerServicesCategoryValue
    )
    // }
  }

  const handleEditSpecializationReset = () => {
    let actualServicesCategory = workerServicesCategory
    if (!!editedWorkers) {
      actualServicesCategory = editedWorkers.servicesCategory.map(item => {
        return {
          label: item,
          value: item,
        }
      })
    }
    setInputSpeciailization(item.specialization)
    setUserEditItem(false)
    const mapLebelValueToCategory = actualServicesCategory.map(
      item => item.label
    )
    handleAddEditWorker(
      "delete",
      item.user._id,
      inputSpecialization,
      mapLebelValueToCategory
    )
    setWorkerServicesCategory(actualServicesCategory)
    setResetServicesCategory(true)
  }

  const handleChangeSelect = value => {
    const valueToSave = !!value ? value : []
    setWorkerServicesCategory(valueToSave)
  }

  const handleUserTimeWork = () => {
    const itemsToSent = {
      ...item,
      company: company,
    }
    dispatch(changeEditWorkerHours(true, itemsToSent))
  }

  return (
    <WorkerItemStyle userEditItem={userEditItem} selectHeight={selectHeight}>
      <WorkerCircle
        isCompanyEditProfil={isCompanyEditProfil}
        colorBlind={colorBlind}
      >
        <FaUser />
      </WorkerCircle>
      <WorkerName>{`${item.user.name} ${item.user.surname}`}</WorkerName>
      <WorkerSpecjalization>{inputSpecialization}</WorkerSpecjalization>
      {isCompanyEditProfil && (
        <>
          <EditUserStyle>
            <EditIconStyle
              onClick={handleChooseTimeWorker}
              // onClick={handleUserTimeWork}
              data-tip
              data-for={`timeWorkUser${index}`}
              data-place="left"
              colorBlind={colorBlind}
            >
              <MdTimelapse />
            </EditIconStyle>
            <EditIconStyle
              onClick={handleUserItemEdit}
              data-tip
              data-for={`editUser${index}`}
              data-place="left"
              colorBlind={colorBlind}
            >
              <MdEdit />
            </EditIconStyle>
            <DeleteUserIconStyle
              onClick={handleUserConfirmDelete}
              data-tip
              data-for={`deleteUser${index}`}
              data-place="left"
              colorBlind={colorBlind}
            >
              <MdDelete />
            </DeleteUserIconStyle>
          </EditUserStyle>
          <ActiveWorkerStyle>
            <IconVeryfiedUser
              active={item.active}
              data-tip
              data-for={`alertActive${index}`}
              colorBlind={colorBlind}
            >
              {item.active ? <MdVerifiedUser /> : <MdError />}
            </IconVeryfiedUser>
            {!item.active && (
              <IconVeryfiedUser
                email
                onClick={handleSentAgainEmailVeryfication}
                data-tip
                data-for={`sentAgainEmail${index}`}
                colorBlind={colorBlind}
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
                      />
                    </SelectStyle>
                  </>
                )}
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
            <EditUserBackground>
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
          </CSSTransition>
          <CSSTransition
            in={chooseTimeWorker}
            timeout={400}
            classNames="popup"
            unmountOnExit
          >
            <EditUserBackground>
              <EditUserBackgroundContent onClick={handleClickContent} noBg>
                <ButtonContent>
                  <ButtonDeleteStyle>
                    <ButtonIcon
                      title="Stały czas pracy"
                      uppercase
                      fontIconSize="16"
                      fontSize="14"
                      icon={<FaArrowLeft />}
                      onClick={handleChooseTimeWorker}
                      secondColors
                    />
                  </ButtonDeleteStyle>
                  <ButtonDeleteStyle>
                    <ButtonIcon
                      title="Zmienny czas pracy"
                      uppercase
                      fontIconSize="16"
                      fontSize="14"
                      icon={<FaArrowLeft />}
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
          <ReactTooltip
            id={`alertActive${index}`}
            effect="float"
            multiline={true}
          >
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
          <ReactTooltip
            id={`timeWorkUser${index}`}
            effect="float"
            multiline={true}
          >
            <span>Edytuj godziny pracy pracownika</span>
          </ReactTooltip>
          <ReactTooltip id={`editUser${index}`} effect="float" multiline={true}>
            <span>Edytuj stanowisko pracownika</span>
          </ReactTooltip>
          <ReactTooltip
            id={`deleteUser${index}`}
            effect="float"
            multiline={true}
          >
            <span>Usuń pracownika</span>
          </ReactTooltip>
        </>
      )}
    </WorkerItemStyle>
  )
}
export default WorkerItem
