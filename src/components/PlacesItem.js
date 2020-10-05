import React, { useState } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "../components/ButtonIcon"
import { CSSTransition } from "react-transition-group"

const PlaceItem = styled.div`
  position: relative;
  background-color: #f5f4f5;
  border-radius: 5px;
  margin: 7px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 50px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  @media all and (max-width: 920px) {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 50px;
  }
`

const PlaceImage = styled.div`
  position: relative;
  width: 35%;
  min-width: 200px;
  border-right: 1px solid #757575;
  img {
    height: 100%;
    width: 100%;
  }
  @media all and (max-width: 920px) {
    width: 100%;
  }
`

const PlaceContent = styled.div`
  width: 65%;
  padding: 10px 15px;
  padding-bottom: 47px;
  @media all and (max-width: 920px) {
    width: 100%;
  }

  h1 {
    font-size: 1.4rem;
    margin-bottom: 0;
    padding-right: 60px;
  }

  h6 {
    display: inline;
    border-bottom: 2px solid ${Colors.buttonIconColor};
    padding-bottom: 5px;
  }

  p {
    margin-bottom: 0;
    font-size: 0.9rem;
    @media all and (min-width: 921px) {
      max-height: 120px;
      overflow-y: auto;
    }
  }
`

const MarginBottomTitle = styled.div`
  margin-bottom: 15px;
`

const BackGroundImageCustomUrl = styled.div`
  height: 300px;
  width: 100%;
  background: url(${props => props.url}) 50% 0 no-repeat;
  background-position: center;
  background-size: cover;
`

const PaddingRight = styled.div`
  padding-right: 10px;
  padding-bottom: 5px;
  display: inline-block;
`

const UnderMenuServices = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 10px;
  padding-bottom: 5px;
  margin-bottom: 10px;
`

const OpinionMainDiv = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  background-color: ${Colors.navBackground};
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  color: white;
  font-size: 1.6rem;
`

const PaddingOpinion = styled.div`
  padding: 5px 10px;
  text-align: center;
`

const OpinionBottom = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 0.8rem;
  background-color: #424242;
  padding: 2px 5px;
  border-bottom-left-radius: 5px;
  text-align: center;
`

const ButtonReservContent = styled.div`
  position: absolute;
  width: 63%;
  bottom: 0px;
  right: 7px;

  @media all and (max-width: 920px) {
    width: 100%;
  }
`

const ButtonReserv = styled.button`
  width: ${props => (props.services ? "33%" : "63%")};
  background-color: ${props =>
    props.services ? "#424242" : Colors.buttonColor};
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.4rem;
  cursor: pointer;
  border-radius: 5px;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  margin: 1%;
  &:hover {
    background-color: ${props =>
      props.services ? Colors.navDownBackground : Colors.buttonIconColor};
  }
`

const SerivesDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  padding: 20px;
`

const PlacesItem = ({ item, filters }) => {
  const [servicesVisible, setServicesVisible] = useState(false)

  const handleServicesVisible = () => {
    setServicesVisible(prevValue => !prevValue)
  }

  const allServices = item.services.map((item, index) => {
    return (
      <PaddingRight key={index}>
        <ButtonIcon title={item} fontSize="13" />
      </PaddingRight>
    )
  })

  const isInServicesFilter = item.services.filter(
    item => item.toLowerCase() === filters.toLowerCase()
  )

  const renderSelectedFilter =
    isInServicesFilter.length > 0 ? (
      <UnderMenuServices>
        <ButtonIcon
          title={`W usługach znajduje się: ${isInServicesFilter[0]}`}
          fontSize="13"
        />
      </UnderMenuServices>
    ) : null

  return (
    <PlaceItem key={item.id}>
      <PlaceImage>
        <BackGroundImageCustomUrl url={item.image} />
      </PlaceImage>
      <PlaceContent>
        <h1>{item.name}</h1>
        <MarginBottomTitle>
          <h6>{item.adress}</h6>
        </MarginBottomTitle>
        <p>
          {item.title}
          {item.title}
          {item.title}
          {item.title}
        </p>

        {renderSelectedFilter}

        <OpinionMainDiv>
          <PaddingOpinion>{item.avarageOpinions}</PaddingOpinion>
          <OpinionBottom>Opinie: {item.countOpinions}</OpinionBottom>
        </OpinionMainDiv>
        <ButtonReservContent>
          <ButtonReserv services onClick={handleServicesVisible}>
            USŁUGI
          </ButtonReserv>
          <ButtonReserv>REZERWUJ</ButtonReserv>
        </ButtonReservContent>
      </PlaceContent>
      <CSSTransition
        in={servicesVisible}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <SerivesDiv onClick={handleServicesVisible}>{allServices}</SerivesDiv>
      </CSSTransition>
    </PlaceItem>
  )
}
export default PlacesItem
