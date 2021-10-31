import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { MdEdit, MdDelete } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import { ButtonIcon, Popup } from "@ui"
import { useDispatch } from "react-redux"
import { fetchDeleteConstHappyHour } from "@state/actions"
import HappyHoursConstContentCategoryItemEdit from "./HappyHoursConstContentCategoryItemEdit"

const ItemCategoryItem = styled.div`
  position: relative;
  background-color: ${props =>
    props.siteProps.blind || props.siteProps.dark
      ? "rgba(0, 0, 0, 0.3)"
      : "rgba(255, 255, 255, 0.9)"};
  padding: 5px 10px;
  border-radius: ${props => (props.index === 0 ? "0px" : "5px")};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  margin-bottom: 10px;
  overflow: hidden;
  padding-bottom: ${props => (props.active ? "600px" : "0px")};
  transition-property: background-color, color, padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
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

const BackgroundDeleteConfirm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const MarginButton = styled.div`
  margin: 5px;
`

const HappyHoursConstContentCategoryItem = ({
  item,
  companyServices,
  siteProps,
  index,
  editConstHappyHours,
  editMode,
  user,
  happyHoursConst,
  TitleRightColumn,
}) => {
  const [deleteItemEnable, setDeleteItemEnable] = useState(false)
  const [editItemEnable, setEditItemEnable] = useState(false)
  const [enableTimeStart, setEnableTimeStart] = useState(false)
  const [enableTimeEnd, setEnableTimeEnd] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setDeleteItemEnable(false)
    setEditItemEnable(false)
    setEnableTimeStart(false)
    setEnableTimeEnd(false)
  }, [editMode, editConstHappyHours, happyHoursConst])

  const handleDeleteItemEnable = () => {
    setDeleteItemEnable(prevState => !prevState)
  }

  const handleEditItemEnable = () => {
    setEditItemEnable(prevState => !prevState)
  }

  const handleDeleteItem = () => {
    dispatch(fetchDeleteConstHappyHour(user.token, user.company._id, item._id))
  }

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
            active={!item.disabled}
          >
            {findService.serviceName}
          </ServiceInPromotion>
        )
      } else {
        return (
          <ServiceInPromotion
            siteProps={siteProps}
            key={indexService}
            active={!item.disabled}
          ></ServiceInPromotion>
        )
      }
    }
  )
  return (
    <ItemCategoryItem
      siteProps={siteProps}
      index={index}
      active={editItemEnable || enableTimeStart || enableTimeEnd}
    >
      <ContentText siteProps={siteProps} active={!item.disabled}>
        Start promocji: <span>{item.start}</span>
      </ContentText>
      <ContentText siteProps={siteProps} active={!item.disabled}>
        Koniec promocji: <span>{item.end}</span>
      </ContentText>
      <ContentText siteProps={siteProps} active={!item.disabled}>
        Promocja: <span>{item.promotionPercent}%</span>
      </ContentText>
      <ContentTextDisabled siteProps={siteProps} active={!item.disabled}>
        {item.disabled ? (
          <span>Promocja zakończona</span>
        ) : (
          <span>Promocja aktywna</span>
        )}
      </ContentTextDisabled>
      {mapServicesInPromotion}
      {editConstHappyHours && editMode && (
        <EditModeAndDeleteIcons>
          <IconDelete siteProps={siteProps} onClick={handleDeleteItemEnable}>
            <MdDelete />
          </IconDelete>
          <IconEdit siteProps={siteProps} onClick={handleEditItemEnable}>
            <MdEdit />
          </IconEdit>
        </EditModeAndDeleteIcons>
      )}
      <Popup
        popupEnable={deleteItemEnable}
        position="absolute"
        borderRadius
        noContent
      >
        <BackgroundDeleteConfirm>
          <MarginButton>
            <ButtonIcon
              title="Anuluj"
              uppercase
              fontIconSize="20"
              fontSize="13"
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
              fontSize="13"
              icon={<MdDelete />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleDeleteItem}
              isFetchToBlock
            />
          </MarginButton>
        </BackgroundDeleteConfirm>
      </Popup>
      <HappyHoursConstContentCategoryItemEdit
        siteProps={siteProps}
        TitleRightColumn={TitleRightColumn}
        editConstHappyHours={editConstHappyHours}
        newHappyHour={editItemEnable}
        setNewHappyHour={setEditItemEnable}
        enableTimeStart={enableTimeStart}
        setEnableTimeStart={setEnableTimeStart}
        setEnableTimeEnd={setEnableTimeEnd}
        enableTimeEnd={enableTimeEnd}
        companyServices={companyServices}
        user={user}
        dataHappyHourConst={item}
        happyHoursConst={happyHoursConst}
      />
    </ItemCategoryItem>
  )
}
export default HappyHoursConstContentCategoryItem
