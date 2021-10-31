import React, { useEffect, useState, useRef } from "react"
import { FaCar, FaChrome } from "react-icons/fa"
import { MdSearch } from "react-icons/md"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { ButtonIcon, InputIcon } from "@ui"
import {
  fetchDownloadCommuniting,
  updateDownloadCommuniting,
  addAlertItem,
} from "@state/actions"
import { useDispatch, useSelector } from "react-redux"
import { navigate } from "gatsby"
import { CSSTransition } from "react-transition-group"

const TitleIndexValue = styled.span`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  padding: 5px 10px;
  padding-left: 25px;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size: 2rem;
  letter-spacing: 0.1rem;
  text-align: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${props => Colors(props.siteProps).primaryColor};
`

const PositionInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const PositionButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
`

const WidthInput = styled.div`
  width: 600px;
  max-width: 100%;
`

const ButtonWidth = styled.div`
  width: 200px;
  max-width: 100%;
`

const ServiceDescription = styled.div`
  font-size: 1rem;
  margin-top: 10px;
  span {
    font-family: "Poppins-Bold", sans-serif;
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

const MarginButtonCompany = styled.div`
  margin-left: 5px;
`

const ButtonInline = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`

const ContentCommuniting = styled.div`
  margin-top: 40px;
`

const SearchCommuniting = ({ communitingId = null, siteProps }) => {
  const [commmunitingIdInput, setCommunitingIdInput] = useState("")
  const downloadedCommuniting = useSelector(
    state => state.downloadedCommuniting
  )
  const [disabledSwitch, setDisabledSwitch] = useState(false)
  const refInput = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!communitingId) {
      const splitCommunitingId = communitingId.split("=")
      if (splitCommunitingId.length === 2) {
        setCommunitingIdInput(splitCommunitingId[1].toUpperCase().trim())
        dispatch(
          fetchDownloadCommuniting(splitCommunitingId[1].toUpperCase().trim())
        )
        setDisabledSwitch(true)
        setTimeout(() => {
          setDisabledSwitch(false)
        }, 2000)
      }
    }
    dispatch(updateDownloadCommuniting(null))
  }, [communitingId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!refInput) {
      refInput.current.focus()
    }
  }, [refInput])

  const handleChangeInput = e => {
    setCommunitingIdInput(e.target.value.toUpperCase().trim())
  }

  const handleSearchCommuniting = () => {
    if (commmunitingIdInput.length === 24) {
      dispatch(fetchDownloadCommuniting(commmunitingIdInput))
    } else {
      dispatch(addAlertItem("Nieprawidłowy numer dojazdu.", "red"))
    }

    setDisabledSwitch(true)
    setTimeout(() => {
      setDisabledSwitch(false)
    }, 2000)
  }

  const handleClickCompany = () => {
    if (!!downloadedCommuniting) {
      if (!!downloadedCommuniting.companyId) {
        navigate(`/company?${downloadedCommuniting.companyId.linkPath}`)
      }
    }
  }

  let itemHasCompany = false
  if (!!downloadedCommuniting) {
    if (!!downloadedCommuniting.companyId) {
      itemHasCompany = true
    }
  }

  let isOldDateItem = false
  if (!!downloadedCommuniting) {
    const splitDateEndItem = downloadedCommuniting.timeEnd.split(":")
    const dateItem = new Date(
      downloadedCommuniting.year,
      downloadedCommuniting.month - 1,
      downloadedCommuniting.day,
      Number(splitDateEndItem[0]),
      Number(splitDateEndItem[1])
    )
    isOldDateItem = dateItem <= new Date()
  }

  const contentCommunitingData = !!downloadedCommuniting ? (
    <ContentCommuniting>
      <ServiceDescription>
        <ButtonInline>
          <span>Firma:</span>
          <MarginButtonCompany>
            <ButtonIcon
              title={
                itemHasCompany
                  ? downloadedCommuniting.companyId.name
                  : "Firma usunięta"
              }
              uppercase
              fontIconSize="20"
              fontSize="14"
              icon={<FaChrome />}
              onClick={handleClickCompany}
              isFetchToBlock
            />
          </MarginButtonCompany>
        </ButtonInline>
      </ServiceDescription>
      <ServiceDescription>
        <span>Miasto:</span> {downloadedCommuniting.city}
      </ServiceDescription>
      <ServiceDescription>
        <span>Adres:</span> {downloadedCommuniting.street}
      </ServiceDescription>
      <ServiceDescription>
        <span>Data:</span>{" "}
        {downloadedCommuniting.day < 10
          ? `0${downloadedCommuniting.day}`
          : downloadedCommuniting.day}
        -
        {downloadedCommuniting.month < 10
          ? `0${downloadedCommuniting.month}`
          : downloadedCommuniting.month}
        -{downloadedCommuniting.year}, {downloadedCommuniting.timeStart}
      </ServiceDescription>
      <ServiceDescription>
        <span>Koszt:</span>{" "}
        {!!downloadedCommuniting.cost
          ? `${downloadedCommuniting.cost} zł`
          : "Brak ceny"}
      </ServiceDescription>
      <ServiceDescription>
        <span>Status: </span>
        {!!downloadedCommuniting.isDeleted ? (
          <StatusService canceled={true} siteProps={siteProps}>
            Dojazd usunięty
          </StatusService>
        ) : downloadedCommuniting.statusValue === 4 ? (
          <StatusService canceled={true} siteProps={siteProps}>
            Dojazd odwołany
          </StatusService>
        ) : downloadedCommuniting.statusValue === 5 ? (
          <StatusService canceled={true} siteProps={siteProps}>
            Dojazd nie zrealizowany
          </StatusService>
        ) : downloadedCommuniting.statusValue === 2 && !isOldDateItem ? (
          <StatusService startValue={true} siteProps={siteProps}>
            W drodze
          </StatusService>
        ) : downloadedCommuniting.statusValue === 3 || isOldDateItem ? (
          <StatusService finished={true} siteProps={siteProps}>
            Dojazd zakończony
          </StatusService>
        ) : (
          downloadedCommuniting.statusValue === 1 && (
            <StatusService noStartValue={true} siteProps={siteProps}>
              Dojazd zaplanowany
            </StatusService>
          )
        )}
      </ServiceDescription>
    </ContentCommuniting>
  ) : (
    <div></div>
  )

  return (
    <>
      <TitleIndexValue>Znajdz dojazd</TitleIndexValue>
      <PositionInput>
        <WidthInput>
          <InputIcon
            icon={<FaCar />}
            placeholder="Numer dojazdu"
            value={commmunitingIdInput}
            type="text"
            onChange={handleChangeInput}
            validText="Pole wymagane, 24 znaki"
            refInput={refInput}
          />
          <PositionButton>
            <ButtonWidth>
              <ButtonIcon
                title="Szukaj"
                uppercase
                fontIconSize="30"
                fontSize="10"
                icon={<MdSearch />}
                onClick={handleSearchCommuniting}
                disabled={disabledSwitch || !!!commmunitingIdInput}
                isFetchToBlock
              />
            </ButtonWidth>
          </PositionButton>

          <CSSTransition
            in={!!downloadedCommuniting}
            timeout={400}
            classNames="popup"
            unmountOnExit
          >
            {contentCommunitingData}
          </CSSTransition>
        </WidthInput>
      </PositionInput>
    </>
  )
}
export default SearchCommuniting
