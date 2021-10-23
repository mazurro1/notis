import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchSaveTextsCompany } from "@state/actions"
import ColumnItemTextarea from "./ColumnItemTextarea"
import { ButtonIcon } from "@ui"
import { MdEdit } from "react-icons/md"
import styled from "styled-components"
import { Element, scroller } from "react-scroll"

const MarginTopReserwation = styled.div`
  margin-top: 30px;
`

const ReserwationTextComponent = ({
  RightColumnItem,
  companyEditProfilProps,
  siteProps,
  TitleRightColumn,
  ParagraphRightColumn,
  company,
  user,
  isCompanyEditProfil = false,
  ButtonEditPosition,
  editedReserwation,
  setEditedReserwation,
  handleResetAllEditedComponents,
  disabledEditButtons,
  editMode,
  premiumActive,
}) => {
  const [textReserwation, setTextReserwation] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    setEditedReserwation(false)
  }, [company.reserationText, editMode]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleEdit = setChange => {
    setChange(prevState => !prevState)
    scroller.scrollTo("reserwationScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
  }

  const handleSaveChangesAboutUs = textAboutUsToSave => {
    scroller.scrollTo("reserwationScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    dispatch(
      fetchSaveTextsCompany(
        user.token,
        user.company._id,
        null,
        textAboutUsToSave,
        null
      )
    )
  }

  return (
    <MarginTopReserwation>
      <RightColumnItem
        {...companyEditProfilProps}
        siteProps={siteProps}
        active={editedReserwation}
        disabledEditButtons={disabledEditButtons}
        premiumActive={premiumActive}
      >
        <Element name="reserwationScrollElement" className="element">
          <ColumnItemTextarea
            titleColumnItem="ZASADY REZERWACJI"
            TitleRightColumn={TitleRightColumn}
            ParagraphRightColumn={ParagraphRightColumn}
            title={company.reserationText}
            onClickEdit={() => handleEdit(setEditedReserwation)}
            setTextEditedChange={setTextReserwation}
            textEdited={textReserwation}
            siteProps={siteProps}
            isCompanyEditProfil={editedReserwation}
            editable={editedReserwation}
            handleSaveTextarea={handleSaveChangesAboutUs}
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
                    handleEdit(setEditedReserwation)
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
export default ReserwationTextComponent
