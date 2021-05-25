import React, { useState, useEffect } from "react"
import SelectCreated from "./SelectCreated"
import styled from "styled-components"
import sal from "sal.js"
import { AllMonths } from "../common/AllMonths"
import { Site } from "../common/Site"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchGetUserHistoryCommuniting,
  fetchResetUserHistoryCommunitings,
} from "../state/actions"
import UserHistoryCommunitingCategory from "./UserHistoryCommunitingCategory"
import { Colors } from "../common/Colors"

const PositionSelectAllEnd = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    width: 100%;
  }
`

const PositionNoDate = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
  font-size: 1rem;
  font-family: "Poppins-Bold", sans-serif;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`

const WidthSelect = styled.div`
  width: 160px;
  margin-right: 20px;
  margin-top: 10px;

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    width: 100%;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 10px;
  }
`

const WidthSelectNoMargin = styled.div`
  width: 160px;
  margin-top: 10px;

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    width: 100%;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 10px;
  }
`

const UserHistoryCommuniting = ({ user, siteProps }) => {
  const allYears = [
    {
      value: new Date().getFullYear() - 2,
      label: new Date().getFullYear() - 2,
    },
    {
      value: new Date().getFullYear() - 1,
      label: new Date().getFullYear() - 1,
    },
    {
      value: new Date().getFullYear(),
      label: new Date().getFullYear(),
    },
    {
      value: new Date().getFullYear() + 1,
      label: new Date().getFullYear() + 1,
    },
  ]
  const [yearPicker, setYearPicker] = useState({
    value: new Date().getFullYear(),
    label: new Date().getFullYear(),
  })
  const [disabledSwitch, setDisabledSwitch] = useState(false)
  const [monthPicker, setMonthPicker] = useState(null)
  const userHistoryCommunitings = useSelector(
    state => state.userHistoryCommunitings
  )
  const resetUserHistoryCommunitings = useSelector(
    state => state.resetUserHistoryCommunitings
  )

  const dispatch = useDispatch()

  useEffect(() => {
    sal({
      threshold: 0.1,
      once: true,
    })
  }, [userHistoryCommunitings, yearPicker, monthPicker])

  useEffect(() => {
    if (!!monthPicker) {
      dispatch(
        fetchGetUserHistoryCommuniting(
          user.token,
          monthPicker.value,
          yearPicker.value
        )
      )
    }
  }, [yearPicker, monthPicker]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (resetUserHistoryCommunitings) {
      dispatch(fetchResetUserHistoryCommunitings())
    }
  }, [resetUserHistoryCommunitings]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const actualMonth = new Date().getMonth() + 1
    const findMonth = AllMonths.find(item => item.value === actualMonth)
    setMonthPicker(findMonth)
  }, [])

  const handleChangeYear = value => {
    const validValue = !!value
      ? value
      : {
          value: new Date().getFullYear(),
          label: new Date().getFullYear(),
        }
    setYearPicker(validValue)
    setDisabledSwitch(true)
    setTimeout(() => {
      setDisabledSwitch(false)
    }, 2000)
  }

  const handleChangeMonth = value => {
    const validValieMonth = !!value
      ? value
      : {
          value: 1,
          label: "Styczeń",
        }
    setMonthPicker(validValieMonth)
    setDisabledSwitch(true)
    setTimeout(() => {
      setDisabledSwitch(false)
    }, 2000)
  }

  const dateWithServices = []

  userHistoryCommunitings.forEach(itemService => {
    const dateService = new Date(
      Number(itemService.year),
      Number(itemService.month) - 1,
      Number(itemService.day),
      0,
      0,
      0,
      0
    )
    const validDate = `${
      dateService.getDate() < 10
        ? `0${dateService.getDate()}`
        : dateService.getDate()
    }-${
      dateService.getMonth() + 1 < 10
        ? `0${dateService.getMonth() + 1}`
        : dateService.getMonth() + 1
    }-${dateService.getFullYear()}`

    const indexInDateWithServices = dateWithServices.findIndex(
      itemDate => itemDate.dateService === validDate
    )
    if (indexInDateWithServices >= 0) {
      dateWithServices[indexInDateWithServices].items.push(itemService)
    } else {
      const newDateWithService = {
        dateService: validDate,
        items: [itemService],
      }
      dateWithServices.push(newDateWithService)
    }
  })

  dateWithServices.sort((a, b) => {
    const splitDateFirst = a.dateService.split("-")
    const splitDateSecond = b.dateService.split("-")
    const firstItemToSort = new Date(
      Number(splitDateFirst[2]),
      Number(splitDateFirst[1]),
      Number(splitDateFirst[0])
    )
    const secondItemToSort = new Date(
      Number(splitDateSecond[2]),
      Number(splitDateSecond[1]),
      Number(splitDateSecond[0])
    )
    if (firstItemToSort < secondItemToSort) return -1
    if (firstItemToSort > secondItemToSort) return 1
    return 0
  })

  const mapDateCommunitings = dateWithServices.map(
    (itemService, indexService) => {
      return (
        <UserHistoryCommunitingCategory
          key={indexService}
          indexCommuniting={indexService}
          itemService={itemService}
          siteProps={siteProps}
          user={user}
          resetUserHistoryCommunitings={resetUserHistoryCommunitings}
        />
      )
    }
  )

  return (
    <div>
      <PositionSelectAllEnd>
        <WidthSelect>
          <SelectCreated
            options={allYears}
            value={yearPicker}
            handleChange={handleChangeYear}
            placeholder="Rok"
            defaultMenuIsOpen={false}
            isClearable={false}
            widthAuto
            isDisabled={disabledSwitch}
            deleteItem={false}
            width="auto"
            textUp
          />
        </WidthSelect>
        <WidthSelectNoMargin>
          <SelectCreated
            options={AllMonths}
            value={monthPicker}
            handleChange={handleChangeMonth}
            placeholder="Miesiąc"
            defaultMenuIsOpen={false}
            isClearable={false}
            widthAuto
            isDisabled={disabledSwitch}
            deleteItem={false}
            width="auto"
            textUp
          />
        </WidthSelectNoMargin>
      </PositionSelectAllEnd>
      {userHistoryCommunitings.length > 0 ? (
        mapDateCommunitings
      ) : (
        <PositionNoDate siteProps={siteProps}>Brak dojazdów</PositionNoDate>
      )}
    </div>
  )
}
export default UserHistoryCommuniting
