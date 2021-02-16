import React, { useState, useEffect } from "react"
import styled from "styled-components"
import ButtonIcon from "../ButtonIcon"
import { Colors } from "../../common/Colors"
import { MdEdit, MdExpandMore, MdDelete } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import { Collapse } from "react-collapse"
import { CSSTransition } from "react-transition-group"
import { useDispatch } from "react-redux"
import StampsContentItemEdit from "./StampsContentItemEdit"
import { companyDeleteStamp } from "../../state/actions"

const TitleCategory = styled.div`
  position: relative;
  padding: 5px 10px;
  border-radius: 5px;
  padding-right: 50px;
  background-color: ${props =>
    props.edited
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).primaryColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  cursor: pointer;
  font-size: 1rem;
  user-select: none;
  padding-left: 40px;
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
      props.disabled
        ? Colors(props.siteProps).dangerColor
        : Colors(props.siteProps).successColor};
  }

  &:hover {
    background-color: ${props =>
      props.edited
        ? Colors(props.siteProps).secondDarkColor
        : props.disabled
        ? Colors(props.siteProps).dangerColorDark
        : Colors(props.siteProps).successColorDark};
  }

  svg {
    transform: ${props => (!props.active ? "rotate(-90deg)" : "rotate(0deg)")};
    transition-property: transform;
    transition-duration: 0.4s;
    transition-timing-function: ease;
  }
`
const PaddingContent = styled.div`
  padding: 5px 10px;
  position: relative;
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

const EditModeAndDeleteIcons = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
  min-height: ${props => (props.active ? "550px" : "0px")};
  transition-property: background-color, color, min-height;
  transition-duration: 0.3s;
  transition-timing-function: ease;
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

const StampsContentItem = ({
  stamp,
  services,
  siteProps,
  editStamps,
  editMode,
  companyStamps,
  user,
}) => {
  const [collapseActive, setCollapseActive] = useState(false)
  const [editedItemEnable, setEditedItemEnable] = useState(false)
  const [deletedItemEnable, setDeletedItemEnable] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setEditedItemEnable(false)
    setDeletedItemEnable(false)
    setCollapseActive(false)
  }, [companyStamps])

  const handleClickEdited = () => {
    setEditedItemEnable(prevState => !prevState)
  }

  const handleClickCollapse = () => {
    setCollapseActive(prevState => !prevState)
  }

  const handleDeleteItemEnable = () => {
    setDeletedItemEnable(prevState => !prevState)
  }

  const handleDeleteItem = () => {
    dispatch(companyDeleteStamp(user.token, user.company._id, stamp._id))
  }

  const filterServices = services.filter(service => {
    const isServiceInStamp = stamp.servicesId.some(item => item === service._id)
    return isServiceInStamp
  })

  const mapFilterServices = filterServices.map((findService, indexService) => {
    return (
      <ServiceInPromotion
        siteProps={siteProps}
        key={indexService}
        active={!stamp.disabled}
      >
        {findService.serviceName}
      </ServiceInPromotion>
    )
  })

  return (
    <ItemPromotion siteProps={siteProps} active={editedItemEnable}>
      <TitleCategory
        siteProps={siteProps}
        onClick={handleClickCollapse}
        active={collapseActive}
        edited={editStamps}
        disabled={stamp.disabled}
      >
        {`${stamp.promotionPercent} %`}
        <ArrowPosition>
          <MdExpandMore />
        </ArrowPosition>
        <div className="circleActive" />
      </TitleCategory>
      <Collapse isOpened={collapseActive}>
        <PaddingContent>
          <ContentText siteProps={siteProps} active={!stamp.disabled}>
            Promocja: <span>{stamp.promotionPercent}%</span>
          </ContentText>
          <ContentText siteProps={siteProps} active={!stamp.disabled}>
            Wymagana ilość naklejek: <span>{stamp.countStampsToActive}</span>
          </ContentText>
          <ContentTextDisabled siteProps={siteProps} active={!stamp.disabled}>
            {stamp.disabled ? (
              <span>Promocja zakończona</span>
            ) : (
              <span>Promocja aktywna</span>
            )}
          </ContentTextDisabled>
          {mapFilterServices}
          {editStamps && editMode && (
            <EditModeAndDeleteIcons>
              <IconDelete
                siteProps={siteProps}
                onClick={handleDeleteItemEnable}
              >
                <MdDelete />
              </IconDelete>
              <IconEdit siteProps={siteProps} onClick={handleClickEdited}>
                <MdEdit />
              </IconEdit>
            </EditModeAndDeleteIcons>
          )}
        </PaddingContent>
      </Collapse>
      <CSSTransition
        in={deletedItemEnable}
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
      <StampsContentItemEdit
        editedItemEnable={editedItemEnable}
        setEditedItemEnable={setEditedItemEnable}
        siteProps={siteProps}
        stamp={stamp}
        services={services}
        companyStamps={companyStamps}
        user={user}
      />
    </ItemPromotion>
  )
}
export default StampsContentItem
