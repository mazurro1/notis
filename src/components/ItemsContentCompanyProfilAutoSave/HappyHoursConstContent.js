import React, { useState, useEffect } from "react"
import { MdEdit, MdAddBox } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import ButtonIcon from "../ButtonIcon"
import HappyHoursConstContentNewItem from "./HappyHoursConstContentNewItem"
import HappyHoursConstContentCategory from "./HappyHoursConstContentCategory"
import { useDispatch, useSelector } from "react-redux"
import { updateConstHappyHoursFunction } from "../../state/actions"
import { Element, scroller } from "react-scroll"

const MarginButton = styled.div`
  margin-left: 5px;
`

const PositionRelative = styled.div`
  font-size: 1rem;
  min-height: ${props => (props.active ? "700px" : "0px")};
  transition-property: min-height;
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
  const [categoriesWithItems, setCategoriesWithItems] = useState(
    happyHoursConst
  )
  const [newHappyHour, setNewHappyHour] = useState(false)
  const [enableTimeStart, setEnableTimeStart] = useState(false)
  const [enableTimeEnd, setEnableTimeEnd] = useState(false)
  const updateConstHappyHours = useSelector(
    state => state.updateConstHappyHours
  )

  const dispatch = useDispatch()

  useEffect(() => {
    setCategoriesWithItems(happyHoursConst)
    setNewHappyHour(false)
    setEnableTimeStart(false)
    setEnableTimeEnd(false)
    if (!!updateConstHappyHours) {
      dispatch(updateConstHappyHoursFunction())
    }
  }, [happyHoursConst, editMode, updateConstHappyHours]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickEdit = () => {
    scroller.scrollTo("happyHoursScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    handleResetAllEditedComponents()
    setEditConstHappyHours(prevState => !prevState)
  }

  const handleReset = () => {
    setEditConstHappyHours(false)

    scroller.scrollTo("happyHoursScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
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
    <Element name="happyHoursScrollElement" className="element">
      <PositionRelative
        active={newHappyHour || enableTimeStart || enableTimeEnd}
      >
        <TitleRightColumn
          isCompanyEditProfil={editConstHappyHours}
          siteProps={siteProps}
        >
          Happy Hours
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
                title="Edytuj happy hours"
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
    </Element>
  )
}
export default HappyHoursConstContent
