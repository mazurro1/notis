import React, { useState } from "react"
import { MdDelete, MdArrowBack } from "react-icons/md"
import { CSSTransition } from "react-transition-group"
import ButtonIcon from "./ButtonIcon"
import { Colors } from "../common/Colors"
import styled from "styled-components"

const BackgroundEditMessage = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding-top: 10px;
`

const BackgroundEditContentMessage = styled.div`
  width: 90%;
  background-color: "transparent";
  border-radius: 5px;
  max-height: 90%;
  color: black;
  cursor: default;
  overflow: hidden;
`

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
  handleClickContent,
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

  //  const handleDeleteMessage = () => {}
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
        <CSSTransition
          in={deleteToConfirm}
          timeout={400}
          classNames="popup"
          unmountOnExit
        >
          <BackgroundEditMessage onClick={handleClickDeleteConfirm}>
            <BackgroundEditContentMessage
              onClick={handleClickContent}
              siteProps={siteProps}
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
            </BackgroundEditContentMessage>
          </BackgroundEditMessage>
        </CSSTransition>
      </ServiceItemMessages>
    </div>
  )
}
export default WorkerUsersInformationItemMessage
