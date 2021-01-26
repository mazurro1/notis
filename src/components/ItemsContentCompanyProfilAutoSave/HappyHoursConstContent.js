import React, { useState, useEffect, useRef } from "react"
import { MdEdit, MdAddBox } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import ButtonIcon from '../ButtonIcon'
import HappyHoursConstContentNewItem from "./HappyHoursConstContentNewItem"
import {
  getCategories,
  categoryItemsConstHours,
  sortItemsInArrayNumber,
} from "../../common/Functions"
import HappyHoursConstContentCategory from "./HappyHoursConstContentCategory"
import { useDispatch, useSelector } from "react-redux"
import {updateConstHappyHoursFunction} from '../../state/actions'


const MarginButton = styled.div`
  margin-left: 5px;
`

const PositionRelative = styled.div`
  font-size: 1rem;
  padding-bottom: ${props => (props.active ? props.componentHeight > 700 ? "0px" : `${700 - props.componentHeight}px` : "0px")};
  transition-property: padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const ItemsAddHappyHour = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-items: center;
`

const HappyHoursConstContent = ({
  isCompanyEditProfil = false,
  siteProps,
  TitleRightColumn,
  happyHoursConst = [],
  editConstHappyHours,
  setEditConstHappyHours,
  handleResetAllEditedComponents,
  disabledEditButtons,
  editMode,
  ButtonEditPosition,
  companyServices = [],
  user,
}) => {
  const [categoriesWithItems, setCategoriesWithItems] = useState([])
  const [newHappyHour, setNewHappyHour] = useState(false)
  const [componentHeight, setComponentHeight] = useState(0)
  const [enableTimeStart, setEnableTimeStart] = useState(false)
  const [enableTimeEnd, setEnableTimeEnd] = useState(false)
  const updateConstHappyHours = useSelector(
    state => state.updateConstHappyHours
  )
  const refConstHappyHour = useRef(null)

  useEffect(() => {
    if (!!refConstHappyHour) {
      setComponentHeight(refConstHappyHour.current.clientHeight)
    }
  }, [refConstHappyHour, categoriesWithItems, happyHoursConst, newHappyHour])
  

  const dispatch = useDispatch()

  useEffect(() => {
    const categories = getCategories([...happyHoursConst], "dayWeekIndex")
    const items = categoryItemsConstHours(categories, [...happyHoursConst])
    const sortedItems = sortItemsInArrayNumber([...items], "category")
    const sortedHas0 = sortedItems.filter(item => item.category === 0)
    const sortedOther = sortedItems.filter(item => item.category !== 0)
    const resultSorted = [...sortedOther, ...sortedHas0]
    setCategoriesWithItems(resultSorted)

    setNewHappyHour(false)
    setEnableTimeStart(false)
    setEnableTimeEnd(false)
    dispatch(updateConstHappyHoursFunction())
  }, [happyHoursConst, editMode, updateConstHappyHours])

  const handleClickEdit = () => {
    handleResetAllEditedComponents()
    setEditConstHappyHours(prevState => !prevState)
  }

  const handleReset = () => {
    setEditConstHappyHours(false)
  }

  const handleAddItem = () => {
    setNewHappyHour(true)
  }

  const mapCategories = categoriesWithItems.map((category, index) => {
    return (
      <HappyHoursConstContentCategory
        key={index}
        category={category}
        siteProps={siteProps}
        companyServices={companyServices}
        editConstHappyHours={editConstHappyHours}
        editMode={editMode}
        user={user}
        happyHoursConst={happyHoursConst}
        TitleRightColumn={TitleRightColumn}
      />
    )
  })
  
  return (
    <PositionRelative
      active={newHappyHour || enableTimeStart || enableTimeEnd}
      ref={refConstHappyHour}
      componentHeight={componentHeight}
    >
      <TitleRightColumn
        isCompanyEditProfil={editConstHappyHours}
        siteProps={siteProps}
      >
        Stałe Happy Hours
      </TitleRightColumn>
      {mapCategories}
      <ItemsAddHappyHour>
        {editConstHappyHours && (
          <ButtonIcon
            title="Dodaj happy hour"
            uppercase
            fontIconSize="25"
            fontSize="14"
            icon={<MdAddBox />}
            secondColors
            onClick={handleAddItem}
          />
        )}
      </ItemsAddHappyHour>
      {isCompanyEditProfil && !editConstHappyHours ? (
        <ButtonEditPosition>
          <div data-tip data-for="disabledButton">
            <ButtonIcon
              title="Edytuj stałe happy hours"
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
      ) : (
        isCompanyEditProfil && (
          <ButtonEditPosition>
            <MarginButton>
              <ButtonIcon
                title="Zakończ edytowanie"
                uppercase
                fontIconSize="20"
                fontSize="14"
                icon={<FaArrowLeft />}
                customColorButton={Colors(siteProps).dangerColorDark}
                customColorIcon={Colors(siteProps).dangerColor}
                onClick={handleReset}
              />
            </MarginButton>
          </ButtonEditPosition>
        )
      )}
      {isCompanyEditProfil && (
        <>
          <HappyHoursConstContentNewItem
            siteProps={siteProps}
            TitleRightColumn={TitleRightColumn}
            editConstHappyHours={editConstHappyHours}
            newHappyHour={newHappyHour}
            setNewHappyHour={setNewHappyHour}
            enableTimeStart={enableTimeStart}
            setEnableTimeStart={setEnableTimeStart}
            setEnableTimeEnd={setEnableTimeEnd}
            enableTimeEnd={enableTimeEnd}
            companyServices={companyServices}
            user={user}
            happyHoursConst={happyHoursConst}
          />
        </>
      )}
    </PositionRelative>
  )
}
export default HappyHoursConstContent
