import React, { useState } from "react"
import { MdDelete, MdArrowBack } from "react-icons/md"
import ButtonIcon from "./ButtonIcon"
import { Colors } from "../common/Colors"
import styled from "styled-components"
import Popup from "./Popup"

const ButtonsDeletePosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const WorkerUsersInformationItemMessage = ({
  ServiceItemMessages,
  siteProps,
  index,
  item,
  DateMessageWorkerInformations,
  renderDate,
  workerName,
  workerSurname,
  IconDeleteMessage,
  userInfo,
  ButtonMargin,
  handleDeleteMessageFetch,
}) => {
  const [deleteToConfirm, setDeleteToConfirm] = useState(false)

  const handleClickDeleteConfirm = () => {
    setDeleteToConfirm(prevState => !prevState)
  }

  const handleDeleteMessage = () => {
    handleDeleteMessageFetch(item._id)
    setDeleteToConfirm(false)
  }

  return (
    <div
      data-sal="zoom-in"
      data-sal-duration="300"
      data-sal-easing="ease-out-bounce"
    >
      <ServiceItemMessages siteProps={siteProps} index={index === 0}>
        {item.message}
        <DateMessageWorkerInformations siteProps={siteProps}>
          <span>{renderDate}</span>
          {`${workerName} ${workerSurname}`}
        </DateMessageWorkerInformations>
        <IconDeleteMessage
          siteProps={siteProps}
          data-tip
          data-for={`deleteMessage${userInfo.userId._id}`}
          onClick={handleClickDeleteConfirm}
        >
          <MdDelete />
        </IconDeleteMessage>
        <Popup
          popupEnable={deleteToConfirm}
          position="absolute"
          borderRadius
          noContent
        >
          <ButtonsDeletePosition>
            <ButtonMargin>
              <ButtonIcon
                title="Anuluj"
                uppercase
                fontIconSize="40"
                fontSize="15"
                icon={<MdArrowBack />}
                customColorButton={Colors(siteProps).successColorDark}
                customColorIcon={Colors(siteProps).successColor}
                onClick={handleClickDeleteConfirm}
              />
            </ButtonMargin>
            <ButtonMargin>
              <ButtonIcon
                title="Usuń"
                uppercase
                fontIconSize="40"
                fontSize="15"
                icon={<MdDelete />}
                customColorButton={Colors(siteProps).dangerColorDark}
                customColorIcon={Colors(siteProps).dangerColor}
                onClick={handleDeleteMessage}
              />
            </ButtonMargin>
          </ButtonsDeletePosition>
        </Popup>
      </ServiceItemMessages>
    </div>
  )
}
export default WorkerUsersInformationItemMessage
