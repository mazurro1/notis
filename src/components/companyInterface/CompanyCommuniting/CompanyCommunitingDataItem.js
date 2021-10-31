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
import {
  fetchCompanyDeleteCommuniting,
  fetchCheckUserPhoneCommuniting,
} from "@state/actions"
import CompanyCommunitingDataItemEdit from "./CompanyCommunitingDataItemEdit"
import ReactTooltip from "react-tooltip"

const CommunitingItem = styled.div`
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

const TitleCommuniting = styled.div`
  font-family: "Poppins-Bold", sans-serif;
  font-size: 1.1rem;
`

const ButtonMarginLeftNone = styled.div`
  margin: 5px;
  margin-left: 0;
`

const CommunitingDescription = styled.div`
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

const StatusCommuniting = styled.div`
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

const CompanyCommunitingDataItem = ({
  item,
  siteProps,
  user,
  itemIndex,
  workerHasAccessCommunitings,
  resetCompanyCommunitings,
  workersWithOwner,
  workerHasAccessClientsOpinions,
  addCommunitingVisible,
}) => {
  const [clickDelete, setClickDelete] = useState(false)
  const [clickEdit, setClickEdit] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!!resetCompanyCommunitings) {
      setClickEdit(false)
      setClickDelete(false)
    }
  }, [resetCompanyCommunitings, addCommunitingVisible])

  const handleClickEdit = () => {
    setClickEdit(prevState => !prevState)
  }

  const handleClickDelete = () => {
    setClickDelete(prevState => !prevState)
  }

  const handleConfirmDeleteItem = () => {
    const dateItemEndValid = item.timeEnd.split(":")
    const dateItemValid = new Date(
      item.year,
      item.month - 1,
      item.day,
      Number(dateItemEndValid[0]),
      Number(dateItemEndValid[1])
    )
    const dateIsNoOldValid = dateItemValid > new Date()
    if (dateIsNoOldValid) {
      dispatch(
        fetchCompanyDeleteCommuniting(
          user.token,
          user.company._id,
          item._id,
          item.reserwationId,
          !!item.opinionId ? item.opinionId : null
        )
      )
    }
  }

  const handleCheckUserPhone = () => {
    dispatch(
      fetchCheckUserPhoneCommuniting(user.token, user.company._id, item._id)
    )
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

  let phoneUser = ""
  if (!!item.phone) {
    phoneUser = item.phone
  }
  const dateItemEnd = item.timeEnd.split(":")
  const dateItem = new Date(
    item.year,
    item.month - 1,
    item.day,
    Number(dateItemEnd[0]),
    Number(dateItemEnd[1])
  )
  const dateIsNoOld = dateItem > new Date()

  return (
    <CommunitingItem
      index={itemIndex === 0}
      clickDelete={clickDelete}
      clickEdit={clickEdit}
      siteProps={siteProps}
      noStartValue={item.statusValue === 1 && dateIsNoOld}
      startValue={item.statusValue === 2 && dateIsNoOld}
      finished={item.statusValue === 3 || !dateIsNoOld}
      canceled={item.statusValue === 4 || item.statusValue === 5}
    >
      <LeftContent>
        <TitleCommuniting>{item.objectName}</TitleCommuniting>
        <CommunitingDescription>
          <span>Opis:</span> {item.description}
        </CommunitingDescription>
        <CommunitingDescription>
          <span>Godzina startu:</span> {item.timeStart}
        </CommunitingDescription>
        <CommunitingDescription>
          <span>Godzina końca:</span> {item.timeEnd}
        </CommunitingDescription>
        <CommunitingDescription>
          <span>Koszt:</span> {!!item.cost ? `${item.cost}zł` : "Brak ceny"}
        </CommunitingDescription>
        <CommunitingDescription>
          <span>Przypisany pracownik:</span> {unhashedWorkerFullName}
        </CommunitingDescription>
        <CommunitingDescription>
          <span>Klient:</span> {unhashedClientFullName}
        </CommunitingDescription>
        <CommunitingDescription>
          <span>Adres:</span> {item.city}, {item.street}
        </CommunitingDescription>
        {!!item.phone ? (
          <CommunitingDescription>
            <span>Numer do klienta:</span> {phoneUser}
          </CommunitingDescription>
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
                  item.statusValue === 1 && dateIsNoOld
                    ? Colors(siteProps).primaryColorDark
                    : item.statusValue === 2 && dateIsNoOld
                    ? Colors(siteProps).secondDarkColor
                    : item.statusValue === 3 || !dateIsNoOld
                    ? Colors(siteProps).successColorDark
                    : item.statusValue === 4
                    ? Colors(siteProps).dangerColorDark
                    : item.statusValue === 5
                    ? Colors(siteProps).dangerColorDark
                    : Colors(siteProps).primaryColorDark
                }
                customColorIcon={
                  item.statusValue === 1 && dateIsNoOld
                    ? Colors(siteProps).primaryColor
                    : item.statusValue === 2 && dateIsNoOld
                    ? Colors(siteProps).secondColor
                    : item.statusValue === 3 || !dateIsNoOld
                    ? Colors(siteProps).successColor
                    : item.statusValue === 4
                    ? Colors(siteProps).dangerColor
                    : item.statusValue === 5
                    ? Colors(siteProps).dangerColor
                    : Colors(siteProps).primaryColor
                }
                disabled={!workerHasAccessClientsOpinions}
                isFetchToBlock
              />
            </div>
          </ButtonMarginLeftNone>
        )}

        <CommunitingDescription>
          <span>Status: </span>
          {item.statusValue === 1 && dateIsNoOld ? (
            <StatusCommuniting noStartValue={true} siteProps={siteProps}>
              Dojazd nie rozpoczęty
            </StatusCommuniting>
          ) : item.statusValue === 2 && dateIsNoOld ? (
            <StatusCommuniting startValue={true} siteProps={siteProps}>
              Dojazd w trakcie
            </StatusCommuniting>
          ) : item.statusValue === 3 || !dateIsNoOld ? (
            <StatusCommuniting finished={true} siteProps={siteProps}>
              Dojazd zakończony
            </StatusCommuniting>
          ) : item.statusValue === 4 ? (
            <StatusCommuniting canceled={true} siteProps={siteProps}>
              Dojazd odwołany
            </StatusCommuniting>
          ) : (
            item.statusValue === 5 && (
              <StatusCommuniting canceled={true} siteProps={siteProps}>
                Dojazd nie zrealizowany
              </StatusCommuniting>
            )
          )}
        </CommunitingDescription>
      </LeftContent>
      <RightContent>
        {item.statusValue !== 4 && dateIsNoOld && (
          <ButtonMargin>
            <ButtonIcon
              title="Edytuj"
              uppercase
              fontIconSize="40"
              fontSize="14"
              icon={<MdEdit />}
              secondColors
              onClick={handleClickEdit}
              disabled={item.statusValue === 4}
            />
          </ButtonMargin>
        )}
        {dateIsNoOld && (
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
              disabled={!dateIsNoOld}
              isFetchToBlock
            />
          </ButtonMargin>
        )}
      </RightContent>
      <Popup
        popupEnable={clickDelete && !addCommunitingVisible && dateIsNoOld}
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
              isFetchToBlock
            />
          </ButtonMargin>
        </ButtonsDeletePosition>
      </Popup>
      <Popup
        popupEnable={clickEdit && !addCommunitingVisible}
        position="absolute"
        title="Edytuj dojazd"
        borderRadius
        closeTitle={false}
        smallTitle
      >
        <CompanyCommunitingDataItemEdit
          user={user}
          siteProps={siteProps}
          item={item}
          handleClickEdit={handleClickEdit}
          workersWithOwner={workersWithOwner}
          workerHasAccessCommunitings={workerHasAccessCommunitings}
        />
      </Popup>
    </CommunitingItem>
  )
}
export default CompanyCommunitingDataItem
