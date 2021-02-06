import React from "react"
import ReactTooltip from "react-tooltip"
import styled from "styled-components"

const FullHeightContent = styled.div`
  height: 100%;
  padding: 2px 5px;
`

const SpanTime = styled.span`
  font-size: 0.8rem;
`

const NewEventView = event => {
  const dateStart = `${
    event.event.start.getHours() < 10
      ? `0${event.event.start.getHours()}`
      : event.event.start.getHours()
  }:${
    event.event.start.getMinutes() < 10
      ? `0${event.event.start.getMinutes()}`
      : event.event.start.getMinutes()
  }`
  const dateEnd = `${
    event.event.end.getHours() < 10
      ? `0${event.event.end.getHours()}`
      : event.event.end.getHours()
  }:${
    event.event.end.getMinutes() < 10
      ? `0${event.event.end.getMinutes()}`
      : event.event.end.getMinutes()
  }`
  return (
    <>
      <FullHeightContent data-tip data-for={`tooltip${event.event._id}`}>
        <SpanTime>{`${dateStart} - ${dateEnd} `}</SpanTime>
        <span>{event.title}</span>
      </FullHeightContent>
      <ReactTooltip
        id={`tooltip${event.event._id}`}
        effect="float"
        multiline={true}
      >
        <span>{`${dateStart} - ${dateEnd} ${event.title}`}</span>
      </ReactTooltip>
    </>
  )
}
export default NewEventView
