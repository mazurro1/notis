import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { ButtonIcon } from "@ui"
import { Colors } from "@common/Colors"
import { MdEdit, MdAddBox } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import StampsContentItem from "./StampsContentItem"
import StampsContentItemNewItem from "./StampsContentItemNewItem"
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

const StampsContent = ({
  TitleRightColumn,
  siteProps,
  isCompanyEditProfil,
  editStamps,
  setEditStamps,
  ButtonEditPosition,
  handleResetAllEditedComponents,
  companyStamps = [],
  services = [],
  editMode,
  disabledEditButtons,
  user,
}) => {
  const [newStampActive, setNewStampActive] = useState(false)

  useEffect(() => {
    setNewStampActive(false)
  }, [companyStamps])

  const handleClickEdit = () => {
    scroller.scrollTo("stampsScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    handleResetAllEditedComponents()
    setEditStamps(true)
  }

  const handleReset = () => {
    scroller.scrollTo("stampsScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    setEditStamps(false)
  }

  const handleClickAddNewStamp = () => {
    setNewStampActive(prevState => !prevState)
  }

  companyStamps.sort((a, b) => {
    const firstItemToSort = a.promotionPercent
    const secondItemToSort = b.promotionPercent
    if (firstItemToSort < secondItemToSort) return 1
    if (firstItemToSort > secondItemToSort) return -1
    return 0
  })

  const mapStamps = companyStamps.map((stamp, index) => {
    return (
      <StampsContentItem
        key={index}
        stamp={stamp}
        services={services}
        siteProps={siteProps}
        editStamps={editStamps}
        editMode={editMode}
        companyStamps={companyStamps}
        user={user}
      />
    )
  })
  return (
    <Element name="stampsScrollElement" className="element">
      <PositionRelative active={newStampActive}>
        <TitleRightColumn
          isCompanyEditProfil={editStamps}
          siteProps={siteProps}
        >
          Pieczątki
        </TitleRightColumn>
        {mapStamps}
        <ItemsAddHappyHour>
          {isCompanyEditProfil && editStamps && (
            <ButtonIcon
              title="Dodaj pieczątke"
              uppercase
              fontIconSize="25"
              fontSize="14"
              icon={<MdAddBox />}
              secondColors
              onClick={handleClickAddNewStamp}
            />
          )}
        </ItemsAddHappyHour>
        {isCompanyEditProfil && !editStamps ? (
          <ButtonEditPosition>
            <div data-tip data-for="disabledButton">
              <ButtonIcon
                title="Edytuj naklejki"
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
        <StampsContentItemNewItem
          editedItemEnable={newStampActive}
          setEditedItemEnable={setNewStampActive}
          siteProps={siteProps}
          services={services}
          user={user}
          companyStamps={companyStamps}
        />
      </PositionRelative>
    </Element>
  )
}
export default StampsContent
