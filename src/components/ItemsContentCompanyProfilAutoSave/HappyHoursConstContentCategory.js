import React, {useState, useEffect} from 'react'
import { DaySOfTheWeek } from "../../common/DaySOfTheWeek"
import HappyHoursConstContentCategoryItem from './HappyHoursConstContentCategoryItem'
import { Collapse } from "react-collapse"
import styled from 'styled-components'
import {Colors} from '../../common/Colors'
import { MdExpandMore } from "react-icons/md"

const MarginComponent = styled.div`
  margin-bottom: 10px;
`

const TitleCategory = styled.div`
  position: relative;
  padding: 5px 10px;
  border-radius: 5px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  padding-right: 50px;
  background-color: ${props =>
    props.edited
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).primaryColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  cursor: pointer;
  font-size: 1.1rem;
  user-select: none;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props =>
      props.edited
        ? Colors(props.siteProps).secondDarkColor
        : Colors(props.siteProps).primaryColorDark};
  }

  svg {
    transform: ${props => (!props.active ? "rotate(-90deg)" : "rotate(0deg)")};
    transition-property: transform;
    transition-duration: 0.4s;
    transition-timing-function: ease;
  }
`

const ArrowPosition = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`

 const HappyHoursConstContentCategory = ({
   category,
   siteProps,
   companyServices,
   editConstHappyHours,
   editMode,
   user,
   happyHoursConst,
   TitleRightColumn,
 }) => {
   const [collapseActive, setCollapseActive] = useState(false)

   useEffect(() => {
     setCollapseActive(false)
   }, [happyHoursConst])

   const handleClickCollapse = () => {
     setCollapseActive(prevState => !prevState)
   }

   const findDayOfTheWeek = DaySOfTheWeek.find(
     item => item.dayOfTheWeek === category.category
   )

   const mapItems = category.items.map((item, index) => {
     return (
       <HappyHoursConstContentCategoryItem
         item={item}
         key={index}
         companyServices={companyServices}
         siteProps={siteProps}
         index={index}
         editMode={editMode}
         editConstHappyHours={editConstHappyHours}
         user={user}
         happyHoursConst={happyHoursConst}
         TitleRightColumn={TitleRightColumn}
       />
     )
   })

   return (
     <MarginComponent>
       <TitleCategory
         siteProps={siteProps}
         onClick={handleClickCollapse}
         active={collapseActive}
         edited={editConstHappyHours}
       >
         {!!findDayOfTheWeek ? findDayOfTheWeek.title : "Zła nazwa"}
         <ArrowPosition>
           <MdExpandMore />
         </ArrowPosition>
       </TitleCategory>
       <Collapse isOpened={collapseActive}>
         <div>{mapItems}</div>
       </Collapse>
     </MarginComponent>
   )
 }
export default HappyHoursConstContentCategory