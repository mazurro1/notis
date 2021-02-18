import React, { useState, useEffect } from "react"
import ButtonIcon from "../ButtonIcon"
import { MdEdit, MdSave } from "react-icons/md"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import { FaArrowLeft } from "react-icons/fa"
import ReactTooltip from "react-tooltip"
import ShopStoreContentCategory from "./ShopStoreContentCategory"
import ShopStoreContentAddCategory from "./ShopStoreContentAddCategory"
import { useDispatch } from "react-redux"
import { fetchSaveShopStore } from "../../state/actions"

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
  user,
}) => {
  const [clickAddCategory, setClickAddCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [allCompanyShopStore, setAllCompanyShopStore] = useState([])
  const [newCategorys, setNewCategorys] = useState([])
  const [editedCategory, setEditedCategory] = useState([])
  const [deletedCategory, setDeletedCategory] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    setAllCompanyShopStore(companyShopStore)
    setNewCategorys([])
    setEditedCategory([])
    setDeletedCategory([])
  }, [companyShopStore])

  useEffect(() => {
    setClickAddCategory(false)
  }, [allCompanyShopStore, editShopStore])

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
    const randomNumber =
      Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111
    const newItem = {
      _id: randomNumber,
      category: newCategoryName,
      items: [],
    }
    const newCategoryItem = [...allCompanyShopStore, newItem]
    const prevNewCategory = [newItem, ...newCategorys]

    setAllCompanyShopStore(newCategoryItem)
    setNewCategorys(prevNewCategory)
    setNewCategoryName("")
    setClickAddCategory(false)
  }

  const handleSaveAllShopStore = () => {
    dispatch(
      fetchSaveShopStore(
        user.token,
        user.company._id,
        newCategorys,
        editedCategory,
        deletedCategory
      )
    )
  }

  const mapAllCategories = allCompanyShopStore.map(
    (category, indexCategory) => {
      return (
        <ShopStoreContentCategory
          category={category}
          siteProps={siteProps}
          key={indexCategory}
          isCompanyEditProfil={editShopStore}
          siteProps={siteProps}
          handleClickContent={handleClickContent}
          deletedCategory={deletedCategory}
          setDeletedCategory={setDeletedCategory}
          newCategorys={newCategorys}
          setNewCategorys={setNewCategorys}
          editedCategory={editedCategory}
          setEditedCategory={setEditedCategory}
          allCompanyShopStore={allCompanyShopStore}
          setAllCompanyShopStore={setAllCompanyShopStore}
          editShopStore={editShopStore}
        />
      )
    }
  )

  const disabledButtonSave =
    newCategorys.length > 0 ||
    editedCategory.length > 0 ||
    deletedCategory.length > 0

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
        <>
          <ShopStoreContentAddCategory
            handleClickContent={handleClickContent}
            handleChangeNewCategory={handleChangeNewCategory}
            handleAddNewCategory={handleAddNewCategory}
            handleResetAddCategory={handleResetAddCategory}
            handleClickAddCategory={handleClickAddCategory}
            clickAddCategory={clickAddCategory}
            newCategoryName={newCategoryName}
          />
          <ReactTooltip id="addItem" effect="float" multiline={true}>
            <span>Dodaj podkategorie</span>
          </ReactTooltip>
          <ReactTooltip id="deleteCategory" effect="float" multiline={true}>
            <span>Usuń całą kategorię</span>
          </ReactTooltip>
          <ReactTooltip id="editCategory" effect="float" multiline={true}>
            <span>Edytuj nazwe kategorii</span>
          </ReactTooltip>
          {!clickAddCategory && (
            <ReactTooltip
              id="addNewCategoryShopStore"
              effect="float"
              multiline={true}
            >
              <span>Dodaj nową kategorie</span>
            </ReactTooltip>
          )}
        </>
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
                onClick={handleSaveAllShopStore}
                customColorButton={Colors(siteProps).successColorDark}
                customColorIcon={Colors(siteProps).successColor}
                disabled={!disabledButtonSave}
              />
            </MarginButton>
          </ButtonEditPosition>
        )
      )}
    </PositionRelative>
  )
}
export default ShopStoreContent
