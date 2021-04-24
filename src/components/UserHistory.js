import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchUserReserwations,
  fetchUserReserwationsAll,
  changeReserwationUser,
} from "../state/actions"
import UserHistoryCategory from "./UserHistoryCategory"
import styled from "styled-components"
import Switch from "react-switch"
import { Colors } from "../common/Colors"
import ReactTooltip from "react-tooltip"
import SelectCreated from "./SelectCreated"
import { AllMonths } from "../common/AllMonths"
import { CSSTransition } from "react-transition-group"
import { Translates } from "../common/Translates"
import { Site } from "../common/Site"

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
  padding: 5px 0;
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

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 10px;
  }
`

const UserHistory = ({ siteProps, user, handleClose }) => {
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
  const [hiddenCanceledReserwation, setHiddenCanceledReserwation] = useState(
    true
  )
  const [disabledSwitch, setDisabledSwitch] = useState(false)
  const [onlyToOpinion, setOnlyToOpinion] = useState(false)

  const userHistoryReserwations = useSelector(
    state => state.userHistoryReserwations
  )
  const resetChangeReserwationUser = useSelector(
    state => state.resetChangeReserwationUser
  )

  const dispatch = useDispatch()
  useEffect(() => {
    if (!!monthPicker) {
      if (!!hiddenCanceledReserwation && !onlyToOpinion) {
        dispatch(fetchUserReserwations(user.token))
      } else {
        dispatch(
          fetchUserReserwationsAll(
            user.token,
            yearPicker.value,
            monthPicker.value,
            onlyToOpinion
          )
        )
      }
    }
    dispatch(changeReserwationUser(false))
  }, [
    hiddenCanceledReserwation,
    yearPicker,
    monthPicker,
    onlyToOpinion,
    resetChangeReserwationUser,
  ]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [
    hiddenCanceledReserwation,
    yearPicker,
    monthPicker,
    userHistoryReserwations,
    onlyToOpinion,
  ])

  useEffect(() => {
    const actualMonth = new Date().getMonth() + 1
    const findMonth = AllMonths.find(item => item.value === actualMonth)
    setMonthPicker(findMonth)
  }, [])

  const handleHiddenCanceledReserwation = () => {
    if (!!!disabledSwitch) {
      setHiddenCanceledReserwation(prevState => !prevState)
      if (onlyToOpinion) {
        setOnlyToOpinion(false)
      }
      setDisabledSwitch(true)
      setTimeout(() => {
        setDisabledSwitch(false)
      }, 2000)
    }
  }

  const handleOnlyToOpinion = () => {
    if (!!!disabledSwitch) {
      setOnlyToOpinion(prevState => !prevState)
      if (hiddenCanceledReserwation) {
        setHiddenCanceledReserwation(false)
      }
      setDisabledSwitch(true)
      setTimeout(() => {
        setDisabledSwitch(false)
      }, 2000)
    }
  }

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
        handleClose={handleClose}
        resetChangeReserwationUser={resetChangeReserwationUser}
      />
    )
  })

  return (
    <div>
      <CSSTransition
        in={!hiddenCanceledReserwation}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
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
      </CSSTransition>
      <PositionSwitchFlex>
        <PositionSwitchFlex>
          {Translates[siteProps.language].buttons.bookingHistory}
        </PositionSwitchFlex>
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
      <PositionSwitchFlex>
        {Translates[siteProps.language].buttons.reserwationOpinion}
        <SwitchPosition data-tip data-for="switchOpinions">
          <Switch
            onChange={handleOnlyToOpinion}
            checked={onlyToOpinion}
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
      <ReactTooltip id="switchOpinions" effect="float" multiline={true}>
        {!!!onlyToOpinion ? (
          <span>Pokaż rezerwacje, w których można dodać opinie</span>
        ) : (
          <span>Pokaż rezerwację z opiniami oraz bez</span>
        )}
      </ReactTooltip>
      <ReactTooltip
        id="deleteReserwationTooltip"
        effect="float"
        multiline={true}
      >
        <span>Odwołaj wizytę</span>
      </ReactTooltip>
      <ReactTooltip
        id="addOpinionReserwationTooltip"
        effect="float"
        multiline={true}
      >
        <span>Dodaj opinię</span>
      </ReactTooltip>
      <ReactTooltip
        id="editOpinionReserwationTooltip"
        effect="float"
        multiline={true}
      >
        <span>Edytuj opinię</span>
      </ReactTooltip>
      <ReactTooltip id="editReserwationTooltip" effect="float" multiline={true}>
        <span>Edytuj rezerwację</span>
      </ReactTooltip>
      <ReactTooltip id="goToWebsite" effect="float" multiline={true}>
        <span>Przejdz do strony internetowej firmy</span>
      </ReactTooltip>
    </div>
  )
}
export default UserHistory
