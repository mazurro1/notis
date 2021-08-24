import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchworkerUsersInformations,
  restartCompanySMS,
} from "../state/actions"
import WorkerUsersInformationItem from "./WorkerUsersInformationItem"
import ReactTooltip from "react-tooltip"
import sal from "sal.js"
import InputIcon from "./InputIcon"
import { FaUserFriends, FaSms } from "react-icons/fa"
import ButtonIcon from "./ButtonIcon"
import Popup from "./Popup"
import SendSMSClientsContent from "./SendSMSClientsContent"

const WorkerUsersInformation = ({ user, handleClose, siteProps }) => {
  const [filterUsers, setFilterUsers] = useState("")
  const [sendSMSClients, setSendSMSClients] = useState(false)
  const [filterUsersInformations, setFilterUsersInformations] = useState([])
  const companyUsersInformations = useSelector(
    state => state.companyUsersInformations
  )
  const userId = useSelector(state => state.userId)
  const restartSMSCompany = useSelector(state => state.restartSMSCompany)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!userId) {
      dispatch(fetchworkerUsersInformations(user.token, user.company._id))
    }
  }, [user.token, userId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!restartSMSCompany) {
      dispatch(restartCompanySMS())
    }
    setSendSMSClients(false)
  }, [restartSMSCompany]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    sal({
      threshold: 0.01,
      once: true,
    })
  }, [companyUsersInformations])

  useEffect(() => {
    const newFilterUsers = companyUsersInformations.filter(userCompany => {
      if (!!userCompany.userId) {
        const userName = Buffer.from(
          userCompany.userId.name,
          "base64"
        ).toString("utf-8")
        const userSurname = Buffer.from(
          userCompany.userId.surname,
          "base64"
        ).toString("utf-8")
        const isInThisName = `${userName.toLowerCase()} ${userSurname.toLowerCase()}`.includes(
          filterUsers.toLowerCase()
        )
        return isInThisName
      }
      return false
    })
    setFilterUsersInformations(newFilterUsers)
  }, [filterUsers, companyUsersInformations])

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [companyUsersInformations])

  const handleChangeFilter = e => {
    setFilterUsers(e.target.value)
  }

  const handleSendSMSClients = () => {
    setSendSMSClients(prevState => !prevState)
  }

  const mapedUsersInformations = filterUsersInformations.map((item, index) => {
    return (
      <WorkerUsersInformationItem
        userInfo={item}
        key={index}
        siteProps={siteProps}
        user={user}
        filterUsers={filterUsers}
      />
    )
  })

  return (
    <div>
      {companyUsersInformations.length > 0 ? (
        <>
          <ButtonIcon
            title="Wyślij SMS do klientów"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaSms />}
            onClick={handleSendSMSClients}
          />
          <InputIcon
            icon={<FaUserFriends />}
            placeholder="Wyszukaj użytkownika"
            value={filterUsers}
            type="text"
            onChange={handleChangeFilter}
          />
          {mapedUsersInformations.length > 0
            ? mapedUsersInformations
            : "Brak danego klienta"}
          <ReactTooltip id="addItemUserInfo" effect="float" multiline={true}>
            <span>Dodaj wiadomość o kliencie</span>
          </ReactTooltip>
          <ReactTooltip
            id="historyItemUserInfo"
            effect="float"
            multiline={true}
          >
            <span>Rezerwacje klienta</span>
          </ReactTooltip>
          <ReactTooltip id="phoneItemUserInfo" effect="float" multiline={true}>
            <span>Pokaż numer telefonu klienta</span>
          </ReactTooltip>
          <Popup
            popupEnable={sendSMSClients}
            position="absolute"
            title="Wyślij SMS do klientów"
            borderRadius
            smallTitle
            handleClose={handleSendSMSClients}
          >
            <SendSMSClientsContent
              clients={filterUsersInformations}
              siteProps={siteProps}
              user={user}
            />
          </Popup>
        </>
      ) : (
        "Brak klientów"
      )}
    </div>
  )
}
export default WorkerUsersInformation
