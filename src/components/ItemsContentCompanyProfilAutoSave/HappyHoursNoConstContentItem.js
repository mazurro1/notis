import React, {useState} from 'react'
import styled from 'styled-components'
import {Colors} from '../../common/Colors'
import { MdEdit, MdDelete, MdExpandMore } from "react-icons/md"
import { Collapse } from "react-collapse"

const ItemNoConstHappyHour = styled.div`
  position: relative;
  width: 100%;
  border-radius: 5px;
  background-color: ${props =>
    props.siteProps.blind || props.siteProps.dark
      ? "rgba(0, 0, 0, 0.3)"
      : "rgba(255, 255, 255, 0.9)"};
  color: ${props => Colors(props.siteProps).textNormalBlack};
  margin-bottom: 10px;
  overflow: hidden;
`

const PaddingContent = styled.div`
  padding: 5px 10px;
  position: relative;
`

const TitleItem = styled.div`
  position: relative;
  background-color: ${props =>
    props.edited
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).primaryColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  padding: 5px 10px;
  padding-right: 40px;
  overflow: hidden;
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
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`

const ContentText = styled.div`
  font-size: 0.9rem;
  padding-right: 50px;

  span {
    color: ${props =>
      props.active
        ? Colors(props.siteProps).successColorDark
        : Colors(props.siteProps).dangerColorDark};
    font-size: 1.1rem;
  }
`
const ContentTextDisabled = styled.div`
  font-size: 0.9rem;
  padding-right: 50px;

  span {
    color: ${props =>
      props.active
        ? Colors(props.siteProps).successColorDark
        : Colors(props.siteProps).dangerColorDark};
    font-size: 1.1rem;
  }
`
const ServiceInPromotion = styled.div`
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).successColor
      : Colors(props.siteProps).dangerColor};
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 2px 5px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  font-size: 0.9rem;
`

const EditModeAndDeleteIcons = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const IconEdit = styled.div`
  border-radius: 5px;
  background-color: ${props => Colors(props.siteProps).secondColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  padding: 5px;
  padding-bottom: 0;
  margin-left: 5px;
  cursor: pointer;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props => Colors(props.siteProps).secondDarkColor};
  }
`
const IconDelete = styled.div`
  border-radius: 5px;
  background-color: ${props => Colors(props.siteProps).dangerColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  padding: 5px;
  padding-bottom: 0;
  cursor: pointer;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props => Colors(props.siteProps).dangerColorDark};
  }
`

 const HappyHoursNoConstContentItem = ({
   item,
   companyServices,
   siteProps,
   editConstHappyHours,
   editNoConstHappyHours,
   editMode,
 }) => {
   const [collapseActive, setCollapseActive] = useState(false)
   
   const handleClickCollapse = () => {
     setCollapseActive(prevState => !prevState)
   }
   
   const splitItemStart = item.start.split(":")
   const dateItemPromotion = new Date(new Date(new Date(item.fullDate).setHours(Number(splitItemStart[0]))).setMinutes(Number(splitItemStart[1])))
   const isOld = dateItemPromotion < new Date()
   console.log()
  //  const validActive = !isOld ? false : !item.disabled
   const validActive = isOld ? !isOld : !item.disabled

   const mapServicesInPromotion = item.servicesInPromotion.map(
     (service, indexService) => {
       const findService = companyServices.find(
         companyService => companyService._id === service
       )
       if (!!findService) {
         return (
           <ServiceInPromotion
             siteProps={siteProps}
             key={indexService}
             active={validActive}
           >
             {findService.serviceName}
           </ServiceInPromotion>
         )
       }
     }
   )

   return (
     <ItemNoConstHappyHour siteProps={siteProps}>
       <TitleItem
         siteProps={siteProps}
         active={collapseActive}
         onClick={handleClickCollapse}
       >
         {item.fullDate}
         <ArrowPosition>
           <MdExpandMore />
         </ArrowPosition>
       </TitleItem>
       <Collapse isOpened={collapseActive}>
         <PaddingContent>
           <ContentText siteProps={siteProps} active={validActive}>
             Start promocji: <span>{item.start}</span>
           </ContentText>
           <ContentText siteProps={siteProps} active={validActive}>
             Koniec promocji: <span>{item.end}</span>
           </ContentText>
           <ContentText siteProps={siteProps} active={validActive}>
             Promocja: <span>{item.promotionPercent}%</span>
           </ContentText>
           <ContentTextDisabled siteProps={siteProps} active={validActive}>
             {item.disabled ? (
               <span>Promocja zakończona</span>
             ) : (
               <span>Promocja aktywna</span>
             )}
           </ContentTextDisabled>
           {mapServicesInPromotion}
           {editNoConstHappyHours && editMode && (
             <EditModeAndDeleteIcons>
               <IconDelete siteProps={siteProps}>
                 <MdDelete />
               </IconDelete>
               <IconEdit siteProps={siteProps}>
                 <MdEdit />
               </IconEdit>
             </EditModeAndDeleteIcons>
           )}
         </PaddingContent>
       </Collapse>
     </ItemNoConstHappyHour>
   )
 }
export default HappyHoursNoConstContentItem