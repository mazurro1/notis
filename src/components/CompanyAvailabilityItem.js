import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { MdDelete, MdEdit, MdArrowBack } from "react-icons/md"
import ButtonIcon from "./ButtonIcon"
import { useDispatch } from "react-redux"
import { deleteCompanyAvailability } from "../state/actions"
import CompanyAvailabilityItemEdit from "./CompanyAvailabilityItemEdit"
import Popup from "./Popup"

const ItemAvailability = styled.div`
  position: relative;
  padding: 5px 10px;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  color: ${props => Colors(props.siteProps).textNormalBlack};
  border-radius: 5px;
  margin: 5px 0;
  padding-right: 50px;
  padding-bottom: ${props => (props.active ? "350px" : "5px")};
  transition-property: background-color, color, padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const IconsPostitions = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const IconStyleDelete = styled.div`
  margin-left: 5px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props => Colors(props.siteProps).dangerColor};
  font-size: 1.2rem;
  cursor: pointer;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: ${props => Colors(props.siteProps).dangerColorDark};
  }
`

const IconStyleEdit = styled.div`
  margin-left: 5px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props => Colors(props.siteProps).secondColor};
  font-size: 1.2rem;
  cursor: pointer;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: ${props => Colors(props.siteProps).secondDarkColor};
  }
`

const ItemNames = styled.div`
  span {
    font-size: 1.1rem;
    color: ${props => Colors(props.siteProps).primaryColor};
    font-family: "Poppins-Medium", sans-serif;
  }
`

const ButtonsAddPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const CompanyAvailabilityItem = ({
  user,
  siteProps,
  item,
  resetUserCompanyAvailability,
  userCompanyAvailabilityPermission,
  isAdmin,
}) => {
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)

  useEffect(() => {
    setDeleteVisible(false)
    setEditVisible(false)
  }, [resetUserCompanyAvailability])

  const dispatch = useDispatch()

  const handleDeleteVisible = () => {
    setDeleteVisible(prevState => !prevState)
  }

  const handleEditVisible = () => {
    setEditVisible(prevState => !prevState)
  }

  const handleDeleteItem = () => {
    dispatch(deleteCompanyAvailability(user.token, user.company._id, item._id))
  }

  return (
    <ItemAvailability siteProps={siteProps} active={editVisible}>
      <ItemNames siteProps={siteProps}>
        Nazwa przedmiotu: <span>{item.itemName}</span>
      </ItemNames>
      <ItemNames siteProps={siteProps}>
        Ilość: <span>{item.itemCount}</span>
      </ItemNames>
      {(isAdmin || userCompanyAvailabilityPermission) && (
        <IconsPostitions>
          <IconStyleEdit onClick={handleEditVisible}>
            <MdEdit />
          </IconStyleEdit>
          <IconStyleDelete onClick={handleDeleteVisible}>
            <MdDelete />
          </IconStyleDelete>
        </IconsPostitions>
      )}
      {(isAdmin || userCompanyAvailabilityPermission) && (
        <Popup
          popupEnable={deleteVisible}
          position="absolute"
          noContent
          borderRadius
          smallTitle
        >
          <ButtonsAddPosition>
            <ButtonMargin>
              <ButtonIcon
                title="Anuluj"
                uppercase
                fontIconSize="20"
                fontSize="15"
                icon={<MdArrowBack />}
                onClick={handleDeleteVisible}
                customColorButton={Colors(siteProps).successColorDark}
                customColorIcon={Colors(siteProps).successColor}
              />
            </ButtonMargin>
            <ButtonMargin>
              <ButtonIcon
                title="Usuń"
                uppercase
                fontIconSize="20"
                fontSize="15"
                icon={<MdDelete />}
                onClick={handleDeleteItem}
                customColorButton={Colors(siteProps).dangerColorDark}
                customColorIcon={Colors(siteProps).dangerColor}
              />
            </ButtonMargin>
          </ButtonsAddPosition>
        </Popup>
      )}
      {(isAdmin || userCompanyAvailabilityPermission) && (
        <CompanyAvailabilityItemEdit
          siteProps={siteProps}
          editVisible={editVisible}
          handleEditVisible={handleEditVisible}
          itemName={item.itemName}
          itemCount={item.itemCount}
          resetUserCompanyAvailability={resetUserCompanyAvailability}
          itemId={item._id}
          user={user}
        />
      )}
    </ItemAvailability>
  )
}
export default CompanyAvailabilityItem
