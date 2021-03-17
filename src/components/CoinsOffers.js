import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchNewOrder, addAlertItem, getCoinsOffer } from "../state/actions"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "./ButtonIcon"
import { MdAttachMoney } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import getStripe from "../common/stripejs"
import { useStaticQuery, graphql } from "gatsby"

const ItemCoins = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).primaryColorDark};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  margin-right: 20px;
  margin-bottom: 20px;
  min-height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
  user-select: none;
  transition-property: transform, background-color, color;
  transition-timing-function: ease;
  transition-duration: 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`

const AllItemsCoins = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
`

const ContentOffers = styled.div``

const MarginButton = styled.div`
  margin: 5px;
`

const MarginButtonSubmit = styled.button`
  margin: 5px;
  border: none;
  outline: none;
  background-color: transparent;
`

const ButtonsPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`

const InfoText = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
`

const CoinsOffers = ({ siteProps, user, handleClose }) => {
  const [selectedCoins, setSelectedCoins] = useState(null)
  const checkoutPaymentItem = useSelector(state => state.checkoutPaymentItem)
  const coinsOffer = useSelector(state => state.coinsOffer)

  const {
    allStripePrice: { nodes: allProducts },
  } = useStaticQuery(graphql`
    query AllProducts {
      allStripePrice {
        nodes {
          id
          currency
          unit_amount
          unit_amount_decimal
          product {
            id
            name
            description
          }
        }
      }
    }
  `)

  const dispatch = useDispatch()

  const handleCheckout = async payment => {
    try {
      const stripe = await getStripe()
      await stripe.redirectToCheckout({
        sessionId: payment.sessionId,
      })
    } catch (e) {
      throw e
    }
  }

  useEffect(() => {
    dispatch(getCoinsOffer())
  }, [])

  useEffect(() => {
    if (!!checkoutPaymentItem) {
      handleCheckout(checkoutPaymentItem)
    }
  }, [checkoutPaymentItem])

  const handleClickCoins = coinId => {
    if (selectedCoins === coinId) {
      setSelectedCoins(null)
    } else {
      setSelectedCoins(coinId)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const selectedCoinItem = coinsOffer.find(item => item._id === selectedCoins)
    if (!!selectedCoinItem) {
      dispatch(
        fetchNewOrder(user.token, user.company._id, selectedCoinItem._id)
      )
    } else {
      dispatch(addAlertItem("Nie wybrano oferty", "red"))
    }
  }

  const mapCoinsOffers = coinsOffer.map((item, index) => {
    return (
      <ItemCoins
        key={index}
        active={item._id === selectedCoins}
        onClick={() => handleClickCoins(item._id)}
      >
        <fieldset style={{ border: "none" }}>
          <legend>
            <h4>{item.name}</h4>
          </legend>
          <label>
            <div>Monety: {item.countCoins}</div>
            <div>Cena: {item.price}zł</div>
            <div>Opis: {item.description}</div>
          </label>
        </fieldset>
      </ItemCoins>
    )
  })

  return (
    <ContentOffers>
      <form onSubmit={handleSubmit}>
        <InfoText siteProps={siteProps}>
          Co dają monety? Monety dają możliwość aktywowania konta premium na
          platformie oraz możliwość wysyłania wiadomości SMS do klientów, aby
          powiadomić ich o zarezerwowanej/zbliżającej się wizycie
        </InfoText>
        <AllItemsCoins>{mapCoinsOffers}</AllItemsCoins>
        <InfoText siteProps={siteProps}>
          Klikając przycisk zamów zrzekasz się prawa do zwrotu
        </InfoText>
        <ButtonsPosition>
          <MarginButton>
            <ButtonIcon
              title="Anuluj"
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<FaArrowLeft />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleClose}
            />
          </MarginButton>
          <MarginButtonSubmit type="submit" role="link">
            <ButtonIcon
              title="Zamów"
              uppercase
              fontIconSize="22"
              fontSize="16"
              icon={<MdAttachMoney />}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              disabled={!!!selectedCoins}
            />
          </MarginButtonSubmit>
        </ButtonsPosition>
      </form>
    </ContentOffers>
  )
}
export default CoinsOffers
