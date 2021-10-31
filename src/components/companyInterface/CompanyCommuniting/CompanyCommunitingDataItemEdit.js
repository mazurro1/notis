import React, { useState, useEffect } from "react"
import { AllStatusCommuniting } from "@common/AllStatusCommuniting"
import {
  MdBorderColor,
  MdAttachMoney,
  MdArrowBack,
  MdSave,
  MdTimelapse,
  MdDateRange,
} from "react-icons/md"
import {
  ButtonIcon,
  Popup,
  InputIcon,
  SelectCreated,
  TimePickerContent,
  SelectDataCalendar,
} from "@ui"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { useDispatch } from "react-redux"
import { addAlertItem, fetchUpdateCompanyCommuniting } from "@state/actions"

const ButtonsPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
`
const StyledButtonsTime = styled.div`
  display: inline-block;
  margin-bottom: 10px;
`

const StyledButtonsTimeUnder = styled.div`
  display: inline-block;
  margin-bottom: 20px;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const WidthTimePicker = styled.div`
  background-color: transparent;
  min-width: 280px;
  max-width: 90%;
`

const StyleButtonAddSubmit = styled.button`
  margin: 5px;
  border: none;
  outline: none;
  background-color: transparent;
`

const MarginTopSelect = styled.div`
  margin-top: 10px;
`

const CompanyCommunitingDataItemEdit = ({
  user,
  siteProps,
  item,
  handleClickEdit,
  workersWithOwner,
  workerHasAccessCommunitings,
}) => {
  const [descriptionInput, setDescriptionInput] = useState("")
  const [costInput, setCostInput] = useState("")
  const [statusValue, setStatusValue] = useState(null)
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [timeStartActive, setTimeStartActive] = useState(false)
  const [timeEndActive, setTimeEndActive] = useState(false)
  const [timeStart, setTimeStart] = useState(null)
  const [timeEnd, setTimeEnd] = useState(null)
  const [timeDate, setTimeDate] = useState(new Date())
  const [timeDateActive, setTimeDateActive] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setCostInput(!!item.cost ? item.cost : "")
    setDescriptionInput(item.description)
    const findStatus = AllStatusCommuniting.find(
      itemStatus => itemStatus.value === item.statusValue
    )
    if (!!findStatus) {
      setStatusValue(findStatus)
    }
    let findWorker = null
    if (!!item.workerUserId._id) {
      findWorker = workersWithOwner.find(
        itemWorker => itemWorker.value === item.workerUserId._id
      )
    }

    if (!!findWorker) {
      setSelectedWorker(findWorker)
    }

    if (!!item.day && !!item.month && !!item.year) {
      setTimeDate(
        new Date(
          Number(item.year),
          Number(item.month) - 1,
          Number(item.day),
          0,
          0,
          0,
          0
        )
      )
    }

    if (!!item.timeStart) {
      setTimeStart(item.timeStart)
    }

    if (!!item.timeEnd) {
      setTimeEnd(item.timeEnd)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeInputs = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleChangeSelectStatus = value => {
    setStatusValue(value)
  }

  const handleChangeSelectedWorker = value => {
    setSelectedWorker(value)
  }

  const handleUpdateTimeEnd = time => {
    setTimeEndActive(false)
    setTimeEnd(time)
  }

  const handleAddTimeDate = () => {
    setTimeDateActive(prevState => !prevState)
  }

  const handleUpdateTimeStart = time => {
    setTimeStartActive(false)
    setTimeStart(time)
  }

  const handleAddTimeEnd = () => {
    setTimeEndActive(prevState => !prevState)
  }

  const handleAddTimeStart = () => {
    setTimeStartActive(prevState => !prevState)
  }

  let fullDate = ""
  const timeOldDate = new Date(
    Number(item.year),
    Number(item.month) - 1,
    Number(item.day),
    0,
    0,
    0,
    0
  )
  let oldFullDate = ""
  if (!!timeDate) {
    fullDate = `${
      timeDate.getDate() < 10 ? `0${timeDate.getDate()}` : timeDate.getDate()
    }-${
      timeDate.getMonth() + 1 < 10
        ? `0${timeDate.getMonth() + 1}`
        : timeDate.getMonth() + 1
    }-${timeDate.getFullYear()}`
  }

  if (!!timeOldDate) {
    oldFullDate = `${
      timeOldDate.getDate() < 10
        ? `0${timeOldDate.getDate()}`
        : timeOldDate.getDate()
    }-${
      timeOldDate.getMonth() + 1 < 10
        ? `0${timeOldDate.getMonth() + 1}`
        : timeOldDate.getMonth() + 1
    }-${timeOldDate.getFullYear()}`
  }

  let isChanges = false
  if (!!item && !!statusValue) {
    if (!!item.workerUserId && !!statusValue.value) {
      const itemCostValid = !!item.cost ? item.cost : ""
      const validWorkers = !!selectedWorker
        ? workersWithOwner.length > 0
          ? selectedWorker.value !== item.workerUserId._id
          : false
        : false

      isChanges =
        descriptionInput !== item.description ||
        costInput.toString() !== itemCostValid.toString() ||
        validWorkers ||
        statusValue.value.toString() !== item.statusValue.toString() ||
        timeStart !== item.timeStart ||
        timeEnd !== item.timeEnd ||
        fullDate !== oldFullDate
    }
  }

  const validSave =
    descriptionInput.length >= 3 &&
    !!timeStart &&
    !!timeEnd &&
    !!timeDate &&
    isChanges

  const handleSubmit = e => {
    e.preventDefault()
    if (validSave) {
      dispatch(
        fetchUpdateCompanyCommuniting(
          user.token,
          user.company._id,
          item._id,
          descriptionInput,
          costInput,
          workerHasAccessCommunitings ? selectedWorker.value : user.userId,
          statusValue.value,
          timeStart,
          timeEnd,
          fullDate,
          !!item.reserwationId ? item.reserwationId : null
        )
      )
    } else {
      if (descriptionInput.length < 3) {
        dispatch(addAlertItem("Uzupełnij opis przedmiotu", "red"))
      } else {
        dispatch(addAlertItem("Brak zmian", "red"))
      }
    }
  }

  // const filterAllStatusCommuniting = AllStatusCommuniting.filter(
  //   item => item.value !== 4
  // )
  const filterAllStatusCommuniting = AllStatusCommuniting
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputIcon
          icon={<MdBorderColor />}
          placeholder="Opis"
          value={descriptionInput}
          onChange={e => handleChangeInputs(e, setDescriptionInput)}
          required
          validText="Minimum 3 znaki"
        />
        <InputIcon
          icon={<MdAttachMoney />}
          placeholder="Koszt w zł"
          type="number"
          value={costInput}
          onChange={e => handleChangeInputs(e, setCostInput)}
          validText="Nie wymagane"
        />
        <div>
          <StyledButtonsTime>
            <ButtonIcon
              title={
                !!timeDate
                  ? `Dzień rezerwacji: ${fullDate}`
                  : "Dzień rezerwacji"
              }
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<MdDateRange />}
              onClick={handleAddTimeDate}
            />
          </StyledButtonsTime>
        </div>
        <div>
          <StyledButtonsTime>
            <ButtonIcon
              title={
                !!timeStart ? `Godzina startu: ${timeStart}` : "Godzina startu"
              }
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<MdTimelapse />}
              onClick={handleAddTimeStart}
            />
          </StyledButtonsTime>
        </div>
        <div>
          <StyledButtonsTimeUnder>
            <ButtonIcon
              title={!!timeEnd ? `Godzina końca: ${timeEnd}` : "Godzina końca"}
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<MdTimelapse />}
              onClick={handleAddTimeEnd}
            />
          </StyledButtonsTimeUnder>
        </div>
        {workerHasAccessCommunitings && (
          <MarginTopSelect>
            <SelectCreated
              options={workersWithOwner}
              value={selectedWorker}
              handleChange={handleChangeSelectedWorker}
              placeholder="Pracownik"
              defaultMenuIsOpen={false}
              isClearable={false}
              widthAuto
              deleteItem={false}
              textUp
              darkSelect
              top
            />
          </MarginTopSelect>
        )}
        <MarginTopSelect>
          <SelectCreated
            options={filterAllStatusCommuniting}
            value={statusValue}
            handleChange={handleChangeSelectStatus}
            placeholder="Status dojazdu"
            defaultMenuIsOpen={false}
            isClearable={false}
            widthAuto
            deleteItem={false}
            darkSelect
            textUp
            top
          />
        </MarginTopSelect>
        <ButtonsPosition>
          <ButtonMargin>
            <ButtonIcon
              title="Anuluj"
              uppercase
              fontIconSize="40"
              fontSize="14"
              icon={<MdArrowBack />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleClickEdit}
            />
          </ButtonMargin>
          <StyleButtonAddSubmit type="submit">
            <ButtonIcon
              title="Zapisz"
              uppercase
              fontIconSize="20"
              fontSize="14"
              icon={<MdSave />}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              disabled={!validSave}
              isFetchToBlock
            />
          </StyleButtonAddSubmit>
        </ButtonsPosition>
      </form>
      <Popup
        popupEnable={timeStartActive}
        handleClose={handleAddTimeStart}
        noContent
      >
        <WidthTimePicker>
          <TimePickerContent
            setSelectedTime={handleUpdateTimeStart}
            timeTimePicker={timeStart}
            maxTime={timeEnd}
          />
        </WidthTimePicker>
      </Popup>
      <Popup
        popupEnable={timeEndActive}
        handleClose={handleAddTimeEnd}
        noContent
      >
        <WidthTimePicker>
          <TimePickerContent
            setSelectedTime={handleUpdateTimeEnd}
            timeTimePicker={timeEnd}
            minTime={timeStart}
          />
        </WidthTimePicker>
      </Popup>
      <Popup
        popupEnable={timeDateActive}
        handleClose={handleAddTimeDate}
        noContent
      >
        <SelectDataCalendar
          setActualCalendarDate={setTimeDate}
          setIsDataActive={setTimeDateActive}
          activeMonth={new Date()}
          minDateActive={false}
          activeData={timeDate}
        />
      </Popup>
    </div>
  )
}
export default CompanyCommunitingDataItemEdit
