import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import ButtonIcon from "../ButtonIcon"
import {
  MdLibraryAdd,
  MdEdit,
  MdTitle,
  MdReorder,
  MdAccessTime,
  MdArrowBack,
  MdDeleteForever,
} from "react-icons/md"
import { FaDollarSign } from "react-icons/fa"
import { CSSTransition } from "react-transition-group"
import InputIcon from "../InputIcon"
import { Checkbox } from "react-input-checkbox"

const ServiceItem = styled.div`
  position: relative;
  background-color: ${props => (props.clickDelete ? "#ffebee" : "#f5f4f5")};
  padding: 10px;
  border-radius: 5px;
  border-top-left-radius: ${props => (props.index ? "0px" : "5px")};
  border-top-right-radius: ${props => (props.index ? "0px" : "5px")};
  margin: 5px 5px;
  margin-top: ${props => (props.index ? "0px" : "5px")};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  overflow: hidden;
  padding-bottom: ${props => (props.clickEdit ? "450px" : "auto")};
  transition-property: background-color, padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const TitleService = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`

const ServiceParagraph = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
`

const LeftContent = styled.div`
  width: 80%;
`

const RightContent = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const PriceService = styled.span`
  background-color: red;
  font-size: 0.8rem;
  padding: 2px 5px;
  font-weight: 500;
  color: white;
  margin-left: 10px;
  border-radius: 5px;
  background-color: ${props =>
    props.isCompanyEditProfil
      ? props.otherColor
        ? "#424242"
        : "#ed6c0c"
      : props.otherColor
      ? "#424242"
      : Colors.buttonColor};
`

const TextCheckbox = styled.span`
  position: relative;
  top: -2px;
  padding-left: 10px;
  font-weight: 600;
  user-select: none;
  font-size: 1rem;
`

const ServicesItem = ({
  itemServices,
  index,
  isCompanyEditProfil,
  clickDelete,
  handleClickContent,
  BackgroundEdit,
  BackgroundEditContent,
  CheckboxStyle,
  ButtonsAddPosition,
  ButtonMargin,
  ButtonMarginSubmit,
  handleChangeSaveEdit,
  ButtonsDeletePosition,
  handleDeleteServiceItem,
  handleResetItemToFromServer,
}) => {
  const [clickEdit, setClickEdit] = useState(false)
  const [clickButtonDelete, setClickButtonDelete] = useState(false)
  const [extraPrice, setExtraPrice] = useState(false)
  const [extraTime, setExtraTime] = useState(false)
  const [titleInput, setInputTitle] = useState("")
  const [contentInput, setContentInput] = useState("")
  const [timeInput, setTimeInput] = useState("")
  const [priceInput, setPriceInput] = useState("")

  const disabledSaveButton =
    extraPrice === itemServices.extraCost &&
    extraTime === itemServices.extraTime &&
    titleInput === itemServices.serviceName &&
    contentInput === itemServices.serviceText &&
    timeInput === itemServices.time &&
    priceInput === itemServices.serviceCost

  useEffect(() => {
    setExtraPrice(itemServices.extraCost)
    setExtraTime(itemServices.extraTime)
    setInputTitle(itemServices.serviceName)
    setContentInput(itemServices.serviceText)
    setTimeInput(itemServices.time)
    setPriceInput(itemServices.serviceCost)
  }, [itemServices])

  const handleResetEdit = () => {
    setExtraPrice(itemServices.extraCost)
    setExtraTime(itemServices.extraTime)
    setInputTitle(itemServices.serviceName)
    setContentInput(itemServices.serviceText)
    setTimeInput(itemServices.time)
    setPriceInput(itemServices.serviceCost)
    handleResetItemToFromServer(itemServices._id, itemServices.serviceCategory)
    setClickEdit(false)
  }

  const handleClickDelete = () => {
    setClickButtonDelete(prevState => !prevState)
  }

  const handleConfirmDeleteItem = () => {
    handleDeleteServiceItem(itemServices._id, itemServices.serviceCategory)
    setClickButtonDelete(false)
  }

  const handleChangeInput = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleOnChangeCheckbox = setChange => {
    setChange(prevState => !prevState)
  }

  const handleClickEdit = () => {
    setClickEdit(prevState => !prevState)
  }

  const handleSaveEdit = e => {
    e.preventDefault()
    if (!disabledSaveButton) {
      handleChangeSaveEdit(
        itemServices._id,
        titleInput,
        contentInput,
        timeInput,
        extraTime,
        priceInput,
        extraPrice,
        itemServices.serviceCategory
      )
      setClickEdit(false)
    }
  }

  let timeService = ""
  if (Number(itemServices.time) <= 60) {
    timeService = `${itemServices.time}min`
  } else {
    const numberTime = Number(itemServices.time)
    const numberOfHours = Math.floor(numberTime / 60)
    if (Number(itemServices.time) % 60 === 0) {
      timeService = `${numberOfHours}h`
    } else {
      const numberOfMinutes = numberTime - numberOfHours * 60
      timeService = `${numberOfHours}h ${numberOfMinutes}min`
    }
  }

  return (
    <ServiceItem
      index={index === 0}
      clickDelete={clickDelete}
      clickEdit={clickEdit}
    >
      <LeftContent>
        <TitleService>
          {itemServices.serviceName}
          <PriceService isCompanyEditProfil={isCompanyEditProfil}>
            {`${itemServices.serviceCost}zł ${
              itemServices.extraCost ? "+" : ""
            }`}
          </PriceService>
          <PriceService isCompanyEditProfil={isCompanyEditProfil} otherColor>
            {`${timeService} ${itemServices.extraTime ? "+" : ""}`}
          </PriceService>
        </TitleService>
        <ServiceParagraph>{itemServices.serviceText}</ServiceParagraph>
      </LeftContent>
      <RightContent>
        {isCompanyEditProfil ? (
          <>
            <ButtonMargin>
              <ButtonIcon
                title="Edytuj"
                uppercase
                fontIconSize="40"
                fontSize="14"
                icon={<MdEdit />}
                secondColors
                onClick={handleClickEdit}
              />
            </ButtonMargin>
            <ButtonMargin>
              <ButtonIcon
                title="Usuń"
                uppercase
                fontIconSize="40"
                fontSize="14"
                icon={<MdEdit />}
                customColorButton="#c62828"
                customColorIcon="#f44336"
                onClick={handleClickDelete}
              />
            </ButtonMargin>
          </>
        ) : (
          <ButtonIcon
            title="Rezerwuj"
            uppercase
            fontIconSize="40"
            fontSize="14"
            icon={<MdEdit />}
            secondColors={isCompanyEditProfil}
            //   onClick={handleSaveChanges}
          />
        )}
      </RightContent>
      <CSSTransition
        in={clickEdit}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <BackgroundEdit>
          <BackgroundEditContent onClick={handleClickContent}>
            Edytuj podkategorie
            <form onSubmit={handleSaveEdit}>
              <InputIcon
                icon={<MdTitle />}
                placeholder="Tytuł"
                secondColor
                value={titleInput}
                type="text"
                onChange={e => handleChangeInput(e, setInputTitle)}
                required
              />
              <InputIcon
                icon={<MdReorder />}
                placeholder="Treść"
                secondColor
                value={contentInput}
                type="text"
                onChange={e => handleChangeInput(e, setContentInput)}
                required
              />
              <InputIcon
                icon={<MdAccessTime />}
                placeholder="Czas w minutach"
                secondColor
                value={timeInput}
                type="number"
                onChange={e => handleChangeInput(e, setTimeInput)}
                required
              />
              <CheckboxStyle>
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
              />
              <CheckboxStyle>
                <Checkbox
                  theme="material-checkbox"
                  value={extraPrice}
                  onChange={() => handleOnChangeCheckbox(setExtraPrice)}
                >
                  <TextCheckbox>Niestała cena</TextCheckbox>
                </Checkbox>
              </CheckboxStyle>
              <ButtonsAddPosition>
                <ButtonMargin>
                  <ButtonIcon
                    title="Anuluj"
                    uppercase
                    fontIconSize="40"
                    fontSize="13"
                    icon={<MdArrowBack />}
                    onClick={handleResetEdit}
                    customColorButton="#c62828"
                    customColorIcon="#f44336"
                  />
                </ButtonMargin>
                <ButtonMarginSubmit type="submit">
                  <ButtonIcon
                    title="Zapisz"
                    uppercase
                    fontIconSize="20"
                    fontSize="15"
                    icon={<MdLibraryAdd />}
                    customColorButton="#2e7d32"
                    customColorIcon="#43a047"
                    disabled={disabledSaveButton}
                  />
                </ButtonMarginSubmit>
              </ButtonsAddPosition>
            </form>
          </BackgroundEditContent>
        </BackgroundEdit>
      </CSSTransition>

      <CSSTransition
        in={clickButtonDelete}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <BackgroundEdit>
          <BackgroundEditContent onClick={handleClickContent} transparent>
            <ButtonsDeletePosition>
              <ButtonMargin>
                <ButtonIcon
                  title="Anuluj"
                  uppercase
                  fontIconSize="40"
                  fontSize="14"
                  icon={<MdArrowBack />}
                  customColorButton="#2e7d32"
                  customColorIcon="#43a047"
                  onClick={handleClickDelete}
                />
              </ButtonMargin>
              <ButtonMargin>
                <ButtonIcon
                  title="Usuń"
                  uppercase
                  fontIconSize="40"
                  fontSize="14"
                  icon={<MdDeleteForever />}
                  customColorButton="#c62828"
                  customColorIcon="#f44336"
                  onClick={handleConfirmDeleteItem}
                />
              </ButtonMargin>
            </ButtonsDeletePosition>
          </BackgroundEditContent>
        </BackgroundEdit>
      </CSSTransition>
    </ServiceItem>
  )
}
export default ServicesItem
