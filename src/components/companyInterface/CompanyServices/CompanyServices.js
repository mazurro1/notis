import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { AllMonths } from "@common/AllMonths"
import { Site } from "@common/Site"
import { useDispatch, useSelector } from "react-redux"
import { ButtonIcon, Popup, SelectCreated } from "@ui"
import { FaTools } from "react-icons/fa"
import CompanyServicesAdd from "./CompanyServicesAdd"
import {
  fetchGetCompanyServices,
  fetchResetCompanyServices,
} from "@state/actions"
import CompanyServicesDate from "./CompanyServicesDate"
import sal from "sal.js"
import { Colors } from "@common/Colors"

const PositionSelectAll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`

const PositionSelectAllEnd = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    width: 100%;
  }
`

const WidthSelectWorkers = styled.div`
  margin-right: 20px;
  margin-top: 10px;
  width: 300px;

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    width: 100%;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 10px;
  }
`

const WidthSelect = styled.div`
  width: 160px;
  margin-right: 20px;
  margin-top: 10px;

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    width: 100%;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 10px;
  }
`

const WidthSelectNoMargin = styled.div`
  width: 160px;
  margin-top: 10px;

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    width: 100%;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 10px;
  }
`

const PositionNoDate = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
  font-size: 1rem;
  font-family: "Poppins-Bold", sans-serif;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`

const StyleButtonAdd = styled.div`
  width: 160px;
  margin-top: 10px;
  @media all and (max-width: ${Site.mobileSize + "px"}) {
    width: 100%;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 10px;
  }
`

const CompanyServices = ({
  siteProps,
  user,
  workerHasAccessServices,
  workerHasAccessClientsOpinions,
}) => {
  const allYears = [
    {
      value: new Date().getFullYear() - 2,
      label: new Date().getFullYear() - 2,
    },
    {
      value: new Date().getFullYear() - 1,
      label: new Date().getFullYear() - 1,
    },
    {
      value: new Date().getFullYear(),
      label: new Date().getFullYear(),
    },
    {
      value: new Date().getFullYear() + 1,
      label: new Date().getFullYear() + 1,
    },
  ]
  const [yearPicker, setYearPicker] = useState({
    value: new Date().getFullYear(),
    label: new Date().getFullYear(),
  })
  const [monthPicker, setMonthPicker] = useState(null)
  const [disabledSwitch, setDisabledSwitch] = useState(false)
  const [addServiceVisible, setAddServiceVisible] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState(null)
  const companyServices = useSelector(state => state.companyServices)
  const resetCompanyServices = useSelector(state => state.resetCompanyServices)

  const dispatch = useDispatch()

  useEffect(() => {
    sal({
      threshold: 0.1,
      once: true,
    })
  }, [
    companyServices,
    resetCompanyServices,
    yearPicker,
    monthPicker,
    selectedWorker,
  ])

  useEffect(() => {
    if (!!monthPicker) {
      dispatch(
        fetchGetCompanyServices(
          user.token,
          user.company._id,
          yearPicker.value,
          monthPicker.value,
          selectedWorker.value
        )
      )
    }
  }, [yearPicker, monthPicker, selectedWorker]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (resetCompanyServices) {
      setAddServiceVisible(false)
      dispatch(fetchResetCompanyServices())
    }
  }, [resetCompanyServices]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const actualMonth = new Date().getMonth() + 1
    const findMonth = AllMonths.find(item => item.value === actualMonth)
    setMonthPicker(findMonth)

    setSelectedWorker({
      value: user.userId,
      label: `${user.userName} ${user.userSurname}`,
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeYear = value => {
    const validValue = !!value
      ? value
      : {
          value: new Date().getFullYear(),
          label: new Date().getFullYear(),
        }
    setYearPicker(validValue)
    setDisabledSwitch(true)
    setTimeout(() => {
      setDisabledSwitch(false)
    }, 2000)
  }

  const handleChangeMonth = value => {
    const validValieMonth = !!value
      ? value
      : {
          value: 1,
          label: "Styczeń",
        }
    setMonthPicker(validValieMonth)
    setDisabledSwitch(true)
    setTimeout(() => {
      setDisabledSwitch(false)
    }, 2000)
  }

  const handleAddService = () => {
    setAddServiceVisible(prevState => !prevState)
  }

  const handleChangeSelectedWorker = value => {
    if (workerHasAccessServices) {
      setSelectedWorker(value)
    }
  }

  const dateWithServices = []

  companyServices.services.forEach((itemService, indexService) => {
    const dateService = new Date(itemService.createdAt)
    const validDate = `${
      dateService.getDate() < 10
        ? `0${dateService.getDate()}`
        : dateService.getDate()
    }-${
      dateService.getMonth() + 1 < 10
        ? `0${dateService.getMonth() + 1}`
        : dateService.getMonth() + 1
    }-${dateService.getFullYear()}`

    const indexInDateWithServices = dateWithServices.findIndex(
      itemDate => itemDate.dateService === validDate
    )
    if (indexInDateWithServices >= 0) {
      dateWithServices[indexInDateWithServices].items.push(itemService)
    } else {
      const newDateWithService = {
        dateService: validDate,
        items: [itemService],
      }
      dateWithServices.push(newDateWithService)
    }
  })

  let workersWithOwner = []
  if (!!companyServices.workers) {
    const filterWorkers = companyServices.workers.filter(filterWorker => {
      if (!!filterWorker.user._id) {
        return filterWorker.user._id !== user.userId
      } else {
        return false
      }
    })

    const mapCompanyWorkers = filterWorkers.map(itemWorker => {
      const unhashedWorkerName = Buffer.from(
        itemWorker.user.name,
        "base64"
      ).toString("utf-8")
      const unhashedWorkerSurame = Buffer.from(
        itemWorker.user.surname,
        "base64"
      ).toString("utf-8")
      const newItem = {
        value: itemWorker.user._id,
        label: `${unhashedWorkerName} ${unhashedWorkerSurame}`,
      }
      return newItem
    })

    workersWithOwner = [
      {
        value: user.userId,
        label: `${user.userName} ${user.userSurname}`,
      },
      ...mapCompanyWorkers,
    ]
  }

  const mapDateServices = dateWithServices.map((itemService, indexService) => {
    return (
      <CompanyServicesDate
        key={indexService}
        itemService={itemService}
        siteProps={siteProps}
        user={user}
        workerHasAccessServices={workerHasAccessServices}
        resetCompanyServices={resetCompanyServices}
        workersWithOwner={workersWithOwner}
        workerHasAccessClientsOpinions={workerHasAccessClientsOpinions}
        addServiceVisible={addServiceVisible}
      />
    )
  })

  return (
    <div>
      <PositionSelectAll>
        {workerHasAccessServices ? (
          <WidthSelectWorkers>
            <SelectCreated
              options={workersWithOwner}
              value={selectedWorker}
              handleChange={handleChangeSelectedWorker}
              placeholder="Pracownik"
              defaultMenuIsOpen={false}
              isClearable={false}
              isDisabled={disabledSwitch}
              deleteItem={false}
              width="0"
              textUp
            />
          </WidthSelectWorkers>
        ) : (
          <div></div>
        )}
        <PositionSelectAllEnd>
          <WidthSelect>
            <SelectCreated
              options={allYears}
              value={yearPicker}
              handleChange={handleChangeYear}
              placeholder="Rok"
              defaultMenuIsOpen={false}
              isClearable={false}
              widthAuto
              isDisabled={disabledSwitch}
              deleteItem={false}
              width="auto"
              textUp
            />
          </WidthSelect>
          <WidthSelectNoMargin>
            <SelectCreated
              options={AllMonths}
              value={monthPicker}
              handleChange={handleChangeMonth}
              placeholder="Miesiąc"
              defaultMenuIsOpen={false}
              isClearable={false}
              widthAuto
              isDisabled={disabledSwitch}
              deleteItem={false}
              width="auto"
              textUp
            />
          </WidthSelectNoMargin>
        </PositionSelectAllEnd>
      </PositionSelectAll>
      <PositionSelectAllEnd>
        <StyleButtonAdd>
          <ButtonIcon
            title="Dodaj serwis"
            uppercase
            fontIconSize="20"
            fontSize="16"
            secondColors
            icon={<FaTools />}
            onClick={handleAddService}
          />
        </StyleButtonAdd>
      </PositionSelectAllEnd>
      <Popup
        popupEnable={addServiceVisible}
        closeTitle={false}
        title="Dodaj serwis"
        position="absolute"
        borderRadius
        smallTitle
      >
        <CompanyServicesAdd
          handleClose={handleAddService}
          siteProps={siteProps}
          user={user}
          workersWithOwner={workersWithOwner}
          workerHasAccessServices={workerHasAccessServices}
          selectedWorkerId={
            !!selectedWorker ? selectedWorker.value : user.userId
          }
        />
      </Popup>
      {companyServices.services.length > 0 ? (
        mapDateServices
      ) : (
        <PositionNoDate siteProps={siteProps}>Brak serwisów</PositionNoDate>
      )}
    </div>
  )
}
export default CompanyServices
