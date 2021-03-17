import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCompanyTransactionHistory } from "../state/actions"
import getStripe from "../common/stripejs"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "./ButtonIcon"
import { MdAttachMoney } from "react-icons/md"

const ItemHistory = styled.div`
  border-radius: 5px;
  background-color: ${props =>
    props.success
      ? Colors(props.siteProps).successColorLight
      : Colors(props.siteProps).dangerLightColor};
  margin: 10px;
  margin-bottom: 30px;
  color: ${props => Colors(props.siteProps).textNormalBlack};
`

const PaddingContent = styled.div`
  padding: 5px 10px;
`

const TitleHistory = styled.div`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 5px 10px;
  font-size: 1.1rem;
  background-color: ${props => Colors(props.siteProps).primaryColorDark};
  color: ${props => Colors(props.siteProps).textNormalWhite};
`

const ItemData = styled.div`
  span {
    color: ${props =>
      props.success
        ? Colors(props.siteProps).successColorDark
        : Colors(props.siteProps).dangerColorDark};
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

const TransactionHistory = ({ siteProps, user, handleClose }) => {
  const companyTransactionHistory = useSelector(
    state => state.companyTransactionHistory
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCompanyTransactionHistory(user.token, user.company._id))
  }, [])

  const handleCheckout = async sessionId => {
    if (!!sessionId) {
      try {
        const stripe = await getStripe()
        await stripe.redirectToCheckout({
          sessionId: sessionId,
        })
      } catch (e) {
        throw e
      }
    }
  }

  const mapedHistory = companyTransactionHistory.map((item, index) => {
    console.log(item)
    const itemPaid = item.status === "paid"
    let datePayment = new Date()
    if (!!item.datePayment) {
      datePayment = new Date(item.datePayment)
    }
    const renderDate = `${
      datePayment.getHours() < 10
        ? `0${datePayment.getHours()}`
        : datePayment.getHours()
    }:${
      datePayment.getMinutes() < 10
        ? `0${datePayment.getMinutes()}`
        : datePayment.getMinutes()
    } ${
      datePayment.getDate() < 10
        ? `0${datePayment.getDate()}`
        : datePayment.getDate()
    }-${
      datePayment.getMonth() + 1 < 10
        ? `0${datePayment.getMonth() + 1}`
        : datePayment.getMonth() + 1
    }-${datePayment.getFullYear()}`
    return (
      <ItemHistory key={index} success={itemPaid} siteProps={siteProps}>
        <TitleHistory siteProps={siteProps} success={itemPaid}>
          {item.productName}
        </TitleHistory>
        <PaddingContent>
          <ItemData siteProps={siteProps} success={itemPaid}>
            Monety: <span>{item.productMonets}</span>
          </ItemData>
          <ItemData siteProps={siteProps} success={itemPaid}>
            Koszt: <span>{item.productPrice}</span>
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
              />
            </ButtonPayPosition>
          )}
        </PaddingContent>
      </ItemHistory>
    )
  })

  return <div>{mapedHistory}</div>
}
export default TransactionHistory
