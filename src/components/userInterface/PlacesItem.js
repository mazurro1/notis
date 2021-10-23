import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { ButtonIcon, Popup } from "@ui"
import { CSSTransition } from "react-transition-group"
import { MdWork, MdImage } from "react-icons/md"
import { useSelector, useDispatch } from "react-redux"
import { LinkEffect } from "@common/LinkEffect"
import { Site } from "@common/Site"
import { FaHeart, FaRegHeart, FaCalendarAlt } from "react-icons/fa"
import ReactTooltip from "react-tooltip"
import {
  addCompanyFavourites,
  deleteCompanyFavourites,
  resetUserFavourites,
} from "@state/actions"

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
    border-bottom: 2px solid ${props => Colors(props.siteProps).primaryColor};
    padding-bottom: 5px;
    font-size: 0.8rem;
    line-height: 30px;
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
  margin-bottom: 15px;
`

const MarginSelectedService = styled.div`
  margin-right: 2px;
  margin-bottom: 2px;
`

const BackGroundImageCustomUrl = styled.div`
  height: 300px;
  width: 100%;
  background: url(${props => props.url}) 50% 0 no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`

const BackGroundImageDefault = styled.div`
  height: 300px;
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

const InServiceTitle = styled.div`
  width: 100%;
  font-family: "Poppins-Bold", sans-serif;
  font-size: 1rem;
  margin-bottom: 5px;
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
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media all and (max-width: 920px) {
    width: 100%;
  }
`

const ButtonReserv = styled.div`
  width: 250px;
  max-width: 49%;
`

const NoServicesText = styled.div`
  color: ${props => Colors(props.siteProps).textNormalWhite};
`

const PlacesItem = ({ item, filters, index, user }) => {
  const [servicesVisible, setServicesVisible] = useState(false)
  const [isCompanyInFavourites, setIsCompanyInFavourites] = useState(false)
  const siteProps = useSelector(state => state.siteProps)
  const userResetFavourites = useSelector(state => state.userResetFavourites)

  useEffect(() => {
    if (!!user) {
      if (!!user.favouritesCompanys) {
        const isCompanyInFav = user.favouritesCompanys.some(
          itemCompany => itemCompany._id === item._id
        )
        setIsCompanyInFavourites(isCompanyInFav)
      }
    }
    dispatch(resetUserFavourites())
  }, [user, userResetFavourites]) // eslint-disable-line react-hooks/exhaustive-deps

  const dispatch = useDispatch()

  const handleServicesVisible = () => {
    setServicesVisible(prevValue => !prevValue)
  }

  const allServices = item.services.map(item => {
    return (
      <PaddingRight key={item._id} onClick={handleServicesVisible}>
        <ButtonIcon title={item.serviceName} fontSize="13" />
      </PaddingRight>
    )
  })

  const isInServicesFilter = item.services.filter(item => {
    if (filters) {
      return item.serviceName
        .toLowerCase()
        .includes(filters.value.toLowerCase())
    }
    return false
  })

  const isInServicesFilterSome = item.services.some(item => {
    if (filters) {
      return item.serviceName
        .toLowerCase()
        .includes(filters.value.toLowerCase())
    }
    return false
  })

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
      <UnderMenuServices>
        <InServiceTitle>W usługach znajduje się: </InServiceTitle>
        {mapFilteredServices}
      </UnderMenuServices>
    </CSSTransition>
  )

  const handleAddRemoveFromFavourites = () => {
    if (!!user) {
      if (!isCompanyInFavourites) {
        const favouriteAddData = {
          linkPath: item.linkPath,
          name: item.name,
          _id: item._id,
        }
        dispatch(addCompanyFavourites(user.token, favouriteAddData))
      } else {
        dispatch(deleteCompanyFavourites(user.token, item._id))
      }
    }
  }

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [user, isCompanyInFavourites])

  return (
    <div
      data-sal={index % 2 === 0 ? "zoom-in" : "zoom-in"}
      data-sal-duration="1000"
      data-sal-easing="ease-out-bounce"
      id="PlaceItem"
    >
      <PlaceItem siteProps={siteProps}>
        <PlaceImage>
          {!!item.mainImageUrl || item.imagesUrl.length > 0 ? (
            <LinkEffect
              path={`/company?${item.linkPath}`}
              text={
                <BackGroundImageCustomUrl
                  url={
                    !!item.mainImageUrl || item.imagesUrl.length > 0
                      ? `${Site.awsUrl}/${
                          !!item.mainImageUrl
                            ? item.mainImageUrl
                            : item.imagesUrl[0]
                        }`
                      : ""
                  }
                />
              }
            />
          ) : (
            <LinkEffect
              path={`/company?${item.linkPath}`}
              text={
                <BackGroundImageDefault siteProps={siteProps}>
                  <MdImage />
                </BackGroundImageDefault>
              }
            />
          )}
        </PlaceImage>
        {user && (
          <ReactTooltip
            id={`addToFavourites${index}`}
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
          id={`countRating${index}`}
          effect="float"
          multiline={true}
        >
          <span>Średnia ocen ze wszytskich ocenionych wizyt</span>
        </ReactTooltip>
        <ReactTooltip
          id={`countSummary${index}`}
          effect="float"
          multiline={true}
        >
          <span>Liczba wszystkich wystawionych ocen</span>
        </ReactTooltip>
        <PlaceContent siteProps={siteProps} active={isCompanyInFavourites}>
          <h1>
            {item.name}{" "}
            {user && (
              <span
                data-tip
                data-for={`addToFavourites${index}`}
                onClick={handleAddRemoveFromFavourites}
                aria-hidden="true"
              >
                {isCompanyInFavourites ? <FaHeart /> : <FaRegHeart />}
              </span>
            )}
          </h1>

          <MarginBottomTitle>
            <h6>{`${item.city}, ${item.district}, ${item.adress}`}</h6>
          </MarginBottomTitle>
          <p>{item.title}</p>

          {renderSelectedFilter}

          <OpinionMainDiv siteProps={siteProps}>
            <PaddingOpinion
              data-tip
              data-for={`countRating${index}`}
              data-place="left"
            >
              {item.opinionsValue > 0 && item.opinionsCount > 0
                ? Math.round((item.opinionsValue / item.opinionsCount) * 10) /
                  10
                : 0}
            </PaddingOpinion>
            <OpinionBottom
              siteProps={siteProps}
              data-tip
              data-for={`countSummary${index}`}
              data-place="left"
            >
              Opinie: {item.opinionsCount}
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
                path={`/company?${item.linkPath}`}
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
    </div>
  )
}
export default PlacesItem
