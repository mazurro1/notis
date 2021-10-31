import React, { useState } from "react"
import { ButtonIcon } from "@ui"
import {
  MdAttachMoney,
  MdPictureAsPdf,
  MdKeyboardArrowDown,
} from "react-icons/md"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { Collapse } from "react-collapse"

const PaddingContent = styled.div`
  padding: 5px 10px;
`

const TitleHistory = styled.div`
  position: relative;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 1.1rem;
  background-color: ${props => Colors(props.siteProps).primaryColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding: 5px 10px;
  padding-right: 50px;

  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  .nameHistoryItem {
    font-size: 0.9rem;
    padding: 2px 5px;
    border-radius: 5px;
    color: ${props => Colors(props.siteProps).textNormalWhite};
    background-color: ${props => Colors(props.siteProps).primaryColorDark};
    margin: 2px;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }

  &:hover {
    background-color: ${props =>
      props.success
        ? Colors(props.siteProps).successColorDark
        : Colors(props.siteProps).dangerColorDark};

    .nameHistoryItem {
      background-color: ${props =>
        props.success
          ? Colors(props.siteProps).successColor
          : Colors(props.siteProps).dangerColor};
    }
  }
`

const ItemData = styled.div`
  span {
    color: ${props =>
      props.success
        ? Colors(props.siteProps).successColor
        : Colors(props.siteProps).dangerColor};
  }
`

const StatusData = styled.div`
  span {
    background-color: ${props =>
      props.success
        ? Colors(props.siteProps).successColor
        : Colors(props.siteProps).dangerColor};
    color: ${props => Colors(props.siteProps).textNormalWhite};
    padding: 2px 5px;
    border-radius: 5px;
    margin: 10px 0;
    font-size: 0.9rem;
  }
  margin-bottom: 5px;
`

const ButtonPayPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 5px;
`

const WrapHistoryNames = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 70%;
`

const CircleStatus = styled.div`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  margin-right: 15px;
  background-color: ${props =>
    props.success
      ? Colors(props.siteProps).successColor
      : Colors(props.siteProps).dangerColor};
`

const PositionRelative = styled.div`
  position: relative;
  margin: 5px;
`

const PositionArrow = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transform: ${props => (props.active ? "rotate(0deg)" : "rotate(180deg)")};
  font-size: 2rem;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const TransactionHistoryItem = ({
  ItemHistory,
  itemPaid,
  siteProps,
  mapNameHistoryItem,
  summarySMS,
  summaryPremium,
  summaryPrice,
  handleCheckout,
  item,
  invoiceLink,
  handleSendInvoiceToEmail,
  renderDate,
  invoiceId,
}) => {
  const [collapseActive, setCollapseActive] = useState(false)
  const handleClickCollapse = () => {
    setCollapseActive(prevState => !prevState)
  }
  return (
    <PositionRelative>
      <ItemHistory success={itemPaid} siteProps={siteProps}>
        <TitleHistory
          siteProps={siteProps}
          success={itemPaid}
          onClick={handleClickCollapse}
        >
          <CircleStatus success={itemPaid} siteProps={siteProps} />
          <WrapHistoryNames>{mapNameHistoryItem}</WrapHistoryNames>
          <PositionArrow active={collapseActive}>
            <MdKeyboardArrowDown />
          </PositionArrow>
        </TitleHistory>
        <Collapse isOpened={collapseActive}>
          <PaddingContent>
            {!!summarySMS && (
              <ItemData siteProps={siteProps} success={itemPaid}>
                SMS-y: <span>{summarySMS}</span>
              </ItemData>
            )}
            {!!summaryPremium && (
              <ItemData siteProps={siteProps} success={itemPaid}>
                Dni konta premium: <span>{summaryPremium}</span> (
                {summaryPremium * 30} dni)
              </ItemData>
            )}
            <ItemData siteProps={siteProps} success={itemPaid}>
              Koszt: <span>{summaryPrice}zł</span>
            </ItemData>
            <ItemData siteProps={siteProps} success={itemPaid}>
              Data: <span>{renderDate}</span>
            </ItemData>
            <StatusData siteProps={siteProps} success={itemPaid}>
              Status: <span>{itemPaid ? "Zapłacono" : "Niepowodzenie"}</span>
            </StatusData>
            {!itemPaid && (
              <ButtonPayPosition>
                <ButtonIcon
                  title="Zapłać ponownie"
                  uppercase
                  fontIconSize="25"
                  fontSize="16"
                  icon={<MdAttachMoney />}
                  onClick={() => handleCheckout(item.sessionId)}
                  customColorButton={Colors(siteProps).dangerColorDark}
                  customColorIcon={Colors(siteProps).dangerColor}
                  isFetchToBlock
                />
              </ButtonPayPosition>
            )}
            {!!invoiceLink && (
              <ButtonPayPosition>
                <ButtonIcon
                  title="Pobierz fakture VAT na adres e-mail"
                  uppercase
                  fontIconSize="25"
                  fontSize="16"
                  icon={<MdPictureAsPdf />}
                  onClick={() => handleSendInvoiceToEmail(invoiceId)}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                  isFetchToBlock
                />
              </ButtonPayPosition>
            )}
          </PaddingContent>
        </Collapse>
      </ItemHistory>
    </PositionRelative>
  )
}
export default TransactionHistoryItem
