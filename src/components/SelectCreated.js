import React, { useState, useEffect } from "react"
import styled from "styled-components"
import ButtonIcon from "./ButtonIcon"
import { MdKeyboardArrowDown, MdClose } from "react-icons/md"
import { CSSTransition } from "react-transition-group"
import { useSelector } from "react-redux"
import { Colors } from "../common/Colors"
import UseOuterClick from "../common/UseOuterClick"

const WrapSelectedElements = styled.div`
  width: 100%;
  max-height: 100px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
`

const SizeSelect = styled.div`
  position: relative;
  display: block;
  width: ${props =>
    `calc(${props.width} + ${props.isClearable ? "30px" : "0px"})`};
  padding-right: ${props => (props.isClearable ? "30px" : "0px")};
  max-width: 100%;
`

const PositionValues = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  width: ${props => (props.isClearable ? "calc(100% - 30px)" : "100%")};
  z-index: 20;
  border-radius: 5px;
  box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.4);
  border: 1px solid
    ${props =>
      props.secondColor
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor};
  max-height: ${props => props.height + "px"};
  overflow-y: auto;
  overflow-x: hidden;
`

const DataItem = styled.button`
  display: block;
  font-family: "Poppins-Regular", sans-serif;
  width: 100%;
  padding: 5px 10px;
  border: none;
  text-align: left;
  overflow-wrap: break-word;
  word-break: break-word;
  border-bottom: 1px solid
    ${props =>
      props.secondColor
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor};
  background-color: ${props =>
    props.active
      ? props.secondColor
        ? Colors(props.siteProps).secondDarkColor
        : Colors(props.siteProps).primaryColorDark
      : Colors(props.siteProps).backgroundColorPage};
  color: ${props =>
    props.active
      ? Colors(props.siteProps).textNormalWhite
      : Colors(props.siteProps).textNormalBlack};
  opacity: 0.98;
  font-size: 0.9rem;
  cursor: pointer;
  transition-property: background-color, color, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  span {
    position: relative;
    left: 0;
    transition-property: left;
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }

  &:hover {
    background-color: ${props =>
      props.active
        ? !props.secondColor
          ? Colors(props.siteProps).primaryColorDark
          : Colors(props.siteProps).secondDarkColor
        : !props.secondColor
        ? Colors(props.siteProps).primaryColorLight
        : Colors(props.siteProps).secondColorLight};
  }

  &:active {
    span {
      left: -5px;
    }
  }
`

const ClearSelect = styled.div`
  position: absolute;
  top: 0px;
  right: 0;
  height: 30px;
  width: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  font-size: 1.4rem;
  cursor: pointer;
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    transform: scale(1.2);
  }
`

const SelectedItemValue = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  padding: 2px 5px;
  background-color: ${props =>
    props.hoverActive
      ? !props.secondColor
        ? Colors(props.siteProps).primaryColorDark
        : Colors(props.siteProps).secondDarkColor
      : !props.secondColor
      ? Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).secondColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  margin: 1px;
  border-radius: 5px;
  overflow-wrap: break-word;
  word-break: break-word;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props =>
      props.secondColor
        ? Colors(props.siteProps).secondDarkColor
        : Colors(props.siteProps).primaryColorDark};
  }
`

const FlexItemSelectedName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const DeleteItemSelected = styled.div`
  color: ${props => Colors(props.siteProps).textNormalWhite};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  font-size: 1.2rem;
`

const DefaultPlaceholderStyle = styled.div`
  font-size: 0.9rem;
  padding: 1.5px;
`

const TextSelect = styled.div`
  font-size: 0.8rem;
  margin-left: 5px;
  font-family: "Poppins-Bold", sans-serif;
  height: 17px;
`

const SelectCreated = ({
  options = [],
  isMulti = false,
  maxMenuHeight = 300,
  closeMenuOnSelect = false,
  placeholder = "Wybierz wartości",
  isClearable = false,
  defaultMenuIsOpen = false,
  isDisabled = false,
  value,
  handleChange = () => {},
  width = "300px",
  secondColor = false,
  darkSelect = false,
  onlyText = false,
  deleteItem = true,
  textUp = false,
}) => {
  const [selectActive, setSelectActive] = useState(
    isDisabled ? false : defaultMenuIsOpen
  )
  const [selectedItems, setSelectedItems] = useState([])
  const [hoverActive, setHoverActive] = useState(false)
  const siteProps = useSelector(state => state.siteProps)

  const refSelect = UseOuterClick(e => {
    setSelectActive(false)
  })

  useEffect(() => {
    setSelectActive(false)
  }, [isDisabled])

  useEffect(() => {
    if (selectedItems.length === 0) {
      if (!!value && isMulti) {
        setSelectedItems([...value])
      } else if (!!value && !isMulti) {
        setSelectedItems([{ ...value }])
      } else {
        setSelectedItems([])
      }
    }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickSelect = () => {
    if (!isDisabled) {
      setSelectActive(prevState => !prevState)
    }
  }

  const handleClickItem = (e, selectedItem) => {
    e.preventDefault()
    if (!isDisabled) {
      let valueToSentHandleChange = null
      let valueToSelect = []

      const isItemInSelected = selectedItems.some(
        item => item.value === selectedItem.value
      )
      if (isItemInSelected) {
        const filterSelectedItem = selectedItems.filter(
          item => item.value !== selectedItem.value
        )
        valueToSelect = filterSelectedItem
        if (isMulti) {
          valueToSentHandleChange = filterSelectedItem
        } else {
          const validfilterSelectedItem =
            filterSelectedItem.length > 0 ? filterSelectedItem[0] : null
          valueToSentHandleChange = validfilterSelectedItem
        }
      } else {
        if (isMulti) {
          const allSelectedItems = [...selectedItems, selectedItem]
          if (isMulti) {
            valueToSentHandleChange = allSelectedItems
          } else {
            const validallSelectedItems =
              allSelectedItems.length > 0 ? allSelectedItems[0] : null
            valueToSentHandleChange = validallSelectedItems
          }
          valueToSelect = allSelectedItems
        } else {
          if (isMulti) {
            valueToSentHandleChange = [selectedItem]
          } else {
            valueToSentHandleChange = selectedItem
          }
          valueToSelect = [selectedItem]
        }
      }
      if (closeMenuOnSelect) {
        setSelectActive(false)
      }

      if (deleteItem || !!valueToSentHandleChange) {
        handleChange(valueToSentHandleChange)
        setSelectedItems(valueToSelect)
      }
    }
  }

  const handleClearSelect = e => {
    e.preventDefault()
    let valueToSentHandle = null
    if (isMulti) {
      valueToSentHandle = []
    }

    handleChange(valueToSentHandle)
    setSelectedItems([])
  }

  const handleDeleteSelectedItem = (e, selectedItem) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    if (deleteItem) {
      if (!isDisabled) {
        const filterSelectedItem = selectedItems.filter(
          item => item.value !== selectedItem.value
        )
        setSelectedItems(filterSelectedItem)
        if (isMulti) {
          handleChange(filterSelectedItem)
        } else {
          handleChange(null)
        }
      }
    }
  }

  const handleStopPropagination = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    setSelectActive(prevState => !prevState)
  }

  const handleOnMouseOn = () => {
    setHoverActive(true)
  }

  const handleOnMouseLeave = () => {
    setHoverActive(false)
  }

  selectedItems.sort((a, b) => {
    const firstItemToSort = a.value.toString().toLowerCase()
    const secondItemToSort = b.value.toString().toLowerCase()
    if (firstItemToSort < secondItemToSort) return -1
    if (firstItemToSort > secondItemToSort) return 1
    return 0
  })

  const mapOptions = options.map((item, index) => {
    const isItemActive = selectedItems.some(
      itemSelect => itemSelect.value === item.value
    )
    return (
      <DataItem
        siteProps={siteProps}
        active={isItemActive}
        onClick={e => handleClickItem(e, item)}
        key={index}
        secondColor={secondColor}
      >
        <span>{item.label}</span>
      </DataItem>
    )
  })

  const mapSelectedValues = selectedItems.map((item, index) => {
    return (
      <SelectedItemValue
        key={index}
        siteProps={siteProps}
        onClick={handleStopPropagination}
        hoverActive={hoverActive}
        secondColor={secondColor}
      >
        <FlexItemSelectedName>
          {item.label}
          {deleteItem && (
            <DeleteItemSelected
              onClick={e => handleDeleteSelectedItem(e, item)}
            >
              <MdClose />
            </DeleteItemSelected>
          )}
        </FlexItemSelectedName>
      </SelectedItemValue>
    )
  })

  return (
    <SizeSelect width={width} isClearable={isClearable} ref={refSelect}>
      <div
        onMouseEnter={handleOnMouseOn}
        onMouseLeave={handleOnMouseLeave}
        aria-hidden="true"
      >
        {
          <TextSelect>
            {!!placeholder && selectedItems.length > 0 && textUp
              ? placeholder
              : ""}
          </TextSelect>
        }
        <ButtonIcon
          title={
            selectedItems.length === 0 ? (
              <DefaultPlaceholderStyle>
                {`${placeholder}${onlyText ? ": Brak" : ""}`}
              </DefaultPlaceholderStyle>
            ) : onlyText ? (
              <DefaultPlaceholderStyle>
                {placeholder}: {mapSelectedValues.length}
              </DefaultPlaceholderStyle>
            ) : (
              <WrapSelectedElements>{mapSelectedValues}</WrapSelectedElements>
            )
          }
          uppercase
          fontIconSize="22"
          fontSize="16"
          icon={<MdKeyboardArrowDown />}
          onClick={handleClickSelect}
          disabled={isDisabled}
          buttonBgDark={darkSelect}
          secondColors={secondColor}
        />
      </div>
      <CSSTransition
        in={selectActive}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <PositionValues
          siteProps={siteProps}
          height={maxMenuHeight}
          isClearable={isClearable}
          secondColor={secondColor}
        >
          {mapOptions}
        </PositionValues>
      </CSSTransition>
      {isClearable && !isDisabled && (
        <ClearSelect onClick={e => handleClearSelect(e)}>
          <MdClose />
        </ClearSelect>
      )}
    </SizeSelect>
  )
}

export default SelectCreated
