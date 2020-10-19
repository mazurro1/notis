import React, { useState } from "react"
import InputIcon from "./InputIcon"
import styled from "styled-components"
import {
  MdAccountBox,
  MdEmail,
  MdPhoneAndroid,
  MdLocationOn,
  MdWork,
  MdLocationCity,
} from "react-icons/md"
import { FaMapSigns } from "react-icons/fa"

import { LinkEffect } from "../common/LinkEffect"
import { Colors } from "../common/Colors"
import ReactTooltip from "react-tooltip"
import ButtonIcon from "./ButtonIcon"
import { FetchCompanyRegistration } from "../state/actions"
import { useDispatch, useSelector } from "react-redux"

const ButtonLoginRegister = styled.button`
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: white;
  margin-top: 30px;
`

const RegulationsText = styled.div`
  color: #bdbdbd;
  font-size: 0.85rem;
  text-align: center;
  margin-top: 20px;
  a {
    color: ${Colors.buttonIconColor};
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    &:hover {
      color: ${Colors.buttonColor};
    }
  }
`

const CreateCompany = () => {
  const [emailInput, setEmailInput] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [phoneInput, setPhoneInput] = useState("")
  const [cityInput, setCityInput] = useState("")
  const [discrictInput, setDiscrictInput] = useState("")
  const [adressInput, setAdressInput] = useState("")
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleChange = (e, setValue) => {
    setValue(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(
      FetchCompanyRegistration(
        emailInput,
        nameInput,
        phoneInput,
        cityInput,
        discrictInput,
        adressInput,
        user.token,
        user.userId
      )
    )
  }

  const validButtonRegisterCompany =
    emailInput.length > 0 &&
    nameInput.length > 0 &&
    phoneInput.length > 0 &&
    cityInput.length > 0 &&
    discrictInput.length > 0 &&
    adressInput.length > 0

  const tooltipButtonRegister = !validButtonRegisterCompany && (
    <ReactTooltip id="alertRegistration" effect="float" multiline={true}>
      <span>Uzupełnij wszystkie dane</span>
    </ReactTooltip>
  )

  return (
    <form onSubmit={handleSubmit}>
      <InputIcon
        icon={<MdEmail />}
        placeholder="Email firmowy"
        value={emailInput}
        type="email"
        onChange={e => handleChange(e, setEmailInput)}
      />
      <InputIcon
        icon={<MdAccountBox />}
        placeholder="Nazwa firmy"
        type="text"
        value={nameInput}
        onChange={e => handleChange(e, setNameInput)}
      />
      <InputIcon
        icon={<MdLocationCity />}
        placeholder="Miejscowość"
        value={cityInput}
        type="text"
        onChange={e => handleChange(e, setCityInput)}
      />
      <InputIcon
        icon={<FaMapSigns />}
        placeholder="Dzielnica"
        value={discrictInput}
        type="text"
        onChange={e => handleChange(e, setDiscrictInput)}
      />
      <InputIcon
        icon={<MdLocationOn />}
        placeholder="Adres firmy"
        value={adressInput}
        type="text"
        onChange={e => handleChange(e, setAdressInput)}
      />

      <InputIcon
        icon={<MdPhoneAndroid />}
        placeholder="Numer telefonu"
        value={phoneInput}
        type="number"
        onChange={e => handleChange(e, setPhoneInput)}
      />

      <RegulationsText>
        Klikając w przycisk poniżej akceptujesz{" "}
        <LinkEffect text="Regulamin" path="/regulations" />
      </RegulationsText>
      <ButtonLoginRegister disabled={!validButtonRegisterCompany} type="submit">
        <div data-tip data-for="alertRegistration">
          <ButtonIcon
            title="ZAREJESTRUJ FIRMĘ"
            uppercase
            fontIconSize="20"
            icon={<MdWork />}
            disabled={!validButtonRegisterCompany}
            fontSize="16"
          />
        </div>
      </ButtonLoginRegister>
      {tooltipButtonRegister}
    </form>
  )
}
export default CreateCompany
