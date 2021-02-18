import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchSaveTextsCompany } from "../../state/actions"
import ColumnItemTextarea from "./ColumnItemTextarea"
import ButtonIcon from "../ButtonIcon"
import { MdEdit } from "react-icons/md"
import styled from "styled-components"

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
}) => {
  const [textReserwation, setTextReserwation] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    setEditedReserwation(false)
  }, [company.reserationText, editMode]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleEdit = setChange => {
    setChange(prevState => !prevState)
  }

  const handleSaveChangesAboutUs = textAboutUsToSave => {
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
      >
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
      </RightColumnItem>
    </MarginTopReserwation>
  )
}
export default ReserwationTextComponent
