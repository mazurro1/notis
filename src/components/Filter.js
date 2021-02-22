import React, { useState, useEffect } from "react"
import InputIcon from "../components/InputIcon"
import { MdShoppingBasket, MdSearch, MdClose } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Colors } from "../common/Colors"
import { changeFilterValue } from "../state/actions"
import ButtonIcon from "./ButtonIcon"
import styled from "styled-components"

const ButtonsPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`

const ButtonsMargin = styled.div`
  margin: 5px;
`

const Filter = ({ handleClose, siteProps }) => {
  const [filterText, setFilterText] = useState("")
  const filters = useSelector(state => state.filters)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!filters) {
      setFilterText(filters.value)
    }
  }, [filters])

  const handleChangeSearch = e => {
    if (!!filterText) {
      dispatch(
        changeFilterValue({
          value: filterText,
          label: filterText,
        })
      )
    } else {
      dispatch(changeFilterValue(null))
    }
  }

  const handleResetFilter = () => {
    dispatch(changeFilterValue(null))
  }

  const handleChangeFilterText = e => {
    setFilterText(e.target.value)
  }

  return (
    <>
      <InputIcon
        icon={<MdShoppingBasket />}
        placeholder="Usługa"
        onChange={handleChangeFilterText}
        value={filterText}
      />
      <ButtonsPosition>
        <ButtonsMargin>
          <ButtonIcon
            title="Anuluj"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaArrowLeft />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            onClick={handleClose}
          />
        </ButtonsMargin>
        <ButtonsMargin>
          <ButtonIcon
            title="Resetuj"
            uppercase
            fontIconSize="25"
            fontSize="16"
            icon={<MdClose />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            onClick={handleResetFilter}
          />
        </ButtonsMargin>
        <ButtonsMargin>
          <ButtonIcon
            title="Szukaj"
            uppercase
            fontIconSize="25"
            fontSize="16"
            icon={<MdSearch />}
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
            onClick={handleChangeSearch}
          />
        </ButtonsMargin>
      </ButtonsPosition>
    </>
  )
}
export default Filter
