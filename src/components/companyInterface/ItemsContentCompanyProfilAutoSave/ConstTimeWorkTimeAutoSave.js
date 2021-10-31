import React from "react"
import { CSSTransition } from "react-transition-group"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import { ButtonIcon } from "@ui"
import { Colors } from "@common/Colors"
import { DaySOfTheWeek } from "@common/DaySOfTheWeek"
import ConstTimeWorkTimeItem from "./ConstTimeWorkTimeItem"
import styled from "styled-components"

const DayHoursStyle = styled.h2`
  font-size: 1.25rem;
  display: inline-block;
  font-family: "Poppins-Regular", sans-serif;
  border-bottom: 2px solid ${props => Colors(props.siteProps).secondColor};
`

const ConstTimeWorkTimeAutoSave = ({
  constTimeWorker,
  handleClickContent,
  siteProps,
  EditUserBackground,
  EditUserBackgroundContent,
  ButtonContent,
  ButtonDeleteStyle,
  handleCancelConstTimeWork,
  handleSaveConstTimeWork,
  itemWorker,
  handleSaveConstTimeWorkItem,
  handleCloseConstTimeWorkItem,
  selectEditedWorkersHours,
  handleResetDay,
}) => {
  const mapDaysOfTheWeek = DaySOfTheWeek.map(item => {
    const selectedDayOfTheMonth = itemWorker.constantWorkingHours.find(
      constHour => constHour.dayOfTheWeek === item.dayOfTheWeek
    )
    const finallSelectedDayOfTheMonth = !!selectedDayOfTheMonth
      ? selectedDayOfTheMonth
      : null
    let selectedDaySelectEditedWorkersHours = null
    if (!!selectEditedWorkersHours) {
      selectedDaySelectEditedWorkersHours = selectEditedWorkersHours.constantWorkingHours.find(
        day => day.dayOfTheWeek === item.dayOfTheWeek
      )
    }
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
        DayHoursStyle={DayHoursStyle}
        handleSaveConstTimeWorkItem={handleSaveConstTimeWorkItem}
        handleCloseConstTimeWorkItem={handleCloseConstTimeWorkItem}
        selectedDaySelectEditedWorkersHours={
          selectedDaySelectEditedWorkersHours
        }
        handleResetDay={handleResetDay}
      />
    )
  })
  return (
    <CSSTransition
      in={constTimeWorker}
      timeout={400}
      classNames="popup"
      unmountOnExit
    >
      <EditUserBackground>
        <EditUserBackgroundContent
          onClick={handleClickContent}
          siteProps={siteProps}
          noRelative
        >
          <DayHoursStyle siteProps={siteProps}>GODZINY PRACY</DayHoursStyle>
          {mapDaysOfTheWeek}
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
                isFetchToBlock
              />
            </ButtonDeleteStyle>
          </ButtonContent>
        </EditUserBackgroundContent>
      </EditUserBackground>
    </CSSTransition>
  )
}
export default ConstTimeWorkTimeAutoSave
