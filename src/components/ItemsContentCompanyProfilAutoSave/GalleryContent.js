import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {
  MdAddAPhoto,
  MdEdit,
  MdPhotoSizeSelectLarge,
  MdMoveToInbox,
  MdImage,
} from "react-icons/md"
import { Colors } from "../../common/Colors"
import {
  fetchCompanyUploadImage,
  fetchCompanyDeleteImage,
  updateUpdatedImageIdCompany,
  addAlertItem,
  fetchCompanyMainImage,
} from "../../state/actions"
import { useDispatch, useSelector } from "react-redux"
import { Site } from "../../common/Site"
import ImageGallery from "react-image-gallery"
import ButtonIcon from "../ButtonIcon"
import { FaArrowLeft } from "react-icons/fa"
import Popup from "../Popup"
import ReactTooltip from "react-tooltip"
import GalleryContentItem from "./GalleryContentItem"

const AddImage = styled.div`
  position: relative;
  height: 180px;
  width: 180px;
  margin: 5px;
  [type="file"] {
    position: absolute;
    height: 0;
    overflow: hidden;
    width: 0;
  }
  [type="file"] + label {
    position: absolute;
    height: 100%;
    width: 100%;
    cursor: pointer;
    border: 2px dashed gray;
    color: gray;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    &:hover {
      background-color: #dadada;
    }
  }
`

const ImagesPositionsFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const MarginButton = styled.div`
  margin-left: 5px;
`

const ButtonTextPositionMap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`

const PositionRelative = styled.div`
  position: relative;
  overflow: hidden;
  opacity: ${props => (props.disabled ? "0.5" : "1")};

  transition-property: opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  .image-gallery-slide-wrapper {
    border-radius: 5px;
    overflow: hidden;
  }

  .image-gallery-icon:hover {
    color: ${props => Colors(props.siteProps).primaryColorDark};
  }

  .image-gallery-thumbnail.active,
  .image-gallery-thumbnail:hover,
  .image-gallery-thumbnail:focus {
    outline: none;
    border: 4px solid white;
    border-color: ${props => Colors(props.siteProps).primaryColorDark};
  }

  .image-gallery-thumbnails-container {
    cursor: normal;
  }

  .image-gallery-thumbnails-wrapper {
    button {
      cursor: pointer;
    }
  }

  .image-gallery-swipe {
    img {
      height: 600px;
      max-height: 80vh;

      @media all and (max-width: ${Site.mobileSize + "px"}) {
        height: 230px;
      }
    }
  }

  .fullscreen {
    .image-gallery-swipe {
      img {
        height: 80vh;
      }
    }
  }
`

const TextGallery = styled.div`
  margin-bottom: 20px;
  span {
    position: relative;
    top: 8px;
    font-size: 2rem;
    color: ${props => Colors(props.siteProps).secondDarkColor};
    padding-right: 10px;
  }
`

const DefaultNonImage = styled.div`
  height: 470px;
  max-height: 80vh;
  width: 100%;
  border-radius: 5px;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 6rem;
`

const GalleryContent = ({
  siteProps,
  companyId,
  user,
  companyImages = [],
  isCompanyEditProfil,
  editMode,
  mainImage = "",
  editGallery,
  setEditGallery,
  handleResetAllEditedComponents,
  isAdmin = false,
  disabledEditButtons,
}) => {
  const [allImagesCompany, setAllImagesCompany] = useState([])
  const [addedImages, setAddedImages] = useState([])
  const updatedImageIdCompany = useSelector(
    state => state.updatedImageIdCompany
  )

  const dispatch = useDispatch()

  const disabledAddImage = allImagesCompany.length + addedImages.length >= 10

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [
    allImagesCompany,
    addedImages,
    editGallery,
    updatedImageIdCompany,
    mainImage,
    companyImages,
  ])

  useEffect(() => {
    const filterMainImage = companyImages.filter(item => item === mainImage)
    const filterOtherImages = companyImages.filter(item => item !== mainImage)
    const allCompanyImages = [...filterMainImage, ...filterOtherImages]
    const mapCompanyImages = allCompanyImages.map((item, index) => {
      return {
        original: `${Site.awsUrl}/${item}`,
        thumbnail: `${Site.awsUrl}/${item}`,
        originalPath: item,
        isNew: false,
      }
    })
    setAllImagesCompany(mapCompanyImages)
    if (!!updatedImageIdCompany) {
      const filterNewImages = addedImages.filter(
        item => item.originalPath !== updatedImageIdCompany
      )
      setAddedImages(filterNewImages)
    }
    dispatch(updateUpdatedImageIdCompany())
  }, [companyImages, mainImage, updatedImageIdCompany]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleUploadImage = (file, originalPath) => {
    if (!disabledAddImage) {
      dispatch(
        fetchCompanyUploadImage(user.token, companyId, file, originalPath)
      )
    }
  }

  const handleClickDeleteImage = (originalPath, isNew) => {
    if (isNew) {
      const filterAddedImages = addedImages.filter(
        item => item.originalPath !== originalPath
      )
      setAddedImages(filterAddedImages)
    } else {
      dispatch(fetchCompanyDeleteImage(user.token, companyId, originalPath))
    }
  }

  const handleCloseEditGalery = () => {
    setEditGallery(false)
    setAddedImages([])
    const filterMainImage = companyImages.filter(item => item === mainImage)
    const filterOtherImages = companyImages.filter(item => item !== mainImage)
    const allCompanyImages = [...filterMainImage, ...filterOtherImages]
    const mapCompanyImages = allCompanyImages.map((item, index) => {
      return {
        original: `${Site.awsUrl}/${item}`,
        thumbnail: `${Site.awsUrl}/${item}`,
        originalPath: item,
        isNew: false,
      }
    })
    setAllImagesCompany(mapCompanyImages)
  }

  const handleEditGalery = () => {
    handleResetAllEditedComponents()
    setEditGallery(true)
  }

  const handleClickMainImage = imagePath => {
    const isMainImage = imagePath === mainImage
    if (!isMainImage) {
      dispatch(fetchCompanyMainImage(user.token, companyId, imagePath))
    }
  }

  const handleAddImage = event => {
    if (!!event.target.files[0]) {
      if (
        event.target.files[0].size <= 2000000 &&
        event.target.files.length &&
        (event.target.files[0].type === "image/jpeg" ||
          event.target.files[0].type === "image/png")
      ) {
        let reader = new FileReader()
        reader.onload = e => {
          const allImages = [...addedImages]
          const isImageInNew = allImages.findIndex(
            item => item.src === e.target.result
          )
          if (isImageInNew >= 0) {
            allImages[isImageInNew].src = e.target.result
          } else {
            const idNewItem = Math.floor(
              1000000 + Math.random() * 9000000
            ).toString()

            allImages.push({
              original: e.target.result,
              thumbnail: e.target.result,
              originalPath: idNewItem,
              isNew: true,
            })
          }
          setAddedImages(allImages)
        }
        reader.readAsDataURL(event.target.files[0])
      } else if (event.target.files[0].size > 2000000) {
        dispatch(addAlertItem("Zdjęcie nie może mieć więcej niż 2mpx", "blue"))
      } else {
        dispatch(
          dispatch(
            addAlertItem("Zdjęcie musi mieć roższeżenie .png lub .jpeg", "blue")
          )
        )
      }
    }
  }

  const mapCompanyImages = [...allImagesCompany, ...addedImages].map(
    (item, index) => {
      const isMainImage = mainImage === item.originalPath
      return (
        <GalleryContentItem
          isMainImage={isMainImage}
          item={item}
          key={index}
          index={index}
          siteProps={siteProps}
          handleClickDeleteImage={handleClickDeleteImage}
          handleUploadImage={handleUploadImage}
          handleClickMainImage={handleClickMainImage}
          updatedImageIdCompany={updatedImageIdCompany}
        />
      )
    }
  )

  return (
    <>
      {(isAdmin || !isCompanyEditProfil) && (
        <PositionRelative
          siteProps={siteProps}
          disabled={disabledEditButtons && !editGallery}
        >
          {allImagesCompany.length > 0 ? (
            <ImageGallery items={allImagesCompany} lazyLoad />
          ) : (
            <DefaultNonImage siteProps={siteProps}>
              <MdImage />
            </DefaultNonImage>
          )}
          {editMode && isAdmin && isCompanyEditProfil && (
            <ButtonTextPositionMap>
              <ButtonIcon
                title="Edytuj galerie"
                uppercase
                fontIconSize="40"
                fontSize="14"
                icon={<MdEdit />}
                secondColors
                disabled={disabledEditButtons}
                onClick={handleEditGalery}
              />
            </ButtonTextPositionMap>
          )}
          {isAdmin && (
            <Popup
              popupEnable={editGallery}
              handleClose={handleCloseEditGalery}
              title="Edytuj galerie"
              secondColors
            >
              <TextGallery siteProps={siteProps}>
                <div>
                  <span>
                    <MdPhotoSizeSelectLarge />
                  </span>
                  Optymalny rozmiar zdjęcia: 800x600px.
                </div>
                <div>
                  <span>
                    <MdMoveToInbox />
                  </span>
                  Maksymalny rozmiar zdjęcia: 2mpx.
                </div>
                <div>
                  <span>
                    <MdImage />
                  </span>
                  Maksymalna liczba zdjęć: 10.
                </div>
              </TextGallery>
              <ImagesPositionsFlex>
                {mapCompanyImages}
                {!disabledAddImage && (
                  <AddImage>
                    <input
                      type="file"
                      id="file"
                      accept="image/*"
                      onChange={handleAddImage}
                    />
                    <label htmlFor="file">
                      <MdAddAPhoto />
                    </label>
                  </AddImage>
                )}
              </ImagesPositionsFlex>
              <ButtonTextPositionMap>
                <MarginButton>
                  <ButtonIcon
                    title="Zakończ edycję"
                    uppercase
                    fontIconSize="16"
                    fontSize="14"
                    icon={<FaArrowLeft />}
                    customColorButton={Colors(siteProps).dangerColorDark}
                    customColorIcon={Colors(siteProps).dangerColor}
                    onClick={handleCloseEditGalery}
                  />
                </MarginButton>
              </ButtonTextPositionMap>
              <ReactTooltip id="saveImage" effect="float" multiline={true}>
                <span>Zapisz zdjęcie</span>
              </ReactTooltip>
              <ReactTooltip id="deleteImage" effect="float" multiline={true}>
                <span>Usuń zdjęcie</span>
              </ReactTooltip>
              <ReactTooltip id="mainImage" effect="float" multiline={true}>
                <span>Ustaw zdjęcie jako zdjęcie główne</span>
              </ReactTooltip>
            </Popup>
          )}
        </PositionRelative>
      )}
    </>
  )
}
export default GalleryContent
