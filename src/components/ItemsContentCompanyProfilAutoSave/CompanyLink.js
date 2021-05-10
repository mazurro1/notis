import React, { useEffect } from "react"
import { Element, scroller } from "react-scroll"
import { useDispatch, useSelector } from "react-redux"
import ButtonIcon from "../ButtonIcon"
import { MdEdit } from "react-icons/md"
import styled from "styled-components"
import CompanyLinkContent from "./CompanyLinkContent"
import { changeRestartCompanyLink } from "../../state/actions"

const MarginTopReserwation = styled.div`
  margin-top: 30px;
`

const CompanyLink = ({
  RightColumnItem,
  companyEditProfilProps,
  siteProps,
  TitleRightColumn,
  company,
  user,
  isCompanyEditProfil = false,
  ButtonEditPosition,
  editCompanyLink,
  setEditCompanyLink,
  handleResetAllEditedComponents,
  disabledEditButtons,
  editMode,
  premiumActive,
}) => {
  const restartCompanyLink = useSelector(state => state.restartCompanyLink)
  const dispatch = useDispatch()
  useEffect(() => {
    if (restartCompanyLink) {
      setEditCompanyLink(false)
      dispatch(changeRestartCompanyLink())
    }
  }, [company.linkPath, editMode, setEditCompanyLink, restartCompanyLink])

  const handleEdit = setChange => {
    scroller.scrollTo("companyLinkScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    setChange(prevState => !prevState)
  }

  return (
    <MarginTopReserwation>
      <RightColumnItem
        isCompanyEditProfil={isCompanyEditProfil}
        siteProps={siteProps}
        active={editCompanyLink}
        disabledEditButtons={disabledEditButtons}
        premiumActive={premiumActive}
      >
        <Element name="companyLinkScrollElement" className="element">
          <CompanyLinkContent
            TitleRightColumn={TitleRightColumn}
            companyEditProfilProps={companyEditProfilProps}
            {...companyEditProfilProps}
            editable={editCompanyLink}
            siteProps={siteProps}
            onClickEdit={() => handleEdit(setEditCompanyLink)}
            linkPath={!!company.linkPath ? company.linkPath : ""}
            company={company}
            editCompanyLink={editCompanyLink}
            editMode={editMode}
            user={user}
          />
          {isCompanyEditProfil && (
            <ButtonEditPosition>
              <div data-tip data-for="disabledButton">
                <ButtonIcon
                  title="Edytuj link firmowy"
                  uppercase
                  fontIconSize="25"
                  fontSize="14"
                  icon={<MdEdit />}
                  secondColors
                  onClick={() => {
                    handleResetAllEditedComponents()
                    handleEdit(setEditCompanyLink)
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
export default CompanyLink
