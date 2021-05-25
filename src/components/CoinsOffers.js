import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchNewOrder, addAlertItem, getCoinsOffer } from "../state/actions"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "./ButtonIcon"
import { MdAttachMoney } from "react-icons/md"
import { FaArrowLeft, FaCrown, FaSms } from "react-icons/fa"
import getStripe from "../common/stripejs"
import { Site } from "../common/Site"

const ItemCoins = styled.div`
  border-radius: 5px;
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).primaryColorDark};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  margin: 10px;
  min-height: 120px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
  user-select: none;
  width: 400px;
  max-width: 100%;
  transition-property: transform, background-color, color;
  transition-timing-function: ease;
  transition-duration: 0.3s;

  fieldset {
    border: none;
    width: 100%;

    legend {
      width: 100%;
      font-family: "Poppins-Medium";
      font-size: 1.2rem;
      text-align: center;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      padding: 5px 10px;
      background-color: ${props => Colors(props.siteProps).primaryColor};
      margin-bottom: 10px;
      text-transform: uppercase;
    }
  }
  .contentOffer {
    padding: 5px 10px;
    margin-bottom: 10px;
    width: 80%;
    @media all and (max-width: ${Site.mobileSize + "px"}) {
      width: 100%;
    }
    .itemInfo {
      font-size: 0.9rem;

      span {
        font-size: 1rem;
        font-family: "Poppins-Medium";
      }
    }
  }
  .contentIcon {
    width: 20%;
    font-size: 3rem;
    @media all and (max-width: ${Site.mobileSize + "px"}) {
      width: 100%;
      text-align: center;
    }
  }

  &:hover {
    transform: scale(1.05);
  }
`

const AllItemsCoins = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
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

const AllContentOffers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const InfoText = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
  span {
    font-family: "Poppins-Bold";
  }
`

const InfoTextSummary = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
  margin-top: 20px;
  font-family: "Poppins-Medium";
`

const TitleOffer = styled.div`
  font-size: 1.2rem;
  text-transform: uppercase;
  font-family: "Poppins-Bold";
  color: ${props => Colors(props.siteProps).textNormalBlack};
  margin-top: 20px;
`

const SummaryInfoText = styled.div`
  font-size: 1rem;
  color: ${props => Colors(props.siteProps).textNormalBlack};

  span {
    font-size: 1.2rem;
    font-family: "Poppins-Medium";
  }
`

const CoinsOffers = ({ siteProps, user, handleClose }) => {
  const [selectedCoins, setSelectedCoins] = useState([])
  const checkoutPaymentItem = useSelector(state => state.checkoutPaymentItem)
  const coinsOffer = useSelector(state => state.coinsOffer)

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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!checkoutPaymentItem) {
      handleCheckout(checkoutPaymentItem)
    }
  }, [checkoutPaymentItem])

  const handleClickCoins = coinId => {
    const isInSelected = selectedCoins.some(coins => coins === coinId)
    if (isInSelected) {
      const filterItems = selectedCoins.filter(item => item !== coinId)
      setSelectedCoins(filterItems)
    } else {
      const selectedItems = [...selectedCoins, coinId]
      setSelectedCoins(selectedItems)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    const allItems = []
    selectedCoins.forEach(selectedItem => {
      const selectedCoinItem = coinsOffer.find(
        item => item._id === selectedItem
      )
      if (!!selectedCoinItem) {
        allItems.push(selectedCoinItem._id)
      }
    })
    if (allItems.length > 0) {
      dispatch(fetchNewOrder(user.token, user.company._id, allItems))
    } else {
      dispatch(addAlertItem("Nie wybrano oferty", "red"))
    }
  }

  const filterOffersSMS = coinsOffer.filter(item => !!item.countSMS)
  const filterOffersPremium = coinsOffer.filter(item => !!item.countPremium)

  let summaryPrice = 0
  let summarySMS = 0
  let summaryPremium = 0

  selectedCoins.forEach(itemCoins => {
    const selectedCoinItem = coinsOffer.find(item => item._id === itemCoins)
    if (!!selectedCoinItem) {
      if (!!selectedCoinItem.countPremium) {
        summaryPremium = summaryPremium + selectedCoinItem.countPremium
      }
      if (!!selectedCoinItem.countSMS) {
        summarySMS = summarySMS + selectedCoinItem.countSMS
      }
      if (!!selectedCoinItem.price) {
        summaryPrice = summaryPrice + selectedCoinItem.price
      }
    }
  })

  const mapCoinsOffersSMS = filterOffersSMS.map((item, index) => {
    return (
      <ItemCoins
        key={index}
        active={selectedCoins.some(coins => coins === item._id)}
        onClick={() => handleClickCoins(item._id)}
      >
        <fieldset>
          <legend>{item.name}</legend>
          <AllContentOffers>
            <div className="contentOffer">
              {!!item.countSMS && (
                <div className="itemInfo">
                  SMS-y: <span>{item.countSMS}</span>
                </div>
              )}
              {!!item.countPremium && (
                <div className="itemInfo">
                  Miesiące konta premium: <span>{item.countPremium}</span> (
                  {item.countPremium * 30} dni)
                </div>
              )}
              <div className="itemInfo">
                Cena: <span>{item.price}zł</span>
              </div>
              <div className="itemInfo">
                Opis: <span>{item.description}</span>
              </div>
            </div>
            <div className="contentIcon">
              <FaSms />
            </div>
          </AllContentOffers>
        </fieldset>
      </ItemCoins>
    )
  })

  const mapCoinsOffersPremium = filterOffersPremium.map((item, index) => {
    return (
      <ItemCoins
        key={index}
        active={selectedCoins.some(coins => coins === item._id)}
        onClick={() => handleClickCoins(item._id)}
      >
        <fieldset>
          <legend>{item.name}</legend>
          <AllContentOffers>
            <div className="contentOffer">
              {!!item.countSMS && (
                <div className="itemInfo">
                  SMS-y: <span>{item.countSMS}</span>
                </div>
              )}
              {!!item.countPremium && (
                <div className="itemInfo">
                  Miesiące konta premium: <span>{item.countPremium}</span> (
                  {item.countPremium * 30} dni)
                </div>
              )}
              <div className="itemInfo">
                Cena: <span>{item.price}zł</span>
              </div>
              <div className="itemInfo">
                Opis: <span>{item.description}</span>
              </div>
            </div>
            <div className="contentIcon">
              <FaCrown />
            </div>
          </AllContentOffers>
        </fieldset>
      </ItemCoins>
    )
  })

  return (
    <ContentOffers>
      <form onSubmit={handleSubmit}>
        <InfoText siteProps={siteProps}>
          <span>Konto premium</span> umożliwia dokonywanie rezerwacji przez
          klientów oraz dokonywanie rezerwacji czasu przez wszystkich
          pracowników w firmie. Bez niego firma nie będzie wyświetlana w
          wyszukiwarce firm.
        </InfoText>
        <InfoText siteProps={siteProps}>
          <span>SMS-y</span> dają możliwość wysyłania wiadomości do klientów,
          aby powiadomić ich o zarezerwowanej/zbliżającej się wizycie
        </InfoText>
        <InfoText siteProps={siteProps}>
          <span>Faktura</span> wszystkie dane do faktury vat zostaną pobrane z
          konta firmowego. Gdy proces płatności będzie pozytywny, to zostanie
          wysłana faktura na firmowy adres e-mail.
        </InfoText>
        <TitleOffer siteProps={siteProps}>Konta premium:</TitleOffer>
        <AllItemsCoins>{mapCoinsOffersPremium}</AllItemsCoins>
        <TitleOffer siteProps={siteProps}>Pakiety SMS:</TitleOffer>
        <AllItemsCoins>{mapCoinsOffersSMS}</AllItemsCoins>
        <TitleOffer siteProps={siteProps}>Podsumowanie:</TitleOffer>
        <SummaryInfoText siteProps={siteProps}>
          Miesiące konta premium: <span>{summaryPremium}</span>(
          {summaryPremium * 30} dni)
        </SummaryInfoText>
        <SummaryInfoText siteProps={siteProps}>
          SMS-y: <span>{summarySMS}</span>
        </SummaryInfoText>
        <SummaryInfoText siteProps={siteProps}>
          Cena: <span>{summaryPrice}zł</span>
        </SummaryInfoText>
        <InfoTextSummary siteProps={siteProps}>
          Klikając przycisk zamów zrzekasz się prawa do zwrotu
        </InfoTextSummary>
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
              disabled={selectedCoins.length === 0}
            />
          </MarginButtonSubmit>
        </ButtonsPosition>
      </form>
    </ContentOffers>
  )
}
export default CoinsOffers
