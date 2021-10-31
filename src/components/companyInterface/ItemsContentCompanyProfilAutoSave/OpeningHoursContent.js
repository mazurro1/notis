/*eslint-disable eqeqeq*/
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { ButtonIcon } from "@ui"
import { MdEdit } from "react-icons/md"
import OpeningHoursItem from "./OpeningHoursItem"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import { Colors } from "@common/Colors"
import { fetchSaveOpeningHoursCompany } from "@state/actions"
import { useDispatch } from "react-redux"
import { arraysEqual } from "@common/Functions"
import { Element, scroller } from "react-scroll"

const MarginButton = styled.div`
  margin-left: 5px;
`

const OpeningHoursContent = ({
  TitleRightColumn,
  ButtonEditPosition,
  isCompanyEditProfil,
  companyEditProfilProps,
  company,
  editMode,
  siteProps,
  user,
  editableOpeningHours,
  setEditableOpeningHours,
  handleResetAllEditedComponents,
  disabledEditButtons,
}) => {
  const [openingHoursComponent, setOpeningHoursComponent] = useState(null)
  const [arrayHoursData, setArrayHoursData] = useState([])
  const [defaultArray, setDefaultArray] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    const transformedHoursData = []
    for (const key in hoursDate) {
      transformedHoursData.push({
        dayMonth: key,
        dayValue: hoursDate[key].dayValue,
        dayName: hoursDate[key].dayName,
        start: hoursDate[key].start,
        end: hoursDate[key].end,
        disabled: hoursDate[key].disabled,
      })
    }
    setDefaultArray(transformedHoursData)
    setArrayHoursData(transformedHoursData)
    setEditableOpeningHours(false)
  }, [editMode, company]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const transformedHoursData = []
    for (const key in hoursDate) {
      transformedHoursData.push({
        dayMonth: key,
        dayValue: hoursDate[key].dayValue,
        dayName: hoursDate[key].dayName,
        start: hoursDate[key].start,
        end: hoursDate[key].end,
        disabled: hoursDate[key].disabled,
      })
    }
    setArrayHoursData(transformedHoursData)
  }, [editableOpeningHours, editMode]) // eslint-disable-line react-hooks/exhaustive-deps

  const hoursDate = {
    mon: {
      dayValue: "1",
      dayName: "Poniedziałek",
      start:
        !!company.openingDays && !!company.openingDays.mon.start
          ? company.openingDays.mon.start
          : "0:00",
      end:
        !!company.openingDays && !!company.openingDays.mon.end
          ? company.openingDays.mon.end
          : "0:00",
      disabled:
        !!company.openingDays && !!company.openingDays.mon.disabled
          ? company.openingDays.mon.disabled
          : false,
    },
    tue: {
      dayValue: "2",
      dayName: "Wtorek",
      start:
        !!company.openingDays && !!company.openingDays.tue.start
          ? company.openingDays.tue.start
          : "0:00",
      end:
        !!company.openingDays && !!company.openingDays.tue.end
          ? company.openingDays.tue.end
          : "0:00",
      disabled:
        !!company.openingDays && !!company.openingDays.tue.disabled
          ? company.openingDays.tue.disabled
          : false,
    },
    wed: {
      dayValue: "3",
      dayName: "Środa",
      start:
        !!company.openingDays && !!company.openingDays.wed.start
          ? company.openingDays.wed.start
          : "0:00",
      end:
        !!company.openingDays && !!company.openingDays.wed.end
          ? company.openingDays.wed.end
          : "0:00",
      disabled:
        !!company.openingDays && !!company.openingDays.wed.disabled
          ? company.openingDays.wed.disabled
          : false,
    },
    thu: {
      dayValue: "4",
      dayName: "Czwartek",
      start:
        !!company.openingDays && !!company.openingDays.thu.start
          ? company.openingDays.thu.start
          : "0:00",
      end:
        !!company.openingDays && !!company.openingDays.thu.end
          ? company.openingDays.thu.end
          : "0:00",
      disabled:
        !!company.openingDays && !!company.openingDays.thu.disabled
          ? company.openingDays.thu.disabled
          : false,
    },
    fri: {
      dayValue: "5",
      dayName: "Piątek",
      start:
        !!company.openingDays && !!company.openingDays.fri.start
          ? company.openingDays.fri.start
          : "0:00",
      end:
        !!company.openingDays && !!company.openingDays.fri.end
          ? company.openingDays.fri.end
          : "0:00",
      disabled:
        !!company.openingDays && !!company.openingDays.fri.disabled
          ? company.openingDays.fri.disabled
          : false,
    },
    sat: {
      dayValue: "6",
      dayName: "Sobota",
      start:
        !!company.openingDays && !!company.openingDays.sat.start
          ? company.openingDays.sat.start
          : "0:00",
      end:
        !!company.openingDays && !!company.openingDays.sat.end
          ? company.openingDays.sat.end
          : "0:00",
      disabled:
        !!company.openingDays && !!company.openingDays.sat.disabled
          ? company.openingDays.sat.disabled
          : false,
    },
    sun: {
      dayValue: "7",
      dayName: "Niedziela",
      start:
        !!company.openingDays && !!company.openingDays.sun.start
          ? company.openingDays.sun.start
          : "0:00",
      end:
        !!company.openingDays && !!company.openingDays.sun.end
          ? company.openingDays.sun.end
          : "0:00",
      disabled:
        !!company.openingDays && !!company.openingDays.sun.disabled
          ? company.openingDays.sun.disabled
          : false,
    },
  }

  const handleClickEdit = () => {
    scroller.scrollTo("openingHoursScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    handleResetAllEditedComponents()
    setEditableOpeningHours(prevState => !prevState)
  }

  const handleSaveTimeDay = (
    checkboxDisabledDay,
    itemTimeStart,
    itemTimeEnd,
    index
  ) => {
    const newArray = [...arrayHoursData]
    newArray[index].disabled = checkboxDisabledDay
    if (itemTimeStart !== null) {
      newArray[index].start = itemTimeStart
    }
    if (itemTimeEnd !== null) {
      newArray[index].end = itemTimeEnd
    }
    setArrayHoursData(newArray)
    const transformedHoursDataCheck = []
    for (const key in hoursDate) {
      transformedHoursDataCheck.push({
        dayMonth: key,
        dayValue: hoursDate[key].dayValue,
        dayName: hoursDate[key].dayName,
        start: hoursDate[key].start,
        end: hoursDate[key].end,
        disabled: hoursDate[key].disabled,
      })
    }
    if (
      JSON.stringify(transformedHoursDataCheck) ==
      JSON.stringify(arrayHoursData)
    ) {
      setOpeningHoursComponent(null)
    } else {
      setOpeningHoursComponent(arrayHoursData)
    }
  }

  const handleResetValues = () => {
    scroller.scrollTo("openingHoursScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    const transformedHoursData = []
    for (const key in hoursDate) {
      transformedHoursData.push({
        dayMonth: key,
        dayValue: hoursDate[key].dayValue,
        dayName: hoursDate[key].dayName,
        start: hoursDate[key].start,
        end: hoursDate[key].end,
        disabled: hoursDate[key].disabled,
      })
    }
    setArrayHoursData(transformedHoursData)
    setEditableOpeningHours(false)
  }

  const handleResetOneDay = (day, index) => {
    const newArrToResetOneDay = [...arrayHoursData]
    const selectedDay = {
      dayMonth: day.dayMonth,
      dayValue: hoursDate[day.dayMonth].dayValue,
      dayName: hoursDate[day.dayMonth].dayName,
      start: hoursDate[day.dayMonth].start,
      end: hoursDate[day.dayMonth].end,
      disabled: hoursDate[day.dayMonth].disabled,
    }
    newArrToResetOneDay[index] = selectedDay
    setArrayHoursData(newArrToResetOneDay)
  }

  const disabledSaveHours = arraysEqual(
    !!arrayHoursData ? arrayHoursData : [],
    !!defaultArray ? defaultArray : []
  )

  const handleSaveAllComponent = () => {
    scroller.scrollTo("openingHoursScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    dispatch(
      fetchSaveOpeningHoursCompany(
        user.token,
        user.company._id,
        openingHoursComponent
      )
    )
  }

  const date = new Date()
  const actualDay = date.getDay()
  const mapDayHours = arrayHoursData.map((item, index) => {
    return (
      <OpeningHoursItem
        key={index}
        item={item}
        index={index}
        actualDay={actualDay === 0 ? 7 : actualDay}
        companyEditProfilProps={companyEditProfilProps}
        editable={editableOpeningHours}
        MarginButton={MarginButton}
        ButtonEditPosition={ButtonEditPosition}
        handleSaveTimeDay={handleSaveTimeDay}
        handleResetOneDay={handleResetOneDay}
        defaultValue={hoursDate[item.dayMonth]}
      />
    )
  })

  return (
    <Element name="openingHoursScrollElement" className="element">
      <TitleRightColumn
        isCompanyEditProfil={editableOpeningHours}
        siteProps={siteProps}
      >
        GODZINY OTWARCIA
      </TitleRightColumn>
      {arrayHoursData.length > 0 && mapDayHours}
      {isCompanyEditProfil ? (
        editableOpeningHours ? (
          <>
            <ButtonEditPosition>
              <MarginButton>
                <ButtonIcon
                  title="Cofnij"
                  uppercase
                  fontIconSize="16"
                  fontSize="14"
                  icon={<FaArrowLeft />}
                  customColorButton={Colors(siteProps).dangerColorDark}
                  customColorIcon={Colors(siteProps).dangerColor}
                  onClick={handleResetValues}
                />
              </MarginButton>
              <MarginButton>
                <ButtonIcon
                  title="Zapisz"
                  uppercase
                  fontIconSize="16"
                  fontSize="14"
                  icon={<FaSave />}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                  onClick={handleSaveAllComponent}
                  disabled={disabledSaveHours}
                  isFetchToBlock
                />
              </MarginButton>
            </ButtonEditPosition>
          </>
        ) : (
          <ButtonEditPosition>
            <div data-tip data-for="disabledButton">
              <ButtonIcon
                title="Edytuj godziny otwarcia"
                uppercase
                fontIconSize="25"
                fontSize="14"
                icon={<MdEdit />}
                secondColors
                onClick={handleClickEdit}
                disabled={disabledEditButtons}
              />
            </div>
          </ButtonEditPosition>
        )
      ) : null}
    </Element>
  )
}
export default OpeningHoursContent
