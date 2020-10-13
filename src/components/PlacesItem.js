import React, { useState } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "../components/ButtonIcon"
import { CSSTransition } from "react-transition-group"
import { MdWork } from "react-icons/md"

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
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #b2ebf2;
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
  /* border-right: 1px solid #757575; */
  /* border-right: 1px solid ${Colors.buttonColor}; */
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
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
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

const ButtonReserv = styled.div`
  display: inline-block;
  width: ${props => (props.services ? "33%" : "63%")};
  color: white;
  border: none;
  border-radius: 5px;
  overflow: hidden;
  margin: 1%;
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

const PlacesItem = ({ item, filters, index }) => {
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
    item => {
      if(filters){
        return item.toLowerCase() === filters.value.toLowerCase()
      }
      return false
    }
  )

  const isInServicesFilterSome = item.services.some(
    item => {
      if(filters){
        return item.toLowerCase() === filters.value.toLowerCase()
      }
      return false
    }
  )

  const renderSelectedFilter =(
      <CSSTransition
        in={isInServicesFilterSome}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
      <UnderMenuServices>
        <ButtonIcon
          title={isInServicesFilterSome ? `W usługach znajduje się: ${isInServicesFilter[0]}` : 'Brak w usługach'}
          fontSize="13"
        />
      </UnderMenuServices>
      </CSSTransition>
      )

  return (
    <PlaceItem key={item.id}
    
    data-sal={index % 2 === 0 ? "zoom-in" : "zoom-in"}
        data-sal-duration="1000"
        data-sal-easing="ease-out-bounce"
    >
      <PlaceImage>
        <BackGroundImageCustomUrl url={item.image} />
      </PlaceImage>
      <PlaceContent>
        <h1>{item.name}</h1>
        <MarginBottomTitle>
          <h6>{item.adress}</h6>
        </MarginBottomTitle>
        <p>{item.title}</p>

        {renderSelectedFilter}

        <OpinionMainDiv>
          <PaddingOpinion>{item.avarageOpinions}</PaddingOpinion>
          <OpinionBottom>Opinie: {item.countOpinions}</OpinionBottom>
        </OpinionMainDiv>
        <ButtonReservContent>
          <ButtonReserv services >
            <ButtonIcon buttonBgDark title="USŁUGI" uppercase fontIconSize="25" icon={<MdWork />} onClick={handleServicesVisible}/>
          </ButtonReserv>
          <ButtonReserv><ButtonIcon title="REZERWUJ" uppercase fontIconSize="25" icon={<MdWork />}/></ButtonReserv>
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
