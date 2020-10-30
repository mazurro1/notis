import React, { useState, useEffect } from "react"
import {
  getCategories,
  categoryItemsMenu,
  replacingEditedNamesAndAddingNewOnes,
  replacingEditedNamesAndAddingNewOnes2,
  compareTwoArray,
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
    if (!disabledAddCategoryButton) {
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
    const prevDeletedItemsFromServer = [...deletedItemsServices]

    let deletedCategoryFromServer = prevServices.filter(
      item => item.serviceCategory === category
    )
    deletedCategoryFromServer = deletedCategoryFromServer.map(item => {
      return {
        _id: item._id,
      }
    })

    deletedCategoryFromServer = deletedCategoryFromServer.filter(item => {
      const ifInDeletedItems = prevDeletedItemsFromServer.some(
        itemDeleted => itemDeleted._id === item._id
      )
      return !ifInDeletedItems
    })
    //check is in deleted items

    if (deletedCategoryFromServer.length > 0) {
      const allDeletedItems = [
        ...prevDeletedItemsFromServer,
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

    const newEditedItems = replacingEditedNamesAndAddingNewOnes2(
      services,
      editedItemsServices,
      oldCategoryTitle,
      newCategoryTitle,
      "serviceCategory"
    )

    if (!!newEditedItems) {
      const prevDeletedId = [...deletedItemsServices]
      const filterItems = newEditedItems.filter(item => {
        const isInDeleted = prevDeletedId.some(
          itemDeleted => itemDeleted._id === item._id
        )
        return !isInDeleted
      })

      setEditedItemsServices(filterItems)
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
    const prevEditedItemsServices = [...editedItemsServices]
    const prevServices = [...services]
    const newEditedItems = replacingEditedNamesAndAddingNewOnes2(
      prevServices,
      prevEditedItemsServices,
      oldCategory,
      oldCategory,
      "serviceCategory",
      newCategory
    )

    if (!!newEditedItems) {
      const compareResult = compareTwoArray(newEditedItems, prevServices)
      setEditedItemsServices(compareResult)
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

  const handleChangeSaveEdit = (
    itemId,
    title,
    content,
    time,
    extraTime,
    price,
    extraPrice,
    serviceCategory
  ) => {
    const prevEditedItems = [...editedItemsServices]
    const prevNewItems = [...newItemsServices]
    const findIndexInEdited = prevEditedItems.findIndex(
      item => item._id === itemId
    )

    const findIndexInNewItems = prevNewItems.findIndex(
      item => item._id === itemId
    )

    if (findIndexInNewItems >= 0) {
      //change in new items
      prevNewItems[findIndexInNewItems].serviceName = title
      prevNewItems[findIndexInNewItems].serviceText = content
      prevNewItems[findIndexInNewItems].serviceCost = price
      prevNewItems[findIndexInNewItems].time = time
      prevNewItems[findIndexInNewItems].extraCost = extraPrice
      prevNewItems[findIndexInNewItems].extraTime = extraTime
      setNewItemsServices(prevNewItems)
    } else {
      if (findIndexInEdited >= 0) {
        //change in edited items
        prevEditedItems[findIndexInEdited].serviceName = title
        prevEditedItems[findIndexInEdited].serviceText = content
        prevEditedItems[findIndexInEdited].serviceCost = price
        prevEditedItems[findIndexInEdited].time = time
        prevEditedItems[findIndexInEdited].extraCost = extraPrice
        prevEditedItems[findIndexInEdited].extraTime = extraTime
        setEditedItemsServices(prevEditedItems)
      } else {
        const newItem = {
          _id: itemId,
          serviceCategory: serviceCategory,
          serviceName: title,
          serviceText: content,
          serviceCost: price,
          time: time,
          extraCost: extraPrice,
          extraTime: extraTime,
        }
        prevEditedItems.push(newItem)
        setEditedItemsServices(prevEditedItems)
      }
    }

    //change in creator items
    // allCategoriesWithItems, setAllCategoriesWithItems
    const prevAllItems = [...allCategoriesWithItems]
    const itemCategoryIndex = prevAllItems.findIndex(
      item => item.oldCategory === serviceCategory
    )
    if (itemCategoryIndex >= 0) {
      const findIndexItemInCategory = prevAllItems[
        itemCategoryIndex
      ].items.findIndex(itemItems => itemItems._id === itemId)
      if (findIndexItemInCategory >= 0) {
        prevAllItems[itemCategoryIndex].items[
          findIndexItemInCategory
        ].extraCost = extraPrice
        prevAllItems[itemCategoryIndex].items[
          findIndexItemInCategory
        ].extraTime = extraTime
        prevAllItems[itemCategoryIndex].items[
          findIndexItemInCategory
        ].serviceCategory = serviceCategory
        prevAllItems[itemCategoryIndex].items[
          findIndexItemInCategory
        ].serviceCost = price
        prevAllItems[itemCategoryIndex].items[
          findIndexItemInCategory
        ].serviceName = title
        prevAllItems[itemCategoryIndex].items[
          findIndexItemInCategory
        ].serviceText = content
        prevAllItems[itemCategoryIndex].items[
          findIndexItemInCategory
        ].time = time

        setAllCategoriesWithItems(prevAllItems)
      }
    }
  }

  const handleDeleteServiceItem = (itemId, serviceCategory) => {
    //check in new
    const prevNewItems = [...newItemsServices]
    const isInNewItems = prevNewItems.some(item => item._id === itemId)
    if (isInNewItems) {
      const newNewItems = prevNewItems.filter(item => item._id !== itemId)
      setNewItemsServices(newNewItems)
    } else {
      //if in not in new add to deleted
      const prevDeletedItems = [...deletedItemsServices]
      const ifIsInDeleted = prevDeletedItems.some(item => item._id === itemId)
      if (!ifIsInDeleted) {
        const newItem = {
          _id: itemId,
        }
        prevDeletedItems.push(newItem)
        setDeletedItemsServices(prevDeletedItems)
      }
      //check in edited
      const prevEditedItems = [...editedItemsServices]
      const isInEditedItems = prevEditedItems.some(item => item._id === itemId)
      if (isInEditedItems) {
        const filterEditedItems = prevEditedItems.filter(
          item => item._id !== itemId
        )
        setEditedItemsServices(filterEditedItems)
      }
    }
    //delete from creator
    const prevAllCategoryWithItems = [...allCategoriesWithItems]
    let findIndexCategory = prevAllCategoryWithItems.findIndex(
      item => item.oldCategory === serviceCategory
    )
    if (findIndexCategory < 0) {
      findIndexCategory = prevAllCategoryWithItems.findIndex(
        item => item.category === serviceCategory
      )
    }

    if (findIndexCategory >= 0) {
      const filterItemsInAllCategory = prevAllCategoryWithItems[
        findIndexCategory
      ].items.filter(item => item._id !== itemId)
      prevAllCategoryWithItems[
        findIndexCategory
      ].items = filterItemsInAllCategory
      setAllCategoriesWithItems(prevAllCategoryWithItems)
    }
  }

  const handleResetItemToFromServer = (itemId, itemCategory) => {
    //take item from server and replace in creator and delete from edited
    const prevEditedItems = [...editedItemsServices]
    const prevServices = [...services]

    const isInEdited = prevEditedItems.some(item => item._id === itemId)
    if (isInEdited) {
      const prevEditedItemsInEdit = [...editedItemsServices]
      const selectedItemFromServerToEdit = prevServices.find(
        item => item._id === itemId
      )
      const indexEditedToFirstVersion = prevEditedItemsInEdit.findIndex(
        item => item._id === itemId
      )
      const prevEditedCategory = prevEditedItemsInEdit.find(
        item => item._id === itemId
      )
      selectedItemFromServerToEdit.serviceCategory =
        prevEditedCategory.serviceCategory
      prevEditedItemsInEdit[
        indexEditedToFirstVersion
      ] = selectedItemFromServerToEdit
      setEditedItemsServices(prevEditedItemsInEdit)
    }

    //take item from server
    const selectedItemFromServer = prevServices.find(
      item => item._id === itemId
    )
    if (!!selectedItemFromServer) {
      const prevAllCategoriesWithItems = [...allCategoriesWithItems]
      const findIndexCategory = prevAllCategoriesWithItems.findIndex(
        item => item.oldCategory === itemCategory
      )
      if (findIndexCategory >= 0) {
        const replaceItemIndex = prevAllCategoriesWithItems[
          findIndexCategory
        ].items.findIndex(item => item._id === itemId)

        if (replaceItemIndex >= 0) {
          prevAllCategoriesWithItems[findIndexCategory].items[
            replaceItemIndex
          ] = selectedItemFromServer
          setAllCategoriesWithItems(prevAllCategoriesWithItems)
        }
      }
    }

    // allCategoriesWithItems, setAllCategoriesWithItems
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
        handleChangeSaveEdit={handleChangeSaveEdit}
        handleDeleteServiceItem={handleDeleteServiceItem}
        handleResetItemToFromServer={handleResetItemToFromServer}
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
