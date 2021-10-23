import React, { useState, useEffect } from "react"
import { ButtonIcon, Popup, TextareaCustom } from "@ui"
import styled from "styled-components"
import { checkIfBadValue } from "@common/Functions"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import { Colors } from "@common/Colors"

const HeightComponentLinks = styled.div`
  padding-bottom: ${props =>
    props.isCompanyEditProfil && props.editable ? "150px" : "auto"};
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
  background-color: transparent;
`

const ColumnItemTextarea = ({
  titleColumnItem = "",
  TitleRightColumn,
  ParagraphRightColumn,
  isCompanyEditProfil = false,
  title = "",
  editable = false,
  onClickEdit = () => {},
  setTextEditedChange,
  textEdited,
  siteProps,
  handleSaveTextarea,
  editMode = false,
}) => {
  const [textTitle, handleTextAbout] = useState(textEdited ? textEdited : title)
  const [isErrorText, setIsErrorText] = useState(false)

  useEffect(() => {
    setTextEditedChange(null)
    handleTextAbout(title)
    setIsErrorText(false)
  }, [editable, editMode]) // eslint-disable-line react-hooks/exhaustive-deps

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
      handleSaveTextarea(textTitle)
    }
  }

  const handleResetButton = e => {
    setTextEditedChange(null)
    handleTextAbout(title)
    onClickEdit()
    setIsErrorText(false)
  }

  const disabledSave = textTitle === title || isErrorText

  return (
    <HeightComponentLinks
      isCompanyEditProfil={isCompanyEditProfil}
      editable={editable}
    >
      <TitleRightColumn
        isCompanyEditProfil={isCompanyEditProfil}
        siteProps={siteProps}
      >
        {titleColumnItem}
      </TitleRightColumn>
      <ParagraphRightColumn>{textTitle}</ParagraphRightColumn>

      {isCompanyEditProfil && (
        <>
          <Popup
            popupEnable={editable}
            position="absolute"
            title="Edytuj tekst"
            borderRadius
            closeTitle={false}
            smallTitle
            secondColors
          >
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
                      fontSize="13"
                      icon={<FaArrowLeft />}
                      customColorButton={Colors(siteProps).dangerColorDark}
                      customColorIcon={Colors(siteProps).dangerColor}
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
                      fontSize="13"
                      icon={<FaSave />}
                      customColorButton={Colors(siteProps).successColorDark}
                      customColorIcon={Colors(siteProps).successColor}
                      disabled={disabledSave}
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
export default ColumnItemTextarea
