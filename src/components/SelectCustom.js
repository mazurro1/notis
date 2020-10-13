import React from "react"
import Select from "react-select"
import styled from "styled-components"
import chroma from "chroma-js"
import { Colors } from "../common/Colors"

const SelectDiv = styled.div`
  margin: 0 auto;
  width: 500px;
  max-width: 90vw;
  div{

    div{
      border-color: ${Colors.buttonIconColor} !important;
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

const SelectCustom = ({handleChange=()=>{}, isLoading=false, value=null, options=[], placeholder=""}) => {
  const handleOnChange = (value) => {
    handleChange(value)
  }

  return (
    <SelectDiv>
      <Select
        isLoadin={isLoading}
        isClearable
        closeMenuOnSelect={true}
        defaultMenuIsOpen
        options={options}
        styles={colourStyles}
        onChange={handleOnChange}
        value={value}
        placeholder={placeholder}
      />
    </SelectDiv>
  )
}
export default SelectCustom
