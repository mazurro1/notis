import React from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { useDispatch } from "react-redux"
import { fetchResetUserMenu } from "../state/actions"
import { navigate } from "gatsby"
import { FaChrome } from "react-icons/fa"
import ButtonIcon from "./ButtonIcon"

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

const ButtonInline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`

const ServiceDescription = styled.div`
  font-size: 1rem;
  margin-top: 10px;
  span {
    font-family: "Poppins-Bold", sans-serif;
  }
`

const MarginButtonCompany = styled.div`
  margin-left: 5px;
`

const LeftContent = styled.div`
  max-width: 100%;
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

const UserHistoryServicesCategoryItem = ({ item, siteProps, itemIndex }) => {
  const dispatch = useDispatch()

  const handleClickCompany = () => {
    if (!!item.companyId) {
      navigate(`/company?${item.companyId.linkPath}`)
      dispatch(fetchResetUserMenu(true))
    }
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

  return (
    <ServiceItem
      index={itemIndex === 0}
      siteProps={siteProps}
      noStartValue={item.statusValue === 1}
      startValue={item.statusValue === 2}
      finished={item.statusValue === 3}
      canceled={item.statusValue === 4}
    >
      <LeftContent>
        <ServiceDescription>
          <ButtonInline>
            <span>Firma:</span>
            <MarginButtonCompany>
              <ButtonIcon
                title={
                  !!item.companyId ? item.companyId.name : "Firma usunięta"
                }
                uppercase
                fontIconSize="20"
                fontSize="14"
                icon={<FaChrome />}
                onClick={handleClickCompany}
              />
            </MarginButtonCompany>
          </ButtonInline>
        </ServiceDescription>
        <ServiceDescription>
          <span>Przedmiot:</span> {item.objectName}
        </ServiceDescription>
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
    </ServiceItem>
  )
}
export default UserHistoryServicesCategoryItem
