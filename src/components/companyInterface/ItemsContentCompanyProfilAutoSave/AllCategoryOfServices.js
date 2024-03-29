/*eslint-disable eqeqeq*/
import React, { useState, useEffect } from "react"
import {
  getCategories,
  categoryItemsMenu,
  sortItemsInArray,
} from "@common/Functions"
import styled from "styled-components"
import { MdAddBox, MdTitle, MdArrowBack, MdEdit } from "react-icons/md"
import { FaSave } from "react-icons/fa"
import CategoryItem from "./CategoryItem"
import { ButtonIcon, Popup, InputIcon } from "@ui"
import sal from "sal.js"
import { Colors } from "@common/Colors"
import { fetchSaveCompanyServices } from "@state/actions"
import { useDispatch, useSelector } from "react-redux"
import ReactTooltip from "react-tooltip"
import { Element, scroller } from "react-scroll"

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

const ButtonsAddPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const ButtonsEditPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const BlockUserInfo = styled.div`
  text-align: center;
  margin-top: 20px;
  padding: 5px 10px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props => Colors(props.siteProps).dangerColor};
  border-radius: 5px;
`

const BackgroundEditedComponent = styled.div`
  background-color: ${props =>
    props.active ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0)"};
  padding: ${props => (props.active ? "10px" : "0px")};
  padding-top: 1px;
  margin-top: ${props => (props.active ? "10px" : "0px")};
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: ${props =>
    props.active ? Colors(props.siteProps).secondColor : "transparent"};
  opacity: ${props =>
    !props.active && props.disabledEditButtons ? "0.5" : "1"};

  transition-property: background-color, padding, margin-top, border-color,
    opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const MarginButtonLeft = styled.div`
  margin-left: 10px;
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

  color: ${props =>
    props.isCompanyEditProfil
      ? Colors(props.siteProps).textNormalWhite
      : Colors(props.siteProps).textNormalBlack};
`

const AllCategoryOfServices = ({
  isCompanyEditProfil,
  services = [],
  handleClickReserwation,
  companyId,
  userIsBlocked,
  userAccountNotVeryfied,
  userPhoneVeryfied,
  userEmailVeryfied,
  isWorkerBlocked,
  premiumActive,
  userCannotMakeReservation,
  user,
  allCategoryEdit,
  setAllCategoryEdit,
  handleResetAllEditedComponents,
  disabledEditButtons,
  editMode,
}) => {
  const [allCategoriesWithItems, setAllCategoriesWithItems] = useState([])
  const [newCategoryItems, setNewCategoryItems] = useState([])
  const [deletedCategoryItems, setDeletedCategoryItems] = useState([])
  const [editedCategoryItems, setEditedCategoryItems] = useState([])
  const [clickAddCategory, setClickAddCategory] = useState(false)
  const [newCategoryTitle, setNewCategoryTitle] = useState("")
  const siteProps = useSelector(state => state.siteProps)
  const resetCompany = useSelector(state => state.resetCompany)

  const dispatch = useDispatch()

  useEffect(() => {
    sal({
      threshold: 0.1,
      once: true,
    })
  }, [services, allCategoriesWithItems])

  useEffect(() => {
    if (resetCompany) {
      const categories = getCategories([...services], "serviceCategory")
      const items = categoryItemsMenu(categories, [...services])
      const sortedItems = sortItemsInArray([...items], "category")
      setAllCategoriesWithItems(sortedItems)
      //on update reset
      setAllCategoryEdit(false)
      setNewCategoryItems([])
      setDeletedCategoryItems([])
      setEditedCategoryItems([])
      setClickAddCategory(false)
      setNewCategoryTitle("")
    }
  }, [services, setAllCategoriesWithItems, resetCompany, setAllCategoryEdit])

  useEffect(() => {
    const categories = getCategories([...services], "serviceCategory")
    const items = categoryItemsMenu(categories, [...services])
    const sortedItems = sortItemsInArray([...items], "category")
    setAllCategoriesWithItems(sortedItems)
    setNewCategoryItems([])
    setDeletedCategoryItems([])
    setEditedCategoryItems([])
  }, [allCategoryEdit, editMode]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setAllCategoryEdit(false)
  }, [editMode]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickAddCategory = () => {
    setClickAddCategory(prevState => !prevState)
  }

  const handleAddCategory = e => {
    const lastIndexCategory =
      allCategoriesWithItems.length > 0
        ? allCategoriesWithItems[allCategoriesWithItems.length - 1].categoryId
        : -1

    const newCategoryItem = {
      category: newCategoryTitle,
      categoryId: lastIndexCategory + 1,
      items: [],
    }
    const newCategoriesWithNewCategory = [
      ...allCategoriesWithItems,
      newCategoryItem,
    ]
    setAllCategoriesWithItems(newCategoriesWithNewCategory)
    setClickAddCategory(false)
    setNewCategoryTitle("")
  }

  const handleAddItemInCategory = (
    category,
    title,
    content,
    time,
    extraTime,
    price,
    extraPrice,
    colorService,
    categoryId
  ) => {
    const findIndexCategory = allCategoriesWithItems.findIndex(
      category => category.categoryId === categoryId
    )
    if (findIndexCategory >= 0) {
      const randomNumber =
        Math.floor(Math.random() * (999999999 - 111111111 + 1)) + 111111111
      const newItemCategory = {
        extraCost: extraPrice,
        extraTime: extraTime,
        serviceCategory: category,
        serviceColor: colorService,
        serviceCost: price,
        serviceName: title,
        serviceText: content,
        categoryId: categoryId,
        time: time,
        _id: randomNumber.toString(),
      }
      const categoryWithNewItem = [...allCategoriesWithItems]
      categoryWithNewItem[findIndexCategory].items.push(newItemCategory)
      setAllCategoriesWithItems(categoryWithNewItem)
      const newItemInNewCategoryItems = [...newCategoryItems, newItemCategory]
      setNewCategoryItems(newItemInNewCategoryItems)
    }
  }

  const handleChangeNewCategory = e => {
    setNewCategoryTitle(e.target.value)
  }

  const handleDeleteAllCategory = categoryId => {
    const filterAllCategories = allCategoriesWithItems.filter(
      category => category.categoryId !== categoryId
    )
    const deletedCategories = allCategoriesWithItems.find(
      category => category.categoryId === categoryId
    )
    if (!!deletedCategories) {
      if (deletedCategories.items.length > 0) {
        const mapedDeletedServicesIds = deletedCategories.items.map(
          service => service._id
        )
        const filterInNewItems = newCategoryItems.filter(newItem => {
          const checkIsInNew = mapedDeletedServicesIds.some(deletedItem => {
            return deletedItem === newItem._id
          })
          return !checkIsInNew
        })
        const filterInEditedItems = editedCategoryItems.filter(editedItem => {
          const checkIsInEdited = mapedDeletedServicesIds.some(deletedItem => {
            return deletedItem === editedItem._id
          })
          return !checkIsInEdited
        })

        const allDeletedItems = [
          ...deletedCategoryItems,
          ...mapedDeletedServicesIds,
        ]
        setEditedCategoryItems(filterInEditedItems)
        setNewCategoryItems(filterInNewItems)
        setDeletedCategoryItems(allDeletedItems)
      }
    }
    setAllCategoriesWithItems(filterAllCategories)
  }

  const handleChangeNameCategory = (newCategoryTitle, categoryId) => {
    const allCategoriesToChangeName = [...allCategoriesWithItems]
    const findIndexCategory = allCategoriesToChangeName.findIndex(
      item => item.categoryId === categoryId
    )
    if (findIndexCategory >= 0) {
      const mapCategoryItem = allCategoriesToChangeName[
        findIndexCategory
      ].items.map(item => {
        const newItem = { ...item }
        newItem.serviceCategory = newCategoryTitle
        return newItem
      })
      allCategoriesToChangeName[findIndexCategory].category = newCategoryTitle
      allCategoriesToChangeName[findIndexCategory].items = mapCategoryItem

      const allNewItems = [...newCategoryItems]
      const allEditedItems = [...editedCategoryItems]

      mapCategoryItem.forEach(item => {
        const isInNewItemsIndex = allNewItems.findIndex(
          newItem => newItem._id === item._id
        )
        const isInEditedItemsIndex = allEditedItems.findIndex(
          newItem => newItem._id === item._id
        )

        if (isInNewItemsIndex >= 0 || isInEditedItemsIndex >= 0) {
          if (isInNewItemsIndex >= 0) {
            allNewItems[isInNewItemsIndex] = item
          }
          if (isInEditedItemsIndex >= 0) {
            allEditedItems[isInEditedItemsIndex] = item
          }
        } else {
          allEditedItems.push(item)
        }
      })

      setNewCategoryItems(allNewItems)
      setEditedCategoryItems(allEditedItems)
      setAllCategoriesWithItems(allCategoriesToChangeName)
    }
  }

  const handleChangeSaveEdit = (itemId, categoryId, newItem) => {
    const changeItemallCategoriesWithItems = [...allCategoriesWithItems]
    const findIndexCategory = changeItemallCategoriesWithItems.findIndex(
      item => item.categoryId === categoryId
    )
    if (findIndexCategory >= 0) {
      const findIndexEditedItemCategory = changeItemallCategoriesWithItems[
        findIndexCategory
      ].items.findIndex(item => item._id === itemId)
      if (findIndexEditedItemCategory >= 0) {
        changeItemallCategoriesWithItems[findIndexCategory].items[
          findIndexEditedItemCategory
        ] = newItem
      }
    }
    const allNewItems = [...newCategoryItems]
    const allEditedItems = [...editedCategoryItems]

    const isInNewItemsIndex = allNewItems.findIndex(
      newItem => newItem._id === itemId
    )
    const isInEditedItemsIndex = allEditedItems.findIndex(
      newItem => newItem._id === itemId
    )

    if (isInNewItemsIndex >= 0 || isInEditedItemsIndex >= 0) {
      if (isInNewItemsIndex >= 0) {
        allNewItems[isInNewItemsIndex] = newItem
      }
      if (isInEditedItemsIndex >= 0) {
        allEditedItems[isInEditedItemsIndex] = newItem
      }
    } else {
      allEditedItems.push(newItem)
    }

    setNewCategoryItems(allNewItems)
    setEditedCategoryItems(allEditedItems)
    setAllCategoriesWithItems(changeItemallCategoriesWithItems)
  }

  const handleDeleteServiceItem = (itemId, categoryId) => {
    const allCategoriesWithItemsDeleteService = [...allCategoriesWithItems]
    const findIndexCategory = allCategoriesWithItemsDeleteService.findIndex(
      item => item.categoryId === categoryId
    )
    if (findIndexCategory >= 0) {
      const otherServicesInCategory = allCategoriesWithItemsDeleteService[
        findIndexCategory
      ].items.filter(item => item._id !== itemId)
      allCategoriesWithItemsDeleteService[
        findIndexCategory
      ].items = otherServicesInCategory
      const filterNewCategoryItems = newCategoryItems.filter(
        item => item._id !== itemId
      )
      const filterEditedCategoryItems = editedCategoryItems.filter(
        item => item._id !== itemId
      )
      const newItemInDeleted = [...deletedCategoryItems, itemId]
      setNewCategoryItems(filterNewCategoryItems)
      setEditedCategoryItems(filterEditedCategoryItems)
      setDeletedCategoryItems(newItemInDeleted)
      setAllCategoriesWithItems(allCategoriesWithItemsDeleteService)
    }
  }

  const handleClickEditComponent = () => {
    handleResetAllEditedComponents()
    setAllCategoryEdit(prevState => !prevState)
    scroller.scrollTo("servicesScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
  }

  const handleReserAllCategoryOfServices = () => {
    setAllCategoryEdit(false)
    scroller.scrollTo("servicesScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })

    const categories = getCategories([...services], "serviceCategory")
    const items = categoryItemsMenu(categories, [...services])
    const sortedItems = sortItemsInArray([...items], "category")
    setAllCategoriesWithItems(sortedItems)
    setNewCategoryItems([])
    setDeletedCategoryItems([])
    setEditedCategoryItems([])
    setClickAddCategory(false)
    setNewCategoryTitle("")
  }

  const handleSaveAllServices = () => {
    const services = {
      deleted: deletedCategoryItems,
      edited: editedCategoryItems,
      new: newCategoryItems,
    }
    scroller.scrollTo("servicesScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    dispatch(fetchSaveCompanyServices(user.token, user.company._id, services))
  }

  const mapCategories = allCategoriesWithItems.map((item, index) => {
    return (
      <CategoryItem
        key={index}
        index={index}
        item={item}
        isCompanyEditProfil={allCategoryEdit}
        handleAddItemInCategory={handleAddItemInCategory}
        handleDeleteAllCategory={handleDeleteAllCategory}
        handleChangeNameCategory={handleChangeNameCategory}
        handleChangeSaveEdit={handleChangeSaveEdit}
        handleDeleteServiceItem={handleDeleteServiceItem}
        handleClickReserwation={handleClickReserwation}
        companyId={companyId}
        userIsBlocked={userIsBlocked}
        userAccountNotVeryfied={userAccountNotVeryfied}
        userPhoneVeryfied={userPhoneVeryfied}
        userEmailVeryfied={userEmailVeryfied}
        userCannotMakeReservation={userCannotMakeReservation}
        isWorkerBlocked={isWorkerBlocked}
        premiumActive={premiumActive}
      />
    )
  })

  // const isInCategory = allCategoriesWithItems.some(
  //   item => item.category.toLowerCase() === newCategoryTitle.toLowerCase()
  // )

  const disabledAddCategoryButton = newCategoryTitle.length <= 2
  // || isInCategory

  const isAnyChanges =
    newCategoryItems.length > 0 ||
    deletedCategoryItems.length > 0 ||
    editedCategoryItems.length > 0

  return (
    <Element
      name="servicesScrollElement"
      className="element"
      id="AllCategoryOfServices"
    >
      <BackgroundEditedComponent
        active={allCategoryEdit}
        siteProps={siteProps}
        disabledEditButtons={disabledEditButtons && premiumActive}
      >
        {!!userIsBlocked && (
          <BlockUserInfo>
            Twoje konto zostało zablokowane na tej stronie
          </BlockUserInfo>
        )}

        {(services.length > 0 || isCompanyEditProfil) && (
          <>
            <TitleRightColumnOpinion
              siteProps={siteProps}
              isCompanyEditProfil={allCategoryEdit}
            >
              Usługi
            </TitleRightColumnOpinion>

            {mapCategories}
          </>
        )}
        {allCategoryEdit && (
          <>
            <AddCategory
              data-tip
              data-for="addNewCategory"
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
                  value={newCategoryTitle}
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
                      fontIconSize="40"
                      fontSize="13"
                      icon={<MdArrowBack />}
                      onClick={handleClickAddCategory}
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
                      disabled={disabledAddCategoryButton}
                      onClick={handleAddCategory}
                      isFetchToBlock
                    />
                  </ButtonMargin>
                </ButtonsAddPosition>
              </Popup>
              {!clickAddCategory && (
                <ReactTooltip
                  id="addNewCategory"
                  effect="float"
                  multiline={true}
                >
                  <span>Dodaj nową kategorie</span>
                </ReactTooltip>
              )}
            </AddCategory>
            <ReactTooltip id="addItem" effect="float" multiline={true}>
              <span>Dodaj podkategorie</span>
            </ReactTooltip>
            <ReactTooltip id="deleteCategory" effect="float" multiline={true}>
              <span>Usuń całą kategorię</span>
            </ReactTooltip>
            <ReactTooltip id="editCategory" effect="float" multiline={true}>
              <span>Edytuj nazwe kategorii</span>
            </ReactTooltip>
          </>
        )}
        <ButtonsEditPosition>
          {!allCategoryEdit ? (
            isCompanyEditProfil && (
              <div data-tip data-for="disabledButton">
                <ButtonIcon
                  title="Edytuj usługi"
                  uppercase
                  fontIconSize="40"
                  fontSize="14"
                  icon={<MdEdit />}
                  onClick={handleClickEditComponent}
                  secondColors
                  disabled={disabledEditButtons}
                  data-tip
                  data-for="disabledButton"
                />
              </div>
            )
          ) : (
            <>
              <ButtonIcon
                title="Anuluj"
                uppercase
                fontIconSize="40"
                fontSize="14"
                icon={<MdArrowBack />}
                onClick={handleReserAllCategoryOfServices}
                customColorButton={Colors(siteProps).dangerColorDark}
                customColorIcon={Colors(siteProps).dangerColor}
              />
              <MarginButtonLeft>
                <ButtonIcon
                  title="Zapisz"
                  uppercase
                  fontIconSize="20"
                  fontSize="14"
                  icon={<FaSave />}
                  onClick={handleSaveAllServices}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                  disabled={!isAnyChanges}
                  isFetchToBlock
                />
              </MarginButtonLeft>
            </>
          )}
        </ButtonsEditPosition>
      </BackgroundEditedComponent>
    </Element>
  )
}
export default AllCategoryOfServices
