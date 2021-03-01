import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import {
  MdExpandMore,
  MdLibraryAdd,
  MdDeleteForever,
  MdEdit,
  MdTitle,
  MdArrowBack,
} from "react-icons/md"
import { Collapse } from "react-collapse"
import ButtonIcon from "../ButtonIcon"
import ShopStoreContentCategoryNewItem from "./ShopStoreContentCategoryNewItem"
import ShopStoreContentCategoryItem from "./ShopStoreContentCategoryItem"
import InputIcon from "../InputIcon"
import { sortItemsInArrayToString } from "../../common/Functions"
import Popup from "../Popup"

const TitleCategory = styled.div`
  position: relative;
  font-size: 1.25rem;
  cursor: pointer;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props =>
    props.isCompanyEditProfil
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).primaryColorDark};
  padding: 10px;
  border-radius: 5px;
  padding-right: ${props => (props.isCompanyEditProfil ? "190px" : "50px")};
  padding-bottom: ${props =>
    props.clickDelete
      ? "50px"
      : props.clickAdd
      ? "550px"
      : props.clickEdit
      ? "250px"
      : "10px"};
  margin-top: 10px;
  overflow: hidden;
  user-select: none;
  transition-property: padding-bottom, background-color, color;
  transition-duration: 0.5s;
  transition-timing-function: ease;
`

const IconArrowPosition = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 7px;
  padding-bottom: 0;
  font-size: 2rem;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  svg {
    transform: ${props =>
      props.collapseActive ? "rotate(-180deg)" : "rotate(0deg)"};
    transition-property: transform;
    transition-duration: 0.5s;
    transition-timing-function: ease;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const IconAddPosition = styled.div`
  position: absolute;
  top: 0;
  right: 46px;
  font-size: 2rem;
  padding: 7px;
  padding-bottom: 0;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const IconEditPosition = styled.div`
  position: absolute;
  top: 0;
  right: 92px;
  font-size: 2rem;
  padding: 7px;
  padding-bottom: 0;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const IconDeletePosition = styled.div`
  position: absolute;
  top: 0;
  right: 138px;
  font-size: 2rem;
  padding: 7px;
  padding-bottom: 0;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
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

const ButtonsDeletePosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const CheckboxStyle = styled.div`
  margin-bottom: 10px;

  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.siteProps).secondColor};
  }
`

const TextCheckbox = styled.span`
  position: relative;
  top: -7px;
  padding-left: 10px;
  font-family: "Poppins-Bold", sans-serif;
  user-select: none;
  font-size: 1rem;
`

const ButtonMarginSubmit = styled.button`
  margin: 5px;
  border: none;
  background-color: transparent;
`

const ShopStoreContentCategory = ({
  category,
  siteProps,
  isCompanyEditProfil,
  handleClickContent,
  setDeletedCategory,
  deletedCategory,
  setNewCategorys,
  newCategorys,
  editedCategory,
  setEditedCategory,
  allCompanyShopStore,
  setAllCompanyShopStore,
  editShopStore,
}) => {
  const [collapseActive, setCollapseActive] = useState(true)
  const [clickDelete, setClickDelete] = useState(false)
  const [clickAdd, setClickAdd] = useState(false)
  const [clickEdit, setClickEdit] = useState(false)
  const [categoryTitle, setCategoryTitle] = useState(category.category)

  useEffect(() => {
    setClickDelete(false)
    setClickAdd(false)
    setClickEdit(false)
  }, [allCompanyShopStore, editShopStore])

  const handleClickArrow = () => {
    setCollapseActive(prevState => !prevState)
  }

  const handleClickDelete = e => {
    e.stopPropagation()
    setClickDelete(prevState => !prevState)
  }

  const handleClickAdd = e => {
    e.stopPropagation()
    setClickAdd(prevState => !prevState)
  }

  const handleClickEdit = e => {
    e.stopPropagation()
    setClickEdit(prevState => !prevState)
  }

  const handleDeleteCategory = () => {
    //add to deleted
    const newNewCategorys = [...newCategorys]
    const isInNew = newNewCategorys.some(item => item._id === category._id)
    if (!isInNew) {
      const newDeletedCategory = [...deletedCategory, category._id]
      setDeletedCategory(newDeletedCategory)
    }

    //filter new
    const filterNewCategory = newNewCategorys.filter(
      item => item._id !== category._id
    )
    setNewCategorys(filterNewCategory)

    //filter edited
    const newEditedCategory = [...editedCategory]
    const filterEditedCategory = newEditedCategory.filter(
      item => item._id !== category._id
    )
    setEditedCategory(filterEditedCategory)

    //delete from all items
    const newAllCompanyShopStore = [...allCompanyShopStore]
    const filterAllCompanyShopStore = newAllCompanyShopStore.filter(
      item => item._id !== category._id
    )
    setAllCompanyShopStore(filterAllCompanyShopStore)
  }

  const handleChangeCategoryTitleInput = e => {
    setCategoryTitle(e.target.value)
  }

  const handleChangeCategoryTitle = e => {
    e.preventDefault()

    if (!(categoryTitle.length <= 2 || categoryTitle === category.category)) {
      const newNewCategorys = [...newCategorys]
      const newEditedCategory = [...editedCategory]
      const findIndexInNew = newNewCategorys.findIndex(
        item => item._id === category._id
      )
      if (findIndexInNew >= 0) {
        newNewCategorys[findIndexInNew].category = categoryTitle
      } else {
        //check in edited and add
        const findIndexInEdited = newEditedCategory.findIndex(
          item => item._id === category._id
        )
        if (findIndexInEdited >= 0) {
          newEditedCategory[findIndexInEdited].category = categoryTitle
        } else {
          //check in company items and add to edited
          if (findIndexInEdited < 0 && findIndexInNew < 0) {
            const findItemCategoryCompany = [...allCompanyShopStore].find(
              item => item._id === category._id
            )
            if (!!findItemCategoryCompany) {
              findItemCategoryCompany.category = categoryTitle
              newEditedCategory.push(findItemCategoryCompany)
            }
          }
        }
      }
      setNewCategorys(newNewCategorys)
      setEditedCategory(newEditedCategory)
      setClickEdit(false)
    }
  }

  const handleResetAddNewTitle = () => {
    setCategoryTitle(category.category)
    setClickEdit(false)
  }

  const handleDeleteCategoryItem = (categoryId, shopItemId) => {
    //in new
    const newNewCategorys = [...newCategorys]
    const newEditedCategory = [...editedCategory]
    const findIndexCategory = newNewCategorys.findIndex(
      item => item._id === categoryId
    )
    if (findIndexCategory >= 0) {
      const filteredItemsNewCategory = newNewCategorys[
        findIndexCategory
      ].items.filter(item => item._id !== shopItemId)
      newNewCategorys[findIndexCategory].items = filteredItemsNewCategory
      setNewCategorys(newNewCategorys)
    } else {
      //in edited
      const findIndexCategoryInEdited = newEditedCategory.findIndex(
        item => item._id === categoryId
      )
      if (findIndexCategoryInEdited >= 0) {
        const filteredItemsNewCategory = newEditedCategory[
          findIndexCategoryInEdited
        ].items.filter(item => item._id !== shopItemId)
        newEditedCategory[
          findIndexCategoryInEdited
        ].items = filteredItemsNewCategory
      } else {
        //add to edited
        const findItemCategoryCompany = [...allCompanyShopStore].find(
          item => item._id === category._id
        )
        if (!!findItemCategoryCompany) {
          const filteredItemsCategoryCompany = findItemCategoryCompany.items.filter(
            item => item._id !== shopItemId
          )
          findItemCategoryCompany.items = filteredItemsCategoryCompany
          newEditedCategory.push(findItemCategoryCompany)
        }
      }
      setEditedCategory(newEditedCategory)
    }
  }

  const handleSaveEditedProduct = (categoryId, newEditedItem) => {
    //in new
    const newNewCategorys = [...newCategorys]
    const newEditedCategory = [...editedCategory]
    const findIndexCategory = newNewCategorys.findIndex(
      item => item._id === categoryId
    )
    if (findIndexCategory >= 0) {
      const findItemCategoryPosition = newNewCategorys[
        findIndexCategory
      ].items.findIndex(item => item._id === newEditedItem._id)
      newNewCategorys[findIndexCategory].items[
        findItemCategoryPosition
      ] = newEditedItem
      setNewCategorys(newNewCategorys)
    } else {
      //in edited
      const findIndexCategoryInEdited = newEditedCategory.findIndex(
        item => item._id === categoryId
      )
      if (findIndexCategoryInEdited >= 0) {
        const findItemCategoryPositionEdited = newEditedCategory[
          findIndexCategoryInEdited
        ].items.findIndex(item => item._id === newEditedItem._id)
        newEditedCategory[findIndexCategoryInEdited].items[
          findItemCategoryPositionEdited
        ] = newEditedItem
      } else {
        //add to edited
        const findItemCategoryCompany = [...allCompanyShopStore].find(
          item => item._id === category._id
        )
        if (!!findItemCategoryCompany) {
          const findItemCategoryPositionCompany = findItemCategoryCompany.items.findIndex(
            item => item._id === newEditedItem._id
          )

          findItemCategoryCompany.items[
            findItemCategoryPositionCompany
          ] = newEditedItem
          newEditedCategory.push(findItemCategoryCompany)
        }
      }
      setEditedCategory(newEditedCategory)
    }
  }

  const sortedCategoryItems = sortItemsInArrayToString(category.items, "name")

  const itemsMap = sortedCategoryItems.map((shopItem, shopIndex) => {
    return (
      <ShopStoreContentCategoryItem
        shopItem={shopItem}
        key={shopIndex}
        index={shopIndex}
        siteProps={siteProps}
        ButtonMargin={ButtonMargin}
        isCompanyEditProfil={isCompanyEditProfil}
        handleClickContent={handleClickContent}
        ButtonsDeletePosition={ButtonsDeletePosition}
        handleDeleteCategoryItem={handleDeleteCategoryItem}
        categoryId={category._id}
        handleSaveEditedProduct={handleSaveEditedProduct}
        ButtonMarginSubmit={ButtonMarginSubmit}
        ButtonsAddPosition={ButtonsAddPosition}
        CheckboxStyle={CheckboxStyle}
        clickDeleteCategory={clickDelete}
      />
    )
  })

  return (
    <div
      data-sal={!isCompanyEditProfil && "zoom-in"}
      data-sal-duration={!isCompanyEditProfil && "1000"}
      data-sal-easing={!isCompanyEditProfil && "ease-out-bounce"}
    >
      <TitleCategory
        isCompanyEditProfil={isCompanyEditProfil}
        clickDelete={clickDelete}
        clickAdd={clickAdd}
        clickEdit={clickEdit}
        siteProps={siteProps}
        onClick={handleClickArrow}
      >
        {category.category}
        <IconArrowPosition collapseActive={collapseActive}>
          <MdExpandMore />
        </IconArrowPosition>
        {isCompanyEditProfil && (
          <>
            <IconDeletePosition
              onClick={e => handleClickDelete(e)}
              data-tip
              data-for="deleteCategory"
            >
              <MdDeleteForever />
            </IconDeletePosition>
            <IconEditPosition
              onClick={e => handleClickEdit(e)}
              data-tip
              data-for="editCategory"
            >
              <MdEdit />
            </IconEditPosition>
            <IconAddPosition
              onClick={e => handleClickAdd(e)}
              data-tip
              data-for="addItem"
            >
              <MdLibraryAdd />
            </IconAddPosition>

            <Popup
              popupEnable={clickDelete}
              position="absolute"
              borderRadius
              noContent
            >
              <ButtonsDeletePosition>
                <ButtonMargin>
                  <ButtonIcon
                    title="Anuluj"
                    uppercase
                    fontIconSize="40"
                    fontSize="14"
                    icon={<MdArrowBack />}
                    customColorButton={Colors(siteProps).successColorDark}
                    customColorIcon={Colors(siteProps).successColor}
                    onClick={handleClickDelete}
                  />
                </ButtonMargin>
                <ButtonMargin>
                  <ButtonIcon
                    title="Usuń"
                    uppercase
                    fontIconSize="40"
                    fontSize="14"
                    icon={<MdDeleteForever />}
                    customColorButton={Colors(siteProps).dangerColorDark}
                    customColorIcon={Colors(siteProps).dangerColor}
                    onClick={handleDeleteCategory}
                  />
                </ButtonMargin>
              </ButtonsDeletePosition>
            </Popup>

            <Popup
              popupEnable={clickEdit}
              position="absolute"
              title="Edycja kategorii"
              borderRadius
              closeTitle={false}
              smallTitle
              secondColors
            >
              <form onSubmit={handleChangeCategoryTitle}>
                <InputIcon
                  icon={<MdTitle />}
                  placeholder="Nazwa kategorii"
                  secondColor
                  value={categoryTitle}
                  type="text"
                  onChange={handleChangeCategoryTitleInput}
                  required
                  validText="Minimum 3 znaki"
                />
                <ButtonsAddPosition>
                  <ButtonMargin>
                    <ButtonIcon
                      title="Cofnij"
                      uppercase
                      fontIconSize="40"
                      fontSize="13"
                      icon={<MdArrowBack />}
                      onClick={handleResetAddNewTitle}
                      customColorButton={Colors(siteProps).dangerColorDark}
                      customColorIcon={Colors(siteProps).dangerColor}
                    />
                  </ButtonMargin>
                  <ButtonMarginSubmit type="submit">
                    <ButtonIcon
                      title="Zapisz"
                      uppercase
                      fontIconSize="20"
                      fontSize="13"
                      icon={<MdLibraryAdd />}
                      customColorButton={Colors(siteProps).successColorDark}
                      customColorIcon={Colors(siteProps).successColor}
                      disabled={
                        categoryTitle.length <= 2 ||
                        categoryTitle === category.category
                      }
                    />
                  </ButtonMarginSubmit>
                </ButtonsAddPosition>
              </form>
            </Popup>
            <ShopStoreContentCategoryNewItem
              clickAdd={clickAdd}
              handleClickContent={handleClickContent}
              ButtonsAddPosition={ButtonsAddPosition}
              CheckboxStyle={CheckboxStyle}
              TextCheckbox={TextCheckbox}
              ButtonMargin={ButtonMargin}
              siteProps={siteProps}
              ButtonMarginSubmit={ButtonMarginSubmit}
              setClickAdd={setClickAdd}
              category={category}
              newCategorys={newCategorys}
              editedCategory={editedCategory}
              allCompanyShopStore={allCompanyShopStore}
              setNewCategorys={setNewCategorys}
              setEditedCategory={setEditedCategory}
              setAllCompanyShopStore={setAllCompanyShopStore}
            />
          </>
        )}
      </TitleCategory>
      <Collapse isOpened={collapseActive}>
        <div>{itemsMap}</div>
      </Collapse>
    </div>
  )
}
export default ShopStoreContentCategory
