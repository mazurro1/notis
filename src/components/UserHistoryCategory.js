import React, { useState } from "react"
import styled from "styled-components"
import { MdExpandMore } from "react-icons/md"
import { FaChrome } from "react-icons/fa"
import { Collapse } from "react-collapse"
import { Colors } from "../common/Colors"
import ReactTooltip from "react-tooltip"
import UserHistoryCategoryItem from "./UserHistoryCategoryItem"
import { useDispatch } from "react-redux"
import { fetchDeleteReserwation } from "../state/actions"
import { LinkEffect } from "../common/LinkEffect"

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
  padding-right: 250px;
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

const PositionCompanyLink = styled.div`
  position: absolute;
  right: 50px;
  top: 0px;
  border-radius: 5px;
  font-size: 1.8rem;
  padding: 8px;
  padding-bottom: 5px;
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  a {
    color: ${props => Colors(props.colorBlind).textNormalWhite};
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }
  &:hover {
    transform: scale(1.1);
    a {
      color: ${props => Colors(props.colorBlind).primaryColorDark};
    }
  }
`

const UserHistoryCategory = ({
  colorBlind,
  title,
  reserwations,
  userToken,
  company,
}) => {
  const [collapseActive, setCollapseActive] = useState(false)
  const dispatch = useDispatch()

  const handleClickArrow = () => {
    setCollapseActive(prevState => !prevState)
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

  const handleClickContentNoClicked = e => {
    e.stopPropagation()
  }

  const allReserwations = [...reserwations]
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
        <PositionCompanyLink
          onClick={handleClickContentNoClicked}
          colorBlind={colorBlind}
          data-tip
          data-for="goToWebsite"
        >
          <LinkEffect
            path={`/company/${company.company.linkPath}`}
            text={<FaChrome />}
          />
        </PositionCompanyLink>
        <IconArrowPosition collapseActive={collapseActive}>
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
      <ReactTooltip id="goToWebsite" effect="float" multiline={true}>
        <span>Przejdz do strony internetowej firmy</span>
      </ReactTooltip>
    </CategoryItemStyle>
  )
}
export default UserHistoryCategory
