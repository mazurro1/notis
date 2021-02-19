import React, { useState, useEffect, useRef } from "react"
import { AllMonths } from "../common/AllMonths"
import SelectCreated from "./SelectCreated"
import { Colors } from "../common/Colors"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import ButtonIcon from "./ButtonIcon"
import { fetchCompanyStaticts } from "../state/actions"
import ChartReserwationsStats from "./Charts/ChartReserwationsStats"
import { ChartsAdmin } from "../common/Charts"
import { chartErnings, chartResState } from "./Charts/FunctionsChart"

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

  useEffect(() => {
    if (!!companyStats && chartPicker) {
      let statsConvertedCharts = null
      if (chartPicker.value === 1) {
        statsConvertedCharts = chartErnings(companyStats, user.company.name)
      } else if (chartPicker.value === 2) {
        statsConvertedCharts = chartResState(companyStats, user.company.name)
      }

      if (!!statsConvertedCharts) {
        setDataToChar(statsConvertedCharts.allStats)
        setLabelsToChar(statsConvertedCharts.allLabels)
      } else {
        setDataToChar([])
        setLabelsToChar([])
      }
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

  console.log(companyStats)

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
        !!chartPicker && (
          <ChartReserwationsStats
            statsWidth={statsWidth}
            companyStats={companyStats}
            siteProps={siteProps}
            dataToChar={dataToChar}
            allLabels={labelsToChar}
          />
        )
      ) : (
        <NoElementsInfo>Brak informacji</NoElementsInfo>
      )}
    </div>
  )
}
export default CompanyStatistics