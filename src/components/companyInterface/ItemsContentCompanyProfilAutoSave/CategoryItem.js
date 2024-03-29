import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import {
  MdExpandMore,
  MdLibraryAdd,
  MdDeleteForever,
  MdEdit,
  MdTitle,
  MdReorder,
  MdAccessTime,
  MdArrowBack,
} from "react-icons/md"
import { FaDollarSign } from "react-icons/fa"
import ServicesItem from "./ServicesItem"
import { Collapse } from "react-collapse"
import { ButtonIcon, Popup, InputIcon, SelectCreated } from "@ui"
import { Checkbox } from "react-input-checkbox"
import { useSelector, useDispatch } from "react-redux"
import { ServiceColors } from "@common/ServiceColors"
import { addAlertItem } from "@state/actions"

const TextCheckbox = styled.span`
  position: relative;
  top: -7px;
  padding-left: 10px;
  font-family: "Poppins-Bold", sans-serif;
  user-select: none;
  font-size: 1rem;
`

const CategoryItemStyle = styled.div`
  margin-top: 20px;
  margin-bottom: ${props => `-${props.paddingCategory}px`};
`

const CheckboxStyle = styled.div`
  margin-bottom: 10px;

  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.siteProps).secondColor};
  }
`

const TitleCategory = styled.div`
  position: relative;
  font-size: 1.25rem;
  cursor: pointer;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props =>
    props.isCompanyEditProfil
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).primaryColor};
  padding: 10px;
  border-radius: 5px;
  padding-right: ${props => (props.isCompanyEditProfil ? "190px" : "50px")};
  padding-bottom: ${props =>
    props.clickDelete
      ? "50px"
      : props.clickAdd
      ? "650px"
      : props.clickEdit
      ? "250px"
      : "10px"};
  overflow: hidden;
  user-select: none;
  transition-property: padding-bottom, background-color, color;
  transition-duration: 0.5s;
  transition-timing-function: ease;
`

const IconArrowPosition = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 7px;
  padding-bottom: 0;
  font-size: 2rem;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  svg {
    transform: ${props =>
      props.collapseActive ? "rotate(-180deg)" : "rotate(0deg)"};
    transition-property: transform;
    transition-duration: 0.5s;
    transition-timing-function: ease;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const IconAddPosition = styled.div`
  position: absolute;
  top: 0;
  right: 46px;
  font-size: 2rem;
  padding: 7px;
  padding-bottom: 0;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const IconEditPosition = styled.div`
  position: absolute;
  top: 0;
  right: 92px;
  font-size: 2rem;
  padding: 7px;
  padding-bottom: 0;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const IconDeletePosition = styled.div`
  position: absolute;
  top: 0;
  right: 138px;
  font-size: 2rem;
  padding: 7px;
  padding-bottom: 0;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const ButtonsDeletePosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonsAddPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const ButtonMarginSubmit = styled.button`
  margin: 5px;
  border: none;
  background-color: transparent;
`

const SelectStyle = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`

const TextSelectStyle = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
  font-size: 0.9rem;
`

const CategoryItem = ({
  item,
  isCompanyEditProfil,
  index,
  handleAddItemInCategory,
  handleDeleteAllCategory,
  handleChangeNameCategory,
  handleChangeSaveEdit,
  handleDeleteServiceItem,
  handleClickReserwation,
  companyId,
  userIsBlocked,
  userCannotMakeReservation,
  isWorkerBlocked,
  userAccountNotVeryfied,
  userPhoneVeryfied,
  userEmailVeryfied,
  premiumActive,
}) => {
  const [colorServiceComponent, setColorServiceComponent] = useState({
    value: 1,
    label: "",
  })
  const [collapseActive, setCollapseActive] = useState(true)
  const [clickDelete, setClickDelete] = useState(false)
  const [clickAdd, setClickAdd] = useState(false)
  const [clickEdit, setClickEdit] = useState(false)
  const [extraPrice, setExtraPrice] = useState(false)
  const [extraTime, setExtraTime] = useState(false)
  const [titleInput, setInputTitle] = useState("")
  const [contentInput, setContentInput] = useState("")
  const [timeInput, setTimeInput] = useState("")
  const [priceInput, setPriceInput] = useState("")
  const [categoryTitle, setCategoryTitle] = useState("")
  const resetCompany = useSelector(state => state.resetCompany)
  const siteProps = useSelector(state => state.siteProps)
  const activeWorkerUserId = useSelector(state => state.activeWorkerUserId)
  const dispatch = useDispatch()

  useEffect(() => {
    setClickDelete(false)
    setClickAdd(false)
    setClickEdit(false)
  }, [isCompanyEditProfil])

  useEffect(() => {
    const selectedDefaultColor = ServiceColors.find(col => col.value === 1)
    setColorServiceComponent(selectedDefaultColor)
  }, [ServiceColors]) // eslint-disable-line react-hooks/exhaustive-deps

  const disabledCategorySave =
    categoryTitle.toLowerCase() === item.category.toLowerCase()

  useEffect(() => {
    setCategoryTitle(item.category)
  }, [index, item, resetCompany])

  const handleClickArrow = e => {
    setCollapseActive(prevState => !prevState)
  }

  const handleClickDelete = e => {
    e.stopPropagation()
    setClickDelete(prevState => !prevState)
  }

  const handleClickAdd = e => {
    e.stopPropagation()
    setClickAdd(prevState => !prevState)
  }

  const handleEditCategory = e => {
    e.stopPropagation()
    setClickEdit(prevState => !prevState)
  }

  const handleChangeInput = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleDeleteCategory = () => {
    setClickDelete(false)
    handleDeleteAllCategory(item.categoryId)
    setCollapseActive(true)
  }

  const handleOnChangeCheckbox = setChange => {
    setChange(prevState => !prevState)
  }

  const handleChangeColorService = value => {
    setColorServiceComponent(value)
  }

  const disabledAddItemCategory =
    titleInput.length >= 3 && !!timeInput && !!priceInput

  const handleAddItem = e => {
    e.preventDefault()
    if (disabledAddItemCategory) {
      if (titleInput.length >= 3 && !!timeInput && !!priceInput) {
        handleAddItemInCategory(
          item.category,
          titleInput,
          contentInput,
          timeInput,
          extraTime,
          priceInput,
          extraPrice,
          colorServiceComponent.value,
          item.categoryId
        )
        setClickAdd(false)
        setCollapseActive(true)
        setExtraPrice(false)
        setExtraTime(false)
        setInputTitle("")
        setContentInput("")
        setTimeInput("")
        setPriceInput("")
        setColorServiceComponent({
          value: 1,
          label: "Domyślny (jasno niebieski)",
        })
      }
    } else {
      if (titleInput.length < 3) {
        dispatch(addAlertItem("Nazwa kategori jest za krótka", "red"))
      }
      if (!!!timeInput) {
        dispatch(addAlertItem("Nie dodano czasu usługi", "red"))
      }
      if (!!!priceInput) {
        dispatch(addAlertItem("Nie dodano ceny usługi", "red"))
      }
    }
  }

  const handleResetCategory = () => {
    setClickEdit(false)
    setCategoryTitle(item.category)
  }

  const handleChangeCategoryTitle = e => {
    e.preventDefault()
    if (categoryTitle.length >= 3) {
      if (!disabledCategorySave) {
        setClickEdit(false)
        handleChangeNameCategory(categoryTitle, item.categoryId)
      } else {
        dispatch(addAlertItem("Nazwa kategori musi być inna", "red"))
      }
    } else {
      dispatch(addAlertItem("Nazwa kategori jest za krótka", "red"))
    }
  }

  const servicesMap = item.items.map((itemServices, indexSerives) => {
    return (
      <ServicesItem
        key={indexSerives}
        itemServices={itemServices}
        index={indexSerives}
        isCompanyEditProfil={isCompanyEditProfil}
        clickDelete={clickDelete}
        CheckboxStyle={CheckboxStyle}
        TextCheckbox={TextCheckbox}
        ButtonsAddPosition={ButtonsAddPosition}
        ButtonMargin={ButtonMargin}
        ButtonMarginSubmit={ButtonMarginSubmit}
        handleChangeSaveEdit={handleChangeSaveEdit}
        ButtonsDeletePosition={ButtonsDeletePosition}
        handleDeleteServiceItem={handleDeleteServiceItem}
        handleClickReserwation={handleClickReserwation}
        companyId={companyId}
        siteProps={siteProps}
        userIsBlocked={userIsBlocked}
        userAccountNotVeryfied={userAccountNotVeryfied}
        userPhoneVeryfied={userPhoneVeryfied}
        userEmailVeryfied={userEmailVeryfied}
        activeWorkerUserId={activeWorkerUserId}
        isWorkerBlocked={isWorkerBlocked}
        premiumActive={premiumActive}
        userCannotMakeReservation={userCannotMakeReservation}
      />
    )
  })
  return (
    <CategoryItemStyle
      data-sal={!isCompanyEditProfil && "zoom-in"}
      data-sal-duration={!isCompanyEditProfil && "1000"}
      data-sal-easing={!isCompanyEditProfil && "ease-out-bounce"}
    >
      <TitleCategory
        isCompanyEditProfil={isCompanyEditProfil}
        clickDelete={clickDelete}
        clickAdd={clickAdd}
        clickEdit={clickEdit}
        siteProps={siteProps}
        onClick={handleClickArrow}
      >
        {item.category}
        <IconArrowPosition collapseActive={collapseActive}>
          <MdExpandMore />
        </IconArrowPosition>
        {isCompanyEditProfil && (
          <>
            <IconDeletePosition
              onClick={e => handleClickDelete(e)}
              data-tip
              data-for="deleteCategory"
            >
              <MdDeleteForever />
            </IconDeletePosition>
            <IconEditPosition
              onClick={e => handleEditCategory(e)}
              data-tip
              data-for="editCategory"
            >
              <MdEdit />
            </IconEditPosition>
            <IconAddPosition
              onClick={e => handleClickAdd(e)}
              data-tip
              data-for="addItem"
            >
              <MdLibraryAdd />
            </IconAddPosition>

            <Popup
              popupEnable={clickDelete}
              position="absolute"
              borderRadius
              noContent
            >
              <ButtonsDeletePosition>
                <ButtonMargin>
                  <ButtonIcon
                    title="Anuluj"
                    uppercase
                    fontIconSize="20"
                    fontSize="14"
                    icon={<MdArrowBack />}
                    customColorButton={Colors(siteProps).successColorDark}
                    customColorIcon={Colors(siteProps).successColor}
                    onClick={handleClickDelete}
                  />
                </ButtonMargin>
                <ButtonMargin>
                  <ButtonIcon
                    title="Usuń"
                    uppercase
                    fontIconSize="20"
                    fontSize="14"
                    icon={<MdDeleteForever />}
                    customColorButton={Colors(siteProps).dangerColorDark}
                    customColorIcon={Colors(siteProps).dangerColor}
                    onClick={handleDeleteCategory}
                    isFetchToBlock
                  />
                </ButtonMargin>
              </ButtonsDeletePosition>
            </Popup>
            <Popup
              popupEnable={clickEdit}
              position="absolute"
              title="Edytuj kategorię"
              borderRadius
              closeTitle={false}
              smallTitle
              secondColors
            >
              <form onSubmit={handleChangeCategoryTitle}>
                <InputIcon
                  icon={<MdTitle />}
                  placeholder="Nazwa kategorii"
                  secondColor
                  value={categoryTitle}
                  type="text"
                  onChange={e => handleChangeInput(e, setCategoryTitle)}
                  required
                  validText="Minimum 3 znaki"
                />
                <ButtonsAddPosition>
                  <ButtonMargin>
                    <ButtonIcon
                      title="Cofnij"
                      uppercase
                      fontIconSize="40"
                      fontSize="13"
                      icon={<MdArrowBack />}
                      onClick={handleResetCategory}
                      customColorButton={Colors(siteProps).dangerColorDark}
                      customColorIcon={Colors(siteProps).dangerColor}
                    />
                  </ButtonMargin>
                  <ButtonMarginSubmit type="submit">
                    <ButtonIcon
                      title="Zapisz"
                      uppercase
                      fontIconSize="20"
                      fontSize="13"
                      icon={<MdLibraryAdd />}
                      customColorButton={Colors(siteProps).successColorDark}
                      customColorIcon={Colors(siteProps).successColor}
                      disabled={
                        disabledCategorySave || categoryTitle.length < 3
                      }
                      isFetchToBlock
                    />
                  </ButtonMarginSubmit>
                </ButtonsAddPosition>
              </form>
            </Popup>
            <Popup
              popupEnable={clickAdd}
              position="absolute"
              title="Nowa usługa"
              borderRadius
              closeTitle={false}
              smallTitle
              secondColors
            >
              <form onSubmit={handleAddItem}>
                <InputIcon
                  icon={<MdTitle />}
                  placeholder="Tytuł"
                  secondColor
                  value={titleInput}
                  type="text"
                  onChange={e => handleChangeInput(e, setInputTitle)}
                  required
                  validText="Minimum 3 znaki"
                />
                <InputIcon
                  icon={<MdReorder />}
                  placeholder="Treść"
                  secondColor
                  value={contentInput}
                  type="text"
                  onChange={e => handleChangeInput(e, setContentInput)}
                />
                <InputIcon
                  icon={<MdAccessTime />}
                  placeholder="Czas w minutach"
                  secondColor
                  value={timeInput}
                  type="number"
                  onChange={e => handleChangeInput(e, setTimeInput)}
                  required
                  validText="Wymagana wartość"
                />
                <CheckboxStyle siteProps={siteProps}>
                  <Checkbox
                    theme="material-checkbox"
                    value={extraTime}
                    onChange={() => handleOnChangeCheckbox(setExtraTime)}
                  >
                    <TextCheckbox>Niestały czas</TextCheckbox>
                  </Checkbox>
                </CheckboxStyle>
                <InputIcon
                  icon={<FaDollarSign />}
                  placeholder="Cena w złotówkach"
                  secondColor
                  value={priceInput}
                  type="number"
                  onChange={e => handleChangeInput(e, setPriceInput)}
                  required
                  validText="Wymagana wartość"
                />
                <CheckboxStyle siteProps={siteProps}>
                  <Checkbox
                    theme="material-checkbox"
                    value={extraPrice}
                    onChange={() => handleOnChangeCheckbox(setExtraPrice)}
                  >
                    <TextCheckbox>Niestała cena</TextCheckbox>
                  </Checkbox>
                </CheckboxStyle>
                <TextSelectStyle siteProps={siteProps}>
                  Nadawany kolor w podglądzie rezerwacji
                </TextSelectStyle>
                <SelectStyle>
                  <SelectCreated
                    options={ServiceColors}
                    value={colorServiceComponent}
                    handleChange={handleChangeColorService}
                    isLoading={false}
                    defaultMenuIsOpen={false}
                    placeholder="Wybierz kolor usługi..."
                    marginAuto={false}
                    darkSelect
                    maxMenuHeight={100}
                    deleteItem={false}
                    top
                  />
                </SelectStyle>
                <ButtonsAddPosition>
                  <ButtonMargin>
                    <ButtonIcon
                      title="Anuluj"
                      uppercase
                      fontIconSize="40"
                      fontSize="13"
                      icon={<MdArrowBack />}
                      onClick={handleClickAdd}
                      customColorButton={Colors(siteProps).dangerColorDark}
                      customColorIcon={Colors(siteProps).dangerColor}
                    />
                  </ButtonMargin>
                  <ButtonMarginSubmit type="submit">
                    <ButtonIcon
                      title="Dodaj"
                      uppercase
                      fontIconSize="20"
                      fontSize="13"
                      icon={<MdLibraryAdd />}
                      customColorButton={Colors(siteProps).successColorDark}
                      customColorIcon={Colors(siteProps).successColor}
                      disabled={!disabledAddItemCategory}
                      isFetchToBlock
                    />
                  </ButtonMarginSubmit>
                </ButtonsAddPosition>
              </form>
            </Popup>
          </>
        )}
      </TitleCategory>
      <Collapse isOpened={collapseActive}>
        <div>{servicesMap}</div>
      </Collapse>
    </CategoryItemStyle>
  )
}
export default CategoryItem
