import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchSaveTextsCompany } from "@state/actions"
import ColumnItemTextarea from "./ColumnItemTextarea"
import { ButtonIcon } from "@ui"
import { MdEdit } from "react-icons/md"
import { Element, scroller } from "react-scroll"

const AboutUsComponent = ({
  RightColumnItem,
  companyEditProfilProps,
  siteProps,
  TitleRightColumn,
  ParagraphRightColumn,
  company,
  user,
  isCompanyEditProfil = false,
  ButtonEditPosition,
  editAboutUs,
  setEditAboutUs,
  handleResetAllEditedComponents,
  disabledEditButtons,
  editMode,
  premiumActive,
}) => {
  const [textAboutUs, setTextAboutUs] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    setEditAboutUs(false)
  }, [company.title, editMode]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleEdit = setChange => {
    setChange(prevState => !prevState)

    scroller.scrollTo("aboutUsScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
  }

  const handleSaveChangesAboutUs = textAboutUsToSave => {
    scroller.scrollTo("aboutUsScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    dispatch(
      fetchSaveTextsCompany(
        user.token,
        user.company._id,
        textAboutUsToSave,
        null,
        null
      )
    )
  }

  return (
    <>
      <RightColumnItem
        {...companyEditProfilProps}
        siteProps={siteProps}
        active={editAboutUs}
        disabledEditButtons={disabledEditButtons}
        premiumActive={premiumActive}
      >
        <Element name="aboutUsScrollElement" className="element">
          <ColumnItemTextarea
            titleColumnItem="O NAS"
            TitleRightColumn={TitleRightColumn}
            ParagraphRightColumn={ParagraphRightColumn}
            title={company.title}
            editable={editAboutUs}
            onClickEdit={() => handleEdit(setEditAboutUs)}
            setTextEditedChange={setTextAboutUs}
            textEdited={textAboutUs}
            siteProps={siteProps}
            handleSaveTextarea={handleSaveChangesAboutUs}
            isCompanyEditProfil={editAboutUs}
            editMode={editMode}
          />
          {isCompanyEditProfil && (
            <ButtonEditPosition>
              <div data-tip data-for="disabledButton">
                <ButtonIcon
                  title="Edytuj tekst"
                  uppercase
                  fontIconSize="25"
                  fontSize="14"
                  icon={<MdEdit />}
                  secondColors
                  onClick={() => {
                    handleResetAllEditedComponents()
                    handleEdit(setEditAboutUs)
                  }}
                  disabled={disabledEditButtons}
                />
              </div>
            </ButtonEditPosition>
          )}
        </Element>
      </RightColumnItem>
    </>
  )
}
export default AboutUsComponent
