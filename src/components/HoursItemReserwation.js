import React from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"

const ColumnAvaibleHours = styled.div`
  width: 30%;
  min-width: 150px;
  padding: 10px;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  border-radius: 5px;
  margin-bottom: 10px;
`

const TextColumnAvaibleHours = styled.div`
  font-size: 1.2rem;
  width: 100%;
  margin-bottom: 10px;
  color: ${props => Colors(props.siteProps).textNormalBlack};
`

const TextNoDate = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
`

const DateReserwStyle = styled.div`
  width: 60px;
  /* height: 30px; */
  text-align: center;
  display: inline-block;
  margin: 2.5px;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).primaryColorDark
      : Colors(props.siteProps).primaryColor};
  transition-property: background-color, color, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  margin-bottom: 10px;

  &:hover {
    transform: scale(0.95);
    background-color: ${props => Colors(props.siteProps).primaryColorDark};
  }
`

const HoursItemReserwation = ({
  siteProps,
  maxHourToFilter = 10,
  minHourToFilter = 0,
  itemsHours = [],
  title = "",
  handleClickDateToReserw,
  selectedHour,
}) => {
  const filterDate = itemsHours.filter(item => {
    const splitItem = item.split(":")
    if (
      Number(splitItem[0]) < minHourToFilter ||
      Number(splitItem[0]) >= maxHourToFilter
    ) {
      return false
    } else {
      return true
    }
  })

  const mapDate = filterDate.map((item, index) => {
    const isHourActive = selectedHour === item
    return (
      <DateReserwStyle
        siteProps={siteProps}
        onClick={() => handleClickDateToReserw(item)}
        active={isHourActive}
        key={index}
      >
        {item}
      </DateReserwStyle>
    )
  })
  return (
    <ColumnAvaibleHours siteProps={siteProps}>
      <TextColumnAvaibleHours siteProps={siteProps}>
        {title}
      </TextColumnAvaibleHours>
      {mapDate.length > 0 ? (
        mapDate
      ) : (
        <TextNoDate siteProps={siteProps}>Brak dostępnych godzin</TextNoDate>
      )}
    </ColumnAvaibleHours>
  )
}
export default HoursItemReserwation
