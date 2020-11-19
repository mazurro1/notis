import React, { useState } from "react"
import ButtonIcon from "../ButtonIcon"
import { MdEdit } from "react-icons/md"
import { FaFacebook, FaInstagram, FaChrome } from "react-icons/fa"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import InputIcon from "../InputIcon"
import { Colors } from "../../common/Colors"
import { validURL, convertLinkToHttps } from "../../common/Functions"
import { FaArrowLeft, FaSave } from "react-icons/fa"

const ButtonPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const ButtonMargin = styled.div`
  margin-left: 5px;
`

const ButtonSubmit = styled.button`
  border: none;
  padding: 0;
  margin: 0;
  background-color: white;
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

const BackgroundEditContent = styled.div`
  width: 90%;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  max-height: 90%;
  overflow-y: auto;
`

const HeightComponentLinks = styled.div`
  padding-bottom: ${props =>
    props.isCompanyEditProfil && props.editable ? "190px" : "auto"};
  transition-property: padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const PositionLinksSites = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const IconLinkToSite = styled.button`
  padding: 10px;
  height: 70px;
  font-size: 2.9rem;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: ${props => (props.color ? props.color : "black")};
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    color: ${props =>
      props.isCompanyEditProfil
        ? Colors(props.colorBlind).secondDarkColor
        : Colors(props.colorBlind).primaryColorDark};
  }
`

const OurLinksContent = ({
  TitleRightColumn,
  ButtonEditPosition,
  companyEditProfilProps = {},
  isCompanyEditProfil = false,
  editable = false,
  onClickEdit = () => {},
  linkFacebook,
  linkiWebsite,
  linkInstagram,
  handleSaveLinks,
  colorBlind,
}) => {
  const [facebookInput, setFacebookInput] = useState(linkFacebook)
  const [instagramInput, setInstagramInput] = useState(linkInstagram)
  const [websiteInput, setWebsiteInput] = useState(linkiWebsite)

  const handleEdit = () => {
    onClickEdit()
  }

  const isUrlFacebook = validURL(facebookInput)
  const isUrlInstagram = validURL(instagramInput)
  const isUrlWebsite = validURL(websiteInput)

  const disabledButtonSave =
    (facebookInput !== linkFacebook ||
      instagramInput !== linkFacebook ||
      websiteInput !== linkiWebsite) &&
    (isUrlFacebook || facebookInput.length === 0) &&
    (isUrlInstagram || instagramInput.length === 0) &&
    (isUrlWebsite || websiteInput.length === 0)

  const handleSaveButton = e => {
    e.preventDefault()

    if (disabledButtonSave) {
      const facebookInputWithHttps = convertLinkToHttps(facebookInput)
      const instagramInputWithHttps = convertLinkToHttps(instagramInput)
      const websiteInputWithHttps = convertLinkToHttps(websiteInput)

      onClickEdit()
      const newFacebookLink =
        facebookInput.length === 0
          ? ""
          : facebookInputWithHttps !== linkFacebook
          ? isUrlFacebook
            ? facebookInputWithHttps
            : null
          : null
      const newInstagramLink =
        instagramInput.length === 0
          ? ""
          : instagramInputWithHttps !== linkInstagram
          ? isUrlInstagram
            ? instagramInputWithHttps
            : null
          : null
      const newWebsiteLink =
        websiteInput.length === 0
          ? ""
          : websiteInputWithHttps !== linkiWebsite
          ? isUrlWebsite
            ? websiteInputWithHttps
            : null
          : null
      handleSaveLinks(newFacebookLink, newInstagramLink, newWebsiteLink)
    }
  }

  const handleResetButton = () => {
    onClickEdit()
    setFacebookInput(linkFacebook)
    setInstagramInput(linkInstagram)
    setWebsiteInput(linkiWebsite)
    handleSaveLinks(null, null, null)
  }

  const handleClickContent = e => {
    e.stopPropagation()
  }

  const handleChangeInputs = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleOpenInNewWindow = link => {
    const isUrl = validURL(link)
    if (isUrl) {
      window.open(link, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <HeightComponentLinks
      isCompanyEditProfil={isCompanyEditProfil}
      editable={editable}
    >
      <TitleRightColumn {...companyEditProfilProps} colorBlind={colorBlind}>
        LINKI
      </TitleRightColumn>
      <PositionLinksSites>
        {!!facebookInput && isUrlFacebook && (
          <div>
            <IconLinkToSite
              isCompanyEditProfil={isCompanyEditProfil}
              color="#3b5998"
              onClick={() => handleOpenInNewWindow(facebookInput)}
              colorBlind={colorBlind}
            >
              <FaFacebook />
            </IconLinkToSite>
          </div>
        )}
        {!!instagramInput && isUrlInstagram && (
          <div>
            <IconLinkToSite
              isCompanyEditProfil={isCompanyEditProfil}
              color="#dd2a7b"
              onClick={() => handleOpenInNewWindow(instagramInput)}
              colorBlind={colorBlind}
            >
              <FaInstagram />
            </IconLinkToSite>
          </div>
        )}
        {!!websiteInput && websiteInput && (
          <div>
            <IconLinkToSite
              colorBlind={colorBlind}
              isCompanyEditProfil={isCompanyEditProfil}
              color={
                isCompanyEditProfil
                  ? Colors(colorBlind).secondColor
                  : Colors(colorBlind).primaryColor
              }
              onClick={() => handleOpenInNewWindow(websiteInput)}
            >
              <FaChrome />
            </IconLinkToSite>
          </div>
        )}
      </PositionLinksSites>

      {isCompanyEditProfil && (
        <>
          <ButtonEditPosition>
            <ButtonIcon
              title="Edytuj"
              uppercase
              fontIconSize="25"
              fontSize="14"
              icon={<MdEdit />}
              secondColors
              onClick={handleEdit}
            />
          </ButtonEditPosition>

          <CSSTransition
            in={editable}
            timeout={400}
            classNames="popup"
            unmountOnExit
          >
            <BackgroundEdit
            // onClick={handleResetButton}
            >
              <BackgroundEditContent onClick={handleClickContent}>
                <form onSubmit={handleSaveButton}>
                  <InputIcon
                    icon={<FaFacebook />}
                    placeholder="Facebook"
                    type="text"
                    secondColor={isCompanyEditProfil}
                    onChange={e => handleChangeInputs(e, setFacebookInput)}
                    value={facebookInput}
                  />
                  <InputIcon
                    icon={<FaInstagram />}
                    placeholder="Instagram"
                    type="text"
                    secondColor={isCompanyEditProfil}
                    onChange={e => handleChangeInputs(e, setInstagramInput)}
                    value={instagramInput}
                  />
                  <InputIcon
                    icon={<FaChrome />}
                    placeholder="Strona www"
                    type="text"
                    secondColor={isCompanyEditProfil}
                    onChange={e => handleChangeInputs(e, setWebsiteInput)}
                    value={websiteInput}
                  />
                  <ButtonPosition>
                    <>
                      <ButtonMargin>
                        <ButtonIcon
                          title="Cofnij"
                          uppercase
                          fontIconSize="16"
                          fontSize="12"
                          icon={<FaArrowLeft />}
                          customColorButton={Colors(colorBlind).dangerColorDark}
                          customColorIcon={Colors(colorBlind).dangerColor}
                          onClick={handleResetButton}
                        />
                      </ButtonMargin>
                    </>
                    <ButtonSubmit type="submit">
                      <ButtonMargin>
                        <ButtonIcon
                          title="Zapisz"
                          uppercase
                          fontIconSize="16"
                          fontSize="14"
                          icon={<FaSave />}
                          customColorButton={
                            Colors(colorBlind).successColorDark
                          }
                          customColorIcon={Colors(colorBlind).successColor}
                          disabled={!disabledButtonSave}
                        />
                      </ButtonMargin>
                    </ButtonSubmit>
                  </ButtonPosition>
                </form>
              </BackgroundEditContent>
            </BackgroundEdit>
          </CSSTransition>
        </>
      )}
    </HeightComponentLinks>
  )
}
export default OurLinksContent
