import React, { useState, useRef, useEffect } from "react"
import { OverlayView, useGoogleMap } from "@react-google-maps/api"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import ReactTooltip from "react-tooltip"
import { LinkEffect } from "@common/LinkEffect"
import { ButtonIcon, Popup } from "@ui"
import { MdWork, MdImage } from "react-icons/md"
import { Site } from "@common/Site"
import { FaHeart, FaRegHeart, FaCalendarAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import {
  addCompanyFavourites,
  deleteCompanyFavourites,
  resetUserFavourites,
} from "@state/actions"
import { CSSTransition } from "react-transition-group"

const UnderMenuServices = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 10px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  max-height: 75px;
  overflow-y: auto;
`

const PlaceItem = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
  color: ${props => Colors(props.siteProps).textNormalBlack};
  overflow: hidden;
  height: 100%;
  @media all and (max-width: 920px) {
    margin: 0 auto;
  }
`

const PlaceImage = styled.div`
  position: relative;
  width: 40%;
  img {
    height: 100%;
    width: 100%;
  }
  @media all and (max-width: 920px) {
    width: 100%;
    display: none;
  }
`

const PlaceContent = styled.div`
  width: 60%;
  padding: 10px 15px;
  padding-bottom: 47px;
  padding-right: 70px;
  @media all and (max-width: 920px) {
    width: 100%;
  }

  h1 {
    font-size: 1.4rem;
    margin-bottom: 0;
    text-transform: uppercase;
    font-family: "Poppins-Bold", sans-serif;
    @media all and (max-width: 920px) {
      & {
        padding-right: 0px;
      }
    }

    span {
      position: relative;
      top: 3px;
      cursor: pointer;
      padding-left: 10px;
      font-size: 1.4rem;
      color: ${props =>
        !props.active
          ? Colors(props.siteProps).darkColorDark
          : Colors(props.siteProps).dangerColorDark};
      transition-property: color;
      transition-duration: 0.3s;
      transition-timing-function: ease;
      &:hover {
        color: ${props => Colors(props.siteProps).dangerColorDark};
      }
    }
  }

  h6 {
    display: inline;
    font-size: 0.8rem;
    font-family: "Poppins-Medium", sans-serif;
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
  margin-bottom: 0px;
`

const BackGroundImageCustomUrl = styled.div`
  height: 200px;
  width: 100%;
  background: url(${props => props.url}) 50% 0 no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`

const BackGroundImageDefault = styled.div`
  height: 200px;
  width: 100%;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 6rem;
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
  width: 65%;
  bottom: 0px;
  right: 0px;
  padding: 5px 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;

  @media all and (max-width: 920px) {
    width: 100%;
  }
`

const ButtonReserv = styled.div`
  width: auto;
  font-family: "Poppins-Regular";
  &:first-child {
    margin-right: 5px;
  }
`

const NoServicesText = styled.div`
  color: ${props => Colors(props.siteProps).textNormalWhite};
`

const MarkerStyle = styled.div`
  position: relative;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: ${props => Colors(props.siteProps).dangerColorDark};
  border: 4px solid ${props => Colors(props.siteProps).dangerColor};
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.4);
  cursor: pointer;
`

const ContentPopupMarker = styled.div`
  background-color: white;
  width: 600px;
  height: 200px;
  max-width: 90vw;
`
const PaddingRight = styled.div`
  padding-right: 10px;
  padding-bottom: 5px;
  display: inline-block;
`

const MarginSelectedService = styled.div`
  margin-right: 2px;
  margin-bottom: 2px;
`

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2),
})

const GoogleMapsMainSearchItem = ({
  itemLocation,
  siteProps,
  user,
  fetchCompanyMarker,
}) => {
  const [markerActive, setMarkerActive] = useState(false)
  const [isCompanyInFavourites, setIsCompanyInFavourites] = useState(false)
  const [servicesVisible, setServicesVisible] = useState(false)
  const filters = useSelector(state => state.filters)
  const userResetFavourites = useSelector(state => state.userResetFavourites)
  const companyMarker = useSelector(state => state.companyMarker)
  const refSelect = useRef(null)
  const refItemMarker = useRef(null)
  const map = useGoogleMap()

  const dispatch = useDispatch()

  useEffect(() => {
    if (!!user && !!companyMarker) {
      if (!!user.favouritesCompanys) {
        const isCompanyInFav = user.favouritesCompanys.some(
          itemCompany => itemCompany._id === companyMarker._id
        )
        setIsCompanyInFavourites(isCompanyInFav)
      }
      dispatch(resetUserFavourites())
    }
  }, [user, userResetFavourites]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    function handleClickOutside(event) {
      if (refSelect.current && !refSelect.current.contains(event.target)) {
        setMarkerActive(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [refSelect])

  const handleEnterMarker = () => {
    ReactTooltip.rebuild()
  }

  const handleServicesVisible = () => {
    setServicesVisible(prevValue => !prevValue)
  }

  let allServices = []
  let isInServicesFilter = []
  let isInServicesFilterSome = false
  if (!!companyMarker && markerActive) {
    allServices = companyMarker.services.map(item => {
      return (
        <PaddingRight key={item._id} onClick={handleServicesVisible}>
          <ButtonIcon title={item.serviceName} fontSize="13" />
        </PaddingRight>
      )
    })

    isInServicesFilter = companyMarker.services.filter(item => {
      if (filters) {
        return item.serviceName
          .toLowerCase()
          .includes(filters.value.toLowerCase())
      }
      return false
    })

    isInServicesFilterSome = companyMarker.services.some(item => {
      if (filters) {
        return item.serviceName
          .toLowerCase()
          .includes(filters.value.toLowerCase())
      }
      return false
    })
  }

  const mapFilteredServices = isInServicesFilter.map(
    (filterService, indexService) => {
      return (
        <MarginSelectedService key={indexService}>
          <ButtonIcon
            title={
              isInServicesFilterSome
                ? `${filterService.serviceName}`
                : "Brak w usługach"
            }
            fontSize="13"
          />
        </MarginSelectedService>
      )
    }
  )

  const renderSelectedFilter = (
    <CSSTransition
      in={isInServicesFilterSome}
      timeout={400}
      classNames="popup"
      unmountOnExit
    >
      <UnderMenuServices>{mapFilteredServices}</UnderMenuServices>
    </CSSTransition>
  )

  const handleAddRemoveFromFavourites = () => {
    if (!!user && !!companyMarker) {
      if (!isCompanyInFavourites) {
        const favouriteAddData = {
          linkPath: companyMarker.linkPath,
          name: companyMarker.name,
          _id: companyMarker._id,
        }
        dispatch(addCompanyFavourites(user.token, favouriteAddData))
      } else {
        dispatch(deleteCompanyFavourites(user.token, companyMarker._id))
      }
    }
  }

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [user, isCompanyInFavourites])

  const handleClickMarker = () => {
    if (!!companyMarker) {
      if (companyMarker._id !== itemLocation._id) {
        dispatch(fetchCompanyMarker(itemLocation._id))
      }
    } else {
      dispatch(fetchCompanyMarker(itemLocation._id))
    }

    if (!markerActive) {
      setMarkerActive(true)
      if (map) {
        if (map.zoom < 13) {
          map.zoom = 13
        }
        map.panTo({
          lat: Number(itemLocation.maps.lat),
          lng: Number(itemLocation.maps.long),
        })
      }
    }
  }

  return (
    <>
      {!markerActive && (
        <ReactTooltip
          id={`marker${itemLocation.maps.lat}${itemLocation.maps.long}`}
          effect="float"
          multiline={true}
        >
          <span>{itemLocation.name.toUpperCase()}</span>
        </ReactTooltip>
      )}
      <OverlayView
        position={{
          lat: Number(itemLocation.maps.lat),
          lng: Number(itemLocation.maps.long),
        }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        <MarkerStyle
          siteProps={siteProps}
          data-tip
          data-for={`marker${itemLocation.maps.lat}${itemLocation.maps.long}`}
          onMouseEnter={handleEnterMarker}
          onClick={handleClickMarker}
          ref={refSelect}
        >
          <Popup
            popupEnable={markerActive}
            noContent
            position="absolute"
            top="-220px"
            bottom="auto"
          >
            <ContentPopupMarker ref={refItemMarker}>
              <PlaceItem siteProps={siteProps}>
                {!!companyMarker && (
                  <PlaceImage>
                    {!!companyMarker.mainImageUrl ||
                    companyMarker.imagesUrl.length > 0 ? (
                      <LinkEffect
                        path={`/company?${companyMarker.linkPath}`}
                        text={
                          <BackGroundImageCustomUrl
                            url={
                              !!companyMarker.mainImageUrl ||
                              companyMarker.imagesUrl.length > 0
                                ? `${Site.awsUrl}/${
                                    !!companyMarker.mainImageUrl
                                      ? companyMarker.mainImageUrl
                                      : companyMarker.imagesUrl[0]
                                  }`
                                : ""
                            }
                          />
                        }
                      />
                    ) : (
                      <LinkEffect
                        path={`/company?${companyMarker.linkPath}`}
                        text={
                          <BackGroundImageDefault siteProps={siteProps}>
                            <MdImage />
                          </BackGroundImageDefault>
                        }
                      />
                    )}
                  </PlaceImage>
                )}
                {user && (
                  <ReactTooltip
                    id={`addToFavouritesMarker`}
                    effect="float"
                    multiline={true}
                  >
                    <span>
                      {!isCompanyInFavourites
                        ? "Dodaj do ulubionych"
                        : "Usuń z ulubionych"}
                    </span>
                  </ReactTooltip>
                )}
                <ReactTooltip
                  id={`countRatingMarker`}
                  effect="float"
                  multiline={true}
                >
                  <span>Średnia ocen ze wszytskich ocenionych wizyt</span>
                </ReactTooltip>
                <ReactTooltip
                  id={`countSummaryMarker`}
                  effect="float"
                  multiline={true}
                >
                  <span>Liczba wszystkich wystawionych ocen</span>
                </ReactTooltip>
                {!!companyMarker && (
                  <PlaceContent
                    siteProps={siteProps}
                    active={isCompanyInFavourites}
                  >
                    <h1>
                      {companyMarker.name}{" "}
                      {user && (
                        <span
                          data-tip
                          data-for={`addToFavouritesMarker`}
                          onClick={handleAddRemoveFromFavourites}
                          aria-hidden="true"
                        >
                          {isCompanyInFavourites ? <FaHeart /> : <FaRegHeart />}
                        </span>
                      )}
                    </h1>

                    <MarginBottomTitle>
                      <h6>{`${companyMarker.city}, ${companyMarker.district}, ${companyMarker.adress}`}</h6>
                    </MarginBottomTitle>
                    <p>{companyMarker.title}</p>

                    {renderSelectedFilter}

                    <OpinionMainDiv siteProps={siteProps}>
                      <PaddingOpinion
                        data-tip
                        data-for={`countRatingMarker`}
                        data-place="left"
                      >
                        {companyMarker.opinionsValue > 0 &&
                        companyMarker.opinionsCount > 0
                          ? Math.round(
                              (companyMarker.opinionsValue /
                                companyMarker.opinionsCount) *
                                10
                            ) / 10
                          : 0}
                      </PaddingOpinion>
                      <OpinionBottom
                        siteProps={siteProps}
                        data-tip
                        data-for={`countSummaryMarker`}
                        data-place="left"
                      >
                        Opinie: {companyMarker.opinionsCount}
                      </OpinionBottom>
                    </OpinionMainDiv>
                    <ButtonReservContent>
                      <ButtonReserv services>
                        <ButtonIcon
                          buttonBgDark
                          title="USŁUGI"
                          uppercase
                          fontIconSize="20"
                          icon={<MdWork />}
                          onClick={handleServicesVisible}
                        />
                      </ButtonReserv>
                      <ButtonReserv>
                        <LinkEffect
                          path={`/company?${companyMarker.linkPath}`}
                          text={
                            <ButtonIcon
                              title="REZERWUJ"
                              uppercase
                              fontIconSize="20"
                              icon={<FaCalendarAlt />}
                            />
                          }
                        />
                      </ButtonReserv>
                    </ButtonReservContent>
                  </PlaceContent>
                )}
                <Popup
                  popupEnable={servicesVisible}
                  position="absolute"
                  borderRadius
                  handleClose={handleServicesVisible}
                  noContent
                  clickedBackground
                >
                  {allServices.length > 0 ? (
                    allServices
                  ) : (
                    <NoServicesText
                      siteProps={siteProps}
                      onClick={handleServicesVisible}
                    >
                      Brak usług
                    </NoServicesText>
                  )}
                </Popup>
              </PlaceItem>
            </ContentPopupMarker>
          </Popup>
        </MarkerStyle>
      </OverlayView>
    </>
  )
}
export default GoogleMapsMainSearchItem
