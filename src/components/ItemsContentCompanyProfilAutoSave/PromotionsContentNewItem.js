import React, { useState, useEffect } from "react"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import ButtonIcon from "../ButtonIcon"
import {
  FaArrowLeft,
  FaSave,
  FaCalendarDay,
  FaPercentage,
} from "react-icons/fa"
import ReactTooltip from "react-tooltip"
import SelectCreated from "../SelectCreated"
import InputIcon from "../InputIcon"
import { Checkbox } from "react-input-checkbox"
import SelectDataCalendar from "../SelectDataCalendar"
import { useDispatch } from "react-redux"
import { fetchAddPromotion } from "../../state/actions"
import Popup from "../Popup"

const ButtonTextPositionHappy = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`

const SelectStyles = styled.div`
  margin-bottom: 10px;
`

const MarginButton = styled.div`
  margin-left: 5px;
`

const WidthTimePicker = styled.div`
  position: relative;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const WidthCalendar = styled.div`
  max-width: 90%;
`

const MarginButtonTime = styled.div`
  margin-bottom: 10px;
  display: inline-block;
`

const TextCheckbox = styled.span`
  color: ${props => Colors(props.siteProps).secondColor};
  padding-left: 10px;
  user-select: none;
`

const CheckboxStyle = styled.div`
  margin-top: 20px;

  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.siteProps).secondColor};
  }

  span {
    color: ${props => Colors(props.siteProps).textNormalBlack};
    border-color: ${props => Colors(props.siteProps).textNormalBlack};
  }
`

const TitleRightColumnEdit = styled.div`
  padding: 5px 10px;
  background-color: ${props => Colors(props.siteProps).secondColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  font-size: 1rem;
`

const PromotionsContentNewItem = ({
  newPromotion,
  siteProps,
  setEditPromotions,
  setNewPromotion,
  companyServices,
  enableDatePickerStart,
  setEnableDatePickerStart,
  enableDatePickerEnd,
  setEnableDatePickerEnd,
  user,
  promotions,
}) => {
  const [selectedServicesIds, setSelectedServicesIds] = useState([])
  const [datePromotionStart, setDatePromotionStart] = useState("")
  const [datePromotionEnd, setDatePromotionEnd] = useState("")
  const [promotionPercent, setPromotionPercent] = useState("")
  const [disabledPromotion, setDisabledPromotion] = useState(false)
  const [selectedTimeStart, setSelectedTimeStart] = useState(new Date())
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(new Date())
  const [userSelectedTime, setUserSelectedTime] = useState(false)

  const dispatch = useDispatch()

  const disabledSave =
    !!promotionPercent &&
    !!datePromotionStart &&
    !!datePromotionEnd &&
    selectedServicesIds.length > 0

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [disabledSave, newPromotion])

  useEffect(() => {
    setNewPromotion(false)
    setPromotionPercent("")
    setDisabledPromotion(false)
    setSelectedServicesIds([])
    setSelectedTimeStart(new Date())
    setSelectedTimeEnd(new Date())
    setUserSelectedTime(false)
  }, [promotions]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const actualDate = selectedTimeStart
    const timeToPicker = `${actualDate.getFullYear()}-${
      actualDate.getMonth() + 1 < 10
        ? `0${actualDate.getMonth() + 1}`
        : actualDate.getMonth() + 1
    }-${
      actualDate.getDate() < 10
        ? `0${actualDate.getDate()}`
        : actualDate.getDate()
    }`
    setDatePromotionStart(timeToPicker)
  }, [setDatePromotionStart, selectedTimeStart])

  useEffect(() => {
    const actualDate = selectedTimeEnd
    const timeToPicker = `${actualDate.getFullYear()}-${
      actualDate.getMonth() + 1 < 10
        ? `0${actualDate.getMonth() + 1}`
        : actualDate.getMonth() + 1
    }-${
      actualDate.getDate() < 10
        ? `0${actualDate.getDate()}`
        : actualDate.getDate()
    }`
    setDatePromotionEnd(timeToPicker)
  }, [setDatePromotionEnd, selectedTimeEnd])

  const handleSaveHappyHour = () => {
    const mapOnyIds = selectedServicesIds.map(item => item.value)
    const dataPromotion = {
      disabled: disabledPromotion,
      start: datePromotionStart,
      end: datePromotionEnd,
      promotionPercent: Number(promotionPercent),
      servicesInPromotion: mapOnyIds,
    }
    dispatch(fetchAddPromotion(user.token, user.company._id, dataPromotion))
  }

  const handleResetAdd = () => {
    setNewPromotion(false)
    setPromotionPercent("")
    setDisabledPromotion(false)
    setSelectedServicesIds([])
    setSelectedTimeStart(new Date())
    setSelectedTimeEnd(new Date())
    setUserSelectedTime(false)
  }

  const handleChangeServicesIds = value => {
    const allValues = value ? value : []
    setSelectedServicesIds(allValues)
  }

  const handleChangePercent = e => {
    const isGoodValue = e.target.value.length <= 2
    if (isGoodValue) {
      setPromotionPercent(e.target.value)
    }
  }

  const handleChangeDisabledPromotion = () => {
    setDisabledPromotion(prevState => !prevState)
  }

  const handleClickDatePickerStart = () => {
    setNewPromotion(false)
    setEnableDatePickerStart(true)
  }

  const handleClickDatePickerEnd = () => {
    setNewPromotion(false)
    setEnableDatePickerEnd(true)
  }

  const handleCloseDateCalendarStart = () => {
    setEnableDatePickerStart(false)
    setNewPromotion(true)
  }

  const handleCloseDateCalendarEnd = () => {
    setEnableDatePickerEnd(false)
    setNewPromotion(true)
  }

  const handleSelectTimeStart = time => {
    if (!userSelectedTime) {
      setSelectedTimeEnd(time)
    }
    setSelectedTimeStart(time)
    setUserSelectedTime(true)
  }

  const handleSelectTimeEnd = time => {
    setSelectedTimeEnd(time)
    setUserSelectedTime(true)
  }

  const mapServices = companyServices.map(item => {
    return {
      value: item._id,
      label: item.serviceName,
    }
  })

  return (
    <>
      <Popup
        popupEnable={newPromotion}
        position="absolute"
        title="Nowa promocja"
        borderRadius
        closeTitle={false}
        smallTitle
        secondColors
      >
        <SelectStyles>
          <SelectCreated
            options={mapServices}
            value={selectedServicesIds}
            handleChange={handleChangeServicesIds}
            placeholder="Zaznaczone usługi"
            defaultMenuIsOpen={false}
            widthAuto
            isClearable={false}
            isMulti
            closeMenuOnSelect={false}
            darkSelect
            onlyText
          />
        </SelectStyles>
        <div>
          <MarginButtonTime>
            <ButtonIcon
              title={
                !!datePromotionStart
                  ? `Start: ${datePromotionStart}, 0:00`
                  : "Data promocji"
              }
              uppercase
              fontIconSize="16"
              fontSize="14"
              icon={<FaCalendarDay />}
              secondColors
              onClick={handleClickDatePickerStart}
            />
          </MarginButtonTime>
        </div>
        <div>
          <MarginButtonTime>
            <ButtonIcon
              title={
                !!datePromotionEnd
                  ? `Koniec: ${datePromotionEnd}, 23:59`
                  : "Data promocji"
              }
              uppercase
              fontIconSize="16"
              fontSize="14"
              icon={<FaCalendarDay />}
              secondColors
              onClick={handleClickDatePickerEnd}
            />
          </MarginButtonTime>
        </div>
        <InputIcon
          icon={<FaPercentage />}
          placeholder="Wysokość promocji"
          value={promotionPercent}
          type="number"
          onChange={handleChangePercent}
          required
          secondColor
          validText="Wymagana wartość"
        />
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={disabledPromotion}
            onChange={handleChangeDisabledPromotion}
          >
            <TextCheckbox siteProps={siteProps}>Wyłącz promocje</TextCheckbox>
          </Checkbox>
        </CheckboxStyle>
        <ButtonTextPositionHappy>
          <MarginButton>
            <ButtonIcon
              title="Anuluj"
              uppercase
              fontIconSize="16"
              fontSize="14"
              icon={<FaArrowLeft />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleResetAdd}
            />
          </MarginButton>
          <MarginButton>
            <ReactTooltip
              id="disabledButtonSave"
              effect="float"
              multiline={true}
            >
              <span>Uzupełnij wszystkie pola.</span>
            </ReactTooltip>
            {!disabledSave ? (
              <div data-tip data-for="disabledButtonSave">
                <ButtonIcon
                  title="Dodaj"
                  uppercase
                  fontIconSize="16"
                  fontSize="14"
                  icon={<FaSave />}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                  disabled={!disabledSave}
                />
              </div>
            ) : (
              <ButtonIcon
                title="Dodaj"
                uppercase
                fontIconSize="16"
                fontSize="14"
                icon={<FaSave />}
                customColorButton={Colors(siteProps).successColorDark}
                customColorIcon={Colors(siteProps).successColor}
                onClick={handleSaveHappyHour}
                disabled={!disabledSave}
              />
            )}
          </MarginButton>
        </ButtonTextPositionHappy>
      </Popup>
      <Popup
        popupEnable={enableDatePickerStart}
        position="absolute"
        borderRadius
        noContent
      >
        <WidthTimePicker>
          <WidthCalendar>
            <SelectDataCalendar
              setActualCalendarDate={handleSelectTimeStart}
              setIsDataActive={handleCloseDateCalendarStart}
              minDateActive={true}
              maxDate={userSelectedTime ? selectedTimeEnd : null}
              activeData={new Date(selectedTimeStart)}
            />
          </WidthCalendar>
        </WidthTimePicker>
      </Popup>
      <Popup
        popupEnable={enableDatePickerEnd}
        position="absolute"
        borderRadius
        noContent
      >
        <WidthTimePicker>
          <WidthCalendar>
            <SelectDataCalendar
              setActualCalendarDate={handleSelectTimeEnd}
              setIsDataActive={handleCloseDateCalendarEnd}
              minDateActive={true}
              minDateDefault={selectedTimeStart}
              activeData={new Date(selectedTimeEnd)}
              activeMonth={
                userSelectedTime ? selectedTimeStart : selectedTimeEnd
              }
            />
          </WidthCalendar>
        </WidthTimePicker>
      </Popup>
    </>
  )
}
export default PromotionsContentNewItem
