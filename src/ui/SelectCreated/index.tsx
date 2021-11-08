import React, { useState, useEffect, useRef } from "react"
import { ButtonIcon } from "@ui"
import { MdKeyboardArrowDown, MdClose } from "react-icons/md"
import { CSSTransition } from "react-transition-group"
import { useSelector } from "react-redux"
import * as styled from "./SelectCreatedStyle"

interface optionPInterface {
  label: string
  value: string
}

const SelectCreated = ({
  options = [],
  isMulti = false,
  maxMenuHeight = 300,
  closeMenuOnSelect = true,
  placeholder = "Wybierz wartości",
  isClearable = false,
  defaultMenuIsOpen = false,
  isDisabled = false,
  value = null,
  handleChange = () => {},
  width = "300px",
  secondColor = false,
  darkSelect = false,
  onlyText = false,
  deleteItem = true,
  textUp = false,
  top = false,
}: {
  options: optionPInterface[]
  isMulti: boolean
  maxMenuHeight: number
  closeMenuOnSelect: boolean
  placeholder: string
  isClearable: boolean
  defaultMenuIsOpen: boolean
  isDisabled: boolean
  value: any
  handleChange: Function
  width: string
  secondColor: boolean
  darkSelect: boolean
  onlyText: boolean
  deleteItem: boolean
  textUp: boolean
  top: boolean
}) => {
  const [selectActive, setSelectActive] = useState(
    isDisabled ? false : defaultMenuIsOpen
  )
  const [selectedItems, setSelectedItems] = useState<optionPInterface[]>([])
  const [hoverActive, setHoverActive] = useState(false)
  const siteProps = useSelector((state: any) => state.siteProps)
  const refSelect: any = useRef(null)

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (refSelect.current && !refSelect.current.contains(event.target)) {
        setSelectActive(defaultMenuIsOpen)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [refSelect]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSelectActive(defaultMenuIsOpen)
  }, [isDisabled]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!value && isMulti) {
      setSelectedItems([...value])
    } else if (!!value && !isMulti) {
      setSelectedItems([{ ...value }])
    } else {
      setSelectedItems([])
    }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickSelect = () => {
    if (!isDisabled) {
      setSelectActive(prevState => !prevState)
    }
  }

  const handleClickItem = (e: Event, selectedItem: optionPInterface) => {
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

  const handleClearSelect = (e: Event) => {
    e.preventDefault()
    let valueToSentHandle = null
    if (isMulti) {
      valueToSentHandle = []
    }

    handleChange(valueToSentHandle)
    setSelectedItems([])
  }

  const handleDeleteSelectedItem = (e: any, selectedItem: optionPInterface) => {
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

  const handleStopPropagination = (e: any) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    if (!isDisabled && closeMenuOnSelect) {
      setSelectActive(prevState => !prevState)
    }
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
      <styled.DataItem
        siteProps={siteProps}
        active={isItemActive}
        onClick={(e: Event) => handleClickItem(e, item)}
        key={index}
        secondColor={secondColor}
      >
        <span>{item.label}</span>
      </styled.DataItem>
    )
  })

  const mapSelectedValues = selectedItems.map((item, index) => {
    return (
      <styled.SelectedItemValue
        key={index}
        siteProps={siteProps}
        onClick={handleStopPropagination}
        hoverActive={hoverActive}
        secondColor={secondColor}
      >
        <styled.FlexItemSelectedName>
          {item.label}
          {deleteItem && (
            <styled.DeleteItemSelected
              onClick={e => handleDeleteSelectedItem(e, item)}
              siteProps={siteProps}
            >
              <MdClose />
            </styled.DeleteItemSelected>
          )}
        </styled.FlexItemSelectedName>
      </styled.SelectedItemValue>
    )
  })

  return (
    <styled.SizeSelect width={width} isClearable={isClearable} ref={refSelect}>
      <div
        onMouseEnter={handleOnMouseOn}
        onMouseLeave={handleOnMouseLeave}
        aria-hidden="true"
      >
        {textUp && (
          <styled.TextSelect siteProps={siteProps}>
            {!!placeholder && selectedItems.length > 0 && textUp
              ? placeholder
              : ""}
          </styled.TextSelect>
        )}
        <ButtonIcon
          title={
            selectedItems.length === 0 ? (
              <styled.DefaultPlaceholderStyle>
                {`${placeholder}${onlyText ? ": Brak" : ""}`}
              </styled.DefaultPlaceholderStyle>
            ) : onlyText ? (
              <styled.DefaultPlaceholderStyle>
                {placeholder}: {mapSelectedValues.length}
              </styled.DefaultPlaceholderStyle>
            ) : (
              <styled.WrapSelectedElements>
                {mapSelectedValues}
              </styled.WrapSelectedElements>
            )
          }
          uppercase
          fontIconSize={22}
          isButton
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
        <styled.PositionValues
          siteProps={siteProps}
          height={maxMenuHeight}
          isClearable={isClearable}
          secondColor={secondColor}
          top={top}
        >
          {mapOptions}
        </styled.PositionValues>
      </CSSTransition>
      {isClearable && !isDisabled && (
        <styled.ClearSelect onClick={(e: any) => handleClearSelect(e)}>
          <MdClose />
        </styled.ClearSelect>
      )}
    </styled.SizeSelect>
  )
}

export default SelectCreated
