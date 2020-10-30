import React, { useState } from "react"
import ButtonIcon from "../ButtonIcon"
import { MdEdit } from "react-icons/md"
import TextareaCustom from "../TextareaCustom"
import styled from "styled-components"
import { checkIfBadValue } from "../../common/Functions"
import { CSSTransition } from "react-transition-group"
import { FaArrowLeft, FaSave } from "react-icons/fa"

const HeightComponentLinks = styled.div`
  padding-bottom: ${props =>
    props.isCompanyEditProfil && props.editable ? "80px" : "auto"};
  transition-property: padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

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

  const handleSaveButton = e => {
    e.preventDefault()
    if (!isErrorText && textTitle !== title) {
      setTextEditedChange(textTitle)
      onClickEdit()
    }
  }

  const handleResetButton = e => {
    setTextEditedChange(null)
    handleTextAbout(title)
    onClickEdit()
    setIsErrorText(false)
  }

  const handleClickContent = e => {
    e.stopPropagation()
  }

  const disabledSave = textTitle === title || isErrorText

  return (
    <HeightComponentLinks
      isCompanyEditProfil={isCompanyEditProfil}
      editable={editable}
    >
      <TitleRightColumn isCompanyEditProfil={isCompanyEditProfil}>
        {titleColumnItem}
      </TitleRightColumn>
      <ParagraphRightColumn>{textTitle}</ParagraphRightColumn>

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
                  <TextareaCustom
                    textareaActive={editable}
                    value={textTitle}
                    onChange={handleTextAboutOnChange}
                    maxLength={1000}
                    isErrorText={isErrorText}
                  />
                  <ButtonPosition>
                    <ButtonMargin>
                      <ButtonSubmit>
                        <ButtonIcon
                          title="Cofnij"
                          uppercase
                          fontIconSize="16"
                          fontSize="14"
                          icon={<FaArrowLeft />}
                          customColorButton="#c62828"
                          customColorIcon="#f44336"
                          onClick={handleResetButton}
                        />
                      </ButtonSubmit>
                    </ButtonMargin>
                    <ButtonSubmit type="submit">
                      <ButtonMargin>
                        <ButtonIcon
                          title="Zapisz"
                          uppercase
                          fontIconSize="16"
                          fontSize="14"
                          icon={<FaSave />}
                          customColorButton="#2e7d32"
                          customColorIcon="#43a047"
                          disabled={disabledSave}
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
export default ColumnItemTextarea