import React, { useEffect, useRef, useState } from "react"
import "../../style.css"
import { useDispatch, useSelector } from "react-redux"
import PlacesItem from "../components/PlacesItem"
import ButtonIcon from "../components/ButtonIcon"
import styled from "styled-components"
import { MdFilterList, MdLocationOn, MdClose } from "react-icons/md"
import {
  changeFilterVisible,
  changeLocaliaztionVisible,
  updatePage,
  changeFilterValue,
  changeLocalizationValue,
  changeMapsActive,
} from "../state/actions"
import { Colors } from "../common/Colors"
import sal from "sal.js"
import { CSSTransition } from "react-transition-group"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import { AllIndustries } from "../common/AllIndustries"
import { Translates } from "../common/Translates"
import Sort from "../components/Sort"
import GoogleMapsMainSearch from "../components/GoogleMapsMainSearch"
// import GoogleMapsMainSearch from "../components/LeafletMapsMainSearch"
import SelectCreated from "../components/SelectCreated"

const GoogleMapsStyle = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
  div {
    outline: none;
  }
`

const ButtonsFilters = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`

const ButtonMargin = styled.div`
  margin-right: 10px;
  margin-top: 10px;
`

const MarginBottomPlaces = styled.div`
  margin-bottom: 150px;
`
const TitleIndexValue = styled.span`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  padding: 5px 10px;
  padding-left: 25px;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size: 2rem;
  letter-spacing: 0.5rem;
  text-align: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${props => Colors(props.siteProps).primaryColor};
`

const TextButtonsSearch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding: 2px;
`

const ResetFilter = styled.div`
  font-size: 1rem;
  height: 20px;
  width: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 10px;
  background-color: ${props => Colors(props.siteProps).primaryColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  border-radius: 50%;
  padding: 2px;

  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: ${props => Colors(props.siteProps).primaryColorDark};
  }
`

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [selectedView, setSelectedView] = useState({
    value: 1,
    label: "Lista ofert",
  })
  const placesData = useSelector(state => state.placesData)
  const filters = useSelector(state => state.filters)
  const localization = useSelector(state => state.localization)
  const district = useSelector(state => state.district)
  const industries = useSelector(state => state.industries)
  const loadingPlaces = useSelector(state => state.loadingPlaces)
  const siteProps = useSelector(state => state.siteProps)
  const avaibleUpdatePage = useSelector(state => state.avaibleUpdatePage)
  const mapGeolocation = useSelector(state => state.mapGeolocation)
  const mapMarks = useSelector(state => state.mapMarks)
  const user = useSelector(state => state.user)
  const sorts = useSelector(state => state.sorts)
  const mapActive = useSelector(state => state.mapActive)
  const refAllPlaces = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeMapsActive(false))
  }, [])

  useEffect(() => {
    if (!!refAllPlaces) {
      if (!!refAllPlaces.current) {
        const indexLastChildren = refAllPlaces.current.childNodes.length
        if (indexLastChildren % 10 === 0 && indexLastChildren > 0) {
          const isLastPlaceVisible =
            refAllPlaces.current.childNodes[indexLastChildren - 1].className ===
            "sal-animate"
          if (isLastPlaceVisible) {
            refAllPlaces.current.childNodes[indexLastChildren - 1].className =
              "sal-animate active-update"
            dispatch(updatePage())
          }
        }
      }
    }
  }, [refAllPlaces, placesData, scrollPosition]) // eslint-disable-line react-hooks/exhaustive-deps

  useScrollPosition(({ _, currPos }) => {
    if (
      currPos.y !== 0 &&
      Math.abs(currPos.y) % 10 === 0 &&
      avaibleUpdatePage
    ) {
      setScrollPosition(Math.abs(currPos.y))
    }
  })

  useEffect(() => {
    sal({
      threshold: 0.1,
      once: true,
    })
  }, [loadingPlaces, placesData, selectedView])

  const handleResetFilter = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    dispatch(changeFilterValue(null))
  }

  const handleResetLocalization = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    dispatch(changeLocalizationValue(null, null))
  }

  const handleChangeView = view => {
    setSelectedView(view)
    if (!!view) {
      if (view.value === 1) {
        dispatch(changeMapsActive(false))
      }
    }
  }

  const handleEnableMaps = () => {
    dispatch(changeMapsActive(true))
  }

  const mapPlacesData = placesData.map((item, index) => {
    return (
      <PlacesItem
        key={item._id}
        item={item}
        filters={filters}
        index={index}
        user={user}
      />
    )
  })

  const findIndustrie = AllIndustries[siteProps.language].find(
    item => item.value === industries
  )

  const industriesText = !!findIndustrie ? (
    <TitleIndexValue siteProps={siteProps}>
      {findIndustrie.label}
    </TitleIndexValue>
  ) : (
    <TitleIndexValue siteProps={siteProps}>
      {Translates[siteProps.language].buttons.all}
    </TitleIndexValue>
  )

  return (
    <div>
      {industriesText}
      <ButtonsFilters>
        <ButtonMargin>
          <Sort enableMaps={mapActive} />
        </ButtonMargin>
        <ButtonMargin>
          <ButtonIcon
            title={
              !!filters ? (
                <TextButtonsSearch>
                  filtruj po: {filters.label}
                  <ResetFilter
                    siteProps={siteProps}
                    onClick={handleResetFilter}
                  >
                    <MdClose />
                  </ResetFilter>
                </TextButtonsSearch>
              ) : (
                <TextButtonsSearch>
                  filtruj po wybranej usłudze
                </TextButtonsSearch>
              )
            }
            uppercase
            fontIconSize="35"
            fontSize="14"
            icon={<MdFilterList />}
            onClick={() => dispatch(changeFilterVisible())}
          />
        </ButtonMargin>
        <ButtonMargin>
          <ButtonIcon
            title={
              !!localization || !!district ? (
                !!localization.value ? (
                  <TextButtonsSearch>
                    lokalizacja: {localization.label}
                    {!!district ? `, ${district}` : ""}
                    <ResetFilter
                      siteProps={siteProps}
                      onClick={handleResetLocalization}
                    >
                      <MdClose />
                    </ResetFilter>
                  </TextButtonsSearch>
                ) : (
                  <TextButtonsSearch>lokalizacja</TextButtonsSearch>
                )
              ) : (
                <TextButtonsSearch>lokalizacja</TextButtonsSearch>
              )
            }
            uppercase
            fontIconSize="22"
            fontSize="14"
            icon={<MdLocationOn />}
            onClick={() => dispatch(changeLocaliaztionVisible())}
          />
        </ButtonMargin>
        <ButtonMargin>
          <SelectCreated
            options={[
              {
                value: 1,
                label: "Lista ofert",
              },
              { value: 2, label: "Mapa ofert" },
            ]}
            value={selectedView}
            handleChange={handleChangeView}
            placeholder="Widok..."
            defaultMenuIsOpen={false}
            isClearable={false}
            deleteItem={false}
            closeMenuOnSelect
            width="150px"
          />
        </ButtonMargin>
      </ButtonsFilters>
      <CSSTransition
        in={mapActive && !!mapGeolocation}
        timeout={400}
        classNames="map"
        unmountOnExit
      >
        <GoogleMapsStyle>
          <GoogleMapsMainSearch
            siteProps={siteProps}
            mapGeolocation={mapGeolocation}
            localization={localization}
            mapMarks={mapMarks}
            user={user}
            industries={industries}
            filters={filters}
            sorts={sorts}
          />
        </GoogleMapsStyle>
      </CSSTransition>
      <CSSTransition
        in={!loadingPlaces && selectedView.value === 1}
        timeout={400}
        classNames="popup"
        unmountOnExit
        onExited={handleEnableMaps}
      >
        <MarginBottomPlaces ref={refAllPlaces}>
          {mapPlacesData}
        </MarginBottomPlaces>
      </CSSTransition>
    </div>
  )
}
export default Home
