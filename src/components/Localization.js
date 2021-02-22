import React, { useState, useEffect } from "react"
import InputIcon from "../components/InputIcon"
import styled from "styled-components"
import ButtonIcon from "./ButtonIcon"
import { MdSearch, MdClose, MdLocationOn } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import { Colors } from "../common/Colors"
import { useDispatch, useSelector } from "react-redux"
import { changeLocalizationValue } from "../state/actions"
import { CitySelect } from "../common/CitySelect"

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

const CityStyle = styled.div`
  font-family: "Poppins-Regular";
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).primaryColorDark};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  padding: 2px 5px;
  font-size: 1rem;
  margin: 4px;
  display: inline-block;
  border-radius: 5px;
  cursor: pointer;

  transition-property: background-color, color, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    transform: scale(1.1);
  }
`

const AllLocalizations = styled.div`
  margin: 10px 0;
`

const Localization = ({ handleClose, siteProps }) => {
  const [localizationText, setLocalizationText] = useState("")
  const localization = useSelector(state => state.localization)

  useEffect(() => {
    if (!!localization) {
      setLocalizationText(localization.value)
    }
  }, [localization])

  const dispatch = useDispatch()

  const handleResetLocalization = () => {
    dispatch(changeLocalizationValue(null))
  }

  const handleChangeSearch = e => {
    setLocalizationText(e.target.value)
  }

  const handleChangeSearchLocalization = value => {
    dispatch(
      changeLocalizationValue({
        value: localizationText,
        label: localizationText,
      })
    )
  }

  const handleClickItemLocalization = value => {
    setLocalizationText(value)
  }

  const mapCitys = CitySelect.map((item, index) => {
    const isActive = localizationText.toLowerCase() === item.value.toLowerCase()
    return (
      <CityStyle
        siteProps={siteProps}
        key={index}
        active={isActive}
        onClick={() => handleClickItemLocalization(item.value)}
      >
        {item.label}
      </CityStyle>
    )
  })

  return (
    <>
      <AllLocalizations>{mapCitys}</AllLocalizations>
      <InputIcon
        placeholder="Miasto"
        icon={<MdLocationOn />}
        onChange={handleChangeSearch}
        value={localizationText}
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
            onClick={handleResetLocalization}
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
            onClick={handleChangeSearchLocalization}
          />
        </ButtonsMargin>
      </ButtonsPosition>
    </>
  )
}
export default Localization
