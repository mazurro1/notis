import React, { useEffect, useRef, useState } from "react"
import "../../style.css"
import { useDispatch, useSelector } from "react-redux"
import PlacesItem from "../components/PlacesItem"
import ButtonIcon from "../components/ButtonIcon"
import styled from "styled-components"
import { MdFilterList, MdSort, MdLocationOn } from "react-icons/md"
import {
  changeSortVisible,
  changeFilterVisible,
  changeLocaliaztionVisible,
  updatePage,
} from "../state/actions"
import { Colors } from "../common/Colors"
import sal from "sal.js"
import { CSSTransition } from "react-transition-group"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import { AllIndustries } from "../common/AllIndustries"
import { Translates } from "../common/Translates"
import SelectCreated from "../components/SelectCreated"

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

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const placesData = useSelector(state => state.placesData)
  const filters = useSelector(state => state.filters)
  const sorts = useSelector(state => state.sorts)
  const localization = useSelector(state => state.localization)
  const industries = useSelector(state => state.industries)
  const loadingPlaces = useSelector(state => state.loadingPlaces)
  const siteProps = useSelector(state => state.siteProps)
  const avaibleUpdatePage = useSelector(state => state.avaibleUpdatePage)
  const user = useSelector(state => state.user)
  const refAllPlaces = useRef(null)
  const dispatch = useDispatch()

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
  }, [refAllPlaces, placesData, scrollPosition])

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
      once: false,
    })
  }, [loadingPlaces, placesData])

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
      <SelectCreated
        options={AllIndustries[siteProps.language]}
        darkSelect
        isMulti
        onlyText
        placeholder="Wybierz"
      />
      <ButtonsFilters>
        <ButtonMargin>
          <ButtonIcon
            title={!!sorts ? `sortuj po: ${sorts.label}` : "sortuj"}
            uppercase
            fontIconSize="35"
            fontSize="16"
            icon={<MdSort />}
            onClick={() => dispatch(changeSortVisible())}
          />
        </ButtonMargin>
        <ButtonMargin>
          <ButtonIcon
            title={
              !!filters
                ? `filtruj po: ${filters.label}`
                : "filtruj po wybranej usłudze"
            }
            uppercase
            fontIconSize="35"
            fontSize="16"
            icon={<MdFilterList />}
            onClick={() => dispatch(changeFilterVisible())}
          />
        </ButtonMargin>
        <ButtonMargin>
          <ButtonIcon
            title={
              !!localization
                ? `lokalizacja: ${localization.label}`
                : "lokalizacja"
            }
            uppercase
            fontIconSize="35"
            fontSize="16"
            icon={<MdLocationOn />}
            onClick={() => dispatch(changeLocaliaztionVisible())}
          />
        </ButtonMargin>
      </ButtonsFilters>
      <CSSTransition
        in={!loadingPlaces}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <MarginBottomPlaces ref={refAllPlaces}>
          {mapPlacesData}
        </MarginBottomPlaces>
      </CSSTransition>
    </div>
  )
}
export default Home
