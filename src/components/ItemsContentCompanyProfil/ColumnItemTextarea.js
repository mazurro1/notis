import React, { useState } from "react"
import ButtonIcon from "../ButtonIcon"
import { MdEdit } from "react-icons/md"
import TextareaCustom from "../TextareaCustom"
import TextDelay from "../TextDelay"
import styled from "styled-components"
import { checkIfBadValue } from "../../common/Functions"

const MarginButtonSave = styled.div`
  margin-left: 5px;
`

const ColumnItemTextarea = ({
  titleColumnItem = "",
  TitleRightColumn,
  ParagraphRightColumn,
  ButtonEditPosition,
  isCompanyEditProfil = false,
  title = "",
  editable = false,
  onClickEdit = () => {},
  setTextEditedChange,
  textEdited,
}) => {
  const [textTitle, handleTextAbout] = useState(textEdited ? textEdited : title)
  const [isErrorText, setIsErrorText] = useState(false)

  const handleEdit = () => {
    onClickEdit()
  }

  const handleTextAboutOnChange = e => {
    handleTextAbout(e.target.value)

    const ifGoodValue = checkIfBadValue(e.target.value)

    if (ifGoodValue) {
      setIsErrorText(true)
    } else {
      setIsErrorText(false)
    }
  }

  const handleSaveButton = () => {
    if (!isErrorText) {
      setTextEditedChange(textTitle)
      onClickEdit()
    }
  }

  const handleResetButton = () => {
    setTextEditedChange(null)
    handleTextAbout(title)
    onClickEdit()
    setIsErrorText(false)
  }

  return (
    <>
      <TitleRightColumn isCompanyEditProfil={isCompanyEditProfil}>
        {titleColumnItem}
      </TitleRightColumn>
      <TextDelay textActive={!editable}>
        <ParagraphRightColumn>{textTitle}</ParagraphRightColumn>
      </TextDelay>
      <TextareaCustom
        textareaActive={editable}
        value={textTitle}
        onChange={handleTextAboutOnChange}
        maxLength={1000}
        isErrorText={isErrorText}
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
                  disabled={isErrorText}
                />
              </MarginButtonSave>
            </ButtonEditPosition>
          </>
        )
      ) : null}
    </>
  )
}
export default ColumnItemTextarea
