import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import ButtonIcon from "../ButtonIcon"
import { MdEdit, MdArrowBack, MdDeleteForever, MdDelete } from "react-icons/md"
import ShopStoreContentCategoryItemEdit from "./ShopStoreContentCategoryItemEdit"
import Popup from "../Popup"

const ServiceItem = styled.div`
  position: relative;
  background-color: ${props =>
    props.clickDelete
      ? "#ffebee"
      : props.active
      ? Colors(props.siteProps).primaryColorLight
      : Colors(props.siteProps).companyItemBackground};
  padding: 10px;
  border-radius: 5px;
  border-top-left-radius: ${props => (props.index ? "0px" : "5px")};
  border-top-right-radius: ${props => (props.index ? "0px" : "5px")};
  margin: 5px 5px;
  margin-top: ${props => (props.index ? "0px" : "5px")};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  user-select: none;
  overflow: hidden;
  padding-bottom: ${props => (props.clickEdit ? "500px" : "auto")};
  color: ${props => Colors(props.siteProps).textNormalBlack};
  transition-property: background-color, padding-bottom, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  @media all and (max-width: 990px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

const TitleService = styled.div`
  font-family: "Poppins-Bold", sans-serif;
  font-size: 1.1rem;
`

const ServiceParagraph = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
  margin-top: 10px;
`

const LeftContent = styled.div`
  max-width: 100%;
`

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media all and (max-width: 990px) {
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
    width: 100%;
  }
`

const PriceService = styled.div`
  display: inline-block;
  background-color: red;
  font-size: 0.8rem;
  padding: 2px 5px;
  font-family: "Poppins-Regular", sans-serif;
  color: white;
  margin-left: 10px;
  border-radius: 5px;
  background-color: ${props =>
    props.isCompanyEditProfil
      ? props.otherColor
        ? Colors(props.siteProps).darkColor
        : Colors(props.siteProps).secondDarkColor
      : props.otherColor
      ? Colors(props.siteProps).darkColor
      : Colors(props.siteProps).primaryColorDark};

  color: ${props => Colors(props.siteProps).textNormalWhite};
  transition-property: color, background-color;
  transition-duration: 0.3s;
  transition-timing-function: inline;

  @media all and (max-width: 990px) {
    margin-left: 0px;
    margin-right: 10px;
  }
`

const WrapPrices = styled.div`
  position: relative;
  display: inline-block;
  top: -2px;

  @media all and (max-width: 990px) {
    display: block;
  }
`

const ProductEnable = styled.div`
  font-family: "Poppins-Bold", sans-serif;
  color: ${props =>
    props.active
      ? Colors(props.siteProps).successColor
      : Colors(props.siteProps).dangerColor};
  font-size: 1rem;
  text-transform: uppercase;
  margin-bottom: 5px;
`

const ShopStoreContentCategoryItem = ({
  shopItem,
  index,
  siteProps,
  ButtonMargin,
  isCompanyEditProfil,
  handleClickContent,
  BackgroundEdit,
  BackgroundEditContent,
  ButtonsDeletePosition,
  handleDeleteCategoryItem,
  categoryId,
  handleSaveEditedProduct,
  PaddingContent,
  ButtonMarginSubmit,
  ButtonsAddPosition,
  CheckboxStyle,
  TitleItemCategoryTitleAction,
  clickDeleteCategory,
}) => {
  const [clickDelete, setClickDelete] = useState(false)
  const [clickEdit, setClickEdit] = useState(false)

  useEffect(() => {
    setClickEdit(false)
    setClickDelete(false)
  }, [])

  const handleClickEdit = () => {
    setClickEdit(prevState => !prevState)
  }

  const handleClickDelete = () => {
    setClickDelete(prevState => !prevState)
  }

  const handleConfirmDeleteItem = () => {
    handleDeleteCategoryItem(categoryId, shopItem._id)
    setClickEdit(false)
    setClickDelete(false)
  }

  return (
    <ServiceItem
      index={index === 0}
      clickDelete={clickDelete || clickDeleteCategory}
      clickEdit={clickEdit}
      siteProps={siteProps}
    >
      <LeftContent>
        {shopItem.disabled && (
          <ProductEnable active={!shopItem.disabled} siteProps={siteProps}>
            {!shopItem.disabled ? "" : "Produkt niedostępny"}
          </ProductEnable>
        )}
        <TitleService>
          {shopItem.name}
          <WrapPrices>
            <PriceService
              isCompanyEditProfil={isCompanyEditProfil}
              siteProps={siteProps}
            >
              {`${shopItem.price}zł`}
            </PriceService>
            <PriceService
              isCompanyEditProfil={isCompanyEditProfil}
              otherColor
              siteProps={siteProps}
            >
              {`Ilość: ${shopItem.count}`}
            </PriceService>
          </WrapPrices>
        </TitleService>
        <ServiceParagraph>{shopItem.description}</ServiceParagraph>
      </LeftContent>
      <RightContent>
        {isCompanyEditProfil && (
          <>
            <ButtonMargin>
              <ButtonIcon
                title="Edytuj"
                uppercase
                fontIconSize="40"
                fontSize="14"
                icon={<MdEdit />}
                secondColors
                onClick={handleClickEdit}
              />
            </ButtonMargin>
            <ButtonMargin>
              <ButtonIcon
                title="Usuń"
                uppercase
                fontIconSize="40"
                fontSize="14"
                icon={<MdDelete />}
                customColorButton={Colors(siteProps).dangerColorDark}
                customColorIcon={Colors(siteProps).dangerColor}
                onClick={handleClickDelete}
              />
            </ButtonMargin>
          </>
        )}
      </RightContent>
      <ShopStoreContentCategoryItemEdit
        clickEdit={clickEdit}
        handleClickContent={handleClickContent}
        shopItem={shopItem}
        siteProps={siteProps}
        setClickEdit={setClickEdit}
        categoryId={categoryId}
        handleSaveEditedProduct={handleSaveEditedProduct}
        BackgroundEdit={BackgroundEdit}
        BackgroundEditContent={BackgroundEditContent}
        PaddingContent={PaddingContent}
        ButtonMargin={ButtonMargin}
        ButtonMarginSubmit={ButtonMarginSubmit}
        ButtonsAddPosition={ButtonsAddPosition}
        CheckboxStyle={CheckboxStyle}
        TitleItemCategoryTitleAction={TitleItemCategoryTitleAction}
      />
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
              onClick={handleConfirmDeleteItem}
            />
          </ButtonMargin>
        </ButtonsDeletePosition>
      </Popup>
    </ServiceItem>
  )
}
export default ShopStoreContentCategoryItem
