import React, { useState } from "react"
import styled from "styled-components"
import { Collapse } from "react-collapse"
import { Colors } from "../common/Colors"
import { MdExpandMore } from "react-icons/md"
import UserHistoryCommunitingCategoryItem from "./UserHistoryCommunitingCategoryItem"

const CategoryItemStyle = styled.div`
  margin-top: 20px;
  margin-bottom: ${props => `-${props.paddingCategory}px`};
`

const TitleCategory = styled.div`
  position: relative;
  font-size: 1.25rem;
  cursor: pointer;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props => Colors(props.siteProps).primaryColor};
  padding: 10px;
  border-radius: 5px;
  padding-right: 50px;
  padding-bottom: 10px;
  overflow: hidden;
  user-select: none;
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

const UserHistoryCommunitingCategory = ({
  itemService,
  siteProps,
  user,
  resetUserHistoryCommunitings,
  indexCommuniting,
}) => {
  const [collapseActive, setCollapseActive] = useState(false)

  const handleClickArrow = () => {
    setCollapseActive(prevState => !prevState)
  }

  itemService.items.sort((a, b) => {
    const splitDateFirst = a.timeStart.split(":")
    const splitDateSecond = b.timeStart.split(":")
    const firstItemToSort = new Date(
      a.year,
      a.month - 1,
      a.day,
      Number(splitDateFirst[0]),
      Number(splitDateFirst[1])
    )
    const secondItemToSort = new Date(
      b.year,
      b.month - 1,
      b.day,
      Number(splitDateSecond[0]),
      Number(splitDateSecond[1])
    )
    if (firstItemToSort < secondItemToSort) return -1
    if (firstItemToSort > secondItemToSort) return 1
    return 0
  })

  const servicesMap = itemService.items.map((item, itemIndex) => {
    return (
      <UserHistoryCommunitingCategoryItem
        key={itemIndex}
        item={item}
        siteProps={siteProps}
        itemIndex={itemIndex}
        indexCommuniting={indexCommuniting}
        user={user}
        resetUserHistoryCommunitings={resetUserHistoryCommunitings}
      />
    )
  })

  return (
    <CategoryItemStyle
      data-sal="zoom-in"
      data-sal-duration="1000"
      data-sal-easing="ease-out-bounce"
    >
      <TitleCategory siteProps={siteProps} onClick={handleClickArrow}>
        {itemService.dateService}
        <IconArrowPosition collapseActive={collapseActive}>
          <MdExpandMore />
        </IconArrowPosition>
      </TitleCategory>

      <Collapse isOpened={collapseActive}>
        <div>{servicesMap}</div>
      </Collapse>
    </CategoryItemStyle>
  )
}
export default UserHistoryCommunitingCategory
