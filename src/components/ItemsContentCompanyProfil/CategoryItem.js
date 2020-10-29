import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import {
  MdExpandMore,
  MdLibraryAdd,
  MdDeleteForever,
  MdEdit,
  MdTitle,
  MdReorder,
  MdAccessTime,
  MdArrowBack,
} from "react-icons/md"
import { FaDollarSign } from "react-icons/fa"
import ReactTooltip from "react-tooltip"
import ServicesItem from "./ServicesItem"
import { Collapse } from "react-collapse"
import { CSSTransition } from "react-transition-group"
import ButtonIcon from "../ButtonIcon"
import InputIcon from "../InputIcon"
import { Checkbox } from "react-input-checkbox"

const TextCheckbox = styled.span`
  position: relative;
  top: -7px;
  padding-left: 10px;
  font-weight: 600;
  user-select: none;
  font-size: 1rem;
`

const CategoryItemStyle = styled.div`
  margin-top: 20px;
  margin-bottom: ${props => `-${props.paddingCategory}px`};
`

const CheckboxStyle = styled.div`
  margin-bottom: 10px;

  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${Colors.secondColor};
  }
`

const TitleCategory = styled.div`
  position: relative;
  font-size: 1.25rem;
  color: white;
  background-color: ${props =>
    props.isCompanyEditProfil ? Colors.secondColor : Colors.buttonIconColor};
  padding: 10px;
  border-radius: 5px;
  padding-right: ${props => (props.isCompanyEditProfil ? "190px" : "50px")};
  padding-bottom: ${props =>
    props.clickDelete
      ? "50px"
      : props.clickAdd
      ? "500px"
      : props.clickEdit
      ? "150px"
      : "10px"};
  overflow: hidden;
  user-select: none;
  transition-property: padding-bottom;
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

const ButtonsDeletePosition = styled.div`
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

const ButtonMarginSubmit = styled.button`
  margin: 5px;
  border: none;
  background-color: transparent;
`

const CategoryItem = ({
  item,
  isCompanyEditProfil,
  index,
  handleAddItemInCategory,
  handleDeleteAllCategory,
  handleChangeNameCategory,
  handleResetCategoryName,
}) => {
  const [collapseActive, setCollapseActive] = useState(true)
  const [clickDelete, setClickDelete] = useState(false)
  const [clickAdd, setClickAdd] = useState(false)
  const [clickEdit, setClickEdit] = useState(false)
  const [extraPrice, setExtraPrice] = useState(false)
  const [extraTime, setExtraTime] = useState(false)
  const [titleInput, setInputTitle] = useState("")
  const [contentInput, setContentInput] = useState("")
  const [timeInput, setTimeInput] = useState("")
  const [priceInput, setPriceInput] = useState("")
  const [categoryTitle, setCategoryTitle] = useState("")

  useEffect(() => {
    setCategoryTitle(item.category)
  }, [index, item])

  const handleClickArrow = () => {
    setCollapseActive(prevState => !prevState)
  }

  const handleClickDelete = () => {
    setClickDelete(prevState => !prevState)
  }

  const handleClickAdd = () => {
    setClickAdd(prevState => !prevState)
  }

  const handleEditCategory = () => {
    setClickEdit(prevState => !prevState)
  }

  const handleClickContent = e => {
    e.stopPropagation()
  }

  const handleChangeInput = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleDeleteCategory = () => {
    setClickDelete(false)
    handleDeleteAllCategory(item.oldCategory, item.category)
  }

  const handleOnChangeCheckbox = setChange => {
    setChange(prevState => !prevState)
  }

  const handleAddItem = e => {
    e.preventDefault()
    if (
      titleInput.length >= 3 &&
      titleInput.length >= 3 &&
      !!timeInput &&
      !!priceInput
    ) {
      setClickAdd(false)
      handleAddItemInCategory(
        item.category,
        titleInput,
        contentInput,
        timeInput,
        extraTime,
        priceInput,
        extraPrice
      )
    }
  }

  const handleResetCategory = () => {
    setClickEdit(false)
    setCategoryTitle(item.oldCategory)
    handleResetCategoryName(item.oldCategory, categoryTitle, item.category)
  }

  const handleChangeCategoryTitle = e => {
    e.preventDefault()
    setClickEdit(false)
    handleChangeNameCategory(categoryTitle, item.oldCategory, item.category)
  }

  const servicesMap = item.items.map((itemServices, indexSerives) => {
    return (
      <ServicesItem
        key={indexSerives}
        itemServices={itemServices}
        index={indexSerives}
        isCompanyEditProfil={isCompanyEditProfil}
        clickDelete={clickDelete}
        handleClickContent={handleClickContent}
        BackgroundEdit={BackgroundEdit}
        BackgroundEditContent={BackgroundEditContent}
        CheckboxStyle={CheckboxStyle}
        TextCheckbox={TextCheckbox}
        ButtonsAddPosition={ButtonsAddPosition}
        ButtonMargin={ButtonMargin}
        ButtonMarginSubmit={ButtonMarginSubmit}
      />
    )
  })

  return (
    <CategoryItemStyle
      data-sal={!isCompanyEditProfil && "zoom-in"}
      data-sal-duration={!isCompanyEditProfil && "1000"}
      data-sal-easing={!isCompanyEditProfil && "ease-out-bounce"}
    >
      <TitleCategory
        isCompanyEditProfil={isCompanyEditProfil}
        clickDelete={clickDelete}
        clickAdd={clickAdd}
        clickEdit={clickEdit}
      >
        {item.category}
        <IconArrowPosition
          onClick={handleClickArrow}
          collapseActive={collapseActive}
        >
          <MdExpandMore />
        </IconArrowPosition>
        {isCompanyEditProfil && (
          <>
            <IconDeletePosition
              onClick={handleClickDelete}
              data-tip
              data-for={`deleteCategory${index}${item.serviceCategory}`}
            >
              <MdDeleteForever />
            </IconDeletePosition>
            <IconEditPosition
              onClick={handleEditCategory}
              data-tip
              data-for={`editCategory${index}${item.serviceCategory}`}
            >
              <MdEdit />
            </IconEditPosition>
            <IconAddPosition
              onClick={handleClickAdd}
              data-tip
              data-for={`addItem${index}${item.serviceCategory}`}
            >
              <MdLibraryAdd />
            </IconAddPosition>

            <CSSTransition
              in={clickDelete}
              timeout={400}
              classNames="popup"
              unmountOnExit
            >
              <BackgroundEdit>
                <BackgroundEditContent onClick={handleClickContent} transparent>
                  <ButtonsDeletePosition>
                    <ButtonMargin>
                      <ButtonIcon
                        title="Anuluj"
                        uppercase
                        fontIconSize="40"
                        fontSize="14"
                        icon={<MdArrowBack />}
                        customColorButton="#2e7d32"
                        customColorIcon="#43a047"
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
                        customColorButton="#c62828"
                        customColorIcon="#f44336"
                        onClick={handleDeleteCategory}
                      />
                    </ButtonMargin>
                  </ButtonsDeletePosition>
                </BackgroundEditContent>
              </BackgroundEdit>
            </CSSTransition>
            <CSSTransition
              in={clickEdit}
              timeout={400}
              classNames="popup"
              unmountOnExit
            >
              <BackgroundEdit>
                <BackgroundEditContent onClick={handleClickContent}>
                  <form onSubmit={handleChangeCategoryTitle}>
                    <InputIcon
                      icon={<MdTitle />}
                      placeholder="Nazwa kategorii"
                      secondColor
                      value={categoryTitle}
                      type="text"
                      onChange={e => handleChangeInput(e, setCategoryTitle)}
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
                          onClick={handleResetCategory}
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
                          icon={<MdLibraryAdd />}
                          customColorButton="#2e7d32"
                          customColorIcon="#43a047"
                          disabled={categoryTitle === item.category}
                        />
                      </ButtonMarginSubmit>
                    </ButtonsAddPosition>
                  </form>
                </BackgroundEditContent>
              </BackgroundEdit>
            </CSSTransition>
            <CSSTransition
              in={clickAdd}
              timeout={400}
              classNames="popup"
              unmountOnExit
            >
              <BackgroundEdit>
                <BackgroundEditContent onClick={handleClickContent}>
                  Nowa podkategoria
                  <form onSubmit={handleAddItem}>
                    <InputIcon
                      icon={<MdTitle />}
                      placeholder="Tytuł"
                      secondColor
                      value={titleInput}
                      type="text"
                      onChange={e => handleChangeInput(e, setInputTitle)}
                      required
                    />
                    <InputIcon
                      icon={<MdReorder />}
                      placeholder="Treść"
                      secondColor
                      value={contentInput}
                      type="text"
                      onChange={e => handleChangeInput(e, setContentInput)}
                      required
                    />
                    <InputIcon
                      icon={<MdAccessTime />}
                      placeholder="Czas w minutach"
                      secondColor
                      value={timeInput}
                      type="number"
                      onChange={e => handleChangeInput(e, setTimeInput)}
                      required
                    />
                    <CheckboxStyle>
                      <Checkbox
                        theme="material-checkbox"
                        value={extraTime}
                        onChange={() => handleOnChangeCheckbox(setExtraTime)}
                      >
                        <TextCheckbox>Niestały czas</TextCheckbox>
                      </Checkbox>
                    </CheckboxStyle>
                    <InputIcon
                      icon={<FaDollarSign />}
                      placeholder="Cena w złotówkach"
                      secondColor
                      value={priceInput}
                      type="number"
                      onChange={e => handleChangeInput(e, setPriceInput)}
                      required
                    />
                    <CheckboxStyle>
                      <Checkbox
                        theme="material-checkbox"
                        value={extraPrice}
                        onChange={() => handleOnChangeCheckbox(setExtraPrice)}
                      >
                        <TextCheckbox>Niestała cena</TextCheckbox>
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
                          onClick={handleClickAdd}
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
                          icon={<MdLibraryAdd />}
                          customColorButton="#2e7d32"
                          customColorIcon="#43a047"
                        />
                      </ButtonMarginSubmit>
                    </ButtonsAddPosition>
                  </form>
                </BackgroundEditContent>
              </BackgroundEdit>
            </CSSTransition>

            <ReactTooltip
              id={`addItem${index}${item.serviceCategory}`}
              effect="float"
              multiline={true}
            >
              <span>Dodaj podkategorie</span>
            </ReactTooltip>
            <ReactTooltip
              id={`deleteCategory${index}${item.serviceCategory}`}
              effect="float"
              multiline={true}
            >
              <span>Usuń całą kategorię</span>
            </ReactTooltip>
            <ReactTooltip
              id={`editCategory${index}${item.serviceCategory}`}
              effect="float"
              multiline={true}
            >
              <span>Edytuj nazwe kategorii</span>
            </ReactTooltip>
          </>
        )}
      </TitleCategory>
      <Collapse isOpened={collapseActive}>
        <div>{servicesMap}</div>
      </Collapse>
    </CategoryItemStyle>
  )
}
export default CategoryItem
