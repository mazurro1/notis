import React, { useState, useEffect } from "react"
import ButtonIcon from "../ButtonIcon"
import { MdEdit, MdSave, MdAddBox, MdTitle, MdArrowBack } from "react-icons/md"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import { FaArrowLeft } from "react-icons/fa"
import ReactTooltip from "react-tooltip"
import InputIcon from "../InputIcon"
import { CSSTransition } from "react-transition-group"
import ShopStoreContentCategory from "./ShopStoreContentCategory"

const PositionRelative = styled.div`
  position: relative;
  padding: 5px 10px;
  padding-bottom: 80px;
  margin-top: 60px;
  background-color: ${props =>
    props.active ? "rgba(0,0,0,0.85)" : "transparent"};
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: ${props =>
    props.active ? Colors(props.siteProps).secondColor : "transparent"};
  color: ${props =>
    props.active
      ? Colors(props.siteProps).textNormalWhite
      : Colors(props.siteProps).textNormalBlack};
  transition-property: background-color, color, border-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`
const TitleRightColumnOpinion = styled.h2`
  position: relative;
  display: inline-block;
  font-family: ${props => (props.adress ? "Poppins-Bold" : "Poppins-Regular")};
  word-wrap: break-word;
  font-size: 2rem;
  border-bottom: 2px solid
    ${props =>
      props.isCompanyEditProfil
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor};
`
const MarginButton = styled.div`
  margin-left: 5px;
`

const AddCategory = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).successColor};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: ${props => (props.clickAddCategory ? "150px" : "0px")};
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
  padding: 10px;
  border-radius: 5px;
  max-height: 90%;
  color: black;
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

const ShopStoreContent = ({
  ButtonEditPosition,
  handleResetAllEditedComponents,
  disabledEditButtons,
  editShopStore,
  setEditShopStore,
  siteProps,
  editMode,
  isCompanyEditProfil,
  companyShopStore = [],
}) => {
  const [clickAddCategory, setClickAddCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [allCompanyShopStore, setAllCompanyShopStore] = useState([])
  const [newCategorys, setNewCategorys] = useState([])

  useEffect(() => {
    console.log(editShopStore)
  }, [editShopStore])

  useEffect(() => {
    setAllCompanyShopStore(companyShopStore)
  }, [companyShopStore])

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [clickAddCategory])

  const handleClickEdit = () => {
    handleResetAllEditedComponents()
    setEditShopStore(true)
  }

  const handleReset = () => {
    handleResetAllEditedComponents()
  }

  const handleClickContent = e => {
    e.stopPropagation()
  }

  const handleClickAddCategory = () => {
    setClickAddCategory(prevState => !prevState)
  }

  const handleResetAddCategory = () => {
    setClickAddCategory(false)
    setNewCategoryName("")
  }

  const handleChangeNewCategory = e => {
    setNewCategoryName(e.target.value)
  }

  const handleAddNewCategory = () => {
    const newCategoryItem = [...allCompanyShopStore]
    const prevNewCategory = [...newCategorys]
    const randomNumber =
      Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111
    const newItem = {
      _id: randomNumber,
      category: newCategoryName,
      items: [],
    }
    newCategoryItem.push(newItem)
    prevNewCategory.push(newItem)
    setAllCompanyShopStore(newCategoryItem)
    setNewCategorys(prevNewCategory)
    setNewCategoryName("")
    setClickAddCategory(false)
  }

  const mapAllCategories = allCompanyShopStore.map(
    (category, indexCategory) => {
      return (
        <ShopStoreContentCategory
          category={category}
          siteProps={siteProps}
          key={indexCategory}
          isCompanyEditProfil={editShopStore}
        />
      )
    }
  )

  return (
    <PositionRelative active={editShopStore} siteProps={siteProps}>
      <div>
        <TitleRightColumnOpinion
          siteProps={siteProps}
          isCompanyEditProfil={editShopStore}
        >
          Stan sklepu
        </TitleRightColumnOpinion>
      </div>
      {mapAllCategories}
      {isCompanyEditProfil && editMode && editShopStore && (
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
                <InputIcon
                  icon={<MdTitle />}
                  placeholder="Nazwa kategorii"
                  secondColor
                  value={newCategoryName}
                  type="text"
                  onChange={handleChangeNewCategory}
                  required
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
              </BackgroundEditContent>
            </BackgroundEdit>
          </CSSTransition>
        </AddCategory>
      )}

      {editMode && isCompanyEditProfil && !editShopStore ? (
        <ButtonEditPosition>
          <div data-tip data-for="disabledButton">
            <ButtonIcon
              title="Edytuj sklep"
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
                title="Anuluj"
                uppercase
                fontIconSize="20"
                fontSize="14"
                icon={<FaArrowLeft />}
                onClick={handleReset}
                customColorButton={Colors(siteProps).dangerColorDark}
                customColorIcon={Colors(siteProps).dangerColor}
              />
            </MarginButton>
            <MarginButton>
              <ButtonIcon
                title="Zapisz"
                uppercase
                fontIconSize="25"
                fontSize="14"
                icon={<MdSave />}
                // onClick={handleClickEdit}
                customColorButton={Colors(siteProps).successColorDark}
                customColorIcon={Colors(siteProps).successColor}
              />
            </MarginButton>
          </ButtonEditPosition>
        )
      )}
      {!clickAddCategory && (
        <ReactTooltip
          id="addNewCategoryShopStore"
          effect="float"
          multiline={true}
        >
          <span>Dodaj nową kategorie</span>
        </ReactTooltip>
      )}
      <ReactTooltip id="addItem" effect="float" multiline={true}>
        <span>Dodaj podkategorie</span>
      </ReactTooltip>
      <ReactTooltip id="deleteCategory" effect="float" multiline={true}>
        <span>Usuń całą kategorię</span>
      </ReactTooltip>
      <ReactTooltip id="editCategory" effect="float" multiline={true}>
        <span>Edytuj nazwe kategorii</span>
      </ReactTooltip>
    </PositionRelative>
  )
}
export default ShopStoreContent
