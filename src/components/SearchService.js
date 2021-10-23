import React, { useEffect, useState, useRef } from "react"
import { FaChrome, FaTools } from "react-icons/fa"
import { MdSearch } from "react-icons/md"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { ButtonIcon, InputIcon } from "@ui"
import {
  fetchDownloadService,
  updateDownloadService,
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

const ContentService = styled.div`
  margin-top: 40px;
`

const SearchService = ({ serviceId = null, siteProps }) => {
  const [serviceIdInput, setServiceIdInput] = useState("")
  const downloadedService = useSelector(state => state.downloadedService)
  const [disabledSwitch, setDisabledSwitch] = useState(false)
  const refInput = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!serviceId) {
      const splitServiceId = serviceId.split("=")
      if (splitServiceId.length === 2) {
        setServiceIdInput(splitServiceId[1].toUpperCase().trim())
        dispatch(fetchDownloadService(splitServiceId[1].toUpperCase().trim()))
        setDisabledSwitch(true)
        setTimeout(() => {
          setDisabledSwitch(false)
        }, 2000)
      }
    }
    dispatch(updateDownloadService(null))
  }, [serviceId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!refInput) {
      refInput.current.focus()
    }
  }, [refInput])

  const handleChangeInput = e => {
    setServiceIdInput(e.target.value.toUpperCase().trim())
  }

  const handleSearchService = () => {
    if (serviceIdInput.length === 24) {
      dispatch(fetchDownloadService(serviceIdInput))
    } else {
      dispatch(addAlertItem("Nieprawidłowy numer serwisu.", "red"))
    }

    setDisabledSwitch(true)
    setTimeout(() => {
      setDisabledSwitch(false)
    }, 2000)
  }

  const handleClickCompany = () => {
    if (!!downloadedService) {
      if (!!downloadedService.companyId) {
        navigate(`/company?${downloadedService.companyId.linkPath}`)
      }
    }
  }

  let itemHasCompany = false
  if (!!downloadedService) {
    if (!!downloadedService.companyId) {
      itemHasCompany = true
    }
  }

  const contentServiceData = !!downloadedService ? (
    <ContentService>
      <ServiceDescription>
        <ButtonInline>
          <span>Firma:</span>
          <MarginButtonCompany>
            <ButtonIcon
              title={
                itemHasCompany
                  ? downloadedService.companyId.name
                  : "Firma usunięta"
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
        <span>Przedmiot:</span> {downloadedService.objectName}
      </ServiceDescription>
      <ServiceDescription>
        <span>Opis:</span> {downloadedService.description}
      </ServiceDescription>
      <ServiceDescription>
        <span>Data:</span>{" "}
        {downloadedService.day < 10
          ? `0${downloadedService.day}`
          : downloadedService.day}
        -
        {downloadedService.month < 10
          ? `0${downloadedService.month}`
          : downloadedService.month}
        -{downloadedService.year}, {downloadedService.timeStart}
      </ServiceDescription>
      <ServiceDescription>
        <span>Koszt:</span>{" "}
        {!!downloadedService.cost
          ? `${downloadedService.cost} zł`
          : "Brak ceny"}
      </ServiceDescription>
      <ServiceDescription>
        <span>Status: </span>
        {!!downloadedService.isDeleted ? (
          <StatusService canceled={true} siteProps={siteProps}>
            Serwis usunięty
          </StatusService>
        ) : downloadedService.statusValue === 1 ? (
          <StatusService noStartValue={true} siteProps={siteProps}>
            Serwis nie rozpoczęty
          </StatusService>
        ) : downloadedService.statusValue === 2 ? (
          <StatusService startValue={true} siteProps={siteProps}>
            Serwis w trakcie
          </StatusService>
        ) : downloadedService.statusValue === 3 ? (
          <StatusService finished={true} siteProps={siteProps}>
            Serwis zakończony
          </StatusService>
        ) : (
          downloadedService.statusValue === 4 && (
            <StatusService canceled={true} siteProps={siteProps}>
              Serwis odwołany
            </StatusService>
          )
        )}
      </ServiceDescription>
    </ContentService>
  ) : (
    <div></div>
  )

  return (
    <>
      <TitleIndexValue>Znajdz serwis</TitleIndexValue>
      <PositionInput>
        <WidthInput>
          <InputIcon
            icon={<FaTools />}
            placeholder="Numer serwisu"
            value={serviceIdInput}
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
                onClick={handleSearchService}
                disabled={disabledSwitch || !!!serviceIdInput}
              />
            </ButtonWidth>
          </PositionButton>

          <CSSTransition
            in={!!downloadedService}
            timeout={400}
            classNames="popup"
            unmountOnExit
          >
            {contentServiceData}
          </CSSTransition>
        </WidthInput>
      </PositionInput>
    </>
  )
}
export default SearchService
