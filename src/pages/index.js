import React, { useEffect, useRef } from "react"
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
  changeLoadingPlaces,
} from "../state/actions"
import { Colors } from "../common/Colors"
import sal from "sal.js"
import { CSSTransition } from "react-transition-group"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import { LinkEffect } from "../common/LinkEffect"

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

const TextH1 = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  color: ${props => Colors(props.colorBlind).navDownBackground};
  padding: 5px 10px;
  padding-left: 25px;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size: 2rem;
  letter-spacing: 0.5rem;
  text-align: center;
  color: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${props => Colors(props.colorBlind).primaryColor};
`

const Home = () => {
  const placesData = useSelector(state => state.placesData)
  const filters = useSelector(state => state.filters)
  const sorts = useSelector(state => state.sorts)
  const localization = useSelector(state => state.localization)
  const industries = useSelector(state => state.industries)
  const loadingPlaces = useSelector(state => state.loadingPlaces)
  const colorBlind = useSelector(state => state.colorBlind)

  const contentRef = useRef(null)

  useEffect(() => {
    const heightContent = contentRef.current.clientHeight
    // window.scrollTo(heightContent)
    console.log(heightContent)
  }, [contentRef])

  const dispatch = useDispatch()

  useScrollPosition(({ prevPos, currPos }) => {
    // console.log(currPos.y)
  })

  useEffect(() => {
    sal({
      threshold: 0.1,
      once: false,
    })
  }, [loadingPlaces])

  const mapPlacesData = placesData.map((item, index) => {
    return (
      <PlacesItem key={item.id} item={item} filters={filters} index={index} />
    )
  })

  const industriesText = !!industries ? (
    <TextH1 colorBlind={colorBlind}>{industries}</TextH1>
  ) : (
    <TextH1 colorBlind={colorBlind}>Wszystko</TextH1>
  )

  return (
    <div ref={contentRef}>
      {industriesText}
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
            title={!!filters ? `filtruj po: ${filters.label}` : "filtruj"}
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
      <div>
        <button
          onClick={() => {
            dispatch(changeLoadingPlaces(true))
          }}
        >
          load places true
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            dispatch(changeLoadingPlaces(false))
          }}
        >
          load places false
        </button>
      </div>
      <div>
        <LinkEffect text={<button>company</button>} path="/company-profil" />
      </div>
      <CSSTransition
        in={!loadingPlaces}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <div>{mapPlacesData}</div>
      </CSSTransition>
    </div>
  )
}
export default Home
