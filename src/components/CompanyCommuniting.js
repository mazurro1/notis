import React, { useState, useEffect } from "react"
import styled from "styled-components"
import SelectCreated from "./SelectCreated"
import { AllMonths } from "../common/AllMonths"
import { Site } from "../common/Site"
import { useDispatch, useSelector } from "react-redux"

const PositionSelectAll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`

const WidthSelect = styled.div`
  width: 160px;
  margin-right: 20px;

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 10px;
  }
`

const CompanyCommuniting = ({ siteProps, user, handleClose }) => {
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
  const [monthPicker, setMonthPicker] = useState(null)
  const [disabledSwitch, setDisabledSwitch] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!!monthPicker) {
      console.log("update")
    }
  }, [yearPicker, monthPicker]) // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <div>
      <PositionSelectAll>
        <WidthSelect>
          <SelectCreated
            options={allYears}
            value={yearPicker}
            handleChange={handleChangeYear}
            placeholder="Rok..."
            defaultMenuIsOpen={false}
            isClearable={false}
            widthAuto
            isDisabled={disabledSwitch}
            deleteItem={false}
            width="auto"
          />
        </WidthSelect>
        <WidthSelect>
          <SelectCreated
            options={AllMonths}
            value={monthPicker}
            handleChange={handleChangeMonth}
            placeholder="Miesiąc..."
            defaultMenuIsOpen={false}
            isClearable={false}
            widthAuto
            isDisabled={disabledSwitch}
            deleteItem={false}
            width="auto"
          />
        </WidthSelect>
      </PositionSelectAll>
    </div>
  )
}
export default CompanyCommuniting
