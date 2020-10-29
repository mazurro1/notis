import React, { useState, useEffect } from "react"
import {
  getCategories,
  categoryItemsMenu,
  replacingEditedNamesAndAddingNewOnes,
} from "../../common/Functions"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import { MdAddBox, MdTitle, MdArrowBack } from "react-icons/md"
import CategoryItem from "./CategoryItem"
import ReactTooltip from "react-tooltip"
import ButtonIcon from "../ButtonIcon"
import InputIcon from "../InputIcon"
import { CSSTransition } from "react-transition-group"
import sal from "sal.js"

const AddCategory = styled.div`
  position: relative;
  background-color: #43a047;
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
    background-color: #2e7d32;
  }
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

const BackgroundEditContent = styled.div`
  width: 90%;
  background-color: ${props => (props.transparent ? "transparent" : "white")};
  padding: 10px;
  border-radius: 5px;
  max-height: 90%;
  color: black;
`

const IconAddCategory = styled.div`
  padding: 10px;
  padding-bottom: 0px;
  color: white;
  font-size: 2rem;
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

const ButtonMarginSubmit = styled.button`
  margin: 5px;
  border: none;
  background-color: transparent;
`

const AllCategoryOfServices = ({
  isCompanyEditProfil,
  services = [],
  newItemsServices,
  setNewItemsServices,
  editedItemsServices,
  setEditedItemsServices,
  deletedItemsServices,
  setDeletedItemsServices,
}) => {
  const [allCategoriesWithItems, setAllCategoriesWithItems] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [isFirstRender, setIsFirstRender] = useState(true)

  const [clickAddCategory, setClickAddCategory] = useState(false)
  const [newCategoryTitle, setNewCategoryTitle] = useState("")

  useEffect(() => {
    sal({
      threshold: 0.1,
      once: true,
    })
  }, [services, allCategoriesWithItems])

  useEffect(() => {
    if (isFirstRender) {
      const categories = getCategories(services, "serviceCategory")
      const items = categoryItemsMenu(categories, services)
      setAllCategoriesWithItems(items)
      setAllCategories(categories)
      setIsFirstRender(false)
    }
  }, [
    services,
    setAllCategoriesWithItems,
    setAllCategories,
    isFirstRender,
    setIsFirstRender,
  ])

  const handleClickContent = e => {
    e.stopPropagation()
  }

  const handleClickAddCategory = () => {
    setClickAddCategory(prevState => !prevState)
  }

  const handleAddCategory = e => {
    e.preventDefault()
    const prevAllCategoriesWithItems = [...allCategoriesWithItems]
    const newItem = {
      oldCategory: newCategoryTitle,
      category: newCategoryTitle,
      items: [],
    }
    prevAllCategoriesWithItems.push(newItem)
    const prevAllCategories = [...allCategories, newCategoryTitle]
    setAllCategories(prevAllCategories)
    setAllCategoriesWithItems(prevAllCategoriesWithItems)
    setNewCategoryTitle("")
    setClickAddCategory(false)
  }

  const handleAddItemInCategory = (
    category,
    title,
    content,
    time,
    extraTime,
    price,
    extraPrice
  ) => {
    const randomNumber =
      Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111
    const newItemCategory = {
      _id: `${randomNumber}`,
      serviceCategory: category,
      serviceName: title,
      serviceText: content,
      serviceCost: price,
      time: time,
      extraCost: extraPrice,
      extraTime: extraTime,
    }
    const prevAllCategoriesWithItems = [...allCategoriesWithItems]

    const indexFilterCategory = prevAllCategoriesWithItems.findIndex(
      item => item.category === category
    )

    const filterCategory = prevAllCategoriesWithItems.filter(
      item => item.category === category
    )

    if (filterCategory.length > 0 && indexFilterCategory >= 0) {
      filterCategory[0].items.push(newItemCategory)
      prevAllCategoriesWithItems[indexFilterCategory] = filterCategory[0]
      setAllCategoriesWithItems(prevAllCategoriesWithItems)
    }

    const prevNewItemsServices = [...newItemsServices]
    prevNewItemsServices.push(newItemCategory)
    setNewItemsServices(prevNewItemsServices)
  }

  const handleChangeNewCategory = e => {
    setNewCategoryTitle(e.target.value)
  }

  const handleDeleteAllCategory = (category, actualCategory) => {
    //deleted from server
    const prevServices = [...services]
    const deletedCategoryFromServer = prevServices.filter(
      item => item.serviceCategory === category
    )
    if (deletedCategoryFromServer.length > 0) {
      const allDeletedItems = [
        ...deletedItemsServices,
        ...deletedCategoryFromServer,
      ]
      setDeletedItemsServices(allDeletedItems)
    }

    //deleted from new
    const prevNewServices = [...newItemsServices]
    const deletedNewCategory = prevNewServices.filter(
      item => item.serviceCategory !== actualCategory
    )
    setNewItemsServices(deletedNewCategory)

    //deleted from all items creator
    const prevAllCategoriesWithItemsToDelete = [...allCategoriesWithItems]
    const deletedCreatorCategory = prevAllCategoriesWithItemsToDelete.filter(
      item => item.oldCategory !== category
    )
    setAllCategoriesWithItems(deletedCreatorCategory)

    //delete from category creator
    const prevAllCategoriesToDelete = [...allCategories]
    const deletedOnlyCategory = prevAllCategoriesToDelete.filter(
      item => item !== category
    )
    setAllCategories(deletedOnlyCategory)

    //delete from edited
    const prevEditedItemsServices = [...editedItemsServices]
    const deleteFromEdited = prevEditedItemsServices.filter(
      item => item.serviceCategory !== actualCategory
    )
    setEditedItemsServices(deleteFromEdited)
  }

  const handleChangeNameCategory = (
    newCategoryTitle,
    oldCategoryTitle,
    oldChangedCategory
  ) => {
    //name from creator category
    const prevAllCategories = [...allCategories]
    const indexFilterCategory = prevAllCategories.findIndex(
      item => item.toLowerCase() === oldChangedCategory.toLowerCase()
    )
    if (indexFilterCategory >= 0) {
      prevAllCategories[indexFilterCategory] = newCategoryTitle
      setAllCategories(prevAllCategories)
    }

    //name from creator all items
    const prevAllAllItemsCategories = [...allCategoriesWithItems]
    const indexFilterAllItemsCategory = prevAllAllItemsCategories.findIndex(
      item => item.category.toLowerCase() === oldChangedCategory.toLowerCase()
    )
    if (indexFilterAllItemsCategory >= 0) {
      prevAllAllItemsCategories[
        indexFilterAllItemsCategory
      ].category = newCategoryTitle
      setAllCategoriesWithItems(prevAllAllItemsCategories)
    }

    const newEditedItems = replacingEditedNamesAndAddingNewOnes(
      services,
      editedItemsServices,
      oldCategoryTitle,
      newCategoryTitle,
      "serviceCategory"
    )
    if (!!newEditedItems) {
      setEditedItemsServices(newEditedItems)
    }

    //name from new services
    const newNewItems = replacingEditedNamesAndAddingNewOnes(
      newItemsServices,
      newItemsServices,
      oldChangedCategory,
      newCategoryTitle,
      "serviceCategory"
    )

    if (!!newNewItems) {
      setNewItemsServices(newNewItems)
    }
  }

  const handleResetCategoryName = (oldCategory, newCategory, prevCategory) => {
    //reset edited items
    const newEditedItems = replacingEditedNamesAndAddingNewOnes(
      services,
      editedItemsServices,
      oldCategory,
      oldCategory,
      "serviceCategory"
    )
    if (!!newEditedItems) {
      setEditedItemsServices(newEditedItems)
    }

    //reset new items
    const newNewItems = replacingEditedNamesAndAddingNewOnes(
      newItemsServices,
      newItemsServices,
      prevCategory,
      oldCategory,
      "serviceCategory"
    )

    if (!!newNewItems) {
      setNewItemsServices(newNewItems)
    }

    //name from creator category
    const prevAllCategories = [...allCategories]
    const indexFilterCategory = prevAllCategories.findIndex(
      item => item.toLowerCase() === prevCategory.toLowerCase()
    )
    if (indexFilterCategory >= 0) {
      prevAllCategories[indexFilterCategory] = oldCategory
      setAllCategories(prevAllCategories)
    }

    //name from creator all items
    const prevAllAllItemsCategories = [...allCategoriesWithItems]
    const indexFilterAllItemsCategory = prevAllAllItemsCategories.findIndex(
      item => item.category.toLowerCase() === prevCategory.toLowerCase()
    )
    if (indexFilterAllItemsCategory >= 0) {
      prevAllAllItemsCategories[
        indexFilterAllItemsCategory
      ].category = oldCategory
      setAllCategoriesWithItems(prevAllAllItemsCategories)
    }
  }

  const mapCategories = allCategoriesWithItems.map((item, index) => {
    return (
      <CategoryItem
        key={index}
        index={index}
        item={item}
        isCompanyEditProfil={isCompanyEditProfil}
        handleAddItemInCategory={handleAddItemInCategory}
        handleDeleteAllCategory={handleDeleteAllCategory}
        handleChangeNameCategory={handleChangeNameCategory}
        handleResetCategoryName={handleResetCategoryName}
      />
    )
  })

  const isInCategory = allCategories.some(
    item => item.toLowerCase() === newCategoryTitle.toLowerCase()
  )

  const disabledAddCategoryButton = newCategoryTitle.length <= 3 || isInCategory

  return (
    <div>
      {mapCategories}
      {isCompanyEditProfil && (
        <>
          <AddCategory
            data-tip
            data-for="addNewCategory"
            onClick={handleClickAddCategory}
            clickAddCategory={clickAddCategory}
          >
            <IconAddCategory>
              <MdAddBox />
            </IconAddCategory>

            <CSSTransition
              in={clickAddCategory}
              timeout={400}
              classNames="popup"
              unmountOnExit
            >
              <BackgroundEdit>
                <BackgroundEditContent onClick={handleClickContent}>
                  <form onSubmit={handleAddCategory}>
                    <InputIcon
                      icon={<MdTitle />}
                      placeholder="Nazwa kategorii"
                      secondColor
                      value={newCategoryTitle}
                      type="text"
                      onChange={handleChangeNewCategory}
                      required
                    />
                    <ButtonsAddPosition>
                      <ButtonMargin>
                        <ButtonIcon
                          title="Anuluj"
                          uppercase
                          fontIconSize="40"
                          fontSize="13"
                          icon={<MdArrowBack />}
                          onClick={handleClickAddCategory}
                          customColorButton="#c62828"
                          customColorIcon="#f44336"
                        />
                      </ButtonMargin>
                      <ButtonMarginSubmit type="submit">
                        <ButtonIcon
                          title="Dodaj"
                          uppercase
                          fontIconSize="20"
                          fontSize="15"
                          icon={<MdAddBox />}
                          customColorButton="#2e7d32"
                          customColorIcon="#43a047"
                          disabled={disabledAddCategoryButton}
                        />
                      </ButtonMarginSubmit>
                    </ButtonsAddPosition>
                  </form>
                </BackgroundEditContent>
              </BackgroundEdit>
            </CSSTransition>
            {!clickAddCategory && (
              <ReactTooltip id="addNewCategory" effect="float" multiline={true}>
                <span>Dodaj nową kategorie</span>
              </ReactTooltip>
            )}
          </AddCategory>
        </>
      )}
    </div>
  )
}
export default AllCategoryOfServices
