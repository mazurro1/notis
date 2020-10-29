import React, { useState } from "react"
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
}) => {
  const [clickEdit, setClickEdit] = useState(false)
  const [extraPrice, setExtraPrice] = useState(itemServices.extraCost)
  const [extraTime, setExtraTime] = useState(itemServices.extraTime)
  const [titleInput, setInputTitle] = useState(itemServices.serviceName)
  const [contentInput, setContentInput] = useState(itemServices.serviceText)
  const [timeInput, setTimeInput] = useState(itemServices.time)
  const [priceInput, setPriceInput] = useState(itemServices.serviceCost)
  console.log(itemServices)
  const handleChangeInput = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleOnChangeCheckbox = setChange => {
    setChange(prevState => !prevState)
  }

  const handleClickEdit = () => {
    setClickEdit(prevState => !prevState)
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
              itemServices.extraCost ? "+/-" : ""
            }`}
          </PriceService>
          <PriceService isCompanyEditProfil={isCompanyEditProfil} otherColor>
            {`${timeService} ${itemServices.extraTime ? "+/-" : ""}`}
          </PriceService>
        </TitleService>
        <ServiceParagraph>{itemServices.serviceText}</ServiceParagraph>
      </LeftContent>
      <RightContent>
        {isCompanyEditProfil ? (
          <ButtonIcon
            title="Edytuj"
            uppercase
            fontIconSize="40"
            fontSize="14"
            icon={<MdEdit />}
            secondColors={isCompanyEditProfil}
            onClick={handleClickEdit}
          />
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
            <form
            // onSubmit={handleAddItem}
            >
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
                    onClick={handleClickEdit}
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
                  />
                </ButtonMarginSubmit>
              </ButtonsAddPosition>
            </form>
          </BackgroundEditContent>
        </BackgroundEdit>
      </CSSTransition>
    </ServiceItem>
  )
}
export default ServicesItem
