import styled from "styled-components"
import { Colors } from "@common/Colors"
import { SitePropsInterface } from "@common/types"

export const ButtonConfirmDate = styled.div<{
  siteProps: SitePropsInterface
}>`
  padding: 5px;
  background-color: ${props => Colors(props.siteProps).timePickerTopBackground};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`

export const MarginButtons = styled.div`
  margin: 5px;
`

export const MaxWidth = styled.div<{
  siteProps: SitePropsInterface
  secondColor: boolean
}>`
  .react-timekeeper {
    width: 100% !important;
  }

  .react-timekeeper__top-bar {
    background-color: ${props =>
      Colors(props.siteProps).timePickerTopBackground};
  }

  .react-timekeeper__clock-wrapper {
    background-color: ${props =>
      Colors(props.siteProps).timePickerBottomBackground};
  }

  .react-timekeeper__clock {
    background-color: ${props =>
      Colors(props.siteProps).timePickerTopBackground};
  }

  .react-timekeeper__tb-hour {
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }

  .react-timekeeper__tb-minute {
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }

  .react-timekeeper__tb-hour--active {
    color: ${props =>
      props.secondColor
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor};
  }

  .react-timekeeper__tb-minute--active {
    color: ${props =>
      props.secondColor
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor};
  }
`
