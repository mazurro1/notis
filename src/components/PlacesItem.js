import React, { useState } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "../components/ButtonIcon"
import { CSSTransition } from "react-transition-group"
import { MdWork } from "react-icons/md"
import { useSelector } from "react-redux"
import { LinkEffect } from "../common/LinkEffect"

const PlaceItem = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
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
  color: ${props => Colors(props.siteProps).textNormalBlack};
  /* border: 1px solid #b2ebf2; */
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
    text-transform: uppercase;
  }

  h6 {
    display: inline;
    border-bottom: 2px solid ${props => Colors(props.siteProps).primaryColor};
    padding-bottom: 5px;
    font-size: 0.8rem;
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
  background-color: ${props => Colors(props.siteProps).opinionColorUp};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
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
  background-color: ${props => Colors(props.siteProps).opinionColorDown};
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

const NoServicesText = styled.div`
  color: ${props => Colors(props.siteProps).textNormalWhite};
`

const PlacesItem = ({ item, filters, index }) => {
  const [servicesVisible, setServicesVisible] = useState(false)
  const siteProps = useSelector(state => state.siteProps)

  const handleServicesVisible = () => {
    setServicesVisible(prevValue => !prevValue)
  }

  const allServices = item.services.map(item => {
    return (
      <PaddingRight key={item._id}>
        <ButtonIcon title={item.serviceName} fontSize="13" />
      </PaddingRight>
    )
  })

  const isInServicesFilter = item.services.filter(item => {
    if (filters) {
      return item.serviceName.toLowerCase() === filters.value.toLowerCase()
    }
    return false
  })

  const isInServicesFilterSome = item.services.some(item => {
    if (filters) {
      return item.serviceName.toLowerCase() === filters.value.toLowerCase()
    }
    return false
  })

  const renderSelectedFilter = (
    <CSSTransition
      in={isInServicesFilterSome}
      timeout={400}
      classNames="popup"
      unmountOnExit
    >
      <UnderMenuServices>
        <ButtonIcon
          title={
            isInServicesFilterSome
              ? `W usługach znajduje się: ${isInServicesFilter[0].serviceName}`
              : "Brak w usługach"
          }
          fontSize="13"
        />
      </UnderMenuServices>
    </CSSTransition>
  )
  return (
    <div
      data-sal={index % 2 === 0 ? "zoom-in" : "zoom-in"}
      data-sal-duration="1000"
      data-sal-easing="ease-out-bounce"
    >
      <PlaceItem siteProps={siteProps}>
        <PlaceImage>
          {/* <BackGroundImageCustomUrl url={item.image} /> */}
          <BackGroundImageCustomUrl url="https://2.bp.blogspot.com/-HDIxQDdW_nY/UznBk9GuJtI/AAAAAAAAlg4/ubYdAfZFlNs/s1600/01-jolantabork.jpg" />
        </PlaceImage>
        <PlaceContent siteProps={siteProps}>
          <h1>{item.name}</h1>
          <MarginBottomTitle>
            <h6>{`${item.city}, ${item.district}, ${item.adress}`}</h6>
          </MarginBottomTitle>
          <p>{item.title}</p>

          {renderSelectedFilter}

          <OpinionMainDiv siteProps={siteProps}>
            <PaddingOpinion>
              {item.avarageOpinions ? item.avarageOpinions : 0}
            </PaddingOpinion>
            <OpinionBottom siteProps={siteProps}>
              Opinie: {item.countOpinions ? item.countOpinions : 0}
            </OpinionBottom>
          </OpinionMainDiv>
          <ButtonReservContent>
            <ButtonReserv services>
              <ButtonIcon
                buttonBgDark
                title="USŁUGI"
                uppercase
                fontIconSize="25"
                icon={<MdWork />}
                onClick={handleServicesVisible}
              />
            </ButtonReserv>
            <ButtonReserv>
              <LinkEffect
                path={`/company/${item.linkPath}`}
                text={
                  <ButtonIcon
                    title="REZERWUJ"
                    uppercase
                    fontIconSize="25"
                    icon={<MdWork />}
                  />
                }
              />
            </ButtonReserv>
          </ButtonReservContent>
        </PlaceContent>
        <CSSTransition
          in={servicesVisible}
          timeout={400}
          classNames="popup"
          unmountOnExit
        >
          <SerivesDiv onClick={handleServicesVisible}>
            {allServices.length > 0 ? (
              allServices
            ) : (
              <NoServicesText siteProps={siteProps}>
                Brak usług
              </NoServicesText>
            )}
          </SerivesDiv>
        </CSSTransition>
      </PlaceItem>
    </div>
  )
}
export default PlacesItem
