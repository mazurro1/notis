import React, { useState, useEffect } from "react"
import {
  MdSave,
  MdTitle,
  MdReorder,
  MdArrowBack,
  MdWidgets,
} from "react-icons/md"
import { FaDollarSign } from "react-icons/fa"
import ButtonIcon from "../ButtonIcon"
import { Checkbox } from "react-input-checkbox"
import InputIcon from "../InputIcon"
import { CSSTransition } from "react-transition-group"
import { Colors } from "../../common/Colors"
import styled from "styled-components"
import Popup from "../Popup"

const TextCheckbox = styled.span`
  position: relative;
  top: 0px;
  padding-left: 10px;
  font-family: "Poppins-Bold", sans-serif;
  user-select: none;
  font-size: 1rem;
`

const ShopStoreContentCategoryItemEdit = ({
  clickEdit,
  handleClickContent,
  shopItem,
  siteProps,
  setClickEdit,
  categoryId,
  handleSaveEditedProduct,
  ButtonMargin,
  ButtonMarginSubmit,
  ButtonsAddPosition,
  CheckboxStyle,
}) => {
  const [productTitle, setProductTitle] = useState("")
  const [productText, setProductText] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productCount, setProductCount] = useState("")
  const [productDisabled, setProductDisabled] = useState(false)

  useEffect(() => {
    if (!!shopItem) {
      setProductTitle(shopItem.name)
      setProductText(shopItem.description)
      setProductPrice(shopItem.price)
      setProductCount(shopItem.count)
      setProductDisabled(shopItem.disabled)
    }
  }, [shopItem])

  const handleChangeInput = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleClickDisabled = () => {
    setProductDisabled(prevState => !prevState)
  }

  const handleReset = () => {
    if (!!shopItem) {
      setProductTitle(shopItem.name)
      setProductText(shopItem.description)
      setProductPrice(shopItem.price)
      setProductCount(shopItem.count)
      setProductDisabled(shopItem.disabled)
    }
    setClickEdit(false)
  }

  const disabledSaveEditedIitem =
    (shopItem.name === productTitle &&
      shopItem.description === productText &&
      shopItem.price == productPrice &&
      shopItem.count == productCount &&
      shopItem.disabled === productDisabled) ||
    productTitle.length <= 2 ||
    productPrice.length === 0 ||
    productCount.length === 0

  const handleSaveEditItem = e => {
    e.preventDefault()
    if (!disabledSaveEditedIitem) {
      const dataEditedProduct = {
        _id: shopItem._id,
        name: productTitle,
        description: productText,
        price: productPrice,
        count: productCount,
        disabled: productDisabled,
      }
      handleSaveEditedProduct(categoryId, dataEditedProduct)
      setClickEdit(false)
    }
  }

  return (
    <Popup
      popupEnable={clickEdit}
      position="absolute"
      title="Edytuj przedmiot"
      borderRadius
      closeTitle={false}
      smallTitle
      secondColors
    >
      <form onSubmit={handleSaveEditItem}>
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
              fontSize="15"
              icon={<MdArrowBack />}
              onClick={handleReset}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
            />
          </ButtonMargin>
          <ButtonMarginSubmit type="submit">
            <ButtonIcon
              title="Zapisz"
              uppercase
              fontIconSize="20"
              fontSize="15"
              icon={<MdSave />}
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
export default ShopStoreContentCategoryItemEdit
