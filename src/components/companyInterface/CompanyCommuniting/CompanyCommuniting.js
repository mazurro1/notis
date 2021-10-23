import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { AllMonths } from "@common/AllMonths"
import { Site } from "@common/Site"
import { useDispatch, useSelector } from "react-redux"
import { ButtonIcon, Popup, SelectCreated } from "@ui"
import { FaCar } from "react-icons/fa"
import CompanyCommunitingAdd from "./CompanyCommunitingAdd"
import {
  fetchGetCompanyCommunitings,
  fetchResetCompanyCommunitings,
} from "@state/actions"
import CompanyCommunitingDate from "./CompanyCommunitingDate"
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
  margin-top: 10px;
  @media all and (max-width: ${Site.mobileSize + "px"}) {
    width: 100%;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 10px;
  }
`

const CompanyCommuniting = ({
  siteProps,
  user,
  workerHasAccessCommunitings,
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
  const [addCommunitingVisible, setAddCommunitingVisible] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState(null)
  const companyCommunitings = useSelector(state => state.companyCommunitings)
  const resetCompanyCommunitings = useSelector(
    state => state.resetCompanyCommunitings
  )

  const dispatch = useDispatch()

  useEffect(() => {
    sal({
      threshold: 0.1,
      once: true,
    })
  }, [
    companyCommunitings,
    resetCompanyCommunitings,
    yearPicker,
    monthPicker,
    selectedWorker,
  ])

  useEffect(() => {
    if (!!monthPicker) {
      dispatch(
        fetchGetCompanyCommunitings(
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
    if (resetCompanyCommunitings) {
      setAddCommunitingVisible(false)
      dispatch(fetchResetCompanyCommunitings())
    }
  }, [resetCompanyCommunitings]) // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleAddCommuniting = () => {
    setAddCommunitingVisible(prevState => !prevState)
  }

  const handleChangeSelectedWorker = value => {
    if (workerHasAccessCommunitings) {
      setSelectedWorker(value)
    }
  }

  const dateWithCommunitings = []

  companyCommunitings.communitings.forEach(
    (itemCommuniting, indexCommuniting) => {
      const validDate = `${
        itemCommuniting.day < 10
          ? `0${itemCommuniting.day}`
          : itemCommuniting.day
      }-${
        itemCommuniting.month < 10
          ? `0${itemCommuniting.month}`
          : itemCommuniting.month
      }-${itemCommuniting.year}`

      const indexInDateWithCommunitings = dateWithCommunitings.findIndex(
        itemDate => itemDate.dateCommuniting === validDate
      )
      if (indexInDateWithCommunitings >= 0) {
        dateWithCommunitings[indexInDateWithCommunitings].items.push(
          itemCommuniting
        )
      } else {
        const newDateWithCommuniting = {
          dateCommuniting: validDate,
          items: [itemCommuniting],
        }
        dateWithCommunitings.push(newDateWithCommuniting)
      }
    }
  )

  dateWithCommunitings.sort((a, b) => {
    const splitDateFirst = a.dateCommuniting.split("-")
    const splitDateSecond = b.dateCommuniting.split("-")
    const firstItemToSort = new Date(
      Number(splitDateFirst[0]),
      Number(splitDateFirst[1]),
      Number(splitDateFirst[2])
    )
    const secondItemToSort = new Date(
      Number(splitDateSecond[0]),
      Number(splitDateSecond[1]),
      Number(splitDateSecond[2])
    )
    if (firstItemToSort < secondItemToSort) return -1
    if (firstItemToSort > secondItemToSort) return 1
    return 0
  })

  let workersWithOwner = []
  if (!!companyCommunitings.workers) {
    const filterWorkers = companyCommunitings.workers.filter(filterWorker => {
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

  const mapDateCommunitings = dateWithCommunitings.map(
    (itemCommuniting, indexCommuniting) => {
      return (
        <CompanyCommunitingDate
          key={indexCommuniting}
          itemCommuniting={itemCommuniting}
          siteProps={siteProps}
          user={user}
          workerHasAccessCommunitings={workerHasAccessCommunitings}
          resetCompanyCommunitings={resetCompanyCommunitings}
          workersWithOwner={workersWithOwner}
          workerHasAccessClientsOpinions={workerHasAccessClientsOpinions}
          addCommunitingVisible={addCommunitingVisible}
        />
      )
    }
  )

  return (
    <div>
      <PositionSelectAll>
        {workerHasAccessCommunitings ? (
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
            title="Dodaj dojazd"
            uppercase
            fontIconSize="20"
            fontSize="16"
            secondColors
            icon={<FaCar />}
            onClick={handleAddCommuniting}
          />
        </StyleButtonAdd>
      </PositionSelectAllEnd>
      <Popup
        popupEnable={addCommunitingVisible}
        closeTitle={false}
        title="Dodaj dojazd"
        position="absolute"
        borderRadius
        smallTitle
      >
        <CompanyCommunitingAdd
          handleClose={handleAddCommuniting}
          siteProps={siteProps}
          user={user}
          workersWithOwner={workersWithOwner}
          workerHasAccessCommunitings={workerHasAccessCommunitings}
          selectedWorkerId={
            !!selectedWorker ? selectedWorker.value : user.userId
          }
        />
      </Popup>
      {companyCommunitings.communitings.length > 0 ? (
        mapDateCommunitings
      ) : (
        <PositionNoDate siteProps={siteProps}>Brak dojazdów</PositionNoDate>
      )}
    </div>
  )
}
export default CompanyCommuniting
