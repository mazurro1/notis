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
import { FaDollarSign, FaCalendarAlt } from "react-icons/fa"
import { CSSTransition } from "react-transition-group"
import InputIcon from "../InputIcon"
import { Checkbox } from "react-input-checkbox"
import SelectCustom from "../SelectCustom"
import { ServiceColors } from "../../common/ServiceColors"

const ServiceItem = styled.div`
  position: relative;
  background-color: ${props =>
    props.clickDelete
      ? "#ffebee"
      : props.active
      ? Colors(props.siteProps).primaryColorLight
      : Colors(props.siteProps).companyItemBackground};
  padding: 10px;
  border-radius: 5px;
  border-top-left-radius: ${props => (props.index ? "0px" : "5px")};
  border-top-right-radius: ${props => (props.index ? "0px" : "5px")};
  margin: 5px 5px;
  margin-top: ${props => (props.index ? "0px" : "5px")};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  user-select: none;
  overflow: hidden;
  padding-bottom: ${props => (props.clickEdit ? "500px" : "auto")};
  color: ${props => Colors(props.siteProps).textNormalBlack};
  transition-property: background-color, padding-bottom, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  @media all and (max-width: 990px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

const TitleService = styled.div`
  font-family: "Poppins-Bold", sans-serif;
  font-size: 1.1rem;
`

const ServiceParagraph = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
  margin-top: 10px;
`

const LeftContent = styled.div`
  max-width: 100%;
`

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media all and (max-width: 990px) {
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
    width: 100%;
  }
`
const SelectStyle = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`

const PriceService = styled.span`
  display: inline-block;
  background-color: red;
  font-size: 0.8rem;
  padding: 2px 5px;
  font-family: "Poppins-Regular", sans-serif;
  color: white;
  margin-left: 10px;
  border-radius: 5px;
  background-color: ${props =>
    props.isCompanyEditProfil
      ? props.otherColor
        ? Colors(props.siteProps).darkColor
        : Colors(props.siteProps).secondDarkColor
      : props.otherColor
      ? Colors(props.siteProps).darkColor
      : Colors(props.siteProps).primaryColorDark};

  color: ${props => Colors(props.siteProps).textNormalWhite};
  transition-property: color, background-color;
  transition-duration: 0.3s;
  transition-timing-function: inline;

  @media all and (max-width: 990px) {
    margin-left: 0px;
    margin-right: 10px;
  }
`

const TextCheckbox = styled.span`
  position: relative;
  top: -2px;
  padding-left: 10px;
  font-family: "Poppins-Bold", sans-serif;
  user-select: none;
  font-size: 1rem;
`

const WrapPrices = styled.div`
  display: inline-block;

  @media all and (max-width: 990px) {
    display: block;
  }
`

const WidthButtonRezerv = styled.div`
  @media all and (max-width: 990px) {
    max-width: 100%;
  }
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
  handleClickReserwation,
  companyId,
  siteProps,
  userIsBlocked,
  activeWorkerUserId,
}) => {
  const [colorServiceComponent, setColorServiceComponent] = useState({
    value: 1,
    label: "",
  })
  const [clickEdit, setClickEdit] = useState(false)
  const [clickButtonDelete, setClickButtonDelete] = useState(false)
  const [extraPrice, setExtraPrice] = useState(false)
  const [extraTime, setExtraTime] = useState(false)
  const [titleInput, setInputTitle] = useState("")
  const [contentInput, setContentInput] = useState("")
  const [timeInput, setTimeInput] = useState("")
  const [priceInput, setPriceInput] = useState("")

  useEffect(() => {
    setClickEdit(false)
    setClickButtonDelete(false)
  }, [isCompanyEditProfil])

  const indexValueColorService = !!itemServices.serviceColor
    ? itemServices.serviceColor
    : 1

  const disabledSaveButton = !!colorServiceComponent
    ? colorServiceComponent.value === indexValueColorService
    : true &&
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
    const indexValueColorService = !!itemServices.serviceColor
      ? itemServices.serviceColor
      : 1
    const selectedItemColor = ServiceColors.find(
      col => col.value === indexValueColorService
    )
    if (!!selectedItemColor) {
      setColorServiceComponent(selectedItemColor)
    }
  }, [itemServices])

  const handleResetEdit = () => {
    setExtraPrice(itemServices.extraCost)
    setExtraTime(itemServices.extraTime)
    setInputTitle(itemServices.serviceName)
    setContentInput(itemServices.serviceText)
    setTimeInput(itemServices.time)
    setPriceInput(itemServices.serviceCost)
    setClickEdit(false)
  }

  const handleClickDelete = () => {
    setClickButtonDelete(prevState => !prevState)
  }

  const handleConfirmDeleteItem = () => {
    handleDeleteServiceItem(itemServices._id, itemServices.categoryId)
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

  const handleChangeColorService = value => {
    setColorServiceComponent(value)
  }

  const handleSaveEdit = e => {
    e.preventDefault()
    if (!disabledSaveButton) {
      const newItem = {
        categoryId: itemServices.categoryId,
        extraCost: extraPrice,
        extraTime: extraTime,
        serviceCategory: itemServices.serviceCategory,
        serviceColor: colorServiceComponent.value,
        serviceCost: priceInput,
        serviceName: titleInput,
        serviceText: contentInput,
        time: timeInput,
        _id: itemServices._id,
      }
      handleChangeSaveEdit(itemServices._id, itemServices.categoryId, newItem)
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
      timeService = `${
        numberOfHours > 0 ? `${numberOfHours}h` : ""
      } ${numberOfMinutes}min`
    }
  }
  let selectedServiceItem = false
  if (!!activeWorkerUserId) {
    if (!!activeWorkerUserId.services) {
      selectedServiceItem = activeWorkerUserId.services.some(
        serviceWorker => serviceWorker === itemServices._id
      )
    }
  }

  return (
    <ServiceItem
      index={index === 0}
      clickDelete={clickDelete}
      clickEdit={clickEdit}
      siteProps={siteProps}
      active={selectedServiceItem}
    >
      <LeftContent>
        <TitleService>
          {itemServices.serviceName}
          <WrapPrices>
            <PriceService
              isCompanyEditProfil={isCompanyEditProfil}
              siteProps={siteProps}
            >
              {`${itemServices.serviceCost}zł ${
                itemServices.extraCost ? "+" : ""
              }`}
            </PriceService>
            <PriceService
              isCompanyEditProfil={isCompanyEditProfil}
              otherColor
              siteProps={siteProps}
            >
              {`${timeService} ${itemServices.extraTime ? "+" : ""}`}
            </PriceService>
          </WrapPrices>
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
                customColorButton={Colors(siteProps).dangerColorDark}
                customColorIcon={Colors(siteProps).dangerColor}
                onClick={handleClickDelete}
              />
            </ButtonMargin>
          </>
        ) : (
          <>
            <WidthButtonRezerv data-tip data-for="userIsBlocked">
              <ButtonIcon
                title="Rezerwuj"
                uppercase
                fontIconSize="18"
                fontSize="14"
                icon={<FaCalendarAlt />}
                secondColors={isCompanyEditProfil}
                onClick={() => handleClickReserwation(itemServices, companyId)}
                disabled={userIsBlocked}
              />
            </WidthButtonRezerv>
          </>
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
              <SelectStyle>
                <SelectCustom
                  options={ServiceColors}
                  value={colorServiceComponent}
                  secondColor
                  handleChange={handleChangeColorService}
                  isLoading={false}
                  darkSelect
                  defaultMenuIsOpen={false}
                  placeholder="Wybierz kolor usługi..."
                  marginAuto={false}
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
                    onClick={handleResetEdit}
                    customColorButton={Colors(siteProps).dangerColorDark}
                    customColorIcon={Colors(siteProps).dangerColor}
                  />
                </ButtonMargin>
                <ButtonMarginSubmit type="submit">
                  <ButtonIcon
                    title="Zapisz"
                    uppercase
                    fontIconSize="20"
                    fontSize="15"
                    icon={<MdLibraryAdd />}
                    customColorButton={Colors(siteProps).successColorDark}
                    customColorIcon={Colors(siteProps).successColor}
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
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
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
                  customColorButton={Colors(siteProps).dangerColorDark}
                  customColorIcon={Colors(siteProps).dangerColor}
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
