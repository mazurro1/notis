import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getCompanyTransactionHistory,
  sendInvoiceToCompanyEmail,
} from "../state/actions"
import getStripe from "../common/stripejs"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import TransactionHistoryItem from "./TransactionHistoryItem"

const ItemHistory = styled.div`
  border-radius: 5px;
  background-color: ${props =>
    props.success
      ? Colors(props.siteProps).successColorLight
      : Colors(props.siteProps).dangerLightColor};
  color: ${props => Colors(props.siteProps).textNormalBlack};
`

const NoHistory = styled.div`
  margin: 20px 0;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  text-align: center;
  font-family: "Poppins-Medium", sans-serif;
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

  const handleSendInvoiceToEmail = invoiceId => {
    dispatch(sendInvoiceToCompanyEmail(user.token, user.company._id, invoiceId))
  }

  const mapedHistory = companyTransactionHistory.map((item, index) => {
    let summaryPrice = 0
    let summarySMS = 0
    let summaryPremium = 0
    if (!!item.productsInfo) {
      item.productsInfo.forEach(productInfo => {
        if (!!productInfo.price) {
          summaryPrice = summaryPrice + productInfo.price
        }
        if (!!productInfo.sms) {
          summarySMS = summarySMS + productInfo.sms
        }
        if (!!productInfo.premium) {
          summaryPremium = summaryPremium + productInfo.premium
        }
      })
    }
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
    }, ${
      datePayment.getDate() < 10
        ? `0${datePayment.getDate()}`
        : datePayment.getDate()
    }-${
      datePayment.getMonth() + 1 < 10
        ? `0${datePayment.getMonth() + 1}`
        : datePayment.getMonth() + 1
    }-${datePayment.getFullYear()}`

    const renderDateDay = `${
      datePayment.getDate() < 10
        ? `0${datePayment.getDate()}`
        : datePayment.getDate()
    }-${
      datePayment.getMonth() + 1 < 10
        ? `0${datePayment.getMonth() + 1}`
        : datePayment.getMonth() + 1
    }-${datePayment.getFullYear()}`

    let invoiceLink = null
    let invoiceId = null
    if (!!item.invoiceId) {
      invoiceId = item.invoiceId._id
      if (!!item.invoiceId.link) {
        invoiceLink = item.invoiceId.link
      }
    }
    const mapNameHistoryItem = item.productsInfo.map((itemName, indexName) => {
      return (
        <div className="nameHistoryItem" key={indexName}>
          {itemName.name}
        </div>
      )
    })
    return (
      <TransactionHistoryItem
        key={index}
        ItemHistory={ItemHistory}
        itemPaid={itemPaid}
        siteProps={siteProps}
        mapNameHistoryItem={mapNameHistoryItem}
        summarySMS={summarySMS}
        summaryPremium={summaryPremium}
        summaryPrice={summaryPrice}
        handleCheckout={handleCheckout}
        item={item}
        invoiceLink={invoiceLink}
        handleSendInvoiceToEmail={handleSendInvoiceToEmail}
        renderDate={renderDate}
        invoiceId={invoiceId}
      />
    )
  })

  return (
    <div>
      {companyTransactionHistory.length > 0 ? (
        mapedHistory
      ) : (
        <NoHistory siteProps={siteProps}>Brak histori</NoHistory>
      )}
    </div>
  )
}
export default TransactionHistory
