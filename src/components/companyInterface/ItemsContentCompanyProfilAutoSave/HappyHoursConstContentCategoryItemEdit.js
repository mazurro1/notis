/*eslint-disable eqeqeq*/
import React, { useState, useEffect } from "react"
import { FaArrowLeft, FaSave, FaPercentage } from "react-icons/fa"
import { MdTimelapse } from "react-icons/md"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import {
  ButtonIcon,
  Popup,
  InputIcon,
  SelectCreated,
  TimePickerContent,
} from "@ui"
import { DaySOfTheWeek } from "@common/DaySOfTheWeek"
import { Checkbox } from "react-input-checkbox"
import ReactTooltip from "react-tooltip"
import { fetchUpdateConstDateHappyHour } from "@state/actions"
import { useDispatch } from "react-redux"

const MarginButton = styled.div`
  margin-left: 5px;
`

const MarginButtonTime = styled.div`
  margin-bottom: 10px;
  display: inline-block;
`

const SelectStyles = styled.div`
  margin-bottom: 10px;
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

const WidthTimePicker = styled.div`
  background-color: transparent;
  min-width: 280px;
  max-width: 90%;
`

const ButtonTextPositionHappy = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`

const ItemDayToSelect = styled.button`
  padding: 2px 8px;
  font-size: 0.9rem;
  border-radius: 5px;
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).opinionColorDown};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  display: inline-block;
  margin: 2px;
  cursor: pointer;
  border: none;
  user-select: none;
  transition-property: background-color, color, transform;
  transition-duration: 0.2s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props => Colors(props.siteProps).secondColor};
  }

  &:active {
    transform: scale(0.8);
  }
`

const HappyHoursConstContentCategoryItemEdit = ({
  siteProps,
  editConstHappyHours,
  newHappyHour,
  setNewHappyHour,
  enableTimeStart,
  setEnableTimeStart,
  setEnableTimeEnd,
  enableTimeEnd,
  companyServices,
  user,
  dataHappyHourConst,
  happyHoursConst,
}) => {
  const [selectedDayOfTheWeek, setSelectedDayOfTheWeek] = useState([])
  const [promotionPercent, setPromotionPercent] = useState("")
  const [disabledPromotion, setDisabledPromotion] = useState(false)
  const [timeStart, setTimeStart] = useState("10:00")
  const [timeEnd, setTimeEnd] = useState("12:00")
  const [selectedServicesIds, setSelectedServicesIds] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    setNewHappyHour(false)
    setTimeStart(dataHappyHourConst.start)
    setTimeEnd(dataHappyHourConst.end)
    setPromotionPercent(dataHappyHourConst.promotionPercent)
    setDisabledPromotion(dataHappyHourConst.disabled)
    const mapServicesInPromotion = dataHappyHourConst.servicesInPromotion.map(
      servicePromotion => {
        const findService = companyServices.find(
          service => service._id === servicePromotion
        )
        return {
          value: servicePromotion,
          label: !!findService ? findService.serviceName : servicePromotion,
        }
      }
    )
    setSelectedServicesIds(mapServicesInPromotion)
    setSelectedDayOfTheWeek(dataHappyHourConst.dayWeekIndex)
  }, [dataHappyHourConst, happyHoursConst]) // eslint-disable-line react-hooks/exhaustive-deps

  const mapOnyIdsNewObject = selectedServicesIds.map(item => item.value)
  const newEditedObject = {
    servicesInPromotion: mapOnyIdsNewObject,
    _id: dataHappyHourConst._id,
    disabled: disabledPromotion,
    dayWeekIndex: selectedDayOfTheWeek,
    start: timeStart,
    end: timeEnd,
    promotionPercent: Number(promotionPercent),
  }

  const oldObject = {
    servicesInPromotion: dataHappyHourConst.servicesInPromotion,
    _id: dataHappyHourConst._id,
    disabled: dataHappyHourConst.disabled,
    dayWeekIndex: dataHappyHourConst.dayWeekIndex,
    start: dataHappyHourConst.start,
    end: dataHappyHourConst.end,
    promotionPercent: dataHappyHourConst.promotionPercent,
  }

  const isEq = JSON.stringify(newEditedObject) == JSON.stringify(oldObject)

  const disabledSave =
    selectedDayOfTheWeek.length > 0 &&
    !!promotionPercent &&
    !!timeStart &&
    !!timeEnd &&
    selectedServicesIds.length > 0 &&
    !isEq

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [disabledSave, newHappyHour, happyHoursConst])

  const handleResetAdd = () => {
    setNewHappyHour(false)
    setTimeStart(dataHappyHourConst.start)
    setTimeEnd(dataHappyHourConst.end)
    setPromotionPercent(dataHappyHourConst.promotionPercent)
    setDisabledPromotion(dataHappyHourConst.disabled)
    const mapServicesInPromotion = dataHappyHourConst.servicesInPromotion.map(
      servicePromotion => {
        const findService = companyServices.find(
          service => service._id === servicePromotion
        )
        return {
          value: servicePromotion,
          label: !!findService ? findService.serviceName : servicePromotion,
        }
      }
    )
    setSelectedServicesIds(mapServicesInPromotion)
    setSelectedDayOfTheWeek(dataHappyHourConst.dayWeekIndex)
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

  const handleUpdateTimeStart = time => {
    setNewHappyHour(true)
    setEnableTimeStart(false)
    setTimeStart(time)
  }

  const handleUpdateTimeEnd = time => {
    setNewHappyHour(true)
    setEnableTimeEnd(false)
    setTimeEnd(time)
  }

  const handleClickTimeStart = () => {
    setNewHappyHour(false)
    setEnableTimeStart(true)
  }

  const handleClickTimeEnd = () => {
    setNewHappyHour(false)
    setEnableTimeEnd(true)
  }

  const handleSaveHappyHour = () => {
    dispatch(
      fetchUpdateConstDateHappyHour(
        user.token,
        user.company._id,
        newEditedObject
      )
    )
  }

  const handleClickDaySelect = itemId => {
    const isInSelected = selectedDayOfTheWeek.some(item => item === itemId)
    if (isInSelected) {
      const filterSelectedIds = selectedDayOfTheWeek.filter(
        item => item !== itemId
      )
      setSelectedDayOfTheWeek(filterSelectedIds)
    } else {
      const newItemsIds = [...selectedDayOfTheWeek, itemId]
      setSelectedDayOfTheWeek(newItemsIds)
    }
  }

  const mapDaysToSelect = DaySOfTheWeek.map((item, index) => {
    const isDayActive = selectedDayOfTheWeek.some(itemSelected => {
      return itemSelected === item.dayOfTheWeek
    })
    return (
      <ItemDayToSelect
        key={index}
        active={isDayActive}
        onClick={() => handleClickDaySelect(item.dayOfTheWeek)}
      >
        {item.title}
      </ItemDayToSelect>
    )
  })

  const mapServices = companyServices.map(item => {
    return {
      value: item._id,
      label: item.serviceName,
    }
  })

  return (
    <>
      <Popup
        popupEnable={newHappyHour}
        position="absolute"
        title="Edytuj happy hours"
        borderRadius
        closeTitle={false}
        smallTitle
        secondColors
      >
        <SelectStyles>{mapDaysToSelect}</SelectStyles>
        <SelectStyles>
          <SelectCreated
            options={mapServices}
            value={selectedServicesIds}
            handleChange={handleChangeServicesIds}
            placeholder="Zaznaczone usługi"
            defaultMenuIsOpen={false}
            widthAuto
            isClearable={false}
            darkSelect
            isMulti
            onlyText
          />
        </SelectStyles>
        <div>
          <MarginButtonTime>
            <ButtonIcon
              title={
                !!timeStart ? `Start: ${timeStart}` : "Godzina startu promocji"
              }
              uppercase
              fontIconSize="16"
              fontSize="14"
              icon={<MdTimelapse />}
              secondColors
              onClick={handleClickTimeStart}
            />
          </MarginButtonTime>
        </div>
        <div>
          <MarginButtonTime>
            <ButtonIcon
              title={
                !!timeEnd ? `Koniec: ${timeEnd}` : "Godzina końca promocji"
              }
              uppercase
              fontIconSize="16"
              fontSize="14"
              icon={<MdTimelapse />}
              secondColors
              onClick={handleClickTimeEnd}
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
            <TextCheckbox siteProps={siteProps}>Wyłącz happy hour</TextCheckbox>
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
                  title="Zapisz"
                  uppercase
                  fontIconSize="16"
                  fontSize="14"
                  icon={<FaSave />}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                  disabled={!disabledSave}
                  isFetchToBlock
                />
              </div>
            ) : (
              <ButtonIcon
                title="Zapisz"
                uppercase
                fontIconSize="16"
                fontSize="14"
                icon={<FaSave />}
                customColorButton={Colors(siteProps).successColorDark}
                customColorIcon={Colors(siteProps).successColor}
                onClick={handleSaveHappyHour}
                disabled={!disabledSave}
                isFetchToBlock
              />
            )}
          </MarginButton>
        </ButtonTextPositionHappy>
      </Popup>
      <Popup
        popupEnable={enableTimeStart}
        position="absolute"
        borderRadius
        noContent
      >
        <WidthTimePicker>
          <TimePickerContent
            setSelectedTime={handleUpdateTimeStart}
            timeTimePicker={timeStart}
            secondColor
            maxTime={timeEnd}
          />
        </WidthTimePicker>
      </Popup>
      <Popup
        popupEnable={enableTimeEnd}
        position="absolute"
        borderRadius
        noContent
      >
        <WidthTimePicker>
          <TimePickerContent
            setSelectedTime={handleUpdateTimeEnd}
            timeTimePicker={timeEnd}
            secondColor
            minTime={timeStart}
          />
        </WidthTimePicker>
      </Popup>
    </>
  )
}
export default HappyHoursConstContentCategoryItemEdit
