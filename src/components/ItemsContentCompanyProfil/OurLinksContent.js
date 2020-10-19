import React, { useState } from "react"
import ButtonIcon from "../ButtonIcon"
import { MdEdit } from "react-icons/md"
import TextareaCustom from "../TextareaCustom"
import { CSSTransition } from "react-transition-group"
import TextDelay from "../TextDelay"
import styled from "styled-components"
import InputCustom from "../InputCustom"

const MarginButtonSave = styled.div`
  margin-left: 5px;
`

const OurLinksContent = ({
  TitleRightColumn,
  ParagraphRightColumn,
  ButtonEditPosition,
  companyEditProfilProps = {},
  isCompanyEditProfil = false,
  title = "",
  editable = false,
  onClickEdit = () => {},
  setTextEditedChange,
  textEdited,
}) => {
  const [textTitle, handleTextAbout] = useState(textEdited ? textEdited : title)
  const handleEdit = () => {
    onClickEdit()
  }

  const handleTextAboutOnChange = e => {
    handleTextAbout(e.target.value)
  }

  const handleSaveButton = () => {
    setTextEditedChange(textTitle)
    onClickEdit()
  }

  const handleResetButton = () => {
    setTextEditedChange(null)
    handleTextAbout(title)
    onClickEdit()
  }

  return (
    <>
      <TitleRightColumn {...companyEditProfilProps}>LINKI</TitleRightColumn>
      <TextDelay textActive={!editable}>
        <ParagraphRightColumn>{textTitle}</ParagraphRightColumn>
      </TextDelay>
      <InputCustom
        inputActive={editable}
        onChange={handleTextAboutOnChange}
        value={textTitle}
      />
      {isCompanyEditProfil ? (
        !editable ? (
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
        ) : (
          <>
            <ButtonEditPosition>
              <ButtonIcon
                title="Cofnij"
                uppercase
                fontIconSize="25"
                fontSize="14"
                icon={<MdEdit />}
                secondColors
                onClick={handleResetButton}
              />
              <MarginButtonSave>
                <ButtonIcon
                  title="Zapisz"
                  uppercase
                  fontIconSize="25"
                  fontSize="14"
                  icon={<MdEdit />}
                  secondColors
                  onClick={handleSaveButton}
                />
              </MarginButtonSave>
            </ButtonEditPosition>
          </>
        )
      ) : null}
    </>
  )
}
export default OurLinksContent
