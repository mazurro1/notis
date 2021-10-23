import React from "react"
import styled from "styled-components"
import { Colors } from "@common/Colors"

const ColumnAvaibleHours = styled.div`
  width: 30%;
  min-width: 150px;
  padding: 10px;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  border-radius: 5px;
  margin-bottom: 10px;

  @media all and (max-width: 767px) {
    width: 100%;
  }
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
  position: relative;
  width: 55px;
  height: 40px;
  margin: 1px;
  text-align: center;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
  color: ${props =>
    props.active
      ? Colors(props.siteProps).textNormalWhite
      : Colors(props.siteProps).textNormalWhite};
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).primaryColorDark};
  transition-property: background-color, color, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  user-select: none;
  @media all and (min-width: 767px) and (max-width: 992px) {
    width: 45px;
  }
  transform: ${props => (props.active ? "scale(1)" : "scale(0.9)")};

  span {
    position: relative;
    top: ${props => (props.promotionsValid ? "2px" : "0px")};
    font-size: 1rem;
  }

  .promotionPosition {
    position: absolute;
    top: -8px;
    right: -5px;
    padding: 1px 4px;
    background-color: ${props => Colors(props.siteProps).dangerColor};
    color: ${props => Colors(props.siteProps).textNormalWhite};
    font-size: 0.8rem;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    transition-property: background-color, color, transform;
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }

  &:hover {
    transform: scale(1);
    background-color: ${props => Colors(props.siteProps).primaryColor};

    .promotionPosition {
      background-color: ${props => Colors(props.siteProps).dangerColorDark};
    }
  }
`

const DateFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
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
    const splitItem = item.time.split(":")
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
    const isHourActive = selectedHour === item.time
    const promotionsValid =
      item.promotion !== null
        ? item.promotion
        : item.happyHour !== null
        ? item.happyHour
        : null
    return (
      <DateReserwStyle
        siteProps={siteProps}
        onClick={() => handleClickDateToReserw(item.time, promotionsValid)}
        active={isHourActive}
        key={index}
        promotionsValid={promotionsValid !== null}
      >
        <span>{item.time}</span>
        {promotionsValid !== null && (
          <div className="promotionPosition">{`-${promotionsValid}%`}</div>
        )}
      </DateReserwStyle>
    )
  })
  return (
    <ColumnAvaibleHours siteProps={siteProps}>
      <TextColumnAvaibleHours siteProps={siteProps}>
        {title}
      </TextColumnAvaibleHours>
      {mapDate.length > 0 ? (
        <DateFlex>{mapDate}</DateFlex>
      ) : (
        <TextNoDate siteProps={siteProps}>Brak dostępnych godzin</TextNoDate>
      )}
    </ColumnAvaibleHours>
  )
}
export default HoursItemReserwation
