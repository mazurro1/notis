import React, { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Colors } from "../../common/Colors"
import styled from "styled-components"

const ChartStyle = styled.div`
  margin-top: 20px;
  .recharts-legend-wrapper {
    bottom: -20px !important;
  }
`

const CustomTooltipStyle = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 5px;
  padding: 10px 20px;
`

const WrappLegend = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const LegendItemStyle = styled.div`
  margin: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ColorLegend = styled.div`
  display: inline-block;
  height: 20px;
  width: 30px;
  margin-right: 5px;
  background-color: ${props => props.color};
`

const ChartReserwationsErnings = ({
  statsWidth,
  companyStats,
  siteProps,
  companyName = "Firma",
}) => {
  const [dataToChar, setDataToChar] = useState([])
  useEffect(() => {
    const allStats = []
    const filterCompanyStatsNoActiveAndDate = companyStats.filter(item => {
      const actualDate = new Date()
      const splitDateEnd = item.dateEnd.split(":")
      const dateItem = new Date(
        item.dateYear,
        item.dateMonth - 1,
        item.dateDay,
        Number(splitDateEnd[0]),
        Number(splitDateEnd[1])
      )
      if (
        item.visitCanceled ||
        item.visitNotFinished ||
        actualDate < dateItem
      ) {
        return false
      } else {
        return true
      }
    })

    filterCompanyStatsNoActiveAndDate.forEach(state => {
      const findIndexAllCompany = allStats.findIndex(
        item => item.userId === "company"
      )
      if (findIndexAllCompany >= 0) {
        allStats[findIndexAllCompany].allCosts =
          allStats[findIndexAllCompany].allCosts + state.costReserwation
        allStats[findIndexAllCompany].countReserwations =
          allStats[findIndexAllCompany].countReserwations + 1
      } else {
        const dateToChar = {
          allCosts: state.costReserwation,
          countReserwations: 1,
          userId: "company",
          user: companyName.toUpperCase(),
        }
        allStats.push(dateToChar)
      }

      const findIndexInAllStats = allStats.findIndex(
        item => item.userId === state.toWorkerUserId._id
      )
      if (findIndexInAllStats >= 0) {
        allStats[findIndexInAllStats].allCosts =
          allStats[findIndexInAllStats].allCosts + state.costReserwation
        allStats[findIndexInAllStats].countReserwations =
          allStats[findIndexInAllStats].countReserwations + 1
      } else {
        const userSurname = Buffer.from(
          state.toWorkerUserId.surname,
          "base64"
        ).toString("ascii")

        const userName = Buffer.from(
          state.toWorkerUserId.name,
          "base64"
        ).toString("ascii")

        const dateToChar = {
          allCosts: state.costReserwation,
          countReserwations: 1,
          userId: state.toWorkerUserId._id,
          user: `${userName} ${userSurname}`,
        }
        allStats.push(dateToChar)
      }
    })
    setDataToChar(allStats)
  }, [companyStats]) // eslint-disable-line react-hooks/exhaustive-deps

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltipStyle className="custom-tooltip">
          <div>{label}</div>
          <div className="label">{`Uzbierane pieniądze : ${payload[0].value} zł`}</div>
          <div className="label">{`Liczba rezerwacji : ${payload[1].value}`}</div>
        </CustomTooltipStyle>
      )
    }

    return null
  }

  const renderCusomizedLegend = props => {
    const { payload } = props
    const mapLegend = payload.map((item, index) => {
      return (
        <LegendItemStyle key={index}>
          <ColorLegend color={item.color} /> {item.payload.dataName}
        </LegendItemStyle>
      )
    })
    return <WrappLegend>{mapLegend}</WrappLegend>
  }

  return (
    <ChartStyle>
      <BarChart
        width={statsWidth}
        height={400}
        data={dataToChar}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="user" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={renderCusomizedLegend} />
        <Bar
          dataKey="allCosts"
          dataName="Uzbierana kwota"
          fill={Colors(siteProps).primaryColor}
        />
        <Bar
          dataKey="countReserwations"
          dataName="Liczba rezerwacji"
          fill={Colors(siteProps).primaryColorDark}
        />
      </BarChart>
    </ChartStyle>
  )
}
export default ChartReserwationsErnings
