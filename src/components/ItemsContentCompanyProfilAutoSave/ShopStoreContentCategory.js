import React, { useState } from "react"
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
import { CSSTransition } from "react-transition-group"
import { Collapse } from "react-collapse"

const TitleCategory = styled.div`
  position: relative;
  font-size: 1.25rem;
  cursor: pointer;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props =>
    props.isCompanyEditProfil
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).primaryColor};
  padding: 10px;
  border-radius: 5px;
  padding-right: ${props => (props.isCompanyEditProfil ? "190px" : "50px")};
  padding-bottom: ${props =>
    props.clickDelete
      ? "50px"
      : props.clickAdd
      ? "550px"
      : props.clickEdit
      ? "150px"
      : "10px"};
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

const ShopStoreContentCategory = ({
  category,
  siteProps,
  isCompanyEditProfil,
}) => {
  const [collapseActive, setCollapseActive] = useState(false)

  const handleClickArrow = () => {
    setCollapseActive(prevState => !prevState)
  }
  // console.log(category)

  return (
    <>
      <TitleCategory
        isCompanyEditProfil={isCompanyEditProfil}
        // clickDelete={clickDelete}
        // clickAdd={clickAdd}
        // clickEdit={clickEdit}
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
              //   onClick={e => handleClickDelete(e)}
              data-tip
              data-for="deleteCategory"
            >
              <MdDeleteForever />
            </IconDeletePosition>
            <IconEditPosition
              //   onClick={e => handleEditCategory(e)}
              data-tip
              data-for="editCategory"
            >
              <MdEdit />
            </IconEditPosition>
            <IconAddPosition
              //   onClick={e => handleClickAdd(e)}
              data-tip
              data-for="addItem"
            >
              <MdLibraryAdd />
            </IconAddPosition>

            {/* <CSSTransition
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
                </BackgroundEditContent>
              </BackgroundEdit>
            </CSSTransition> */}

            {/* <CSSTransition
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
                          title="Cofnij"
                          uppercase
                          fontIconSize="40"
                          fontSize="13"
                          icon={<MdArrowBack />}
                          onClick={handleResetCategory}
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
                          icon={<MdLibraryAdd />}
                          customColorButton={Colors(siteProps).successColorDark}
                          customColorIcon={Colors(siteProps).successColor}
                          disabled={disabledCategorySave}
                        />
                      </ButtonMarginSubmit>
                    </ButtonsAddPosition>
                  </form>
                </BackgroundEditContent>
              </BackgroundEdit>
            </CSSTransition> */}

            {/* <CSSTransition
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
                    <CheckboxStyle siteProps={siteProps}>
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
                    <CheckboxStyle siteProps={siteProps}>
                      <Checkbox
                        theme="material-checkbox"
                        value={extraPrice}
                        onChange={() => handleOnChangeCheckbox(setExtraPrice)}
                      >
                        <TextCheckbox>Niestała cena</TextCheckbox>
                      </Checkbox>
                    </CheckboxStyle>
                    <SelectStyle>
                      <SelectCustom
                        options={ServiceColors}
                        value={colorServiceComponent}
                        handleChange={handleChangeColorService}
                        isLoading={false}
                        secondColor
                        defaultMenuIsOpen={false}
                        placeholder="Wybierz kolor usługi..."
                        marginAuto={false}
                      />
                    </SelectStyle>
                    <ButtonsAddPosition>
                      <ButtonMargin>
                        <ButtonIcon
                          title="Anuluj"
                          uppercase
                          fontIconSize="40"
                          fontSize="13"
                          icon={<MdArrowBack />}
                          onClick={handleClickAdd}
                          customColorButton={Colors(siteProps).dangerColorDark}
                          customColorIcon={Colors(siteProps).dangerColor}
                        />
                      </ButtonMargin>
                      <ButtonMarginSubmit type="submit">
                        <ButtonIcon
                          title="Dodaj"
                          uppercase
                          fontIconSize="20"
                          fontSize="15"
                          icon={<MdLibraryAdd />}
                          customColorButton={Colors(siteProps).successColorDark}
                          customColorIcon={Colors(siteProps).successColor}
                        />
                      </ButtonMarginSubmit>
                    </ButtonsAddPosition>
                  </form>
                </BackgroundEditContent>
              </BackgroundEdit>
            </CSSTransition> */}
          </>
        )}
      </TitleCategory>
      <Collapse isOpened={collapseActive}>
        {/* <div>{servicesMap}</div> */}
      </Collapse>
    </>
  )
}
export default ShopStoreContentCategory
