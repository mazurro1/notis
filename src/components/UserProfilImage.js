import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { MdDelete } from "react-icons/md"
import ButtonIcon from "./ButtonIcon"
import { FaArrowLeft } from "react-icons/fa"
import Popup from "./Popup"

const BackGroundImageCustomUrl = styled.div`
  position: relative;
  height: 200px;
  width: 200px;
  margin: 15px;
  margin-right: 5px;
  background: url(${props => props.url}) 50% 0 no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1) inset;
  overflow: hidden;
`

const IconDelete = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 1rem;
  padding: 5px 6px;
  padding-bottom: 0px;
  border-radius: 5px;
  background-color: ${props => Colors(props.siteProps).dangerColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  cursor: pointer;
  transition-property: background-color;
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
  flex-wrap: wrap;
`

const MarginButton = styled.div`
  margin: 5px;
`

const PositionImage = styled.div`
  position: relative;
  display: inline-block;
  padding: 20px;
`

const UserProfilImage = ({
  item,
  index,
  siteProps,
  handleClickDeleteImage,
  userProfilReset,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    setConfirmDelete(false)
  }, [userProfilReset])

  const handleConfirmDelete = () => {
    setConfirmDelete(prevState => !prevState)
  }

  return (
    <PositionImage>
      <BackGroundImageCustomUrl url={item.src} key={index}>
        <Popup
          popupEnable={confirmDelete}
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
                fontSize="16"
                icon={<FaArrowLeft />}
                onClick={handleConfirmDelete}
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
                onClick={() =>
                  handleClickDeleteImage(item.originalPath, item.isNew)
                }
              />
            </MarginButton>
          </BackgroundDeleteConfirm>
        </Popup>
      </BackGroundImageCustomUrl>
      <IconDelete
        data-tip
        data-for="deleteImage"
        siteProps={siteProps}
        onClick={handleConfirmDelete}
      >
        <MdDelete />
      </IconDelete>
    </PositionImage>
  )
}
export default UserProfilImage
