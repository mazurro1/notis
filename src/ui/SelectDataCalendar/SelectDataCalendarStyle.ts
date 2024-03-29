import styled from "styled-components"
import { Colors } from "@common/Colors"
import { SitePropsInterface } from "@common/types"

export const StyleSimpleReactCalendar = styled.div<{
  siteProps: SitePropsInterface
}>`
  position: relative;
  transform: translate(0px, 0px) !important;
  opacity: 1;
  .date_picker {
    background-color: ${props => Colors(props.siteProps).calendarBackground};
    max-width: 300px;
    min-height: 420px;
    box-shadow: 0 0 35px 10px rgba(0, 0, 0, 0.2);
    opacity: 1;
    border: none;
  }

  .date_picker-month_header_title {
    color: ${props => Colors(props.siteProps).calendarActiveDate};
  }

  .date_picker-week-day {
    background-color: transparent;
  }
  .date_picker-week-day.is-selectable {
    &:hover {
      background-color: ${props => Colors(props.siteProps).primaryColorDark};
      color: ${props => Colors(props.siteProps).textNormalWhite};
    }
  }

  .date_picker-week-day.is-not_selectable {
    color: ${props => Colors(props.siteProps).calendarDisabledDate} !important;
  }

  .is-disabled {
    background-color: #e0e0e0 !important;
    border-radius: 50%;
    cursor: no-drop;
  }

  .is-selected {
    background-color: #e0e0e0;
    border: none !important;
  }

  .is-selected:hover {
    background-color: #e0e0e0 !important;
  }

  .date_picker-week-day.is-selectable:hover:not(.is-selected) {
    box-shadow: none;
  }

  .date_picker-week-day.is-selected.is-end_selection {
    background-color: #e0e0e0;
  }
  .date_picker-week-day.is-selected.is-start_selection {
    background-color: #e0e0e0;
  }

  .date_picker-week-day.is-selected::before {
    background-color: ${props =>
      Colors(props.siteProps).primaryColorDark} !important;
    box-shadow: none;
  }
  .date_picker-week-day.is-selected:hover::before {
    background-color: ${props =>
      Colors(props.siteProps).primaryColor} !important;
    box-shadow: none;
  }

  .date_picker-header_button {
    transition-property: background-color, color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    background-color: ${props => Colors(props.siteProps).primaryColorDark};
    border: none;
    color: ${props => Colors(props.siteProps).textNormalWhite} !important;
    &:hover {
      background-color: ${props => Colors(props.siteProps).primaryColor};
    }
  }
  .date_picker-header_button.is-next:before,
  .date_picker-header_button.is-prev:before {
    color: ${props => Colors(props.siteProps).textNormalWhite} !important;
  }
`
