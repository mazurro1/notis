import React, { useState } from "react"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { Checkbox } from "react-input-checkbox"
import { FaSms } from "react-icons/fa"
import { RiMailSendLine } from "react-icons/ri"
import { ButtonIcon, InputIcon, SelectCreated } from "@ui"
import { fetchSendSMSCompanyClients, addAlertItem } from "@state/actions"
import { useDispatch } from "react-redux"

const TextCheckbox = styled.span`
  padding-left: 10px;
  font-family: "Poppins-Bold", sans-serif;
  user-select: none;
`

const CheckboxStyle = styled.div`
  margin-bottom: 30px;

  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.siteProps).primaryColor};
  }

  span {
    color: ${props => Colors(props.siteProps).textNormalBlack};
    border-color: ${props => Colors(props.siteProps).textNormalBlack};
  }
`

const CheckboxContainer = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 0px;
`

const TextSMSStyle = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
  font-size: 1rem;
  margin-bottom: 10px;
  font-family: "Poppins-Medium";

  span {
    font-family: "Poppins-Bold";
  }
`

const SendSMSClientsContent = ({ clients, siteProps, user }) => {
  const [selectedAllClients, setSelectedAllClients] = useState(false)
  const [selectedClients, setSelectedClients] = useState([])
  const [textMessage, setTextMessage] = useState("")

  const dispatch = useDispatch()

  const handleChangeCheckbox = () => {
    setSelectedAllClients(prevState => !prevState)
  }

  const handleChangeSelectedClients = value => {
    setSelectedClients(value)
  }

  const handleChangeTextMessage = e => {
    setTextMessage(e.target.value)
  }

  const selectedCountUsersToSendSMS = selectedAllClients
    ? clients.length
    : selectedClients.length

  const validCompanySMSToSend = user.company.sms >= selectedCountUsersToSendSMS

  const handleSendSMSToClients = () => {
    if (validCompanySMSToSend) {
      const mapClientsUserId = selectedClients.map(item => item.value)
      dispatch(
        fetchSendSMSCompanyClients(
          user.token,
          user.company._id,
          selectedAllClients,
          selectedAllClients ? [] : mapClientsUserId,
          textMessage
        )
      )
    } else {
      dispatch(
        addAlertItem(
          `Masz niewystarczającą ilość SMS do wykorzystania. Brakuje: ${
            selectedCountUsersToSendSMS - user.company.sms
          } SMS`
        )
      )
    }
  }

  const filterClients = []
  clients.forEach(item => {
    if (!!!item.isBlocked && !!item.userId) {
      const userName = Buffer.from(item.userId.name, "base64").toString("utf-8")
      const userSurname = Buffer.from(item.userId.surname, "base64").toString(
        "utf-8"
      )

      const itemClient = {
        value: item.userId._id,
        label: `${userName} ${userSurname}`,
      }
      filterClients.push(itemClient)
    }
  })
  const disabledNoUsersSelected =
    selectedClients.length > 0 || selectedAllClients

  return (
    <div>
      <TextSMSStyle siteProps={siteProps}>
        Zaznacz do kogo ma zostać wysłana wiadomość.
      </TextSMSStyle>
      <TextSMSStyle siteProps={siteProps}>
        Twoja ilość SMS: <span>{user.company.sms}</span>
      </TextSMSStyle>
      <SelectCreated
        options={filterClients}
        value={selectedClients}
        handleChange={handleChangeSelectedClients}
        placeholder="Zaznacz klientów"
        defaultMenuIsOpen={false}
        widthAuto
        isClearable={false}
        isMulti
        onlyText
        isDisabled={selectedAllClients}
        maxMenuHeight={200}
        closeMenuOnSelect={false}
      />
      <CheckboxContainer>
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={selectedAllClients}
            onChange={handleChangeCheckbox}
          >
            <TextCheckbox>
              Do wszystkich klientów: {clients.length}
            </TextCheckbox>
          </Checkbox>
        </CheckboxStyle>
      </CheckboxContainer>
      <InputIcon
        icon={<FaSms />}
        placeholder="Treść wiadomości"
        value={textMessage}
        type="text"
        onChange={handleChangeTextMessage}
        required
        validText={`Minimum 5 znaków, maksymalnie 100 znaków. Aktualna ilość: ${textMessage.length}`}
      />
      <ButtonIcon
        title="Wyślij wiadomości SMS"
        uppercase
        fontIconSize="20"
        fontSize="16"
        icon={<RiMailSendLine />}
        disabled={
          textMessage.length > 100 ||
          textMessage.length < 5 ||
          !disabledNoUsersSelected
        }
        onClick={handleSendSMSToClients}
        isFetchToBlock
      />
    </div>
  )
}

export default SendSMSClientsContent
