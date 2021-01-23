import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { getMonthNamePl } from "../../common/Functions"
import DayOffItem from "./DayOffItem"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import { MdEdit, MdAddBox } from "react-icons/md"
import { Colors } from "../../common/Colors"
import ButtonIcon from "../ButtonIcon"
import DaysOffContentAdd from "./DaysOffContentAdd"
import { useDispatch } from "react-redux"
import { addAlertItem, fetchSaveOpeningHoursCompany } from "../../state/actions"
import { sortItemsInArrayNumber } from "../../common/Functions"

const DayOffContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const MarginButton = styled.div`
  margin-left: 5px;
`

const CreateDayOff = styled.div`
  width: 139px;
  max-width: 100%;
  height: 73px;
  padding: 5px 10px;
  border-radius: 5px;
  margin: 5px;
  background-color: ${props => Colors(props.siteProps).secondColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  font-size: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 5px;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props => Colors(props.siteProps).secondDarkColor};
  }
`

const PaddingBottomStyle = styled.div`
  padding-bottom: ${props => (props.takeDateActive ? "320px" : "0px")};
  transition-property: padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const DaysOffContent = ({
  isCompanyEditProfil = false,
  siteProps,
  TitleRightColumn,
  ButtonEditPosition,
  companyDaysOff = [],
  user,
  editableDaysOff,
  setEditableDaysOff,
  handleResetAllEditedComponents,
  disabledEditButtons,
  editMode,
}) => {
  const [createDayOff, setCreateDayOff] = useState(false)
  const [takeDateActive, setTakeDateActive] = useState(false)
  const [deletedDayOff, setDeletedDayOff] = useState([])
  const [createdDayOff, setCreatedDayOff] = useState([])
  const [dayOffData, setDayOffData] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    const filterArrayDayOff = companyDaysOff.filter(item => {
      const isInServerData = deletedDayOff.some(
        itemDeleted => itemDeleted._id === item._id
      )
      return !isInServerData
    })
    const allDaysOff = [...filterArrayDayOff, ...createdDayOff]
    const sortYear = sortItemsInArrayNumber(allDaysOff, "year")
    const sortMonth = sortItemsInArrayNumber(sortYear, "month")
    const sortDay = sortItemsInArrayNumber(sortMonth, "day")
    setDayOffData(sortDay)
    setEditableDaysOff(false)
    setDeletedDayOff([])
    setCreatedDayOff([])
  }, [companyDaysOff])

  useEffect(() => {
    const filterArrayDayOff = companyDaysOff.filter(item => {
      const isInServerData = deletedDayOff.some(
        itemDeleted => itemDeleted._id === item._id
      )
      return !isInServerData
    })
    const allDaysOff = [...filterArrayDayOff]
    const sortYear = sortItemsInArrayNumber(allDaysOff, "year")
    const sortMonth = sortItemsInArrayNumber(sortYear, "month")
    const sortDay = sortItemsInArrayNumber(sortMonth, "day")
    setDayOffData(sortDay)
    setDeletedDayOff([])
    setCreatedDayOff([])
    setTakeDateActive(false)
    setCreateDayOff(false)
  }, [editableDaysOff, editMode])

  useEffect(() => {
    if (!!!isCompanyEditProfil) {
      setCreateDayOff(false)
      setEditableDaysOff(false)
    }
  }, [isCompanyEditProfil, editableDaysOff, editMode])

  const handleAddClose = () => {
    setCreateDayOff(false)
  }

  const handleClickContent = e => {
    e.stopPropagation()
  }

  const handleClickCreate = () => {
    setCreateDayOff(true)
  }

  const handleClickEdit = () => {
    handleResetAllEditedComponents()
    setEditableDaysOff(prevState => !prevState)
  }

  const handleResetEdit = () => {
    setDeletedDayOff([])
    setCreatedDayOff([])
    setDayOffData(companyDaysOff)
    setEditableDaysOff(false)
    setCreateDayOff(false)
  }

  const handleAddNewDayOff = newDayOff => {
    const newDayOffSplit = newDayOff.split("-")
    const dayOffDataSome = dayOffData.some(
      item =>
        item.day == newDayOffSplit[0] &&
        item.month == newDayOffSplit[1] &&
        item.year == newDayOffSplit[2]
    )
    if (!!!dayOffDataSome) {
      const randomNumber =
        Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111
      const newDayOff = {
        _id: randomNumber,
        day: Number(newDayOffSplit[0]),
        month: Number(newDayOffSplit[1]),
        year: Number(newDayOffSplit[2]),
      }
      const allDayOff = [...dayOffData, newDayOff]
      const sortYear = sortItemsInArrayNumber(allDayOff, "year")
      const sortMonth = sortItemsInArrayNumber(sortYear, "month")
      const sortDay = sortItemsInArrayNumber(sortMonth, "day")
      setDayOffData(sortDay)
      const allCreatedDayOff = [...createdDayOff, newDayOff]
      setCreatedDayOff(allCreatedDayOff)
    } else {
      dispatch(addAlertItem("Podany dzień już istnieje.", "red"))
    }
  }

  const handleDeleteDay = day => {
    const dayOffUpdate = [...dayOffData]
    const filterArrayDayOff = dayOffUpdate.filter(item => item._id !== day._id)
    const filterCreatedDayOff = createdDayOff.filter(
      item => item._id !== day._id
    )
    const deletedItemsIds = [...deletedDayOff, day._id]
    setCreatedDayOff(filterCreatedDayOff)
    setDeletedDayOff(deletedItemsIds)
    setDayOffData(filterArrayDayOff)
  }

  const handleSaveDayOff = () => {
    const daysOff = {
      deletedDayOff: deletedDayOff,
      createdDayOff: createdDayOff,
    }
    dispatch(
      fetchSaveOpeningHoursCompany(user.token, user.company._id, null, daysOff)
    )
  }

  const mapDayOff = dayOffData.map((item, index) => {
    const monthName = getMonthNamePl(item.month - 1)
    return (
      <DayOffItem
        monthName={monthName}
        item={item}
        key={index}
        handleDeleteDay={handleDeleteDay}
        siteProps={siteProps}
        isCompanyEditProfil={editableDaysOff}
        editable={editableDaysOff}
      />
    )
  })
  return (
    <PaddingBottomStyle takeDateActive={takeDateActive}>
      <TitleRightColumn
        isCompanyEditProfil={editableDaysOff}
        siteProps={siteProps}
      >
        Dni wolne od pracy
      </TitleRightColumn>
      <DayOffContent>
        {mapDayOff}
        {!!isCompanyEditProfil && editableDaysOff && (
          <CreateDayOff siteProps={siteProps} onClick={handleClickCreate}>
            <MdAddBox />
          </CreateDayOff>
        )}
      </DayOffContent>

      {isCompanyEditProfil ? (
        editableDaysOff ? (
          <>
            <ButtonEditPosition>
              <MarginButton>
                <ButtonIcon
                  title="Cofnij"
                  uppercase
                  fontIconSize="16"
                  fontSize="14"
                  icon={<FaArrowLeft />}
                  customColorButton={Colors(siteProps).dangerColorDark}
                  customColorIcon={Colors(siteProps).dangerColor}
                  onClick={handleResetEdit}
                />
              </MarginButton>
              <MarginButton>
                <ButtonIcon
                  title="Zapisz"
                  uppercase
                  fontIconSize="16"
                  fontSize="14"
                  icon={<FaSave />}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                  onClick={handleSaveDayOff}
                />
              </MarginButton>
            </ButtonEditPosition>
          </>
        ) : (
          <ButtonEditPosition>
            <div data-tip data-for="disabledButton">
              <ButtonIcon
                title="Edytuj dni wolne"
                uppercase
                fontIconSize="25"
                fontSize="14"
                icon={<MdEdit />}
                secondColors
                onClick={handleClickEdit}
                disabled={disabledEditButtons}
              />
            </div>
          </ButtonEditPosition>
        )
      ) : null}
      <DaysOffContentAdd
        handleClickContent={handleClickContent}
        handleAddClose={handleAddClose}
        siteProps={siteProps}
        createDayOff={createDayOff}
        setCreateDayOff={setCreateDayOff}
        takeDateActive={takeDateActive}
        setTakeDateActive={setTakeDateActive}
        handleAddNewDayOff={handleAddNewDayOff}
      />
    </PaddingBottomStyle>
  )
}
export default DaysOffContent
