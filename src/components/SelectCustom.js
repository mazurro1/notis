import React from "react"
import Select from "react-select"
import styled from "styled-components"
import chroma from "chroma-js"
import { Colors } from "../common/Colors"
import { useSelector } from "react-redux"

const SelectDiv = styled.div`
  font-size: 1rem;
  margin: ${props => props.marginAuto ? "0 auto" : "0"};
  width: ${props => (props.widthAuto ? "auto" : "500px")};
  max-width: 90vw;
  font-size: 0.9rem;
  div {
    div {
      border-color: ${props =>
        props.secondColor
          ? Colors(props.siteProps).secondColor
          : Colors(props.siteProps).primaryColor} !important;
      color: ${props => Colors(props.siteProps).textNormalBlack};
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
  isClearable = true,
  isDisabled = false,
  marginAuto = true
}) => {
  const siteProps = useSelector(state => state.siteProps)
  const handleOnChange = value => {
    handleChange(value)
  }

  const dot = (color = Colors(siteProps).primaryColor) => ({
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
    control: (styles, { isDisabled }) => ({
      ...styles,
      backgroundColor: Colors(siteProps).companyItemBackground,
      opacity: isDisabled ? 0.9 : 1,
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(Colors(siteProps).primaryColor)
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? Colors(siteProps).primaryColor
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
          backgroundColor: isDisabled
            ? "#000"
            : isSelected
            ? Colors(siteProps).primaryColor
            : color.alpha(0.3).css(),
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
      siteProps={siteProps}
      marginAuto={marginAuto}
    >
      <Select
        isLoadin={isLoading}
        isClearable={isClearable}
        defaultMenuIsOpen={defaultMenuIsOpen}
        options={options}
        styles={secondColor ? "" : colourStyles}
        onChange={handleOnChange}
        value={value}
        placeholder={placeholder}
        maxMenuHeight={secondColor ? 100 : 300}
        isMulti={isMulti}
        closeMenuOnSelect={closeMenuOnSelect}
        isDisabled={isDisabled}
        // menuIsOpen={menuIsOpen}
      />
    </SelectDiv>
  )
}
export default SelectCustom
