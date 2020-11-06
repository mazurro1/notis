import React, { useState } from "react"
import Select from "react-select"
import styled from "styled-components"
import chroma from "chroma-js"
import { Colors } from "../common/Colors"

const SelectDiv = styled.div`
  margin: 0 auto;
  width: ${props => (props.widthAuto ? "auto" : "500px")};
  max-width: 90vw;
  div {
    div {
      border-color: ${props =>
        props.secondColor
          ? Colors.secondColor
          : Colors.buttonIconColor} !important;
      box-shadow: none;
    }
  }
`

const dot = (color = Colors.buttonIconColor) => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
})

const dotSecond = (color = Colors.secondColor) => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
})

const colourStylesSecond = {
  control: styles => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(Colors.secondColor)
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? Colors.secondColor
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",
      boxShadow: "none",
      border: "none",

      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled &&
          (isSelected ? Colors.secondColor : color.alpha(0.3).css()),
        boxShadow: "none",
        border: "none",
      },
      ":hover": {
        boxShadow: "none",
        border: "none",
      },
      ":focus": {
        boxShadow: "none",
        border: "none",
      },
    }
  },
  input: styles => ({ ...styles, ...dotSecond() }),
  placeholder: styles => ({ ...styles, ...dotSecond() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dotSecond(data.color) }),
}

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(Colors.buttonIconColor)
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? Colors.buttonIconColor
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",
      boxShadow: "none",
      border: "none",

      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled &&
          (isSelected ? Colors.buttonIconColor : color.alpha(0.3).css()),
        boxShadow: "none",
        border: "none",
      },
      ":hover": {
        boxShadow: "none",
        border: "none",
      },
      ":focus": {
        boxShadow: "none",
        border: "none",
      },
    }
  },
  input: styles => ({ ...styles, ...dot() }),
  placeholder: styles => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
}

const SelectCustom = ({
  handleChange = () => {},
  isLoading = false,
  value = null,
  options = [],
  placeholder = "",
  widthAuto = false,
  defaultMenuIsOpen = true,
  secondColor = false,
  isMulti = false,
  closeMenuOnSelect = true,
  menuIsOpen = false,
}) => {
  const [openMenu, setOpenMenu] = useState(defaultMenuIsOpen)

  const handleOnChange = value => {
    handleChange(value)
  }

  const handleChangeOpenMenu = () => {
    setOpenMenu(prevState => !prevState)
  }

  return (
    <SelectDiv widthAuto={widthAuto} secondColor={secondColor}>
      <Select
        isLoadin={isLoading}
        isClearable
        closeMenuOnSelect={true}
        defaultMenuIsOpen={defaultMenuIsOpen}
        options={options}
        styles={secondColor ? "" : colourStyles}
        onChange={handleOnChange}
        value={value}
        placeholder={placeholder}
        maxMenuHeight={secondColor ? 100 : 300}
        isMulti={isMulti}
        closeMenuOnSelect={closeMenuOnSelect}
        menuIsOpen={menuIsOpen}
      />
    </SelectDiv>
  )
}
export default SelectCustom
