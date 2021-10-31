import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { MdDelete, MdFileUpload, MdWallpaper } from "react-icons/md"
import { ButtonIcon, Popup } from "@ui"
import { FaArrowLeft } from "react-icons/fa"

const BackGroundImageCustomUrl = styled.div`
  position: relative;
  height: 180px;
  width: 180px;
  margin: 15px;
  background: url(${props => props.url}) 50% 0 no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 5px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1) inset;
  overflow: hidden;
`

const NewName = styled.div`
  position: absolute;
  left: 5px;
  top: -22px;
  color: ${props => Colors(props.siteProps).successColorDark};
  font-size: 1rem;
`

const BackgroundToDelete = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 5px;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(0, 0, 0, 0.30015756302521013) 100%
  );
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

const IconUpload = styled.div`
  position: absolute;
  top: 5px;
  right: 40px;
  font-size: 1rem;
  padding: 5px 6px;
  padding-bottom: 0px;
  border-radius: 5px;
  background-color: ${props => Colors(props.siteProps).successColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props => Colors(props.siteProps).successColorDark};
  }
`

const IconMain = styled.div`
  position: absolute;
  top: 5px;
  right: 40px;
  font-size: 1rem;
  padding: 5px 6px;
  padding-bottom: 0px;
  border-radius: 5px;
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).disabled};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props => Colors(props.siteProps).secondColor};
  }
`

const MarginButton = styled.div`
  margin: 5px;
`

const GalleryContentItem = ({
  item,
  isMainImage,
  index,
  siteProps,
  handleClickDeleteImage,
  handleUploadImage,
  handleClickMainImage,
  updatedImageIdCompany,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    setConfirmDelete(false)
  }, [updatedImageIdCompany])

  const handleConfirmDelete = () => {
    setConfirmDelete(prevState => !prevState)
  }

  return (
    <BackGroundImageCustomUrl url={item.original} key={index}>
      <BackgroundToDelete>
        <IconDelete
          data-tip
          data-for="deleteImage"
          siteProps={siteProps}
          onClick={handleConfirmDelete}
        >
          <MdDelete />
        </IconDelete>

        {item.isNew ? (
          <>
            <IconUpload
              data-tip
              data-for="saveImage"
              onClick={() =>
                handleUploadImage(item.original, item.originalPath)
              }
            >
              <MdFileUpload />
            </IconUpload>
            <NewName>Zapisz zdjęcie</NewName>
          </>
        ) : (
          <IconMain
            active={isMainImage}
            data-tip
            data-for="mainImage"
            onClick={() => handleClickMainImage(item.originalPath)}
          >
            <MdWallpaper />
          </IconMain>
        )}
      </BackgroundToDelete>
      <Popup
        popupEnable={confirmDelete}
        position="absolute"
        borderRadius
        noContent
      >
        <MarginButton>
          <ButtonIcon
            title="Anuluj"
            uppercase
            fontIconSize="20"
            fontSize="13"
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
            fontSize="13"
            icon={<MdDelete />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            onClick={() =>
              handleClickDeleteImage(item.originalPath, item.isNew)
            }
            isFetchToBlock
          />
        </MarginButton>
      </Popup>
    </BackGroundImageCustomUrl>
  )
}
export default GalleryContentItem
