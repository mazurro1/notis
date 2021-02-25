import React from "react"
import styled from "styled-components"
import InputIcon from "../InputIcon"
import { CSSTransition } from "react-transition-group"
import { MdAddBox, MdTitle, MdArrowBack } from "react-icons/md"
import ButtonIcon from "../ButtonIcon"
import { Colors } from "../../common/Colors"

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

const BackgroundEditContent = styled.div`
  width: 90%;
  background-color: ${props => (props.transparent ? "transparent" : "white")};
  border-radius: 5px;
  max-height: 90%;
  overflow: hidden;
  color: black;
`

const PaddingContent = styled.div`
  padding: 10px;
`

const BackgroundEdit = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

const TitleItemCategoryTitleAction = styled.div`
  padding: 5px 10px;
  background-color: ${props => Colors(props.siteProps).secondColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  font-size: 1rem;
`

const ShopStoreContentAddCategory = ({
  handleClickContent,
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

        <CSSTransition
          in={clickAddCategory}
          timeout={400}
          classNames="popup"
          unmountOnExit
        >
          <BackgroundEdit onClick={handleClickContent}>
            <BackgroundEditContent onClick={handleClickContent}>
              <TitleItemCategoryTitleAction>
                Nowa kategoria
              </TitleItemCategoryTitleAction>
              <PaddingContent>
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
              </PaddingContent>
            </BackgroundEditContent>
          </BackgroundEdit>
        </CSSTransition>
      </AddCategory>
    </>
  )
}
export default ShopStoreContentAddCategory
