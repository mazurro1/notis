import React from "react"
import Select from "react-select"
import styled from "styled-components"
import chroma from "chroma-js"
import { Colors } from "../common/Colors"
import { useSelector } from "react-redux"

const SelectDiv = styled.div`
  margin: 0 auto;
  width: ${props => (props.widthAuto ? "auto" : "500px")};
  max-width: 90vw;
  div {
    div {
      border-color: ${props =>
        props.secondColor
          ? Colors(props.colorBlind).secondColor
          : Colors(props.colorBlind).primaryColor} !important;
      box-shadow: none;
      color: ${props => Colors(props.colorBlind).textBlack};
    }
  }
`

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
  const colorBlind = useSelector(state => state.colorBlind)
  const handleOnChange = value => {
    handleChange(value)
  }

  const dot = (color = Colors(colorBlind).primaryColor) => ({
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
    control: styles => ({
      ...styles,
      backgroundColor: Colors(colorBlind).companyItemBackground,
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(Colors(colorBlind).primaryColor)
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? Colors(colorBlind).primaryColor
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
            (isSelected
              ? Colors(colorBlind).primaryColor
              : color.alpha(0.3).css()),
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

  return (
    <SelectDiv
      widthAuto={widthAuto}
      secondColor={secondColor}
      colorBlind={colorBlind}
    >
      <Select
        isLoadin={isLoading}
        isClearable
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
