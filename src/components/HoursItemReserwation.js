import React from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"

const ColumnAvaibleHours = styled.div`
  width: 30%;
  min-width: 150px;
  padding: 10px;
  background-color: ${props => Colors(props.colorBlind).companyItemBackground};
  border-radius: 5px;
  margin-bottom: 10px;
`

const TextColumnAvaibleHours = styled.div`
  font-size: 1.2rem;
  width: 100%;
  margin-bottom: 10px;
  color: ${props => Colors(props.colorBlind).textNormalBlack};
`

const TextNoDate = styled.div`
  color: ${props => Colors(props.colorBlind).textNormalBlack};
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
  color: ${props => Colors(props.colorBlind).textNormalWhite};
  background-color: ${props =>
    props.active
      ? Colors(props.colorBlind).primaryColorDark
      : Colors(props.colorBlind).primaryColor};
  transition-property: background-color, color, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  margin-bottom: 10px;

  &:hover {
    transform: scale(0.95);
    background-color: ${props => Colors(props.colorBlind).primaryColorDark};
  }
`

const HoursItemReserwation = ({
  colorBlind,
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
        colorBlind={colorBlind}
        onClick={() => handleClickDateToReserw(item)}
        active={isHourActive}
        key={index}
      >
        {item}
      </DateReserwStyle>
    )
  })
  return (
    <ColumnAvaibleHours colorBlind={colorBlind}>
      <TextColumnAvaibleHours colorBlind={colorBlind}>
        {title}
      </TextColumnAvaibleHours>
      {mapDate.length > 0 ? (
        mapDate
      ) : (
        <TextNoDate colorBlind={colorBlind}>Brak dostępnych godzin</TextNoDate>
      )}
    </ColumnAvaibleHours>
  )
}
export default HoursItemReserwation
