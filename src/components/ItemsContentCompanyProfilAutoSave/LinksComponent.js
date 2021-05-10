import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchSaveTextsCompany } from "../../state/actions"
import OurLinksContent from "./OurLinksContent"
import ButtonIcon from "../ButtonIcon"
import { MdEdit } from "react-icons/md"
import styled from "styled-components"
import { Element, scroller } from "react-scroll"

const MarginTopReserwation = styled.div`
  margin-top: 30px;
`

const LinksComponent = ({
  RightColumnItem,
  companyEditProfilProps,
  siteProps,
  TitleRightColumn,
  company,
  user,
  isCompanyEditProfil = false,
  ButtonEditPosition,
  editLinks,
  setEditLinks,
  handleResetAllEditedComponents,
  disabledEditButtons,
  editMode,
  premiumActive,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    setEditLinks(false)
  }, [
    company.linkFacebook,
    company.linkInstagram,
    company.linkiWebsite,
    editMode,
    setEditLinks,
  ])

  const handleEdit = setChange => {
    scroller.scrollTo("linksScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    setChange(prevState => !prevState)
  }

  const handleSaveChangesAboutUs = (
    newFacebookLink,
    newInstagramLink,
    newWebsiteLink
  ) => {
    scroller.scrollTo("linksScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    const allLinks = {
      facebook: newFacebookLink,
      instagram: newInstagramLink,
      website: newWebsiteLink,
    }
    dispatch(
      fetchSaveTextsCompany(user.token, user.company._id, null, null, allLinks)
    )
  }

  return (
    <MarginTopReserwation>
      <RightColumnItem
        isCompanyEditProfil={isCompanyEditProfil}
        siteProps={siteProps}
        active={editLinks}
        disabledEditButtons={disabledEditButtons}
        premiumActive={premiumActive}
      >
        <Element name="linksScrollElement" className="element">
          <OurLinksContent
            TitleRightColumn={TitleRightColumn}
            companyEditProfilProps={companyEditProfilProps}
            {...companyEditProfilProps}
            editable={editLinks}
            siteProps={siteProps}
            onClickEdit={() => handleEdit(setEditLinks)}
            handleSaveLinks={handleSaveChangesAboutUs}
            linkFacebook={!!company.linkFacebook ? company.linkFacebook : ""}
            linkiWebsite={!!company.linkiWebsite ? company.linkiWebsite : ""}
            linkInstagram={!!company.linkInstagram ? company.linkInstagram : ""}
            company={company}
            editLinks={editLinks}
            editMode={editMode}
          />
          {isCompanyEditProfil && (
            <ButtonEditPosition>
              <div data-tip data-for="disabledButton">
                <ButtonIcon
                  title="Edytuj linki"
                  uppercase
                  fontIconSize="25"
                  fontSize="14"
                  icon={<MdEdit />}
                  secondColors
                  onClick={() => {
                    handleResetAllEditedComponents()
                    handleEdit(setEditLinks)
                  }}
                  disabled={disabledEditButtons}
                />
              </div>
            </ButtonEditPosition>
          )}
        </Element>
      </RightColumnItem>
    </MarginTopReserwation>
  )
}
export default LinksComponent
