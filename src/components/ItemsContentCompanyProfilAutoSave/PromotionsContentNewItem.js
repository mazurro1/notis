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
import SelectCustom from "../SelectCustom"
import InputIcon from "../InputIcon"
import { Checkbox } from "react-input-checkbox"
import SelectDataCalendar from "../SelectDataCalendar"
import { useDispatch } from "react-redux"
import { fetchAddPromotion } from "../../state/actions"

const BackgroundEdit = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const BackgroundEditContent = styled.div`
  position: relative;
  width: 90%;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  padding: 10px;
  border-radius: 5px;
  max-height: 90%;
`
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
  background-color: transparent;
  min-width: 280px;
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

const PromotionsContentNewItem = ({
  TitleRightColumn,
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
  }, [promotions])

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
      <CSSTransition
        in={newPromotion}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <BackgroundEdit>
          <BackgroundEditContent siteProps={siteProps}>
            <TitleRightColumn
              isCompanyEditProfil={setEditPromotions}
              siteProps={siteProps}
            >
              Nowa promocja
            </TitleRightColumn>
            <SelectStyles>
              <SelectCustom
                options={mapServices}
                value={selectedServicesIds}
                handleChange={handleChangeServicesIds}
                placeholder="Zaznacz usługi..."
                defaultMenuIsOpen={false}
                widthAuto
                isClearable={false}
                secondColor
                isMulti
                closeMenuOnSelect={false}
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
            />
            <CheckboxStyle siteProps={siteProps}>
              <Checkbox
                theme="material-checkbox"
                value={disabledPromotion}
                onChange={handleChangeDisabledPromotion}
              >
                <TextCheckbox siteProps={siteProps}>
                  Wyłącz promocje
                </TextCheckbox>
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
          </BackgroundEditContent>
        </BackgroundEdit>
      </CSSTransition>
      <CSSTransition
        in={enableDatePickerStart}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <BackgroundEdit>
          <WidthTimePicker>
            <SelectDataCalendar
              setActualCalendarDate={handleSelectTimeStart}
              setIsDataActive={handleCloseDateCalendarStart}
              minDateActive={true}
              maxDate={userSelectedTime ? selectedTimeEnd : null}
              activeData={new Date(selectedTimeStart)}
            />
          </WidthTimePicker>
        </BackgroundEdit>
      </CSSTransition>
      <CSSTransition
        in={enableDatePickerEnd}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <BackgroundEdit>
          <WidthTimePicker>
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
          </WidthTimePicker>
        </BackgroundEdit>
      </CSSTransition>
    </>
  )
}
export default PromotionsContentNewItem