import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { MdExpandMore } from "react-icons/md"
import { Collapse } from "react-collapse"
import { Colors } from "../common/Colors"
import ReactTooltip from "react-tooltip"
import UserHistoryCategoryItem from "./UserHistoryCategoryItem"
import { useDispatch } from "react-redux"
import { fetchDeleteReserwation } from "../state/actions"
import Switch from "react-switch"

const TitleCategory = styled.div`
  position: relative;
  font-size: 1.25rem;
  color: ${props => Colors(props.colorBlind).textNormalWhite};
  background-color: ${props => Colors(props.colorBlind).primaryColor};
  padding: 10px;
  border-radius: 5px;
  padding-right: 50px;
  overflow: hidden;
  user-select: none;
  text-transform: uppercase;
  cursor: pointer;
  padding-right: 110px;
  transition-property: padding-bottom, background-color, color;
  transition-duration: 0.5s;
  transition-timing-function: ease;
`

const IconArrowPosition = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 7px;
  padding-bottom: 0;
  font-size: 2rem;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  svg {
    transform: ${props =>
      props.collapseActive ? "rotate(-180deg)" : "rotate(0deg)"};
    transition-property: transform;
    transition-duration: 0.5s;
    transition-timing-function: ease;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const CategoryItemStyle = styled.div`
  margin-top: 5px;
`

const SwitchPosition = styled.div`
  position: absolute;
  top: 13px;
  bottom: 0;
  right: 50px;
`

const UserHistoryCategory = ({
  colorBlind,
  title,
  reserwations,
  userToken,
}) => {
  const [collapseActive, setCollapseActive] = useState(false)
  const [hiddenCanceledReserwation, setHiddenCanceledReserwation] = useState(
    true
  )

  const dispatch = useDispatch()

  const handleClickArrow = () => {
    setCollapseActive(prevState => !prevState)
  }

  const handleHiddenCanceledReserwation = () => {
    setHiddenCanceledReserwation(prevState => !prevState)
  }

  const handleDeleteReserwation = reserwationId => {
    dispatch(
      fetchDeleteReserwation(
        userToken,
        reserwationId,
        true,
        null,
        null,
        "userReserwation"
      )
    )
  }

  const handleClickContent = e => {
    e.stopPropagation()
  }

  let allReserwations = [...reserwations]
  if (!!hiddenCanceledReserwation) {
    allReserwations = allReserwations.filter(itemReserwation => {
      const splitDateReserwation = itemReserwation.dateStart.split(":")
      const dateReserwation = new Date(
        itemReserwation.dateYear,
        itemReserwation.dateMonth - 1,
        itemReserwation.dateDay,
        Number(splitDateReserwation[0]),
        Number(splitDateReserwation[1]),
        0
      )
      const actualDate = new Date()
      const isReserwationEnd = actualDate < dateReserwation
      return (
        !!!itemReserwation.visitCanceled &&
        !!!itemReserwation.visitFinished &&
        isReserwationEnd
      )
    })
  }

  const servicesMap = allReserwations.map((item, index) => {
    return (
      <UserHistoryCategoryItem
        item={item}
        index={index}
        key={index}
        handleDeleteReserwation={handleDeleteReserwation}
      />
    )
  })

  return (
    <CategoryItemStyle>
      <TitleCategory colorBlind={colorBlind} onClick={handleClickArrow}>
        {title}
        <SwitchPosition
          onClick={handleClickContent}
          data-tip
          data-for="switchCanceled"
        >
          <Switch
            onChange={handleHiddenCanceledReserwation}
            checked={hiddenCanceledReserwation}
            activeBoxShadow={`0 0 2px 3px ${
              Colors(colorBlind).primaryColorDark
            }`}
            onColor={Colors(colorBlind).primaryColorDark}
            height={22}
            uncheckedIcon
            checkedIcon
          />
        </SwitchPosition>
        <IconArrowPosition
          // onClick={handleClickArrow}
          collapseActive={collapseActive}
        >
          <MdExpandMore />
        </IconArrowPosition>
      </TitleCategory>
      <Collapse isOpened={collapseActive}>
        <div>{servicesMap}</div>
      </Collapse>

      <ReactTooltip
        id="deleteReserwationTooltip"
        effect="float"
        multiline={true}
      >
        <span>Odwołaj wizytę</span>
      </ReactTooltip>

      <ReactTooltip id="switchCanceled" effect="float" multiline={true}>
        {!!!hiddenCanceledReserwation ? (
          <span>Ukryj wizyty zakończone oraz odwołane</span>
        ) : (
          <span>Pokaż wizyty zakończone oraz odwołane</span>
        )}
      </ReactTooltip>
    </CategoryItemStyle>
  )
}
export default UserHistoryCategory
