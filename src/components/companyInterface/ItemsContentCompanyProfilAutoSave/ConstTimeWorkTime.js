import React from "react"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import { ButtonIcon, Popup } from "@ui"
import { Colors } from "@common/Colors"
import { DaySOfTheWeek } from "@common/DaySOfTheWeek"
import ConstTimeWorkTimeItem from "./ConstTimeWorkTimeItem"
import styled from "styled-components"

const MarginBottomItems = styled.div`
  margin-bottom: 40px;
`

const ConstTimeWorkTime = ({
  constTimeWorker,
  handleClickContent,
  siteProps,
  ButtonContent,
  ButtonDeleteStyle,
  handleCancelConstTimeWork,
  handleSaveConstTimeWork,
  itemWorker,
  handleSaveConstTimeWorkItem,
  handleCloseConstTimeWorkItem,
  resetConstDays,
  toSaveWorkerHours = [],
}) => {
  const mapDaysOfTheWeek = DaySOfTheWeek.map(item => {
    const selectedDayOfTheMonth = itemWorker.constantWorkingHours.find(
      constHour => constHour.dayOfTheWeek === item.dayOfTheWeek
    )
    const finallSelectedDayOfTheMonth = !!selectedDayOfTheMonth
      ? selectedDayOfTheMonth
      : null

    return (
      <ConstTimeWorkTimeItem
        item={item}
        key={item.dayOfTheWeek}
        siteProps={siteProps}
        itemWorker={itemWorker}
        finallSelectedDayOfTheMonth={finallSelectedDayOfTheMonth}
        handleClickContent={handleClickContent}
        ButtonContent={ButtonContent}
        ButtonDeleteStyle={ButtonDeleteStyle}
        handleSaveConstTimeWorkItem={handleSaveConstTimeWorkItem}
        handleCloseConstTimeWorkItem={handleCloseConstTimeWorkItem}
        resetConstDays={resetConstDays}
      />
    )
  })
  return (
    <Popup
      popupEnable={constTimeWorker}
      position="absolute"
      title="Godziny pracy"
      borderRadius
      closeTitle={false}
      smallTitle
      secondColors
    >
      <MarginBottomItems>{mapDaysOfTheWeek}</MarginBottomItems>
      <ButtonContent>
        <ButtonDeleteStyle>
          <ButtonIcon
            title="Anuluj"
            uppercase
            fontIconSize="16"
            fontSize="14"
            icon={<FaArrowLeft />}
            onClick={() => handleCancelConstTimeWork(itemWorker._id)}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
          />
        </ButtonDeleteStyle>
        <ButtonDeleteStyle>
          <ButtonIcon
            title="Zapisz"
            uppercase
            fontIconSize="18"
            fontSize="14"
            icon={<FaSave />}
            onClick={() => handleSaveConstTimeWork(itemWorker._id)}
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
            disabled={toSaveWorkerHours.length === 0}
            isFetchToBlock
          />
        </ButtonDeleteStyle>
      </ButtonContent>
    </Popup>
  )
}
export default ConstTimeWorkTime
