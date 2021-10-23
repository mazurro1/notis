import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import {
  MdEdit,
  MdDelete,
  MdPhone,
  MdDeleteForever,
  MdArrowBack,
} from "react-icons/md"
import { ButtonIcon, Popup } from "@ui"
import { useDispatch } from "react-redux"
import { fetchCompanyDeleteService, fetchCheckUserPhone } from "@state/actions"
import CompanyServiceDataItemEdit from "./CompanyServiceDataItemEdit"
import ReactTooltip from "react-tooltip"

const ServiceItem = styled.div`
  position: relative;
  background-color: ${props =>
    props.clickDelete
      ? "#ffebee"
      : !!props.noStartValue
      ? Colors(props.siteProps).companyItemBackground
      : !!props.startValue
      ? Colors(props.siteProps).secondColorLight
      : !!props.finished
      ? Colors(props.siteProps).successColorLight
      : !!props.canceled
      ? Colors(props.siteProps).dangerLightColor
      : Colors(props.siteProps).companyItemBackground};

  padding: 10px;
  border-radius: 5px;
  border-top-left-radius: ${props => (props.index ? "0px" : "5px")};
  border-top-right-radius: ${props => (props.index ? "0px" : "5px")};
  margin: 5px 5px;
  margin-top: ${props => (props.index ? "0px" : "5px")};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;
  user-select: none;
  overflow: hidden;
  padding-bottom: ${props => (props.clickEdit ? "350px" : "auto")};
  color: ${props => Colors(props.siteProps).textNormalBlack};
  transition-property: background-color, padding-bottom, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  @media all and (max-width: 990px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const TitleService = styled.div`
  font-family: "Poppins-Bold", sans-serif;
  font-size: 1.1rem;
`

const ButtonMarginLeftNone = styled.div`
  margin: 5px;
  margin-left: 0;
`

const ServiceDescription = styled.div`
  font-size: 1rem;
  margin-top: 10px;
  span {
    font-family: "Poppins-Bold", sans-serif;
  }
`

const LeftContent = styled.div`
  max-width: 100%;
`

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media all and (max-width: 990px) {
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
    width: 100%;
  }
`

const ButtonsDeletePosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const StatusService = styled.div`
  display: inline-block;
  border-radius: 5px;
  padding: 0px 5px;
  margin-left: 5px;
  margin-top: 5px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  font-family: "Poppins-Regular", sans-serif;
  background-color: ${props =>
    !!props.noStartValue
      ? Colors(props.siteProps).primaryColor
      : !!props.startValue
      ? Colors(props.siteProps).secondColor
      : !!props.finished
      ? Colors(props.siteProps).successColor
      : !!props.canceled
      ? Colors(props.siteProps).dangerColor
      : Colors(props.siteProps).dangerColor};
`

const CompanyServiceDataItem = ({
  item,
  siteProps,
  user,
  itemIndex,
  workerHasAccessServices,
  resetCompanyServices,
  workersWithOwner,
  workerHasAccessClientsOpinions,
  addServiceVisible,
}) => {
  const [clickDelete, setClickDelete] = useState(false)
  const [clickEdit, setClickEdit] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!!resetCompanyServices) {
      setClickEdit(false)
      setClickDelete(false)
    }
  }, [resetCompanyServices, addServiceVisible])

  const handleClickEdit = () => {
    setClickEdit(prevState => !prevState)
  }

  const handleClickDelete = () => {
    setClickDelete(prevState => !prevState)
  }

  const handleConfirmDeleteItem = () => {
    dispatch(fetchCompanyDeleteService(user.token, user.company._id, item._id))
  }

  const handleCheckUserPhone = () => {
    dispatch(fetchCheckUserPhone(user.token, user.company._id, item._id))
  }

  let unhashedWorkerFullName = ""
  if (!!item.workerUserId._id) {
    const unhashedWorkerName = Buffer.from(
      item.workerUserId.name,
      "base64"
    ).toString("utf-8")

    const unhashedWorkerSurname = Buffer.from(
      item.workerUserId.surname,
      "base64"
    ).toString("utf-8")
    unhashedWorkerFullName = `${unhashedWorkerName} ${unhashedWorkerSurname}`
  }

  let unhashedClientFullName = ""
  if (!!item.userId) {
    if (!!item.userId._id) {
      const unhashedClientName = Buffer.from(
        item.userId.name,
        "base64"
      ).toString("utf-8")
      const unhashedClientSurname = Buffer.from(
        item.userId.surname,
        "base64"
      ).toString("utf-8")
      unhashedClientFullName = `${unhashedClientName} ${unhashedClientSurname}`
    }
  } else if (!!item.name && !!item.surname) {
    const unhashedClientName = Buffer.from(item.name, "base64").toString(
      "utf-8"
    )
    const unhashedClientSurname = Buffer.from(item.surname, "base64").toString(
      "utf-8"
    )
    unhashedClientFullName = `${unhashedClientName} ${unhashedClientSurname}`
  }

  const dateService = new Date(item.createdAt)
  const dateStartService = `${
    dateService.getHours() < 10
      ? `0${dateService.getHours()}`
      : dateService.getHours()
  }:${
    dateService.getMinutes() < 10
      ? `0${dateService.getMinutes()}`
      : dateService.getMinutes()
  }`

  let phoneUser = ""
  if (!!item.phone) {
    phoneUser = item.phone
  }

  return (
    <ServiceItem
      index={itemIndex === 0}
      clickDelete={clickDelete}
      clickEdit={clickEdit}
      siteProps={siteProps}
      noStartValue={item.statusValue === 1}
      startValue={item.statusValue === 2}
      finished={item.statusValue === 3}
      canceled={item.statusValue === 4}
    >
      <LeftContent>
        <TitleService>{item.objectName}</TitleService>
        <ServiceDescription>
          <span>Koszt serwisu:</span>{" "}
          {!!item.cost ? `${item.cost}zł` : "Brak ceny"}
        </ServiceDescription>
        <ServiceDescription>
          <span>Opis serwisu:</span> {item.description}
        </ServiceDescription>
        <ServiceDescription>
          <span>Godzina przyjęcia:</span> {dateStartService}
        </ServiceDescription>
        <ServiceDescription>
          <span>Przypisany pracownik:</span> {unhashedWorkerFullName}
        </ServiceDescription>
        <ServiceDescription>
          <span>Klient:</span> {unhashedClientFullName}
        </ServiceDescription>
        {!!item.phone ? (
          <ServiceDescription>
            <span>Numer do klienta:</span> {phoneUser}
          </ServiceDescription>
        ) : (
          <ButtonMarginLeftNone>
            {!workerHasAccessClientsOpinions && (
              <ReactTooltip
                id="disabledButtonAccessSeePhoneNumber"
                effect="float"
                multiline={true}
              >
                <span>Brak uprawnień do sprawdzenia numeru telefonu.</span>
              </ReactTooltip>
            )}
            <div data-tip data-for="disabledButtonAccessSeePhoneNumber">
              <ButtonIcon
                title="Zobacz numer do klienta"
                uppercase
                fontIconSize="20"
                fontSize="12"
                icon={<MdPhone />}
                onClick={handleCheckUserPhone}
                customColorButton={
                  item.statusValue === 1
                    ? Colors(siteProps).primaryColorDark
                    : item.statusValue === 2
                    ? Colors(siteProps).secondDarkColor
                    : item.statusValue === 3
                    ? Colors(siteProps).successColorDark
                    : item.statusValue === 4
                    ? Colors(siteProps).dangerColorDark
                    : Colors(siteProps).primaryColorDark
                }
                customColorIcon={
                  item.statusValue === 1
                    ? Colors(siteProps).primaryColor
                    : item.statusValue === 2
                    ? Colors(siteProps).secondColor
                    : item.statusValue === 3
                    ? Colors(siteProps).successColor
                    : item.statusValue === 4
                    ? Colors(siteProps).dangerColor
                    : Colors(siteProps).primaryColor
                }
                disabled={!workerHasAccessClientsOpinions}
              />
            </div>
          </ButtonMarginLeftNone>
        )}

        <ServiceDescription>
          <span>Status: </span>
          {item.statusValue === 1 ? (
            <StatusService noStartValue={true} siteProps={siteProps}>
              Serwis nie rozpoczęty
            </StatusService>
          ) : item.statusValue === 2 ? (
            <StatusService startValue={true} siteProps={siteProps}>
              Serwis w trakcie
            </StatusService>
          ) : item.statusValue === 3 ? (
            <StatusService finished={true} siteProps={siteProps}>
              Serwis zakończony
            </StatusService>
          ) : (
            item.statusValue === 4 && (
              <StatusService canceled={true} siteProps={siteProps}>
                Serwis odwołany
              </StatusService>
            )
          )}
        </ServiceDescription>
      </LeftContent>
      {item.statusValue !== 3 && (
        <RightContent>
          <ButtonMargin>
            <ButtonIcon
              title="Edytuj"
              uppercase
              fontIconSize="40"
              fontSize="14"
              icon={<MdEdit />}
              secondColors
              onClick={handleClickEdit}
            />
          </ButtonMargin>
          <ButtonMargin>
            <ButtonIcon
              title="Usuń"
              uppercase
              fontIconSize="40"
              fontSize="14"
              icon={<MdDelete />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleClickDelete}
            />
          </ButtonMargin>
        </RightContent>
      )}
      <Popup
        popupEnable={
          clickDelete && !addServiceVisible && item.statusValue !== 3
        }
        position="absolute"
        borderRadius
        noContent
      >
        <ButtonsDeletePosition>
          <ButtonMargin>
            <ButtonIcon
              title="Anuluj"
              uppercase
              fontIconSize="40"
              fontSize="14"
              icon={<MdArrowBack />}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              onClick={handleClickDelete}
            />
          </ButtonMargin>
          <ButtonMargin>
            <ButtonIcon
              title="Usuń"
              uppercase
              fontIconSize="20"
              fontSize="14"
              icon={<MdDeleteForever />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleConfirmDeleteItem}
            />
          </ButtonMargin>
        </ButtonsDeletePosition>
      </Popup>
      <Popup
        popupEnable={clickEdit && !addServiceVisible && item.statusValue !== 3}
        position="absolute"
        title="Edytuj usługę"
        borderRadius
        closeTitle={false}
        smallTitle
      >
        <CompanyServiceDataItemEdit
          user={user}
          siteProps={siteProps}
          item={item}
          handleClickEdit={handleClickEdit}
          workersWithOwner={workersWithOwner}
          workerHasAccessServices={workerHasAccessServices}
        />
      </Popup>
    </ServiceItem>
  )
}
export default CompanyServiceDataItem
