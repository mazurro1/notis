import React from "react"
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

const ChartReserwationsStats = ({
  statsWidth,
  siteProps,
  allLabels = [],
  dataToChar,
}) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const mapPayload = payload.map((item, index) => {
        return (
          <div
            key={index}
          >{`${allLabels[index].label} : ${item.value} ${allLabels[index].extraValueLabel}`}</div>
        )
      })
      return (
        <CustomTooltipStyle>
          <div>{label}</div>
          {mapPayload}
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

  const mapBars = allLabels.map((label, index) => {
    return (
      <Bar
        dataKey={label.dataKey}
        dataName={label.label}
        fill={Colors(siteProps)[label.color]}
        key={index}
      />
    )
  })

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
        {mapBars}
      </BarChart>
    </ChartStyle>
  )
}
export default ChartReserwationsStats
