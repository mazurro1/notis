import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { ButtonIcon, InputIcon } from "@ui"
import { MdSearch, MdClose, MdLocationOn } from "react-icons/md"
import { FaArrowLeft, FaMapSigns } from "react-icons/fa"
import { Colors } from "@common/Colors"
import { useDispatch, useSelector } from "react-redux"
import { changeLocalizationValue } from "@state/actions"
import { CitySelect } from "@common/CitySelect"

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
  margin-right: 4px;
  margin-bottom: 4px;
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
  const [districtText, setDistrictText] = useState("")
  const localization = useSelector(state => state.localization)
  const district = useSelector(state => state.district)
  const inputSearchCompany = useRef(null)

  useEffect(() => {
    if (!!localization) {
      setLocalizationText(localization.value)
    }
    if (!!district) {
      setDistrictText(district)
    }
  }, [localization, district])

  useEffect(() => {
    if (!!inputSearchCompany) {
      if (!!inputSearchCompany.current) {
        inputSearchCompany.current.focus()
      }
    }
  }, [inputSearchCompany])

  const dispatch = useDispatch()

  const handleResetLocalization = () => {
    dispatch(changeLocalizationValue(null))
  }

  const handleChangeSearch = e => {
    setLocalizationText(e.target.value)
  }

  const handleChangeDistrict = e => {
    setDistrictText(e.target.value)
  }

  const handleChangeSearchLocalization = value => {
    dispatch(
      changeLocalizationValue(
        {
          value: localizationText,
          label: localizationText,
        },
        districtText
      )
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
        refInput={inputSearchCompany}
        validText="Minimum 3 znaki - pole wymagane"
      />
      <InputIcon
        placeholder="Dzielnica"
        icon={<FaMapSigns />}
        onChange={handleChangeDistrict}
        value={districtText}
        validText="Minimum 3 znaki"
      />
      <ButtonsPosition>
        <ButtonsMargin>
          <ButtonIcon
            title="Anuluj"
            uppercase
            fontIconSize="20"
            fontSize="14"
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
            fontSize="14"
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
            fontSize="14"
            icon={<MdSearch />}
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
            onClick={handleChangeSearchLocalization}
            disabled={localizationText.length < 3}
            isFetchToBlock
          />
        </ButtonsMargin>
      </ButtonsPosition>
    </>
  )
}
export default Localization
