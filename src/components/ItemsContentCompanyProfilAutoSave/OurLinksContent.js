import React, { useState, useEffect } from "react"
import ButtonIcon from "../ButtonIcon"
import { FaFacebook, FaInstagram, FaChrome } from "react-icons/fa"
import styled from "styled-components"
import InputIcon from "../InputIcon"
import { Colors } from "../../common/Colors"
import { validURL, convertLinkToHttps } from "../../common/Functions"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import { addAlertItem } from "../../state/actions"
import { useDispatch } from "react-redux"
import Popup from "../Popup"

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
  background-color: transparent;
`

const HeightComponentLinks = styled.div`
  padding-bottom: ${props =>
    props.isCompanyEditProfil && props.editable ? "350px" : "auto"};
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
        ? Colors(props.siteProps).secondDarkColor
        : Colors(props.siteProps).primaryColorDark};
  }
`

const OurLinksContent = ({
  TitleRightColumn,
  isCompanyEditProfil = false,
  editable = false,
  onClickEdit = () => {},
  linkFacebook,
  linkiWebsite,
  linkInstagram,
  handleSaveLinks,
  siteProps,
  company,
  editLinks,
  editMode,
}) => {
  const [facebookInput, setFacebookInput] = useState(linkFacebook)
  const [instagramInput, setInstagramInput] = useState(linkInstagram)
  const [websiteInput, setWebsiteInput] = useState(linkiWebsite)

  const dispatch = useDispatch()

  useEffect(() => {
    setFacebookInput(linkFacebook)
    setInstagramInput(linkInstagram)
    setWebsiteInput(linkiWebsite)
  }, [company.linkFacebook, company.linkInstagram, company.linkiWebsite]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setFacebookInput(linkFacebook)
    setInstagramInput(linkInstagram)
    setWebsiteInput(linkiWebsite)
  }, [editLinks, editMode]) // eslint-disable-line react-hooks/exhaustive-deps

  const isUrlFacebook = validURL(facebookInput)
  const isUrlInstagram = validURL(instagramInput)
  const isUrlWebsite = validURL(websiteInput)

  const disabledButtonSave =
    (facebookInput !== linkFacebook ||
      instagramInput !== linkInstagram ||
      websiteInput !== linkiWebsite) &&
    (isUrlFacebook || facebookInput.length === 0) &&
    (isUrlInstagram || instagramInput.length === 0) &&
    (isUrlWebsite || websiteInput.length === 0)

  const handleSaveButton = e => {
    e.preventDefault()
    if (!isUrlFacebook || !isUrlInstagram || !isUrlWebsite) {
      dispatch(addAlertItem("Niepoprawny link", "red"))
    }
    if (disabledButtonSave) {
      const facebookInputWithHttps = convertLinkToHttps(facebookInput)
      const instagramInputWithHttps = convertLinkToHttps(instagramInput)
      const websiteInputWithHttps = convertLinkToHttps(websiteInput)

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
    <HeightComponentLinks isCompanyEditProfil={editable} editable={editable}>
      <TitleRightColumn isCompanyEditProfil={editable} siteProps={siteProps}>
        LINKI
      </TitleRightColumn>
      <PositionLinksSites>
        {!!facebookInput && isUrlFacebook && (
          <div>
            <IconLinkToSite
              isCompanyEditProfil={isCompanyEditProfil}
              color="#3b5998"
              onClick={() => handleOpenInNewWindow(facebookInput)}
              siteProps={siteProps}
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
              siteProps={siteProps}
            >
              <FaInstagram />
            </IconLinkToSite>
          </div>
        )}
        {!!websiteInput && websiteInput && (
          <div>
            <IconLinkToSite
              siteProps={siteProps}
              isCompanyEditProfil={isCompanyEditProfil}
              color={
                isCompanyEditProfil
                  ? Colors(siteProps).secondColor
                  : Colors(siteProps).primaryColor
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
          <Popup
            popupEnable={editable}
            position="absolute"
            title="Edycja linków"
            borderRadius
            closeTitle={false}
            smallTitle
            secondColors
          >
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
                      fontSize="13"
                      icon={<FaArrowLeft />}
                      customColorButton={Colors(siteProps).dangerColorDark}
                      customColorIcon={Colors(siteProps).dangerColor}
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
                      fontSize="13"
                      icon={<FaSave />}
                      customColorButton={Colors(siteProps).successColorDark}
                      customColorIcon={Colors(siteProps).successColor}
                      disabled={!disabledButtonSave}
                    />
                  </ButtonMargin>
                </ButtonSubmit>
              </ButtonPosition>
            </form>
          </Popup>
        </>
      )}
    </HeightComponentLinks>
  )
}
export default OurLinksContent
