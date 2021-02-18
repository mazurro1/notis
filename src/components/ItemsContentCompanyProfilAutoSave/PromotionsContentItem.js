import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import { MdEdit, MdDelete, MdExpandMore } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import { Collapse } from "react-collapse"
import ButtonIcon from "../ButtonIcon"
import { CSSTransition } from "react-transition-group"
import {
  fetchDeletePromotion,
  updatePromotionsDispatch,
} from "../../state/actions"
import { useDispatch, useSelector } from "react-redux"
import PromotionsContentItemEdit from "./PromotionsContentItemEdit"

const ItemPromotion = styled.div`
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
  min-height: ${props => (props.active ? "650px" : "0px")};
  transition-property: background-color, color, min-height;
  transition-duration: 0.3s;
  transition-timing-function: ease;
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
  font-size: 1rem;
  user-select: none;
  padding-left: 40px;
  border-radius: 5px;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  .circleActive {
    position: absolute;
    left: 5px;
    top: 5px;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background-color: ${props =>
      !props.disabled
        ? Colors(props.siteProps).dangerColor
        : Colors(props.siteProps).successColor};
  }

  &:hover {
    background-color: ${props =>
      props.edited
        ? Colors(props.siteProps).secondDarkColor
        : props.disabled
        ? Colors(props.siteProps).successColorDark
        : Colors(props.siteProps).dangerColorDark};
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

const BackgroundDeleteConfirm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const MarginButton = styled.div`
  margin: 5px;
`

const PromotionsContentItem = ({
  item,
  companyServices,
  siteProps,
  editPromotions,
  setEditPromotions,
  editMode,
  user,
  promotions,
  TitleRightColumn,
}) => {
  const [collapseActive, setCollapseActive] = useState(false)
  const [deleteItemEnable, setDeleteItemEnable] = useState(false)
  const [editItemEnable, setEditItemEnable] = useState(false)
  const [enableDatePickerStart, setEnableDatePickerStart] = useState(false)
  const [enableDatePickerEnd, setEnableDatePickerEnd] = useState(false)
  const updatePromotions = useSelector(state => state.updatePromotions)

  const dispatch = useDispatch()

  useEffect(() => {
    setDeleteItemEnable(false)
    setCollapseActive(false)
  }, [promotions])

  useEffect(() => {
    setDeleteItemEnable(false)
    setCollapseActive(false)
    setEditItemEnable(false)
    setEnableDatePickerStart(false)
    setEnableDatePickerEnd(false)
    dispatch(updatePromotionsDispatch())
  }, [updatePromotions]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickCollapse = () => {
    setCollapseActive(prevState => !prevState)
  }

  const handleDeleteItemEnable = () => {
    setDeleteItemEnable(prevState => !prevState)
  }

  const handleEditItemEnable = () => {
    setEditItemEnable(prevState => !prevState)
  }

  const handleDeleteItem = () => {
    dispatch(fetchDeletePromotion(user.token, user.company._id, item._id))
  }

  const dateItemPromotion = new Date(
    new Date(new Date(item.end).setHours(23)).setMinutes(59)
  )
  const isOld = dateItemPromotion < new Date()

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
      } else {
        return (
          <ServiceInPromotion
            siteProps={siteProps}
            key={indexService}
            active={validActive}
          ></ServiceInPromotion>
        )
      }
    }
  )

  return (
    <ItemPromotion
      siteProps={siteProps}
      active={editItemEnable || enableDatePickerStart || enableDatePickerEnd}
    >
      <TitleItem
        siteProps={siteProps}
        active={collapseActive}
        onClick={handleClickCollapse}
        edited={editPromotions}
        disabled={validActive}
      >
        {`${item.start} - ${item.end}`}
        <ArrowPosition>
          <MdExpandMore />
        </ArrowPosition>
        <div className="circleActive" />
      </TitleItem>
      <Collapse isOpened={collapseActive}>
        <PaddingContent>
          <ContentText siteProps={siteProps} active={validActive}>
            Promocja: <span>{item.promotionPercent}%</span>
          </ContentText>
          <ContentTextDisabled siteProps={siteProps} active={validActive}>
            {!validActive ? (
              <span>Promocja zakończona</span>
            ) : (
              <span>Promocja aktywna</span>
            )}
          </ContentTextDisabled>
          {mapServicesInPromotion}
          {editPromotions && editMode && (
            <EditModeAndDeleteIcons>
              <IconDelete
                siteProps={siteProps}
                onClick={handleDeleteItemEnable}
              >
                <MdDelete />
              </IconDelete>
              <IconEdit siteProps={siteProps} onClick={handleEditItemEnable}>
                <MdEdit />
              </IconEdit>
            </EditModeAndDeleteIcons>
          )}
        </PaddingContent>
      </Collapse>
      <CSSTransition
        in={deleteItemEnable}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <BackgroundEdit>
          <BackgroundDeleteConfirm>
            <MarginButton>
              <ButtonIcon
                title="Anuluj"
                uppercase
                fontIconSize="20"
                fontSize="16"
                icon={<FaArrowLeft />}
                onClick={handleDeleteItemEnable}
                customColorButton={Colors(siteProps).successColorDark}
                customColorIcon={Colors(siteProps).successColor}
              />
            </MarginButton>
            <MarginButton>
              <ButtonIcon
                title="Usuń"
                uppercase
                fontIconSize="20"
                fontSize="16"
                icon={<MdDelete />}
                customColorButton={Colors(siteProps).dangerColorDark}
                customColorIcon={Colors(siteProps).dangerColor}
                onClick={handleDeleteItem}
              />
            </MarginButton>
          </BackgroundDeleteConfirm>
        </BackgroundEdit>
      </CSSTransition>
      <PromotionsContentItemEdit
        TitleRightColumn={TitleRightColumn}
        newPromotion={editItemEnable}
        siteProps={siteProps}
        editPromotions={editPromotions}
        setEditPromotions={setEditPromotions}
        setNewPromotion={setEditItemEnable}
        companyServices={companyServices}
        enableDatePickerStart={enableDatePickerStart}
        setEnableDatePickerStart={setEnableDatePickerStart}
        enableDatePickerEnd={enableDatePickerEnd}
        setEnableDatePickerEnd={setEnableDatePickerEnd}
        user={user}
        promotions={promotions}
        itemPromotion={item}
        updatePromotions={updatePromotions}
        isOld={isOld}
      />
    </ItemPromotion>
  )
}
export default PromotionsContentItem
