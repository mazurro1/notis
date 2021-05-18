import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "./ButtonIcon"
import { MdDelete } from "react-icons/md"
import { FaArrowLeft, FaChrome } from "react-icons/fa"
import Popup from "./Popup"
import { useDispatch } from "react-redux"
import { fetchUserCancelCommunity, fetchResetUserMenu } from "../state/actions"
import { navigate } from "gatsby"

const PositionButtonsCancel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

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

const MarginButtonCompany = styled.div`
  margin-left: 5px;
`

const ButtonMargin = styled.div`
  margin: 5px;
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

  @media all and (max-width: 990px) {
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
    width: 100%;
  }
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

const UserHistoryCommunitingCategoryItem = ({
  item,
  siteProps,
  itemIndex,
  user,
  resetUserHistoryCommunitings,
}) => {
  const [cancelCommunityActive, setCancelCommunityActive] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setCancelCommunityActive(false)
  }, [resetUserHistoryCommunitings])

  const handleClickCancelActive = () => {
    setCancelCommunityActive(prevState => !prevState)
  }

  const handleCancelCommunity = () => {
    dispatch(fetchUserCancelCommunity(user.token, item._id, item.reserwationId))
  }

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
          <span>Opis:</span> {item.description}
        </ServiceDescription>
        <ServiceDescription>
          <span>Godzina startu:</span> {item.timeStart}
        </ServiceDescription>
        <ServiceDescription>
          <span>Godzina końca:</span> {item.timeEnd}
        </ServiceDescription>
        <ServiceDescription>
          <span>Koszt serwisu:</span>{" "}
          {!!item.cost ? `${item.cost}zł` : "Brak ceny"}
        </ServiceDescription>
        <ServiceDescription>
          <span>Przypisany pracownik:</span> {unhashedWorkerFullName}
        </ServiceDescription>
        <ServiceDescription>
          <span>Status: </span>
          {item.statusValue === 1 ? (
            <StatusService noStartValue={true} siteProps={siteProps}>
              Dojazd zaplanowany
            </StatusService>
          ) : item.statusValue === 2 ? (
            <StatusService startValue={true} siteProps={siteProps}>
              W drodze
            </StatusService>
          ) : item.statusValue === 3 ? (
            <StatusService finished={true} siteProps={siteProps}>
              Dojazd zakończony
            </StatusService>
          ) : (
            item.statusValue === 4 && (
              <StatusService canceled={true} siteProps={siteProps}>
                Dojazd odwołany
              </StatusService>
            )
          )}
        </ServiceDescription>
      </LeftContent>
      <RightContent>
        {item.statusValue !== 4 && (
          <ButtonMargin>
            <ButtonIcon
              title="Odwołaj dojazd"
              uppercase
              fontIconSize="40"
              fontSize="14"
              icon={<MdDelete />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleClickCancelActive}
              disabled={item.statusValue === 4}
            />
          </ButtonMargin>
        )}
      </RightContent>
      <Popup
        popupEnable={cancelCommunityActive && item.statusValue !== 4}
        position="absolute"
        title="Odwołaj dojazd"
        borderRadius
        closeTitle={false}
        smallTitle
      >
        <PositionButtonsCancel>
          <ButtonMargin>
            <ButtonIcon
              title="Anuluj"
              uppercase
              fontIconSize="20"
              fontSize="14"
              icon={<FaArrowLeft />}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              onClick={handleClickCancelActive}
            />
          </ButtonMargin>
          <ButtonMargin>
            <ButtonIcon
              title="Odwołaj"
              uppercase
              fontIconSize="20"
              fontSize="14"
              icon={<MdDelete />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleCancelCommunity}
            />
          </ButtonMargin>
        </PositionButtonsCancel>
      </Popup>
    </ServiceItem>
  )
}
export default UserHistoryCommunitingCategoryItem
