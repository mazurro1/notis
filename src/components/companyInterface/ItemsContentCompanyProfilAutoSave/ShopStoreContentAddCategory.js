import React from "react"
import styled from "styled-components"
import { MdAddBox, MdTitle, MdArrowBack } from "react-icons/md"
import { ButtonIcon, Popup, InputIcon } from "@ui"
import { Colors } from "@common/Colors"

const AddCategory = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).successColor};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: ${props => (props.clickAddCategory ? "250px" : "0px")};
  transition-property: background-color, padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  margin-top: 20px;
  overflow: hidden;
  cursor: ${props => (props.clickAddCategory ? "default" : "pointer")};
  &:hover {
    background-color: ${props => Colors(props.siteProps).successColorDark};
  }
`

const IconAddCategory = styled.div`
  padding: 10px;
  padding-bottom: 0px;
  color: white;
  font-size: 2rem;
  color: ${props => Colors(props.siteProps).textNormalWhite};
`

const ButtonsAddPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const ShopStoreContentAddCategory = ({
  handleChangeNewCategory,
  handleAddNewCategory,
  handleResetAddCategory,
  handleClickAddCategory,
  siteProps,
  clickAddCategory,
  newCategoryName,
}) => {
  return (
    <>
      <AddCategory
        data-tip
        data-for="addNewCategoryShopStore"
        onClick={handleClickAddCategory}
        clickAddCategory={clickAddCategory}
        siteProps={siteProps}
      >
        <IconAddCategory siteProps={siteProps}>
          <MdAddBox />
        </IconAddCategory>

        <Popup
          popupEnable={clickAddCategory}
          position="absolute"
          title="Nowa kategoria"
          borderRadius
          closeTitle={false}
          smallTitle
          secondColors
        >
          <InputIcon
            icon={<MdTitle />}
            placeholder="Nazwa kategorii"
            secondColor
            value={newCategoryName}
            type="text"
            onChange={handleChangeNewCategory}
            required
            validText="Minimum 3 znaki"
          />
          <ButtonsAddPosition>
            <ButtonMargin>
              <ButtonIcon
                title="Anuluj"
                uppercase
                fontIconSize="20"
                fontSize="13"
                icon={<MdArrowBack />}
                onClick={handleResetAddCategory}
                customColorButton={Colors(siteProps).dangerColorDark}
                customColorIcon={Colors(siteProps).dangerColor}
              />
            </ButtonMargin>
            <ButtonMargin>
              <ButtonIcon
                title="Dodaj"
                uppercase
                fontIconSize="20"
                fontSize="13"
                icon={<MdAddBox />}
                customColorButton={Colors(siteProps).successColorDark}
                customColorIcon={Colors(siteProps).successColor}
                disabled={newCategoryName.length <= 2}
                onClick={handleAddNewCategory}
              />
            </ButtonMargin>
          </ButtonsAddPosition>
        </Popup>
      </AddCategory>
    </>
  )
}
export default ShopStoreContentAddCategory
