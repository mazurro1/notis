import React, { useState, useEffect } from "react"
import SelectCreated from "./SelectCreated"
import styled from "styled-components"
import sal from "sal.js"
import { AllMonths } from "../common/AllMonths"
import { Site } from "../common/Site"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchGetUserHistoryServices,
  fetchResetUserHistoryServices,
} from "../state/actions"
import UserHistoryServicesCategory from "./UserHistoryServicesCategory"
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

const PositionNoDate = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
  font-size: 1rem;
  font-family: "Poppins-Bold", sans-serif;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
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

const UserHistoryServices = ({ user, siteProps }) => {
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
  const userHistoryServices = useSelector(state => state.userHistoryServices)
  const resetUserHistoryService = useSelector(
    state => state.resetUserHistoryService
  )

  const dispatch = useDispatch()

  useEffect(() => {
    sal({
      threshold: 0.1,
      once: true,
    })
  }, [userHistoryServices, yearPicker, monthPicker])

  useEffect(() => {
    if (!!monthPicker) {
      dispatch(
        fetchGetUserHistoryServices(
          user.token,
          monthPicker.value,
          yearPicker.value
        )
      )
    }
  }, [yearPicker, monthPicker]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const actualMonth = new Date().getMonth() + 1
    const findMonth = AllMonths.find(item => item.value === actualMonth)
    setMonthPicker(findMonth)
  }, [])

  useEffect(() => {
    if (resetUserHistoryService) {
      dispatch(fetchResetUserHistoryServices())
    }
  }, [resetUserHistoryService]) // eslint-disable-line react-hooks/exhaustive-deps

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

  userHistoryServices.forEach(itemService => {
    const dateService = new Date(itemService.createdAt)
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

  const mapDateServices = dateWithServices.map((itemService, indexService) => {
    return (
      <UserHistoryServicesCategory
        key={indexService}
        indexService={indexService}
        itemService={itemService}
        siteProps={siteProps}
        user={user}
        resetUserHistoryService={resetUserHistoryService}
      />
    )
  })

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
      {userHistoryServices.length > 0 ? (
        mapDateServices
      ) : (
        <PositionNoDate siteProps={siteProps}>Brak serwisów</PositionNoDate>
      )}
    </div>
  )
}
export default UserHistoryServices
