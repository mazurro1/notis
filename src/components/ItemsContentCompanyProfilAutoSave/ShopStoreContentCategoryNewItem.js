import React, { useState } from "react"
import { CSSTransition } from "react-transition-group"
import InputIcon from "../InputIcon"
import { Checkbox } from "react-input-checkbox"
import { Colors } from "../../common/Colors"
import ButtonIcon from "../ButtonIcon"
import { FaDollarSign } from "react-icons/fa"
import {
  MdLibraryAdd,
  MdTitle,
  MdReorder,
  MdArrowBack,
  MdWidgets,
} from "react-icons/md"
import Popup from "../Popup"

const ShopStoreContentCategoryNewItem = ({
  clickAdd,
  ButtonsAddPosition,
  CheckboxStyle,
  TextCheckbox,
  ButtonMargin,
  siteProps,
  ButtonMarginSubmit,
  setClickAdd,
  category,
  newCategorys,
  editedCategory,
  allCompanyShopStore,
  setNewCategorys,
  setEditedCategory,
  // setAllCompanyShopStore,
}) => {
  const [productTitle, setProductTitle] = useState("")
  const [productText, setProductText] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productCount, setProductCount] = useState("")
  const [productDisabled, setProductDisabled] = useState(false)

  const handleAddItemToCategory = itemData => {
    // const newAllCompanyShopStoreAddItem = [...allCompanyShopStore]
    const newNewCategorys = [...newCategorys]
    const newEditedCategory = [...editedCategory]
    // const newAllCompanyShopStoreAddItem = [...allCompanyShopStore]

    //add to company items
    /*const findSelectedCompanyItem = allCompanyShopStore.find(
      item => item._id === category._id
    )
    const filterOtherCompanyItem = allCompanyShopStore.filter(
      item => item._id !== category._id
    )
    if (!!findSelectedCompanyItem) {
      const allNewItems = [...findSelectedCompanyItem.items, itemData]
      findSelectedCompanyItem.items = allNewItems
      const allItemsCompany = [
        ...filterOtherCompanyItem,
        findSelectedCompanyItem,
      ]
      setAllCompanyShopStore(allItemsCompany)
    }
    */
    //check in new and add
    const findIndexInNew = newNewCategorys.findIndex(
      item => item._id === category._id
    )
    if (findIndexInNew >= 0) {
      newNewCategorys[findIndexInNew].items.push(itemData)
    } else {
      //check in edited and add
      const findIndexInEdited = newEditedCategory.findIndex(
        item => item._id === category._id
      )
      if (findIndexInEdited >= 0) {
        newEditedCategory[findIndexInEdited].items.push(itemData)
      } else {
        //check in company items and add to edited
        if (findIndexInEdited < 0 && findIndexInNew < 0) {
          const findItemCategoryCompany = [...allCompanyShopStore].find(
            item => item._id === category._id
          )
          if (!!findItemCategoryCompany) {
            findItemCategoryCompany.items.push(itemData)
            newEditedCategory.push(findItemCategoryCompany)
          }
        }
      }
    }
    setNewCategorys(newNewCategorys)
    setEditedCategory(newEditedCategory)
    // setAllCompanyShopStore(newAllCompanyShopStoreAddItem)
  }

  const disabledSaveEditedIitem =
    productTitle.length <= 2 ||
    productPrice.length === 0 ||
    productCount.length === 0

  const handleAddItem = e => {
    e.preventDefault()
    if (!disabledSaveEditedIitem) {
      const randomNumber =
        Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111
      const dataProduct = {
        _id: randomNumber,
        name: productTitle,
        description: productText,
        price: productPrice,
        count: productCount,
        disabled: productDisabled,
      }
      handleAddItemToCategory(dataProduct)
      setProductTitle("")
      setProductText("")
      setProductPrice("")
      setProductCount("")
      setProductDisabled(false)
      setClickAdd(false)
    }
  }

  const handleClickDisabled = () => {
    setProductDisabled(prevState => !prevState)
  }

  const handleChangeInput = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleReset = () => {
    setProductTitle("")
    setProductText("")
    setProductPrice("")
    setProductCount("")
    setProductDisabled(false)
    setClickAdd(false)
  }

  return (
    <Popup
      popupEnable={clickAdd}
      position="absolute"
      title="Nowy przedmiot"
      borderRadius
      closeTitle={false}
      smallTitle
      secondColors
    >
      <form onSubmit={handleAddItem}>
        <InputIcon
          icon={<MdTitle />}
          placeholder="Nazwa"
          secondColor
          value={productTitle}
          type="text"
          onChange={e => handleChangeInput(e, setProductTitle)}
          required
          validText="Minimum 3 znaki"
        />
        <InputIcon
          icon={<MdReorder />}
          placeholder="Opis"
          secondColor
          value={productText}
          type="text"
          onChange={e => handleChangeInput(e, setProductText)}
        />
        <InputIcon
          icon={<FaDollarSign />}
          placeholder="Cena"
          secondColor
          value={productPrice}
          type="number"
          onChange={e => handleChangeInput(e, setProductPrice)}
          required
          validText="Wymagana wartość"
        />
        <InputIcon
          icon={<MdWidgets />}
          placeholder="Ilość sztuk"
          secondColor
          value={productCount}
          type="number"
          onChange={e => handleChangeInput(e, setProductCount)}
          required
          validText="Wymagana wartość"
        />
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={productDisabled}
            onChange={handleClickDisabled}
          >
            <TextCheckbox>Produkt niedostępny</TextCheckbox>
          </Checkbox>
        </CheckboxStyle>

        <ButtonsAddPosition>
          <ButtonMargin>
            <ButtonIcon
              title="Anuluj"
              uppercase
              fontIconSize="40"
              fontSize="13"
              icon={<MdArrowBack />}
              onClick={handleReset}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
            />
          </ButtonMargin>
          <ButtonMarginSubmit type="submit">
            <ButtonIcon
              title="Dodaj"
              uppercase
              fontIconSize="20"
              fontSize="13"
              icon={<MdLibraryAdd />}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              disabled={disabledSaveEditedIitem}
            />
          </ButtonMarginSubmit>
        </ButtonsAddPosition>
      </form>
    </Popup>
  )
}
export default ShopStoreContentCategoryNewItem
