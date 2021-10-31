import React, { useState, useEffect, useRef } from "react"
import { AllMonths } from "@common/AllMonths"
import { Colors } from "@common/Colors"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { ButtonIcon, SelectCreated } from "@ui"
import { fetchCompanyStaticts, resetCompanyStats } from "@state/actions"
import ChartReserwationsStats from "./Charts/ChartReserwationsStats"
import { ChartsAdmin } from "@common/Charts"
import {
  chartErnings,
  chartResState,
  chartServicesState,
  chartMonthsState,
  chartSMSState,
  chartSMSStateAll,
  chartCompanyServices,
  chartCompanyCommunitings,
} from "./Charts/FunctionsChart"

import { FaSearch } from "react-icons/fa"
const ButtonsPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
`

const MarginSelect = styled.div`
  margin: 5px;
  width: 30%;
  @media all and (max-width: 767px) {
    width: 100%;
  }
`

const MarginSelectChar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  height: 80px;
`

const NoElementsInfo = styled.div`
  font-family: "Poppins-Medium", sans-serif;
  margin-top: 50px;
  text-align: center;
  text-transform: uppercase;
`

const CompanyStatistics = ({ siteProps, user }) => {
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
  ]
  const [yearPicker, setYearPicker] = useState({
    value: new Date().getFullYear(),
    label: new Date().getFullYear(),
  })
  const [monthPicker, setMonthPicker] = useState([
    {
      value: 1,
      label: "Styczeń",
    },
  ])
  const [chartPicker, setChartPicker] = useState(null)
  const [searchStats, setSearchStats] = useState(false)
  const [disabledSwitch, setDisabledSwitch] = useState(false)
  const [dataToChar, setDataToChar] = useState([])
  const [labelsToChar, setLabelsToChar] = useState([])
  const [statsWidth, setStatsWidth] = useState(300)
  const refChart = useRef(null)
  const companyStats = useSelector(state => state.companyStats)
  const dispatch = useDispatch()

  const isAdmin = user.userId === user.company.owner

  useEffect(() => {
    dispatch(resetCompanyStats())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!companyStats && chartPicker) {
      let statsConvertedCharts = null
      if (chartPicker.value === 1) {
        statsConvertedCharts = chartErnings(
          companyStats.stats,
          user.company.name,
          isAdmin
        )
      } else if (chartPicker.value === 2) {
        statsConvertedCharts = chartResState(
          companyStats.stats,
          user.company.name,
          isAdmin
        )
      } else if (chartPicker.value === 3) {
        statsConvertedCharts = chartServicesState(
          companyStats.stats,
          companyStats.services,
          isAdmin
        )
      } else if (chartPicker.value === 4) {
        statsConvertedCharts = chartMonthsState(
          companyStats.stats,
          AllMonths,
          isAdmin
        )
      } else if (chartPicker.value === 5) {
        statsConvertedCharts = chartSMSState(
          companyStats.stats,
          user.company.name,
          isAdmin
        )
      } else if (chartPicker.value === 6) {
        statsConvertedCharts = chartSMSStateAll(
          companyStats.raportSMS,
          AllMonths,
          isAdmin
        )
      } else if (chartPicker.value === 7) {
        statsConvertedCharts = chartCompanyServices(
          companyStats.raportServices,
          user.company.name,
          isAdmin
        )
      } else if (chartPicker.value === 8) {
        statsConvertedCharts = chartCompanyCommunitings(
          companyStats.raportCommunitings,
          user.company.name,
          isAdmin
        )
      }

      if (!!statsConvertedCharts) {
        setDataToChar(statsConvertedCharts.allStats)
        setLabelsToChar(statsConvertedCharts.allLabels)
      } else {
        setDataToChar([])
        setLabelsToChar([])
      }
    } else {
      setDataToChar([])
      setLabelsToChar([])
    }
  }, [companyStats, chartPicker]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setChartPicker(ChartsAdmin[0])
  }, [setChartPicker])

  useEffect(() => {
    if (searchStats) {
      const mapMonths = monthPicker.map(item => item.value)
      dispatch(
        fetchCompanyStaticts(
          user.token,
          user.company._id,
          mapMonths,
          yearPicker.value
        )
      )
    }
    setSearchStats(false)

    if (!!refChart) {
      if (!!refChart.current) {
        setStatsWidth(refChart.current.offsetWidth)
      }
    }
  }, [searchStats]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeYear = value => {
    const validValue = !!value
      ? value
      : {
          value: new Date().getFullYear(),
          label: new Date().getFullYear(),
        }
    setYearPicker(validValue)
  }

  const handleChangeMonth = value => {
    const validValieMonth =
      value.length > 0
        ? value
        : [
            {
              value: 1,
              label: "Styczeń",
            },
          ]
    setMonthPicker(validValieMonth)
  }

  const handleSearchStats = () => {
    setSearchStats(true)
    setDisabledSwitch(true)
    setTimeout(() => {
      setDisabledSwitch(false)
    }, 2000)
  }

  const handleChangeChartPicker = value => {
    const validValue = !!value ? value : null
    setChartPicker(validValue)
  }

  return (
    <div ref={refChart}>
      <ButtonsPosition>
        <MarginSelect>
          <SelectCreated
            options={allYears}
            value={yearPicker}
            handleChange={handleChangeYear}
            placeholder="Wybrany rok"
            defaultMenuIsOpen={false}
            isClearable={false}
            widthAuto
            deleteItem={false}
            closeMenuOnSelect
            isDisabled={disabledSwitch}
            textUp
          />
        </MarginSelect>
        <MarginSelect>
          <SelectCreated
            options={AllMonths}
            value={monthPicker}
            handleChange={handleChangeMonth}
            placeholder="Wybrane miesiące"
            defaultMenuIsOpen={false}
            isClearable={false}
            widthAuto
            isMulti
            isDisabled={disabledSwitch}
            textUp
            closeMenuOnSelect={false}
          />
        </MarginSelect>
        <MarginSelect>
          <ButtonIcon
            title="Szukaj"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaSearch />}
            onClick={handleSearchStats}
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
            disabled={disabledSwitch}
            isFetchToBlock
          />
        </MarginSelect>
      </ButtonsPosition>
      <MarginSelectChar>
        <SelectCreated
          options={ChartsAdmin}
          value={chartPicker}
          handleChange={handleChangeChartPicker}
          placeholder="Wybierz wykres"
          defaultMenuIsOpen={false}
          isClearable={false}
          widthAuto
          textUp
          deleteItem={true}
          closeMenuOnSelect
        />
      </MarginSelectChar>
      {!!companyStats ? (
        !!chartPicker && dataToChar.length > 0 ? (
          <ChartReserwationsStats
            statsWidth={statsWidth}
            siteProps={siteProps}
            dataToChar={dataToChar}
            allLabels={labelsToChar}
          />
        ) : (
          <NoElementsInfo>Brak danych</NoElementsInfo>
        )
      ) : (
        <NoElementsInfo>Brak informacji</NoElementsInfo>
      )}
    </div>
  )
}
export default CompanyStatistics
