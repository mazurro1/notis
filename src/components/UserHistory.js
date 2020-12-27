import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchUserReserwations,
  fetchUserReserwationsAll,
} from "../state/actions"
import UserHistoryCategory from "./UserHistoryCategory"
import styled from "styled-components"
import Switch from "react-switch"
import { Colors } from "../common/Colors"
import ReactTooltip from "react-tooltip"
import SelectCustom from './SelectCustom'
import { AllMonths } from "../common/AllMonths"
import { CSSTransition } from "react-transition-group"

const NoReserwationsStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  text-align: center;
  font-size: 1.2rem;
`
const SwitchPosition = styled.div`
  position: relative;
  padding-top: 5px;
  padding-left: 10px;
`

const PositionSwitchFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 0;
`

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
`

const UserHistory = ({ siteProps, user }) => {
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
  const [monthPicker, setMonthPicker] = useState({
    value: 1,
    label: "Styczeń",
  })
  const [hiddenCanceledReserwation, setHiddenCanceledReserwation] = useState(
    true
  )
  const [disabledSwitch, setDisabledSwitch] = useState(false)
  const userHistoryReserwations = useSelector(
    state => state.userHistoryReserwations
  )
  const dispatch = useDispatch()
  useEffect(() => {
    if (!!hiddenCanceledReserwation) {
      dispatch(fetchUserReserwations(user.token))
    } else {
      dispatch(
        fetchUserReserwationsAll(
          user.token,
          yearPicker.value,
          monthPicker.value
        )
      )
    }
  }, [hiddenCanceledReserwation, yearPicker, monthPicker])

  useEffect(() => {
    const actualMonth = new Date().getMonth() + 1
    const findMonth = AllMonths.find(item => item.value === actualMonth)
    setMonthPicker(findMonth)
  }, [AllMonths])

  const handleHiddenCanceledReserwation = () => {
    if (!!!disabledSwitch) {
      setHiddenCanceledReserwation(prevState => !prevState)
      setDisabledSwitch(true)
      setTimeout(() => {
        setDisabledSwitch(false)
      }, 2000)
    }
  }

    const handleChangeYear = value => {
      setYearPicker(value)
      setDisabledSwitch(true)
      setTimeout(() => {
        setDisabledSwitch(false)
      }, 2000)
    }

    const handleChangeMonth = value => {
      setMonthPicker(value)
      setDisabledSwitch(true)
      setTimeout(() => {
        setDisabledSwitch(false)
      }, 2000)
    }

  const mapCategory = userHistoryReserwations.map((item, index) => {
    return (
      <UserHistoryCategory
        siteProps={siteProps}
        title={item.category}
        reserwations={item.items}
        key={index}
        userToken={user.token}
        setHiddenCanceledReserwation={setHiddenCanceledReserwation}
        hiddenCanceledReserwation={hiddenCanceledReserwation}
        company={item.company}
      />
    )
  })


  return (
    <>
      <PositionSwitchFlex>
        <CSSTransition
          in={!hiddenCanceledReserwation}
          timeout={400}
          classNames="popup"
          unmountOnExit
        >
          <PositionSelectAll>
            <WidthSelect>
              <SelectCustom
                options={allYears}
                value={yearPicker}
                handleChange={handleChangeYear}
                placeholder="Rok..."
                defaultMenuIsOpen={false}
                isClearable={false}
                widthAuto
                isDisabled={disabledSwitch}
              />
            </WidthSelect>
            <WidthSelect>
              <SelectCustom
                options={AllMonths}
                value={monthPicker}
                handleChange={handleChangeMonth}
                placeholder="Miesiąc..."
                defaultMenuIsOpen={false}
                isClearable={false}
                widthAuto
                isDisabled={disabledSwitch}
              />
            </WidthSelect>
          </PositionSelectAll>
        </CSSTransition>
        <PositionSwitchFlex>Histora rezerwacji</PositionSwitchFlex>
        <SwitchPosition data-tip data-for="switchCanceled">
          <Switch
            onChange={handleHiddenCanceledReserwation}
            checked={!hiddenCanceledReserwation}
            activeBoxShadow={`0 0 2px 3px ${
              Colors(siteProps).primaryColorDark
            }`}
            onColor={Colors(siteProps).primaryColorDark}
            height={22}
            uncheckedIcon
            checkedIcon
            disabled={disabledSwitch}
          />
        </SwitchPosition>
      </PositionSwitchFlex>
      {mapCategory.length > 0 ? (
        mapCategory
      ) : (
        <NoReserwationsStyle>Brak rezerwacji</NoReserwationsStyle>
      )}
      <ReactTooltip id="switchCanceled" effect="float" multiline={true}>
        {!!!hiddenCanceledReserwation ? (
          <span>Ukryj wizyty zakończone oraz odwołane</span>
        ) : (
          <span>Pokaż wizyty zakończone oraz odwołane</span>
        )}
      </ReactTooltip>
    </>
  )
}
export default UserHistory
