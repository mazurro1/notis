import React, { useEffect } from "react"
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
} from "../state/actions"
import {Colors} from '../common/Colors'
import sal from 'sal.js'

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

const TextH1 = styled.h1`
  margin-top: 40px;
  color: ${Colors.navDownBackground};
  padding-bottom: 5px;
  margin-bottom: 10px;
  text-transform: uppercase;
`

const LineBlack = styled.div`
  height: 3px;
  width: 50px;
  border-radius: 5px;
  background-color: ${Colors.navDownBackground};
  margin-bottom: 20px;
`

const Home = () => {
  const placesData = useSelector(state => state.placesData)
  const filters = useSelector(state => state.filters)
  const sorts = useSelector(state => state.sorts)
  const localization = useSelector(state => state.localization)
  const industries = useSelector(state => state.industries)


  const dispatch = useDispatch()

  useEffect(()=>{
    sal({
      threshold: 0.1,
      once: false,
    })
  }, [])

  const mapPlacesData = placesData.map((item, index) => {
    return <PlacesItem key={item.id} item={item} filters={filters} index={index}/>
  })

  const industriesText = !!industries ? <TextH1>{industries}</TextH1> : <TextH1>Wszystko</TextH1>

  return (
    <>
      {industriesText}
      <LineBlack/>
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
              !!localization ? `lokalizacja: ${localization.label}` : "lokalizacja"
            }
            uppercase
            fontIconSize="35"
            fontSize="16"
            icon={<MdLocationOn />}
            onClick={() => dispatch(changeLocaliaztionVisible())}
          />
        </ButtonMargin>
      </ButtonsFilters>
      {mapPlacesData}
    </>
  )
}
export default Home
