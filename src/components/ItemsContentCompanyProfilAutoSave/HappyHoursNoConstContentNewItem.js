import React, {useState, useEffect} from 'react'
import { CSSTransition } from "react-transition-group"
import styled from 'styled-components'
import {Colors} from '../../common/Colors'
import ButtonIcon from '../ButtonIcon'
import {
  FaArrowLeft,
  FaSave,
  FaCalendarDay,
  FaPercentage,
} from "react-icons/fa"
import { MdTimelapse } from "react-icons/md"
import ReactTooltip from "react-tooltip"
import SelectCustom from "../SelectCustom"
import TimePickerContent from "../TimePicker"
import InputIcon from "../InputIcon"
import { Checkbox } from "react-input-checkbox"
import SelectDataCalendar from "../SelectDataCalendar"
import { useDispatch } from "react-redux"
import {fetchAddNoConstDateHappyHour} from '../../state/actions'

const BackgroundEdit = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const BackgroundEditContent = styled.div`
  position: relative;
  width: 90%;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  padding: 10px;
  border-radius: 5px;
  max-height: 90%;
`
const ButtonTextPositionHappy = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`

const SelectStyles = styled.div`
  margin-bottom: 10px;
`

const MarginButton = styled.div`
  margin-left: 5px;
`

const WidthTimePicker = styled.div`
  background-color: transparent;
  min-width: 280px;
  max-width: 90%;
`

const MarginButtonTime = styled.div`
  margin-bottom: 10px;
  display: inline-block;
`

const TextCheckbox = styled.span`
  color: ${props => Colors(props.siteProps).secondColor};
  padding-left: 10px;
  user-select: none;
`

const CheckboxStyle = styled.div`
  margin-top: 20px;

  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.siteProps).secondColor};
  }

  span {
    color: ${props => Colors(props.siteProps).textNormalBlack};
    border-color: ${props => Colors(props.siteProps).textNormalBlack};
  }
`

 const HappyHoursNoConstContentNewItem = ({
   TitleRightColumn,
   newNoConstHappyHour,
   siteProps,
   setEditNoConstHappyHours,
   setNewNoConstHappyHour,
   companyServices,
   enableTimeEnd,
   setEnableTimeEnd,
   enableTimeStart,
   setEnableTimeStart,
   enableDatePicker,
   setEnableDatePicker,
   user,
   happyHoursNoConst,
 }) => {
   const [selectedServicesIds, setSelectedServicesIds] = useState([])
   const [timeStart, setTimeStart] = useState("10:00")
   const [timeEnd, setTimeEnd] = useState("12:00")
   const [datePromotion, setDatePromotion] = useState("")
   const [promotionPercent, setPromotionPercent] = useState("")
   const [disabledPromotion, setDisabledPromotion] = useState(false)
   const [selectedTime, setSelectedTime] = useState(new Date())

   const dispatch = useDispatch()

   const disabledSave =
     !!promotionPercent &&
     !!timeStart &&
     !!timeEnd &&
     !!datePromotion &&
     selectedServicesIds.length > 0

   useEffect(() => {
     ReactTooltip.rebuild()
   }, [disabledSave, newNoConstHappyHour])

   useEffect(() => {
     setNewNoConstHappyHour(false)
     setPromotionPercent("")
     setDisabledPromotion(false)
     setTimeStart("10:00")
     setTimeEnd("12:00")
     setSelectedServicesIds([])
     setSelectedTime(new Date())
   }, [happyHoursNoConst])

   useEffect(() => {
     const actualDate = selectedTime
     const timeToPicker = `${actualDate.getFullYear()}-${
       actualDate.getMonth() + 1 < 10
         ? `0${actualDate.getMonth() + 1}`
         : actualDate.getMonth() + 1
     }-${
       actualDate.getDate() < 10
         ? `0${actualDate.getDate()}`
         : actualDate.getDate()
     }`
     setDatePromotion(timeToPicker)
   }, [setDatePromotion, selectedTime])

   const handleSaveHappyHour = () => {
     const mapOnyIds = selectedServicesIds.map(item => item.value)
     const dataHappyHour = {
       disabled: disabledPromotion,
       start: timeStart,
       end: timeEnd,
       promotionPercent: Number(promotionPercent),
       servicesInPromotion: mapOnyIds,
       dateFull: datePromotion,
     }
     dispatch(
       fetchAddNoConstDateHappyHour(user.token, user.company._id, dataHappyHour)
     )
   }

   const handleResetAdd = () => {
     setNewNoConstHappyHour(false)
     setPromotionPercent("")
     setDisabledPromotion(false)
     setTimeStart("10:00")
     setTimeEnd("12:00")
     setSelectedServicesIds([])
     setSelectedTime(new Date())
   }

   const handleChangeServicesIds = value => {
     const allValues = value ? value : []
     setSelectedServicesIds(allValues)
   }

   const handleUpdateTimeStart = time => {
     setNewNoConstHappyHour(true)
     setEnableTimeStart(false)
     setTimeStart(time)
   }

   const handleUpdateTimeEnd = time => {
     setNewNoConstHappyHour(true)
     setEnableTimeEnd(false)
     setTimeEnd(time)
   }

   const handleClickTimeStart = () => {
     setNewNoConstHappyHour(false)
     setEnableTimeStart(true)
   }

   const handleClickTimeEnd = () => {
     setNewNoConstHappyHour(false)
     setEnableTimeEnd(true)
   }

   const handleChangePercent = e => {
     setPromotionPercent(e.target.value)
   }

   const handleChangeDisabledPromotion = () => {
     setDisabledPromotion(prevState => !prevState)
   }

   const handleClickDatePicker = () => {
     setNewNoConstHappyHour(false)
     setEnableDatePicker(true)
   }

   const handleCloseDateCalendar = () => {
     setEnableDatePicker(false)
     setNewNoConstHappyHour(true)
   }

   const mapServices = companyServices.map(item => {
     return {
       value: item._id,
       label: item.serviceName,
     }
   })

   return (
     <>
       <CSSTransition
         in={newNoConstHappyHour}
         timeout={400}
         classNames="popup"
         unmountOnExit
       >
         <BackgroundEdit>
           <BackgroundEditContent siteProps={siteProps}>
             <TitleRightColumn
               isCompanyEditProfil={setEditNoConstHappyHours}
               siteProps={siteProps}
             >
               Nowe happy hours
             </TitleRightColumn>
             <SelectStyles>
               <SelectCustom
                 options={mapServices}
                 value={selectedServicesIds}
                 handleChange={handleChangeServicesIds}
                 placeholder="Zaznacz usługi..."
                 defaultMenuIsOpen={false}
                 widthAuto
                 isClearable={false}
                 secondColor
                 isMulti
               />
             </SelectStyles>
             <div>
               <MarginButtonTime>
                 <ButtonIcon
                   title={
                     !!timeStart ? `Data: ${datePromotion}` : "Data promocji"
                   }
                   uppercase
                   fontIconSize="16"
                   fontSize="14"
                   icon={<FaCalendarDay />}
                   secondColors
                   onClick={handleClickDatePicker}
                 />
               </MarginButtonTime>
             </div>
             <div>
               <MarginButtonTime>
                 <ButtonIcon
                   title={
                     !!timeStart
                       ? `Start: ${timeStart}`
                       : "Godzina startu promocji"
                   }
                   uppercase
                   fontIconSize="16"
                   fontSize="14"
                   icon={<MdTimelapse />}
                   secondColors
                   onClick={handleClickTimeStart}
                 />
               </MarginButtonTime>
             </div>
             <div>
               <MarginButtonTime>
                 <ButtonIcon
                   title={
                     !!timeEnd ? `Koniec: ${timeEnd}` : "Godzina końca promocji"
                   }
                   uppercase
                   fontIconSize="16"
                   fontSize="14"
                   icon={<MdTimelapse />}
                   secondColors
                   onClick={handleClickTimeEnd}
                 />
               </MarginButtonTime>
             </div>
             <InputIcon
               icon={<FaPercentage />}
               placeholder="Wysokość promocji"
               value={promotionPercent}
               type="number"
               onChange={handleChangePercent}
               required
               secondColor
             />
             <CheckboxStyle siteProps={siteProps}>
               <Checkbox
                 theme="material-checkbox"
                 value={disabledPromotion}
                 onChange={handleChangeDisabledPromotion}
               >
                 <TextCheckbox siteProps={siteProps}>
                   Promocja wyłączona
                 </TextCheckbox>
               </Checkbox>
             </CheckboxStyle>
             <ButtonTextPositionHappy>
               <MarginButton>
                 <ButtonIcon
                   title="Anuluj"
                   uppercase
                   fontIconSize="16"
                   fontSize="14"
                   icon={<FaArrowLeft />}
                   customColorButton={Colors(siteProps).dangerColorDark}
                   customColorIcon={Colors(siteProps).dangerColor}
                   onClick={handleResetAdd}
                 />
               </MarginButton>
               <MarginButton>
                 <ReactTooltip
                   id="disabledButtonSave"
                   effect="float"
                   multiline={true}
                 >
                   <span>Uzupełnij wszystkie pola.</span>
                 </ReactTooltip>
                 {!disabledSave ? (
                   <div data-tip data-for="disabledButtonSave">
                     <ButtonIcon
                       title="Dodaj"
                       uppercase
                       fontIconSize="16"
                       fontSize="14"
                       icon={<FaSave />}
                       customColorButton={Colors(siteProps).successColorDark}
                       customColorIcon={Colors(siteProps).successColor}
                       disabled={!disabledSave}
                     />
                   </div>
                 ) : (
                   <ButtonIcon
                     title="Dodaj"
                     uppercase
                     fontIconSize="16"
                     fontSize="14"
                     icon={<FaSave />}
                     customColorButton={Colors(siteProps).successColorDark}
                     customColorIcon={Colors(siteProps).successColor}
                     onClick={handleSaveHappyHour}
                     disabled={!disabledSave}
                   />
                 )}
               </MarginButton>
             </ButtonTextPositionHappy>
           </BackgroundEditContent>
         </BackgroundEdit>
       </CSSTransition>
       <CSSTransition
         in={enableTimeStart}
         timeout={400}
         classNames="popup"
         unmountOnExit
       >
         <BackgroundEdit>
           <WidthTimePicker>
             <TimePickerContent
               setSelectedTime={handleUpdateTimeStart}
               timeTimePicker={timeStart}
               secondColor
             />
           </WidthTimePicker>
         </BackgroundEdit>
       </CSSTransition>
       <CSSTransition
         in={enableTimeEnd}
         timeout={400}
         classNames="popup"
         unmountOnExit
       >
         <BackgroundEdit>
           <WidthTimePicker>
             <TimePickerContent
               setSelectedTime={handleUpdateTimeEnd}
               timeTimePicker={timeEnd}
               secondColor
             />
           </WidthTimePicker>
         </BackgroundEdit>
       </CSSTransition>
       <CSSTransition
         in={enableDatePicker}
         timeout={400}
         classNames="popup"
         unmountOnExit
       >
         <BackgroundEdit>
           <WidthTimePicker>
             <SelectDataCalendar
               setActualCalendarDate={setSelectedTime}
               setIsDataActive={handleCloseDateCalendar}
               minDateActive={true}
             />
           </WidthTimePicker>
         </BackgroundEdit>
       </CSSTransition>
     </>
   )
 }
export default HappyHoursNoConstContentNewItem