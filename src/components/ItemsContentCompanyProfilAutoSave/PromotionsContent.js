import React, { useState, useEffect } from "react"
import styled from "styled-components"
import ButtonIcon from "../ButtonIcon"
import { Colors } from "../../common/Colors"
import { FaArrowLeft } from "react-icons/fa"
import { MdEdit, MdAddBox } from "react-icons/md"
import PromotionsContentNewItem from "./PromotionsContentNewItem"
import PromotionsContentItem from "./PromotionsContentItem"
import { sortItemsInArrayDateConvert } from "../../common/Functions"
import { Element, scroller } from "react-scroll"

const PositionRelative = styled.div`
  font-size: 1rem;
  min-height: ${props => (props.active ? "500px" : "0px")};
  transition-property: padding-bottom, min-height;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const MarginButton = styled.div`
  margin-left: 5px;
`

const ItemsAddHappyHour = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-items: center;
`

const ItemsPromotions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`

const PromotionsContent = ({
  isCompanyEditProfil = false,
  siteProps,
  TitleRightColumn,
  promotions = [],
  editPromotions,
  setEditPromotions,
  handleResetAllEditedComponents,
  disabledEditButtons,
  editMode,
  ButtonEditPosition,
  companyServices = [],
  user,
}) => {
  const [newPromotion, setNewPromotion] = useState(false)
  const [enableDatePickerStart, setEnableDatePickerStart] = useState(false)
  const [enableDatePickerEnd, setEnableDatePickerEnd] = useState(false)

  useEffect(() => {
    setNewPromotion(false)
  }, [promotions, editMode])

  const handleClickEdit = () => {
    scroller.scrollTo("promotionsScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    handleResetAllEditedComponents()
    setEditPromotions(prevState => !prevState)
  }

  const handleReset = () => {
    scroller.scrollTo("promotionsScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    setEditPromotions(false)
  }

  const handleClickAddNewNoConsrHappyHour = () => {
    setNewPromotion(prevState => !prevState)
  }
  const sortedPromotionsConvert = sortItemsInArrayDateConvert(
    [...promotions],
    "start"
  )
  const mapPromotions = sortedPromotionsConvert.map((item, index) => {
    return (
      <PromotionsContentItem
        item={item}
        key={index}
        companyServices={companyServices}
        siteProps={siteProps}
        editPromotions={editPromotions}
        editMode={editMode}
        user={user}
        promotions={promotions}
        TitleRightColumn={TitleRightColumn}
        setEditPromotions={setEditPromotions}
      />
    )
  })
  return (
    <Element name="promotionsScrollElement" className="element">
      <PositionRelative
        active={newPromotion || enableDatePickerStart || enableDatePickerEnd}
      >
        <TitleRightColumn
          isCompanyEditProfil={editPromotions}
          siteProps={siteProps}
        >
          Promocje
        </TitleRightColumn>
        <ItemsPromotions>{mapPromotions}</ItemsPromotions>
        <ItemsAddHappyHour>
          {isCompanyEditProfil && editPromotions && (
            <ButtonIcon
              title="Dodaj promocje"
              uppercase
              fontIconSize="25"
              fontSize="14"
              icon={<MdAddBox />}
              secondColors
              onClick={handleClickAddNewNoConsrHappyHour}
            />
          )}
        </ItemsAddHappyHour>
        {isCompanyEditProfil && !editPromotions ? (
          <ButtonEditPosition>
            <div data-tip data-for="disabledButton">
              <ButtonIcon
                title="Edytuj promocje"
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
          <PromotionsContentNewItem
            TitleRightColumn={TitleRightColumn}
            newPromotion={newPromotion}
            siteProps={siteProps}
            setEditPromotions={setEditPromotions}
            setNewPromotion={setNewPromotion}
            companyServices={companyServices}
            enableDatePickerStart={enableDatePickerStart}
            setEnableDatePickerStart={setEnableDatePickerStart}
            enableDatePickerEnd={enableDatePickerEnd}
            setEnableDatePickerEnd={setEnableDatePickerEnd}
            user={user}
            promotions={promotions}
          />
        )}
      </PositionRelative>
    </Element>
  )
}
export default PromotionsContent
